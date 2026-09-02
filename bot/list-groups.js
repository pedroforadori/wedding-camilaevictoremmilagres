import 'dotenv/config';
import { connect } from './lib/connect.js';

async function main() {
  await connect({
    onOpen: async (sock) => {
      console.log('Buscando grupos...\n');
      const groups = await sock.groupFetchAllParticipating();
      const list = Object.values(groups);

      if (list.length === 0) {
        console.log('Nenhum grupo encontrado.');
      } else {
        for (const g of list) {
          console.log(`${g.subject}\n  JID: ${g.id}\n`);
        }
        console.log('Copie o JID do grupo certo para GROUP_JID em bot/.env');
      }

      process.exit(0);
    },
  });
}

main().catch((err) => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
