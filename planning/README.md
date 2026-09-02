# Planejamento

Este diretório guarda o backlog do site enquanto ele ainda não existe.

## Fluxo

1. O bot em `bot/` captura as mensagens do grupo de WhatsApp dos noivos em `data/messages.jsonl` (não versionado, fica só local).
2. Periodicamente, as mensagens novas são revisadas e viram rascunhos de ticket em `planning/pending/*.md`.
3. Cada rascunho é aprovado, editado ou rejeitado.
4. Rascunhos aprovados viram issues no repositório (`gh issue create`) e saem de `pending/`.

Só o que foi aprovado vira issue pública — as mensagens brutas do grupo nunca são publicadas.
