// Conteúdo do site — vem do backlog capturado no grupo de WhatsApp dos noivos
// (ver ../../../planning/ e as issues do repositório). Seções marcadas como
// "em-breve" aguardam material dos noivos (arte, horários, fotos) — ver a
// referência de issue de cada uma.

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
  label: string;
  status: "confirmado" | "em-breve";
  note: string;
};

// Issue #6 — confirmados os 3 dias de celebração, horários/atividades ainda não vieram.
export const schedule: ScheduleDay[] = [
  {
    day: 1,
    label: "Dia 1",
    status: "em-breve",
    note: "Programação em breve — aguardando horários e atividades.",
  },
  {
    day: 2,
    label: "Dia 2",
    status: "em-breve",
    note: "Programação em breve — aguardando horários e atividades.",
  },
  {
    day: 3,
    label: "Dia 3",
    status: "em-breve",
    note: "Programação em breve — aguardando horários e atividades.",
  },
];

export const scheduleIssueUrl =
  "https://github.com/pedroforadori/wedding-camilaevictoremmilagres/issues/6";

// Issue #4 — guia de vestimenta por evento, ilustrado com aquarelas que a Camila
// ainda está produzindo.
export const dressCode = {
  status: "em-breve" as const,
  note: "A Camila está preparando aquarelas com sugestões de roupa para cada um dos três dias — assim que chegarem, aparecem aqui ao lado da programação de cada evento.",
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
