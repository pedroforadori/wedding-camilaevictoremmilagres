// Lista de presentes da lua de mel, transcrita de site/lista-presentes.xlsx
// (aba "Lista de Presentes", enviada pelos noivos em out/2026). As fotos
// vieram das abas "1"…"20" da mesma planilha, uma por presente, convertidas
// para WebP em public/images/presentes/.
//
// Na planilha, os noivos trocaram alguns títulos (coluna "Experiência") sem
// atualizar as colunas ocultas "Destino" e "Mensagem para o convidado". Como
// as fotos acompanham os títulos, título + foto foram tratados como fonte da
// verdade; os itens marcados com "texto novo" ou "corrigido" abaixo precisam
// da revisão dos noivos.

export type GiftDestination = "cape-town" | "safari" | "ilha" | "transporte";

export const giftDestinations: Record<GiftDestination, string> = {
  "cape-town": "Cape Town",
  safari: "Joanesburgo e Safári",
  ilha: "Ilha",
  transporte: "Transporte",
};

export type Gift = {
  id: string;
  title: string;
  description: string;
  destination: GiftDestination;
  /** Valor de uma cota em centavos (compatível com o unit_amount do Stripe). */
  priceCents: number;
  /** Nº de cotas disponíveis (coluna "Nº de presentes disponíveis"). */
  quantity: number;
  image: string;
};

