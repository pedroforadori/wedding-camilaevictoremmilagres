# Site do casamento — Camila & Victor

App Next.js (App Router, TypeScript, Tailwind CSS) do site de casamento, parte do
monorepo em [`../README.md`](../README.md).

## Rodando localmente

Na raiz do monorepo:

```bash
npm install
npm run dev
```

Ou direto nesta pasta:

```bash
cd site
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

### Contador de visitas (rodapé)

O contador em `Footer.tsx` usa Redis (via a integração "Upstash for Redis" no
Marketplace da Vercel) para persistir a contagem entre requisições — o site roda em
funções serverless na Vercel, sem disco persistente, então não dá pra usar o mesmo
padrão de `data/*.jsonl` do RSVP aqui.

Para funcionar em produção: no dashboard da Vercel, Storage → Marketplace →
"Upstash for Redis" → conectar ao projeto. Isso injeta `KV_REST_API_URL` e
`KV_REST_API_TOKEN` automaticamente. Sem essas variáveis (ex.: localmente, antes de
rodar `vercel env pull`), `/api/visits` responde 503 e o componente simplesmente não
renderiza nada — não quebra o build nem o resto da página.

## Conteúdo e status

O conteúdo das seções vem do backlog capturado em `../planning/` e das issues do
repositório. Várias seções ainda dependem de material que os noivos vão enviar
(aquarelas, fotos, horários da programação) — ver `src/content/wedding.ts`, onde cada
seção pendente está marcada com `status: "em-breve"` e a referência da issue
correspondente. Quando o material chegar, atualize esse arquivo.

A identidade visual (paleta de cores, tipografia) foi aproximada a partir da descrição
do monograma "CV" e da aquarela de praia enviados pela Camila (issue #8). A aquarela já
está em `public/images/aquarela-praia.jpg` e é usada como referência de estilo na página
de Programação; o monograma ainda é um placeholder. As aquarelas com sugestão de roupa
por evento (issue #4) continuam pendentes.
