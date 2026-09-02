import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pino from 'pino';
import { downloadMediaMessage } from '@whiskeysockets/baileys';
import { connect } from './lib/connect.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GROUP_JID = process.env.GROUP_JID;
const MESSAGES_FILE = path.join(__dirname, '..', 'data', 'messages.jsonl');
const MEDIA_DIR = path.join(__dirname, '..', 'data', 'media');
const logger = pino({ level: 'silent' });

const MEDIA_MESSAGE_TYPES = {
  imageMessage: 'image',
  videoMessage: 'video',
  documentMessage: 'document',
  audioMessage: 'audio',
  stickerMessage: 'sticker',
};

const seenIds = loadSeenIds();

function loadSeenIds() {
  const ids = new Set();
  if (fs.existsSync(MESSAGES_FILE)) {
    const lines = fs.readFileSync(MESSAGES_FILE, 'utf8').split('\n').filter(Boolean);
    for (const line of lines) {
      try {
        ids.add(JSON.parse(line).id);
      } catch {
        // ignore linhas corrompidas
      }
    }
  }
  return ids;
}

function extractText(message) {
  if (!message) return null;
  return (
    message.conversation ||
    message.extendedTextMessage?.text ||
    message.imageMessage?.caption ||
    message.videoMessage?.caption ||
    message.documentMessage?.caption ||
    null
  );
}

function extractMediaInfo(message) {
  if (!message) return null;
  for (const [key, type] of Object.entries(MEDIA_MESSAGE_TYPES)) {
    if (message[key]) {
      return { type, content: message[key] };
    }
  }
  return null;
}

function extensionFor(mimetype, fileName) {
  const fromName = fileName && path.extname(fileName).replace('.', '');
  if (fromName) return fromName;
  const fromMime = mimetype?.split(';')[0].split('/')[1];
  return fromMime || 'bin';
}

async function downloadAttachment(msg, media) {
  try {
    const buffer = await downloadMediaMessage(
      msg,
      'buffer',
      {},
      { logger, reuploadRequest: currentSock.updateMediaMessage }
    );
    const ext = extensionFor(media.content.mimetype, media.content.fileName);
    const fileName = `${msg.key.id}.${ext}`;
    fs.mkdirSync(MEDIA_DIR, { recursive: true });
    fs.writeFileSync(path.join(MEDIA_DIR, fileName), buffer);
    return path.join('data', 'media', fileName);
  } catch (err) {
    console.warn(`[anexo] falha ao baixar mídia de ${msg.key.id}: ${err.message}`);
    return null;
  }
}

function appendMessage(entry) {
  if (seenIds.has(entry.id)) return;
  seenIds.add(entry.id);
  fs.mkdirSync(path.dirname(MESSAGES_FILE), { recursive: true });
  fs.appendFileSync(MESSAGES_FILE, JSON.stringify(entry) + '\n');
}

async function messageToEntry(msg, source) {
  if (msg.key.fromMe) return null;
  if (seenIds.has(msg.key.id)) return null;

  const text = extractText(msg.message);
  const media = extractMediaInfo(msg.message);
  if (!text && !media) return null;

  let attachment = null;
  if (media) {
    const filePath = await downloadAttachment(msg, media);
    attachment = {
      type: media.type,
      mimetype: media.content.mimetype || null,
      fileName: media.content.fileName || null,
      path: filePath,
    };
  }

  return {
    id: msg.key.id,
    timestamp: msg.messageTimestamp ? Number(msg.messageTimestamp) * 1000 : Date.now(),
    sender: msg.key.participant || msg.key.remoteJid,
    senderName: msg.pushName || null,
    text,
    attachment,
    source,
  };
}

let currentSock = null;

async function main() {
  if (!GROUP_JID) {
    console.log('GROUP_JID não configurado em bot/.env ainda — isso é esperado na primeira execução.');
    console.log('Depois de escanear o QR e conectar, rode "npm run list-groups" para descobrir o JID do grupo certo.');
  }

  await connect({
    onOpen: (sock) => {
      currentSock = sock;

      sock.ev.on('messaging-history.set', async ({ messages, isLatest, progress }) => {
        let imported = 0;
        for (const msg of messages) {
          if (!GROUP_JID || msg.key.remoteJid !== GROUP_JID) continue;
          const entry = await messageToEntry(msg, 'history-sync');
          if (!entry) continue;
          appendMessage(entry);
          imported++;
        }
        if (imported > 0) {
          console.log(`[historico] +${imported} mensagens do grupo (progresso: ${progress ?? '?'}%)`);
        }
        if (isLatest) {
          console.log('[historico] sincronização concluída.');
        }
      });

      sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type !== 'notify') return;

        for (const msg of messages) {
          if (!GROUP_JID || msg.key.remoteJid !== GROUP_JID) continue;
          const entry = await messageToEntry(msg, 'live');
          if (!entry) continue;

          appendMessage(entry);
          const label = entry.text || (entry.attachment ? `[${entry.attachment.type}] ${entry.attachment.fileName || ''}` : '');
          console.log(`[capturado] ${entry.senderName || entry.sender}: ${label.slice(0, 80)}`);
        }
      });
    },
  });
}

main().catch((err) => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