export const gifts: Gift[] = [
  {
    id: "por-do-sol-lions-head",
    title: "Pôr do sol no Lion's Head",
    // Texto novo: a planilha trazia o texto de um transfer.
    description:
      "Subir a trilha e ver o sol se despedir de Cape Town lá do alto, lado a lado.",
    destination: "cape-town",
    priceCents: 200_00,
    quantity: 6,
    image: "/images/presentes/por-do-sol-lions-head.webp",
  },
  {
    id: "ceu-estrelado-safari",
    title: "Noite de céu estrelado na reserva do safári",
    // Texto novo e destino corrigido (planilha: "Transporte", texto de combustível).
    description:
      "Uma noite no silêncio da reserva, sob o céu mais estrelado que a gente já viu.",
    destination: "safari",
    priceCents: 275_00,
    quantity: 6,
    image: "/images/presentes/ceu-estrelado-safari.webp",
  },
  {
    id: "cafe-da-manha-na-cama",
    title: "Café da manhã na cama com vista para o mar",
    description:
      "Acordar casados do outro lado do mundo, com café na cama e o mar na janela.",
    destination: "cape-town",
    priceCents: 400_00,
    quantity: 5,
    image: "/images/presentes/cafe-da-manha-na-cama.webp",
  },
  {
    id: "snorkel-tartarugas",
    title: "Snorkel com tartarugas e peixes",
    description:
      "Mergulhar entre peixes coloridos e tartarugas em águas transparentes.",
    destination: "ilha",
    priceCents: 500_00,
    quantity: 5,
    image: "/images/presentes/snorkel-tartarugas.webp",
  },
  {
    id: "voo-cape-town-joanesburgo",
    title: "Voo interno: Cape Town para Joanesburgo (passagem de um de nós)",
    // Texto e destino corrigidos: estavam trocados com o piquenique.
    description:
      "A ponte aérea entre o mar e a savana. Você nos leva de um cenário ao outro.",
    destination: "transporte",
    priceCents: 550_00,
    quantity: 5,
    image: "/images/presentes/voo-cape-town-joanesburgo.webp",
  },
  {
    id: "piquenique-stellenbosch",
    title: "Piquenique entre os vinhedos de Stellenbosch",
    // Texto e destino corrigidos: estavam trocados com o voo interno.
    description:
      "Uma cesta, uma manta e vinhedos a perder de vista. Um dia lento, só nosso.",
    destination: "cape-town",
    priceCents: 650_00,
    quantity: 5,
    image: "/images/presentes/piquenique-stellenbosch.webp",
  },
  {
    id: "aluguel-de-carro",
    title: "Aluguel de carro em Cape Town",
    description:
      "Estrada livre pela costa, janelas abertas e a Table Mountain no retrovisor.",
    destination: "transporte",
    priceCents: 700_00,
    quantity: 5,
    image: "/images/presentes/aluguel-de-carro.webp",
  },
  {
    id: "queijos-e-vinhos",
    title: "Degustação de queijos e vinhos",
    // Texto novo: a planilha trazia o texto de um dia de descanso.
    description:
      "Queijos, bons vinhos e as montanhas de Cape Winelands de cenário. Saúde a nós dois!",
    destination: "cape-town",
    priceCents: 750_00,
    quantity: 5,
    image: "/images/presentes/queijos-e-vinhos.webp",
  },
  {
    id: "wine-tram-franschhoek",
    title: "Wine Tram: passeio entre vinícolas em Franschhoek",
    description:
      "Passear entre vinícolas brindando ao casamento. Um brinde com a sua assinatura.",
    destination: "cape-town",
    priceCents: 800_00,
    quantity: 4,
    image: "/images/presentes/wine-tram-franschhoek.webp",
  },
  {
    id: "jantar-boma",
    title: "Jantar boma sob as estrelas",
    description:
      "Jantar ao redor da fogueira, sob um céu sem fim. Uma noite de histórias e brindes.",
    destination: "safari",
    priceCents: 850_00,
    quantity: 4,
    image: "/images/presentes/jantar-boma.webp",
  },
  {
    id: "safari-big-5",
    title: "Safári em busca do Big 5",
    // Texto novo: a planilha trazia o texto de uma caminhada no bush.
    description:
      "Leão, leopardo, elefante, búfalo e rinoceronte: sair em busca dos cinco grandes da savana.",
    destination: "safari",
    priceCents: 1000_00,
    quantity: 8,
    image: "/images/presentes/safari-big-5.webp",
  },
  {
    id: "jantar-table-mountain",
    title: "Jantar à luz de velas com vista para a Table Mountain",
    description:
      "Nosso primeiro grande jantar de casados, com a Table Mountain de testemunha.",
    destination: "cape-town",
    priceCents: 1100_00,
    quantity: 4,
    image: "/images/presentes/jantar-table-mountain.webp",
  },
  {
    id: "alvorada-no-safari",
    title: "Alvorada no safári (game drive privativo)",
    description:
      "Ver o bush acordar com os animais ao nascer do sol, com guia só para nós dois.",
    destination: "safari",
    priceCents: 1200_00,
    quantity: 4,
    image: "/images/presentes/alvorada-no-safari.webp",
  },
  {
    id: "barco-camps-bay",
    title: "Barco ao pôr do sol em Camps Bay",
    description:
      "Navegar vendo o céu mudar de cor. Um momento para guardar para sempre.",
    destination: "cape-town",
    priceCents: 1300_00,
    quantity: 3,
    image: "/images/presentes/barco-camps-bay.webp",
  },
  {
    id: "cape-point-pinguins",
    title: "Cape Point e pinguins com motorista privativo",
    description:
      "Um dia só nosso, de carro particular, entre penhascos e pinguins.",
    destination: "cape-town",
    priceCents: 1400_00,
    quantity: 3,
    image: "/images/presentes/cape-point-pinguins.webp",
  },
  {
    id: "jantar-pes-na-areia",
    title: "Jantar com os pés na areia",
    // Texto novo: a planilha trazia o texto de um passeio de barco.
    description:
      "Mesa posta na praia, velas acesas e o barulho do mar de trilha sonora.",
    destination: "ilha",
    priceCents: 1500_00,
    quantity: 2,
    image: "/images/presentes/jantar-pes-na-areia.webp",
  },
  {
    id: "voo-para-a-ilha",
    title: "Voo para a ilha (passagem de um de nós)",
    description:
      "O voo que nos leva do safári até o mar. Com a sua ajuda, a gente chega lá.",
    destination: "transporte",
    priceCents: 1600_00,
    quantity: 2,
    image: "/images/presentes/voo-para-a-ilha.webp",
  },
  {
    id: "voo-de-balao",
    title: "Voo de balão ao amanhecer",
    description:
      "Flutuar sobre a savana ao amanhecer. Uma lembrança que nenhum de nós vai esquecer.",
    destination: "safari",
    priceCents: 1750_00,
    quantity: 2,
    image: "/images/presentes/voo-de-balao.webp",
  },
  {
    id: "noite-no-lodge",
    title: "Uma noite no lodge de safári (suíte com varanda)",
    description:
      "Dormir no meio da savana, com varanda e céu estrelado. Uma noite com o seu nome.",
    destination: "safari",
    priceCents: 2000_00,
    quantity: 2,
    image: "/images/presentes/noite-no-lodge.webp",
  },
  {
    id: "noite-no-resort",
    title: "Uma noite no resort (suíte de frente para o mar)",
    description:
      "Acordar com o mar na porta do quarto. Uma noite que leva o seu carinho.",
    destination: "ilha",
    priceCents: 2500_00,
    quantity: 2,
    image: "/images/presentes/noite-no-resort.webp",
  },
];

// "Cota livre: o convidado escolhe o valor (de R$ 200 a R$ 2.000). Não entra
// no total acima." — nota de rodapé da mesma planilha.
export const freeGift = {
  id: "cota-livre",
  title: "Cota livre",
  description:
    "Prefere escolher o valor? Ele vai direto para o nosso fundo da lua de mel.",
  minCents: 200_00,
  maxCents: 2000_00,
};

// Seleção exibida no carrossel da home: uma mistura de destinos e faixas de
// valor. A lista completa fica em /presentes.
export const featuredGiftIds = [
  "por-do-sol-lions-head",
  "ceu-estrelado-safari",
  "snorkel-tartarugas",
  "wine-tram-franschhoek",
  "safari-big-5",
  "cape-point-pinguins",
  "voo-de-balao",
  "noite-no-resort",
];

export function findGift(id: string): Gift | undefined {
  return gifts.find((gift) => gift.id === id);
}
