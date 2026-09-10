// Conteúdo do site — combina o backlog capturado no grupo de WhatsApp dos noivos
// (ver ../../../planning/ e as issues do repositório) com o conteúdo já publicado
// pelo casal no site de referência (sites.icasei.com.br/camilaevictor/home), que
// definiu a arquitetura de páginas replicada aqui. Itens marcados como "em-breve"
// ainda não têm material (fotos, textos, listas) — ver a issue referenciada.

export const couple = {
  names: "Camila & Victor",
  initials: "CV",
};

export const wedding = {
  city: "São Miguel dos Milagres",
  state: "Alagoas",
  domain: "www.camilaevictoremmilagres.com.br",
  instagramHandle: "@camilaevictoremmilagres",
  instagramUrl: "https://www.instagram.com/camilaevictoremmilagres",
  // Data/hora do casamento (dia 3, ver `schedule`) — alvo da contagem regressiva.
  ceremonyDateTimeISO: "2027-10-11T15:00:00-03:00",
};

// Issue #3 — texto de abertura enviado pronto pelos noivos para a home page.
export const invitation = {
  heading: "Queridos amigos e familiares,",
  paragraphs: [
    "É com o coração transbordando de alegria que convidamos vocês para viver conosco um dos momentos mais especiais das nossas vidas.",
    "Nosso casamento acontecerá em São Miguel dos Milagres, cercado pela beleza do mar, brisa leve e pelo amor que nos une. Serão três dias de celebração, onde cada instante será pensado com carinho para que seja especial e inesquecível para todos nós.",
    "Preparamos este site para compartilhar com vocês todos os detalhes importantes dessa viagem: a programação, dicas úteis e tudo que vocês precisam saber para aproveitar ao máximo essa experiência.",
    "A presença de cada um de vocês tornará esse momento ainda mais completo e especial. Estamos ansiosos para celebrar, brindar e viver memórias que ficarão para sempre em nossos corações.",
    "Acompanhem todos os detalhes pelo nosso Instagram @camilaevictoremmilagres e não deixem de nos marcar em cada post, story ou vídeo, assim conseguiremos reunir todas as lembranças desses dias tão especiais e guardar cada momento com muito amor.",
  ],
  signature: "Com carinho,\nCamila e Victor.",
};

export type ScheduleDay = {
  day: number;
  date: string;
  title: string;
  time: string;
  venue: string;
  location: string;
  dressCode: string;
  dressNotes: string[];
};

// Programação real, publicada pelo casal em 2027 — substitui o placeholder
// "em breve" das issues #4 e #6, que continuavam pendentes apenas de horários.
export const schedule: ScheduleDay[] = [
  {
    day: 1,
    date: "09.10.2027",
    title: "Welcome Drinks",
    time: "18h00",
    venue: "Orla Villas",
    location: "Praia do Marceneiro - AL",
    dressCode: "Roupa branca",
    dressNotes: ["Sugerimos sapatos confortáveis"],
  },
  {
    day: 2,
    date: "10.10.2027",
    title: "Jagaday",
    time: "11h30",
    venue: "Ponto de encontro: Orla Villas",
    location: "Praia do Marceneiro - AL",
    dressCode: "Piscina / praia",
    dressNotes: ["Se possível, evitar a cor branco"],
  },
  {
    day: 3,
    date: "11.10.2027",
    title: "Casamento",
    time: "15h00",
    venue: "Casa do Marceneiro Bisutti",
    location: "São Miguel dos Milagres - AL",
    dressCode: "Social completo",
    dressNotes: [
      "Mulheres: recomendamos saltos grossos e confortáveis. Pedimos que evitem vestidos brancos ou muito claros, para preservar o destaque da noiva nesse dia único.",
      "Homens: terno completo.",
    ],
  },
];

// Issue #4 — aquarelas com sugestões de roupa por evento, que a Camila ainda está
// produzindo. O texto do traje de cada dia já está confirmado (ver `schedule`);
// só a ilustração está pendente.
export const dressCodeArt = {
  status: "em-breve" as const,
  note: "A Camila está preparando aquarelas com sugestões de roupa para cada um dos três dias — assim que chegarem, entram aqui ao lado do traje de cada evento.",
  issueUrl:
    "https://github.com/pedroforadori/wedding-camilaevictoremmilagres/issues/4",
};

// Issue #5 — galeria de fotos do casal, aguardando seleção deles.
export const gallery = {
  status: "em-breve" as const,
  note: "Em breve, uma seleção de fotos de Camila e Victor.",
  issueUrl:
    "https://github.com/pedroforadori/wedding-camilaevictoremmilagres/issues/5",
};

// Issue #8 — monograma e aquarela de praia enviados como referência de identidade
// visual (litoral de São Miguel dos Milagres). Arquivos originais em PDF ainda não
// estão neste repositório — a paleta e o estilo abaixo são uma aproximação.
export const visualIdentityIssueUrl =
  "https://github.com/pedroforadori/wedding-camilaevictoremmilagres/issues/8";

