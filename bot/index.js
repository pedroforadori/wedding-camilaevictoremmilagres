import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { connect } from './lib/connect.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GROUP_JID = process.env.GROUP_JID;
const MESSAGES_FILE = path.join(__dirname, '..', 'data', 'messages.jsonl');

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
    null
  );
}

function appendMessage(entry) {
  if (seenIds.has(entry.id)) return;
  seenIds.add(entry.id);
  fs.mkdirSync(path.dirname(MESSAGES_FILE), { recursive: true });
  fs.appendFileSync(MESSAGES_FILE, JSON.stringify(entry) + '\n');
}

function messageToEntry(msg, source) {
  const text = extractText(msg.message);
  if (!text) return null;
  if (msg.key.fromMe) return null;

  return {
    id: msg.key.id,
    timestamp: msg.messageTimestamp ? Number(msg.messageTimestamp) * 1000 : Date.now(),
    sender: msg.key.participant || msg.key.remoteJid,
    senderName: msg.pushName || null,
    text,
    source,
  };
}

async function main() {
  if (!GROUP_JID) {
    console.log('GROUP_JID não configurado em bot/.env ainda — isso é esperado na primeira execução.');
    console.log('Depois de escanear o QR e conectar, rode "npm run list-groups" para descobrir o JID do grupo certo.');
  }

  await connect({
    onOpen: (sock) => {
      sock.ev.on('messaging-history.set', ({ messages, isLatest, progress }) => {
        let imported = 0;
        for (const msg of messages) {
          if (!GROUP_JID || msg.key.remoteJid !== GROUP_JID) continue;
          const entry = messageToEntry(msg, 'history-sync');
          if (!entry) continue;
          if (seenIds.has(entry.id)) continue;
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

      sock.ev.on('messages.upsert', ({ messages, type }) => {
        if (type !== 'notify') return;

        for (const msg of messages) {
          if (!GROUP_JID || msg.key.remoteJid !== GROUP_JID) continue;
          const entry = messageToEntry(msg, 'live');
          if (!entry) continue;

          appendMessage(entry);
          console.log(`[capturado] ${entry.senderName || entry.sender}: ${entry.text.slice(0, 80)}`);
        }
      });
    },
  });
}

main().catch((err) => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
