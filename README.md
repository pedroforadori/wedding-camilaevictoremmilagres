# Site de Casamento — Camila e Victor

Monorepo do site de casamento. Contém o site em si (`site/`) e a esteira que captura os
pedidos e preferências do casal no grupo de WhatsApp e os transforma em backlog de
issues (`bot/`, `data/`, `planning/`).

## Estrutura

```
.
├── site/      → site do casamento (Next.js + TypeScript + Tailwind CSS)
├── bot/       → bot de captura do grupo de WhatsApp (Baileys)
├── data/      → mensagens e mídia capturadas (não versionado)
└── planning/  → backlog de rascunhos de ticket antes de virarem issues
```

Gerenciado como monorepo com [npm workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces).

## Site (`site/`)

```bash
npm install     # na raiz — instala as dependências de todos os workspaces
npm run dev     # sobe o site em http://localhost:3000
```

Veja [site/README.md](site/README.md) para detalhes sobre o conteúdo e o que ainda está
pendente de material dos noivos.

## Fluxo do backlog

```
grupo de WhatsApp → bot/ (captura em tempo real) → planning/pending/ (rascunhos)
  → issues no GitHub (board Kanban) → desenvolvimento em site/
```

## Bot de captura (`bot/`)

Usa [Baileys](https://github.com/WhiskeySockets/Baileys) para linkar como um dispositivo
do WhatsApp Web e escutar as mensagens de um grupo específico, gravando-as em
`data/messages.jsonl` (não versionado). Anexos (fotos, vídeos, áudios, documentos,
figurinhas) são baixados para `data/media/` (também não versionado) e cada entrada de
mensagem referencia o arquivo correspondente — importante para preservar referências
visuais (decoração, convites, etc.) trocadas no grupo.

### Primeira vez

O Node do sistema (v20.9.0) é antigo demais para o Baileys. Foi instalado o
[nvm](https://github.com/nvm-sh/nvm) e uma versão mais nova do Node só para este
projeto — `bot/.nvmrc` já fixa a versão certa. **Abra um terminal novo** (para o nvm
carregar) antes de rodar os comandos abaixo:

```bash
cd bot
nvm use
npm install
npm start
```

Escaneie o QR code exibido no terminal com o WhatsApp do celular (**Aparelhos conectados
→ Conectar um aparelho**). A sessão fica salva em `bot/auth/` (não versionado) — não
precisa escanear de novo nas próximas execuções, a menos que a sessão seja deslogada.

### Descobrir o grupo certo

Depois de conectar pela primeira vez:

```bash
npm run list-groups
```

Copie o `JID` do grupo certo para `GROUP_JID` em `bot/.env` (copie `bot/.env.example` para
`bot/.env` primeiro). Rode `npm start` de novo — a partir daí, toda mensagem recebida
nesse grupo é gravada em `data/messages.jsonl`.

**O processo precisa ficar rodando** para captar mensagens em tempo real. Se cair ou o
notebook dormir, mensagens enviadas nesse intervalo não são recuperadas.

## Planejamento (`planning/`)

Veja [planning/README.md](planning/README.md) para o fluxo de extração e publicação dos
tickets a partir das mensagens capturadas.