export type SimplePage = {
  title: string;
  intro: string;
  note: string;
  issueUrl: string;
};

const placesIssueUrl =
  "https://github.com/pedroforadori/wedding-camilaevictoremmilagres/issues/10";

// Páginas de local/apoio replicadas da arquitetura do site de referência.
// O casal ainda não enviou fotos/mapas/textos finais para nenhuma — o texto de
// abertura é um placeholder no tom do convite, para não deixar a página vazia.
export const cerimonia: SimplePage = {
  title: "Cerimônia",
  intro:
    "Não percam nossa linda e emocionante cerimônia. Contamos com vocês para tornar esse dia ainda mais especial!",
  note: "Fotos e detalhes do local entram aqui assim que os noivos enviarem.",
  issueUrl: placesIssueUrl,
};

export const festa: SimplePage = {
  title: "Festa",
  intro:
    "Com muita alegria no coração, convidamos vocês para compartilharem conosco este dia tão especial. Mal podemos esperar para celebrar o amor com todos vocês e criar memórias incríveis juntos!",
  note: "Fotos e detalhes do local entram aqui assim que os noivos enviarem.",
  issueUrl: placesIssueUrl,
};

export const chaBar: SimplePage = {
  title: "Chá Bar",
  intro:
    "As comemorações já começaram e nada melhor do que compartilhar risadas e bons momentos com quem amamos. Venham brindar, celebrar, se divertir muito e fazer desse dia algo ainda mais especial!",
  note: "Fotos e detalhes do local entram aqui assim que os noivos enviarem.",
  issueUrl: placesIssueUrl,
};

export const dicas: SimplePage = {
  title: "Dicas",
  intro:
    "Separamos algumas opções para ajudar vocês, nossos queridos convidados, a se prepararem para o grande dia.",
  note: "Dicas de hospedagem, transporte e clima entram aqui assim que os noivos enviarem.",
  issueUrl:
    "https://github.com/pedroforadori/wedding-camilaevictoremmilagres/issues/11",
};

export const padrinhos = {
  title: "Padrinhos",
  intro: "Nossa singela homenagem aos padrinhos de casamento.",
  status: "em-breve" as const,
  note: "Lista e fotos dos padrinhos ainda não foram enviadas pelos noivos.",
  issueUrl:
    "https://github.com/pedroforadori/wedding-camilaevictoremmilagres/issues/12",
};

export const presentes = {
  title: "Lista de casamento virtual",
  intro: "Aqui vocês poderão encontrar nossa lista de presentes. Obrigado pelos mimos!",
  status: "em-breve" as const,
  note: "A lista de presentes ainda não foi configurada pelos noivos.",
  issueUrl:
    "https://github.com/pedroforadori/wedding-camilaevictoremmilagres/issues/13",
};

export const fornecedores = {
  title: "Fornecedores",
  intro:
    "Aqueles que nos deram uma forcinha para que esse sonho se tornasse realidade, fazemos questão de lembrar e indicar!",
  status: "em-breve" as const,
  note: "A lista de fornecedores ainda não foi enviada pelos noivos.",
  issueUrl:
    "https://github.com/pedroforadori/wedding-camilaevictoremmilagres/issues/14",
};

export const rsvp = {
  title: "Confirmação de presença",
  intro: "Faça parte da nossa história de amor, confirme sua presença.",
  eventLabel: "Casamento",
};

export const guestbook = {
  title: "Deixe sua mensagem de carinho para nós",
  intro:
    "Palavras são carinhos doados. Obrigado por nos dar o seu carinho. Iremos lembrar para sempre deste momento tão esperado.",
};

export type NavLink = { label: string; href: string };
export type NavGroup = { label: string; links: NavLink[] };

// Estrutura de navegação replicada do menu do site de referência (dropdowns
// "Páginas" / "Presentes" / "Confirmar Presença"), com a Galeria adicionada em
// "Páginas" a pedido explícito dos noivos (issue #5) — o site de referência
// ainda não tem uma página de galeria própria.
export const navigation: NavGroup[] = [
  {
    label: "Páginas",
    links: [
      { label: "Página Inicial", href: "/" },
      { label: "Programação", href: "/programacao" },
      { label: "Cerimônia", href: "/cerimonia" },
      { label: "Festa", href: "/festa" },
      { label: "Chá Bar", href: "/cha-bar" },
      { label: "Dicas", href: "/dicas" },
      { label: "Padrinhos", href: "/padrinhos" },
      { label: "Galeria", href: "/galeria" },
      { label: "Mensagens", href: "/mensagens" },
      { label: "Fornecedores", href: "/fornecedores" },
    ],
  },
  {
    label: "Presentes",
    links: [{ label: "Lista de casamento virtual", href: "/presentes" }],
  },
  {
    label: "Confirmar Presença",
    links: [{ label: "Casamento", href: "/confirmar-presenca" }],
  },
];
