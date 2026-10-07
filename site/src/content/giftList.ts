// Lista de presentes da lua de mel, transcrita de site/lista-presentes.xlsx
// (aba "Lista de Presentes", enviada pelos noivos em out/2026). As fotos
// vieram das abas "1"…"20" da mesma planilha, uma por presente, convertidas
// para WebP em public/images/presentes/.
//
// A pedido da noiva (out/2026): sem destino, sem descrição e sem cota livre.
// As cotas são só controle interno — o convidado não vê quantas restam; o
// presente some da lista quando todas as cotas são escolhidas.

// Taxa do Stripe repassada no valor de todos os presentes, inclusive no Pix
// (decisão dos noivos, out/2026), com os centavos exatos — sem arredondar
// (SITE_v4): R$ 200 → R$ 210,00, R$ 275 → R$ 288,75.
const STRIPE_FEE_PERCENT = 5;

function withStripeFee(baseCents: number): number {
  return Math.round((baseCents * (100 + STRIPE_FEE_PERCENT)) / 100);
}

type GiftEntry = {
  id: string;
  title: string;
  /** Valor da cota na planilha, em centavos, antes da taxa. */
  basePriceCents?: number;
  /** Valor final já com a taxa, quando os noivos enviaram assim (SITE_v4). */
  priceCents?: number;
  /** Nº de cotas (coluna "Nº de presentes disponíveis") — controle interno, não exibido. */
  quantity: number;
  image: string;
};

export type Gift = GiftEntry & {
  /** Valor cobrado do convidado (base + taxa), compatível com o unit_amount do Stripe. */
  priceCents: number;
};

