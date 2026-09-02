const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');
const pino = require('pino');
const path = require('path');

const AUTH_DIR = path.join(__dirname, '..', 'auth');

async function connect({ onOpen } = {}) {
  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);

  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: 'silent' }),
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log('\nEscaneie o QR code abaixo com o WhatsApp do celular (Aparelhos conectados > Conectar um aparelho):\n');
      qrcode.generate(qr, { small: true });
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
            : ' Tentando reconectar...')
      );
      if (!loggedOut) {
        connect({ onOpen }).catch((err) => console.error('Erro ao reconectar:', err));
      }
    }
  });

  return sock;
}

module.exports = { connect, AUTH_DIR };
