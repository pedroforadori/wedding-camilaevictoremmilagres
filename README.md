# Site de Casamento — Camila e Victor

Repositório do site de casamento. O desenvolvimento ainda não começou — este repo está,
por enquanto, coletando os pedidos e preferências que o casal compartilha no grupo de
WhatsApp, para virarem um backlog de issues antes do setup do site.

## Fluxo

```
grupo de WhatsApp → bot/ (captura em tempo real) → planning/pending/ (rascunhos)
  → issues no GitHub (board Kanban) → vira desenvolvimento quando o site começar
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