const giftEntries: GiftEntry[] = [
  {
    id: "brinde-chegada-africa-do-sul",
    title: "Brinde romântico de chegada à África do Sul",
    priceCents: 168_50,
    quantity: 5,
    image: "/images/presentes/brinde-chegada-africa-do-sul.webp",
  },
  {
    id: "por-do-sol-lions-head",
    title: "Pôr do sol no Lion's Head",
    basePriceCents: 200_00,
    quantity: 6,
    image: "/images/presentes/por-do-sol-lions-head.webp",
  },
  {
    id: "ceu-estrelado-safari",
    title: "Noite de céu estrelado na reserva do safári",
    basePriceCents: 275_00,
    quantity: 6,
    image: "/images/presentes/ceu-estrelado-safari.webp",
  },
  {
    id: "teleferico-cape-town",
    title: "Teleférico em Cape Town",
    priceCents: 346_50,
    quantity: 5,
    image: "/images/presentes/teleferico-cape-town.webp",
  },
  {
    id: "cafe-da-manha-na-cama",
    title: "Café da manhã na cama com vista para o mar",
    basePriceCents: 400_00,
    quantity: 5,
    image: "/images/presentes/cafe-da-manha-na-cama.webp",
  },
  {
    id: "snorkel-tartarugas",
    title: "Snorkel com tartarugas e peixes",
    basePriceCents: 500_00,
    quantity: 5,
    image: "/images/presentes/snorkel-tartarugas.webp",
  },
  {
    id: "voo-cape-town-joanesburgo",
    title: "Voo interno: Cape Town para Joanesburgo (passagem de um de nós)",
    basePriceCents: 550_00,
    quantity: 5,
    image: "/images/presentes/voo-cape-town-joanesburgo.webp",
  },
  {
    id: "piquenique-stellenbosch",
    title: "Piquenique entre os vinhedos de Stellenbosch",
    basePriceCents: 650_00,
    quantity: 5,
    image: "/images/presentes/piquenique-stellenbosch.webp",
  },
  {
    id: "aluguel-de-carro",
    title: "Aluguel de carro em Cape Town",
    basePriceCents: 700_00,
    quantity: 5,
    image: "/images/presentes/aluguel-de-carro.webp",
  },
  {
    id: "queijos-e-vinhos",
    title: "Degustação de queijos e vinhos",
    basePriceCents: 750_00,
    quantity: 5,
    image: "/images/presentes/queijos-e-vinhos.webp",
  },
  {
    id: "wine-tram-franschhoek",
    title: "Wine Tram: passeio entre vinícolas em Franschhoek",
    basePriceCents: 800_00,
    quantity: 4,
    image: "/images/presentes/wine-tram-franschhoek.webp",
  },
  {
    id: "jantar-boma",
    title: "Jantar boma sob as estrelas",
    basePriceCents: 850_00,
    quantity: 4,
    image: "/images/presentes/jantar-boma.webp",
  },
  {
    id: "safari-big-5",
    title: "Safári em busca do Big 5",
    basePriceCents: 1000_00,
    quantity: 8,
    image: "/images/presentes/safari-big-5.webp",
  },
  {
    id: "jantar-table-mountain",
    title: "Jantar à luz de velas com vista para a Table Mountain",
    basePriceCents: 1100_00,
    quantity: 4,
    image: "/images/presentes/jantar-table-mountain.webp",
  },
  {
    id: "alvorada-no-safari",
    title: "Alvorada no safári (game drive privativo)",
    basePriceCents: 1200_00,
    quantity: 4,
    image: "/images/presentes/alvorada-no-safari.webp",
  },
  {
    id: "barco-camps-bay",
    title: "Barco ao pôr do sol em Camps Bay",
    basePriceCents: 1300_00,
    quantity: 3,
    image: "/images/presentes/barco-camps-bay.webp",
  },
  {
    id: "cape-point-pinguins",
    title: "Cape Point e pinguins com motorista privativo",
    basePriceCents: 1400_00,
    quantity: 3,
    image: "/images/presentes/cape-point-pinguins.webp",
  },
  {
    id: "jantar-pes-na-areia",
    title: "Jantar com os pés na areia",
    basePriceCents: 1500_00,
    quantity: 2,
    image: "/images/presentes/jantar-pes-na-areia.webp",
  },
  {
    id: "voo-para-a-ilha",
    title: "Voo para a ilha (passagem de um de nós)",
    basePriceCents: 1600_00,
    quantity: 2,
    image: "/images/presentes/voo-para-a-ilha.webp",
  },
  {
    id: "voo-de-balao",
    title: "Voo de balão ao amanhecer",
    basePriceCents: 1750_00,
    quantity: 2,
    image: "/images/presentes/voo-de-balao.webp",
  },
  {
    id: "aluguel-de-carro-aventuras",
    title: "Aluguel de carro para as aventuras",
    priceCents: 1995_00,
    quantity: 2,
    image: "/images/presentes/aluguel-de-carro-aventuras.webp",
  },
  {
    id: "noite-no-lodge",
    title: "Uma noite no lodge de safári (suíte com varanda)",
    basePriceCents: 2000_00,
    quantity: 2,
    image: "/images/presentes/noite-no-lodge.webp",
  },
  {
    id: "noite-no-resort",
    title: "Uma noite no resort (suíte de frente para o mar)",
    basePriceCents: 2500_00,
    quantity: 2,
    image: "/images/presentes/noite-no-resort.webp",
  },
  {
    id: "passeio-barco-privativo",
    title: "Passeio de barco privativo",
    priceCents: 3150_00,
    quantity: 2,
    image: "/images/presentes/passeio-barco-privativo.webp",
  },
];

export const gifts: Gift[] = giftEntries.map((gift) => ({
  ...gift,
  priceCents: gift.priceCents ?? withStripeFee(gift.basePriceCents ?? 0),
}));

// Seleção exibida primeiro no carrossel da home: uma mistura de destinos e
// faixas de valor. A lista completa fica em /presentes.
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

/** O que vai para o navegador: sem `quantity`, para as cotas não vazarem nem no HTML. */
export type PublicGift = Omit<Gift, "quantity" | "basePriceCents">;

function toPublic(gift: Gift): PublicGift {
  return { id: gift.id, title: gift.title, priceCents: gift.priceCents, image: gift.image };
}

/** Presentes que ainda têm cota — os esgotados somem da lista. */
export function availableGifts(takenQuotas: Record<string, number>): PublicGift[] {
  return gifts
    .filter((gift) => (takenQuotas[gift.id] ?? 0) < gift.quantity)
    .map(toPublic);
}

const CAROUSEL_SIZE = 8;

/** Destaques disponíveis primeiro, completados com outros presentes se algum esgotar. */
export function carouselGifts(takenQuotas: Record<string, number>): PublicGift[] {
  const available = availableGifts(takenQuotas);
  const featured = available.filter((gift) => featuredGiftIds.includes(gift.id));
  const others = available.filter((gift) => !featuredGiftIds.includes(gift.id));
  return [...featured, ...others].slice(0, CAROUSEL_SIZE);
}
