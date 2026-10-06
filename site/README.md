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

### Variáveis de ambiente

Local e produção rodam exatamente o mesmo código: o que muda são só as chaves.
Copie `site/.env.example` para `site/.env.local` e preencha (a descrição de cada
variável está no próprio arquivo):

1. **Redis**: local usa o mesmo banco de produção. Rode `npx vercel link` (uma
   vez) e `npx vercel env pull .env.local` dentro de `site/`, ou copie
   `KV_REST_API_URL`/`KV_REST_API_TOKEN` de Vercel → Storage → banco Upstash →
   aba `.env.local`. Pedidos, RSVPs e visitas de teste caem nos dados reais:
   remova os pedidos de teste em `/admin-noivos/presentes`. Sem Redis, Pix por
   presente, RSVP e contador de visitas respondem 503.
2. **Stripe**: chaves de teste em dashboard.stripe.com/test/apikeys
   (`STRIPE_SECRET_KEY=sk_test_…`). Para o webhook local, instale a
   [Stripe CLI](https://docs.stripe.com/stripe-cli) e rode
   `stripe listen --forward-to localhost:3000/api/stripe/webhook` — o `whsec_…`
   impresso vai em `STRIPE_WEBHOOK_SECRET`. Cartão de teste: `4242 4242 4242 4242`.
3. **Admin**: `ADMIN_NOIVOS_PASSWORD` com qualquer senha local.

Reinicie o `npm run dev` depois de editar o `.env.local`. Para produção, cadastre
as mesmas variáveis em Vercel → Settings → Environment Variables (Stripe com as
chaves live e o webhook apontando para `https://<domínio>/api/stripe/webhook`).

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
