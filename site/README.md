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

## Conteúdo e status

O conteúdo das seções vem do backlog capturado em `../planning/` e das issues do
repositório. Várias seções ainda dependem de material que os noivos vão enviar
(aquarelas, fotos, horários da programação) — ver `src/content/wedding.ts`, onde cada
seção pendente está marcada com `status: "em-breve"` e a referência da issue
correspondente. Quando o material chegar, atualize esse arquivo.

A identidade visual (paleta de cores, tipografia) foi aproximada a partir da descrição
do monograma "CV" e da aquarela de praia enviados pela Camila (issue #8) — os arquivos
originais (PDF) ainda não estão neste repositório. Quando estiverem disponíveis, troque
os placeholders em `src/components/` pelas artes reais.
