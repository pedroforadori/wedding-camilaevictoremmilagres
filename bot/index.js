import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { connect } from './lib/connect.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GROUP_JID = process.env.GROUP_JID;
const MESSAGES_FILE = path.join(__dirname, '..', 'data', 'messages.jsonl');

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
  fs.mkdirSync(path.dirname(MESSAGES_FILE), { recursive: true });
  fs.appendFileSync(MESSAGES_FILE, JSON.stringify(entry) + '\n');
}

async function main() {
  if (!GROUP_JID) {
    console.log('GROUP_JID não configurado em bot/.env ainda — isso é esperado na primeira execução.');
    console.log('Depois de escanear o QR e conectar, rode "npm run list-groups" para descobrir o JID do grupo certo.');
  }

  await connect({
    onOpen: (sock) => {
      sock.ev.on('messages.upsert', ({ messages, type }) => {
        if (type !== 'notify') return;

        for (const msg of messages) {
          if (!GROUP_JID || msg.key.remoteJid !== GROUP_JID) continue;
          if (msg.key.fromMe) continue;

          const text = extractText(msg.message);
          if (!text) continue;

          const entry = {
            id: msg.key.id,
            timestamp: msg.messageTimestamp ? Number(msg.messageTimestamp) * 1000 : Date.now(),
            sender: msg.key.participant || msg.key.remoteJid,
            senderName: msg.pushName || null,
            text,
          };

          appendMessage(entry);
          console.log(`[capturado] ${entry.senderName || entry.sender}: ${text.slice(0, 80)}`);
        }
      });
    },
  });
}

main().catch((err) => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
