# Planejamento

Este diretório guarda o backlog do site enquanto ele ainda não existe.

## Fluxo

1. O bot em `bot/` captura as mensagens do grupo de WhatsApp dos noivos em `data/messages.jsonl`, e os anexos (fotos, vídeos, áudios, documentos) em `data/media/` (nenhum dos dois versionado, ficam só locais). Cada mensagem com anexo referencia o arquivo em `attachment.path`.
2. Periodicamente, as mensagens novas são revisadas e viram rascunhos de ticket em `planning/pending/*.md`.
3. Rascunhos que correspondem a um pedido claro e acionável são publicados direto como issue
   (sem esperar aprovação manual — decisão do casal em 2026-09-02). Rascunhos ambíguos, que
   dependem de uma resposta dos noivos, ou que só fazem sentido como pergunta continuam
   esperando em `pending/` até virarem acionáveis.
4. Issues publicadas viram issues no repositório (`gh issue create`), são adicionadas ao
   board Kanban (project #3, view "Board", agrupado por Status) e saem de `pending/`.
5. Se o rascunho referenciar um `attachment.path` de `data/media/`, o arquivo é subido como
   anexo real da issue (não commitado no repo, já que o repositório é público) e embutido
   no corpo ou em um comentário. Repositório é público, então nada de `data/media/` entra
   no git — só o link gerado pelo upload.

   Upload feito via endpoint não-documentado do GitHub (usado pelo drag-and-drop da UI):

   ```bash
   REPO_ID=$(gh api repos/pedroforadori/wedding-camilaevictoremmilagres --jq .id)
   TOKEN=$(gh auth token)
   curl -s "https://uploads.github.com/user-attachments/assets?name=<nome>&content_type=<mime>&repository_id=$REPO_ID" \
     -X POST -H "Authorization: Bearer $TOKEN" -H "Accept: application/json" --data-binary "@data/media/<arquivo>"
   # -> {"url": "https://github.com/user-attachments/assets/<uuid>"}
   ```

   Embutir a URL retornada na issue/comentário como `![descrição](<url>)` (imagens/vídeos) ou
   `[descrição](<url>)` (documentos/áudio). Como é endpoint não-oficial, pode mudar de
   comportamento sem aviso — se parar de funcionar, cair de volta para descrever o anexo em
   texto e referenciar o arquivo local.

As mensagens brutas do grupo nunca são publicadas — só o rascunho já reescrito como ticket.
