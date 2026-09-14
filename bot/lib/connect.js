import makeWASocket, { useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import qrcode from 'qrcode-terminal';
import pino from 'pino';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const QR_DEBUG_FILE = path.join(os.tmpdir(), 'wedding-bot-qr-raw.txt');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUTH_DIR = path.join(__dirname, '..', 'auth');

export async function connect({ onOpen } = {}) {
  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);

  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: 'silent' }),
    syncFullHistory: true,
  });

  sock.ev.on('creds.update', saveCreds);

  const pairingPhoneNumber = process.env.PAIRING_PHONE_NUMBER;
  let pairingRequested = false;

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr && pairingPhoneNumber && !pairingRequested && !sock.authState.creds.registered) {
      // Só pede o código depois que o socket sinalizou (via qr) que o handshake
      // inicial terminou — pedir antes disso derruba a conexão (statusCode 428).
      pairingRequested = true;
      sock
        .requestPairingCode(pairingPhoneNumber)
        .then((code) => {
          console.log(
            `\nCódigo de pareamento: ${code}\nNo celular: Aparelhos conectados > Conectar um aparelho > Conectar com número de telefone. Digite esse código.\n`
          );
        })
        .catch((err) => console.error('Erro ao pedir código de pareamento:', err));
    } else if (qr && !pairingPhoneNumber) {
      console.log('\nEscaneie o QR code abaixo com o WhatsApp do celular (Aparelhos conectados > Conectar um aparelho):\n');
      qrcode.generate(qr, { small: true });
      // Guarda o conteúdo bruto do QR pra gerar uma imagem escaneável de verdade,
      // já que o QR em ASCII no terminal às vezes não escaneia bem.
      fs.writeFileSync(QR_DEBUG_FILE, qr);
    }

    if (connection === 'open') {
      console.log('Conectado ao WhatsApp.');
      if (onOpen) onOpen(sock);
    }

    if (connection === 'close') {
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      const loggedOut = statusCode === DisconnectReason.loggedOut;
      console.log(
        `Conexão encerrada (statusCode=${statusCode}).` +
          (loggedOut
            ? ' Sessão deslogada — apague bot/auth e rode de novo para linkar o QR.'
            : ' Tentando reconectar em alguns segundos...')
      );
      if (!loggedOut) {
        // Espera um pouco antes de reconectar: reconectar imediato demais faz o WhatsApp
        // achar que são duas sessões concorrentes e ficar derrubando as duas em loop
        // (statusCode 440, "connectionReplaced").
        setTimeout(() => {
          connect({ onOpen }).catch((err) => console.error('Erro ao reconectar:', err));
        }, 5000);
      }
    }
  });

  return sock;
}

export { AUTH_DIR };
