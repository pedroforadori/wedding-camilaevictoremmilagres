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
  // Textos do hero, no formato do save-the-date enviado pelos noivos.
  dateRangeLabel: "09 a 12 de Outubro de 2027",
  cityStateLabel: "São Miguel dos Milagres - AL",
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
  time?: string;
  venue?: string;
  location?: string;
  // Texto livre (ex.: dia de folga), usado no lugar do bloco de traje.
  description?: string[];
  dressCode?: string;
  dressNotes?: string[];
};

// Programação definitiva enviada pelos noivos (briefing de set/2026).
export const schedule: ScheduleDay[] = [
  {
    day: 1,
    date: "09.10.2027",
    title: "Welcome Drinks",
    time: "18h",
    venue: "Orla Villas Milagres",
    dressCode: "Roupa Branca",
    dressNotes: [
      "Mulheres: vestidos curtos ou longos fluídos e salto bloco ou rasteirinhas são bem-vindos.",
      "Homens: dar preferência por calças leves ou bermudas, camisas de linho e tênis.",
    ],
  },
  {
    day: 2,
    date: "10.10.2027",
    title: "Day Off",
    description: [
      "Fiquem à vontade para conhecer Milagres (ver nossas dicas)!",
      "Caso queiram passar o dia com os noivos, faremos um passeio de jangada* (horário a definir) e depois passaremos o dia na Casa Orla Villas — amaremos compartilhar esse dia com vocês!",
      "*Passeio opcional e pago individualmente pelos convidados que desejarem participar.",
    ],
  },
  {
    day: 3,
    date: "11.10.2027",
    title: "Casamento",
    time: "15h",
    venue: "Bisutti Milagres Casa Marceneiro",
    dressCode: "Social",
    dressNotes: [
      "Mulheres: recomendamos o uso de salto bloco.",
      "Homens: dispensável o uso de gravata e paletó.",
    ],
  },
];

// Issue #4 — aquarelas com sugestões de roupa por evento. Dias 1 (Welcome
// Drinks) e 3 (Casamento) têm a arte final enviada pelos noivos
// (set/2026, `public/images/traje-dia{1,3}.png`, recortadas sem fundo). O dia 2 (Day Off) não tem
// traje sugerido, então não leva ilustração.

// Issue #5 — galeria de fotos do casal, aguardando seleção deles.
export const gallery = {
  status: "em-breve" as const,
  note: "Em breve, uma seleção de fotos de Camila e Victor.",
  issueUrl:
    "https://github.com/pedroforadori/wedding-camilaevictoremmilagres/issues/5",
};

// Issue #8 — monograma e aquarela de praia enviados como referência de identidade
// visual (litoral de São Miguel dos Milagres). A aquarela já está em
// `public/images/aquarela-praia.jpg`; o monograma ainda é um placeholder.
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

export type DicaContact = {
  name?: string;
  phone?: string;
  instagram?: string;
  note?: string;
};

export type DicaItem = {
  name: string;
  detail?: string;
  address?: string;
  contacts?: DicaContact[];
};

export type DicaSection = {
  key: string;
  title: string;
  icon: { src: string; width: number; height: number };
  intro?: string;
  items: DicaItem[];
};

// Issue #11 — guia de São Miguel dos Milagres enviado pelos noivos (briefing
// set/2026). Distâncias de hospedagem são até a Capela dos Milagres / Casa
// Marceneiro Bisutti (local da cerimônia).
export const dicas = {
  title: "Dicas",
  intro:
    "Separamos algumas opções para ajudar vocês, nossos queridos convidados, a se prepararem para o grande dia.",
  guideTitle: "Guia São Miguel dos Milagres",
  warning:
    "Atenção: não há Uber em Milagres. Recomendamos aluguel de carro ou agendamento de todos os transfers com antecedência.",
  sections: [
    {
      key: "hospedagem",
      title: "Hospedagem",
      icon: { src: "/images/dica-hospedagem.png", width: 109, height: 225 },
      intro:
        "Pousadas e hotéis em São Miguel dos Milagres, com a distância até a Capela dos Milagres / Casa Marceneiro Bisutti.",
      items: [
        { name: "Nannai – antigo Tuju Boutique Hotel", detail: "450 m" },
        { name: "Pousada Haya", detail: "1 km" },
        { name: "Villa Kamby Milagres", detail: "800 m" },
        { name: "Pousada Garoupa", detail: "1,1 km" },
        { name: "Sítio Villa da Mata", detail: "1,9 km" },
        { name: "Riacho dos Milagres", detail: "2,5 km" },
        { name: "Taboo Milagres", detail: "2,9 km" },
        { name: "Naluum Residence – Casa", detail: "1,2 km" },
        { name: "Pousada Oribá Chalé Boutique", detail: "2,9 km" },
        { name: "Pousada Quadrado", detail: "1,5 km" },
        { name: "Natú Boutique Stay – Casa Pantai", detail: "3,4 km" },
        { name: "Casas Naquê", detail: "1,7 km" },
        { name: "Ocacoar", detail: "3,4 km" },
        { name: "Pousada Encanto das Águas", detail: "3,5 km" },
        { name: "Vila Chuá", detail: "2 km" },
        { name: "Paru Boutique Hotel", detail: "2,1 km" },
        { name: "Aqualuna Pousada", detail: "3,9 km" },
        { name: "Casa Camará – Casa", detail: "2,8 km" },
        { name: "Mahré Hotel e SPA", detail: "4,1 km" },
        { name: "Pousada Zaya", detail: "5,9 km" },
        { name: "Pousada do Toque", detail: "6,4 km" },
        { name: "Casa Acayu", detail: "6,6 km" },
        { name: "Pousada Wassu", detail: "7 km" },
        { name: "Pousada Mirai", detail: "5,1 km" },
        { name: "Villas Taturé", detail: "5,7 km" },
        { name: "Pousada La Vita", detail: "7,1 km" },
        { name: "Sítio Peixe do Mato", detail: "7,1 km" },
        { name: "Nauru", detail: "7,4 km" },
        { name: "Portuá Chalés", detail: "7,7 km" },
        { name: "Pousada Villa Italiana", detail: "7,9 km" },
        { name: "Pousada Ricoco", detail: "7,8 km" },
        { name: "Villa Pantai Milagres", detail: "8,1 km" },
        { name: "Angá Hotel", detail: "8,3 km" },
        { name: "Aldeia Patacho", detail: "14 km" },
        { name: "Monan Boutique Hotel", detail: "14 km" },
        { name: "Reserva do Patacho", detail: "16 km" },
        { name: "Villa Canziani", detail: "16 km" },
        { name: "Pousada Patacho", detail: "17 km" },
        { name: "Samba Pa Ti", detail: "17 km" },
        { name: "Pedras do Patacho Boutique Hotel", detail: "17 km" },
        { name: "Sítio Patacho – Casa", detail: "17 km" },
      ],
    },
    {
      key: "cabeleireiro",
      title: "Cabeleireiro",
      icon: { src: "/images/dica-cabeleireiro.png", width: 192, height: 188 },
      intro:
        "Esses profissionais são de Maceió — é preciso agendar com bastante antecedência.",
      items: [
        {
          name: "Lays Marques – Espaço 172",
          contacts: [
            { phone: "(82) 99934-3798", instagram: "@lays.makeup" },
          ],
        },
        {
          name: "Pra Quê Salão",
          contacts: [
            { phone: "(82) 99988-1568", instagram: "@praquesalao" },
          ],
        },
        {
          name: "Make Up N",
          contacts: [{ phone: "(82) 99939-5644", instagram: "@makeupn" }],
        },
        {
          name: "Lua Oliveira",
          contacts: [
            { phone: "(82) 99994-6060", instagram: "@luaoliveirabeauty" },
          ],
        },
        {
          name: "Make Up Kamyla",
          contacts: [
            { phone: "(82) 99930-6542", instagram: "@makeuokamyla" },
          ],
        },
        {
          name: "Studio Camilla Barros",
          contacts: [
            { phone: "(82) 99322-1450", instagram: "@studiocamillabarros" },
          ],
        },
        {
          name: "Tânia Lucena",
          contacts: [
            { phone: "(82) 9627-8007", instagram: "@tanialucenamakeup" },
          ],
        },
        {
          name: "DeLuca",
          contacts: [{ phone: "(82) 98149-6516", instagram: "@isdeluca" }],
        },
        {
          name: "Gab Make Up",
          contacts: [
            { phone: "(82) 99928-5492", instagram: "@gabmakeuphair" },
          ],
        },
        {
          name: "Glow B Salão",
          detail:
            "Fornecedor de Milagres — não precisa agendar com tanta antecedência. Tem serviços de massagem, drenagem, produção de mulheres, homens, crianças, etc.",
          contacts: [
            { phone: "(82) 99416-9097", instagram: "@glowbservices" },
          ],
        },
      ],
    },
    {
      key: "restaurantes",
      title: "Restaurantes",
      icon: { src: "/images/dica-restaurantes.png", width: 192, height: 143 },
      items: [
        {
          name: "Restaurante Sur",
          detail: "Funciona apenas para jantar. Localizado na Pousada Quadrado.",
          contacts: [
            { phone: "(82) 99678-1687", instagram: "@restaurantesur" },
          ],
        },
        {
          name: "Tahafa",
          detail:
            "Cozinha oriental tropical. Localizado na entrada do Raizeiro dos Milagres, Rota dos Milagres.",
          contacts: [{ phone: "(82) 98161-5022" }],
        },
        {
          name: "Quintal do Zé",
          detail:
            "Massas artesanais, risotos deliciosos e uma das melhores avaliações da cidade. Ambiente acolhedor e agradável. Só funciona para jantar.",
          address: "R. Felisberto de Ataíde, 126, São Miguel dos Milagres",
          contacts: [
            { phone: "(82) 99301-8686", instagram: "@quintaldozemilagres" },
          ],
        },
        {
          name: "Jardim Secreto",
          detail:
            "Cantinho na Rota Ecológica dos Milagres que lembra casa de vó, com cheirinho de café coado e bolo fresquinho.",
          address: "AL 101, Tatuamunha, Porto de Pedras",
          contacts: [
            { phone: "(82) 99902-2120", instagram: "@jardimsecretomilagres" },
          ],
        },
        {
          name: "Delícias Alagoanas",
          detail:
            "Café da manhã e pratos executivos baratinhos para o almoço — também é uma lojinha de delícias para levar de lembrança (doces típicos, bolachas, etc.).",
          address: "Vilinha do Marceneiro",
          contacts: [{ instagram: "@deliciasalagoanas.milagres" }],
        },
        {
          name: "Enildo Restaurante",
          detail:
            "Restaurante beira-mar com comidas típicas e bastante opção de frutos do mar.",
          address: "Rua da Praia, 09, São Miguel dos Milagres — Porto da Rua",
          contacts: [{ phone: "(82) 3295-1310" }],
        },
        {
          name: "Patrícia Bistro",
          address: "Rua Eurico Marinho Leão, 37, São Miguel dos Milagres",
          contacts: [{ phone: "(82) 99175-3663" }],
        },
        {
          name: "Tapioca da Elisangela",
          detail: "A melhor tapioca de Alagoas! Patrimônio cultural alagoano.",
          address: "Vilinha do Marceneiro",
        },
        {
          name: "Restaurante Origami",
          address: "Rua Sitio Suzuki, Praia do Toque",
          contacts: [{ phone: "(82) 99963-2223" }],
        },
        {
          name: "General Bacon",
          detail:
            "Deliciosas opções de hambúrguer e pizza feita no forno à lenha.",
          address:
            "R. Luiz Ferreira Dorta, 625 — Tatuamunha, Porto de Pedras (Vila Guajá)",
          contacts: [{ instagram: "@fornariaegeneralbaconvilaguaja" }],
        },
        {
          name: "Bali Sorvetes",
          address:
            "R. Luiz Ferreira Dorta, 625 — Tatuamunha, Porto de Pedras (Vila Guajá)",
        },
        {
          name: "Massagueirinha",
          address:
            "R. Luiz Ferreira Dorta, 625 — Tatuamunha, Porto de Pedras (Vila Guajá)",
        },
        {
          name: "Tatuah Fornaria",
          detail: "Pizza no forno à lenha.",
          address: "R. Luiz Ferreira Dorta — Tatuamunha, Porto de Pedras",
          contacts: [
            { phone: "(82) 98779-2341", instagram: "@tatuahforneria" },
          ],
        },
        {
          name: "Restaurante Wassu",
          address: "Sítio Belo dos Milagres, s/n°, Praia do Toque",
          contacts: [
            { phone: "(82) 98103-1001", instagram: "@pousadawassu" },
          ],
        },
        {
          name: "Villa Italiana Ristorante",
          address: "R. Ana Marinho Braga, São Miguel dos Milagres",
          contacts: [{ phone: "(82) 99806-0051" }],
        },
        {
          name: "Banami",
          detail:
            "Localizado na Pousada Haya. Ambiente bucólico e cardápio elogiado por vários chefs.",
          contacts: [
            { phone: "(82) 99651-0404", instagram: "@pousadahaya" },
          ],
        },
        {
          name: "No Quintal",
          detail:
            "Almoço das 12h às 15h sem reservas. Jantar das 19h às 21h, somente com reservas (reservation-widget.tagme.com.br).",
          address: "Rua do Campo, s/n° — Praia do Toque",
          contacts: [
            { phone: "(82) 99910-7078", instagram: "@restaurantenoquintal" },
          ],
        },
        {
          name: "Paru Boutique Hotel",
          address: "AL 101 Norte, km 3, s/n°, Passo de Camaragibe",
          contacts: [
            {
              phone: "(82) 3258-5155 / (82) 99404-4050",
              instagram: "@paruboutiquehotel",
            },
          ],
        },
        {
          name: "Ascua Burguer",
          detail: "Por Mister Brasa. Terça a domingo, das 16h às 22h.",
          address: "Villa Buriti, Tatuamunha, Porto de Pedras",
        },
      ],
    },
    {
      key: "passeios",
      title: "Passeios",
      icon: { src: "/images/dica-passeios.png", width: 161, height: 132 },
      items: [
        {
          name: "Piscinas Naturais",
          detail:
            "As piscinas de São Miguel dos Milagres, do Toque e de Porto da Rua são grandes atrações turísticas do município. Há pescadores que, além de levar até as piscinas, fazem refeições com lagosta e peixes pescados na hora.",
          contacts: [
            { name: "Tiquinho Jangadeiro", phone: "(82) 99336-6301", note: "Embarca na Praia do Marceneiro" },
            { name: "Clebinho", phone: "(82) 99141-8124", note: "Embarca na Praia do Marceneiro" },
            { name: "Warney WA Turismo", phone: "(82) 99414-8776", note: "Embarca no Patacho" },
            { name: "Azulina Milagres", phone: "(82) 99372-0298", note: "Embarca no Patacho" },
            { name: "Fabinho", phone: "(82) 99620-7172", note: "Embarca na Praia do Riacho e Marceneiro" },
            { name: "Wellington", phone: "(82) 99123-7548", note: "Embarca na Barra de Camaragibe" },
            { name: "Tony Jangadeiro", phone: "(82) 99194-7451", note: "Embarca na Praia do Marceneiro" },
          ],
        },
        {
          name: "Passeio a Cavalo",
          detail:
            "Cavalgar à beira-mar sentindo a brisa no rosto é maravilhoso! A dica é fazer o passeio pela manhã, enquanto o sol é leve, ou ao final do dia para apreciar o pôr do sol.",
          contacts: [
            { name: "Luciano", phone: "(82) 99994-3532" },
            { name: "Reginaldo", phone: "(82) 99969-6230" },
          ],
        },
        {
          name: "Santuário do Peixe-Boi",
          detail:
            "Um turismo ecológico com direito a aventuras incríveis e, claro, uma visita ao recinto de reabilitação do peixe-boi.",
          contacts: [
            {
              name: "Associação de Observação do Peixe-Boi",
              phone: "(82) 3298-6247 / WhatsApp (82) 99810-3021",
              note: "Praça São Gonçalo, 38, Tatuamunha",
            },
          ],
        },
        {
          name: "Passeio de Buggy",
          detail:
            "Passeios de buggy pela rodovia podem levar vocês para conhecer a Praia do Patacho, a Praia da Laje, trilhas locais, fazendas e São Miguel dos Milagres.",
          contacts: [
            { name: "Jr Buggy", phone: "(82) 99178-7840" },
            { name: "Top Buggy", phone: "(82) 99391-7024" },
          ],
        },
      ],
    },
  ] satisfies DicaSection[],
};

// Item 9 do briefing (set/2026) — texto definitivo enviado pelos noivos.
// Motoristas/transfer e farmácia vieram no guia da issue #11 (item "Utilidades")
// e fazem mais sentido aqui, junto do resto da logística de chegada.
export const comoChegar = {
  title: "Como Chegar",
  intro:
    "Tudo que vocês precisam saber para chegar até São Miguel dos Milagres.",
  paragraphs: [
    "O aeroporto mais próximo é o de Maceió, o Zumbi dos Palmares. Distância até Milagres: 100 km (aproximadamente), o trajeto leva em torno de 1h30.",
    "Também é possível ir pelo aeroporto de Recife, o Gilberto Freyre. Distância até Milagres: 200 km (aproximadamente), o trajeto leva em média 3h.",
    "Importante mencionar que Milagres não possui Uber/táxi, é possível alugar carro no próprio aeroporto ou contratar um serviço de transfer.",
    "A agência do casamento é a Florea Destination (@florea_destination), que está à disposição dos convidados para auxiliar com logística e hospedagem — contato: (11) 99759-2121.",
  ],
  transferSections: [
    {
      title: "Motoristas / Transfer Maceió–Milagres",
      contacts: [
        { name: "Milagres do Patacho (Van e Carro)", phone: "(82) 9151-0278" },
        { name: "Tizio", phone: "(82) 98858-2934" },
        { name: "Babu", phone: "(82) 99108-5448" },
        { name: "Eduardo", phone: "(82) 99645-9670" },
        { name: "Israel", phone: "(82) 99132-5795" },
        { name: "Diron", phone: "(82) 99117-4182" },
        { name: "Sandro", phone: "(82) 99173-5171" },
        { name: "Kito/Jackson (Van e Carro)", phone: "(82) 99913-7790" },
      ],
    },
    {
      title: "Transfer Recife–Milagres",
      contacts: [
        { name: "Clean Service (Van e Carro)", phone: "(81) 9745-2303" },
        { name: "24h Turismo", phone: "(81) 9682-1621" },
        { name: "Silva Júnior", phone: "(81) 9828-3521" },
        { name: "Ôxe Receptivos", phone: "(81) 8333-1927" },
        { name: "Recife Transporte Executivo", phone: "(81) 9121-3122" },
      ],
    },
  ],
  farmacia: { name: "Farmácia Porto da Rua", phone: "(82) 3295-1413" },
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

// Opções literais do briefing (set/2026) — nomes coloquiais usados só no RSVP,
// diferentes dos títulos formais em `schedule` (ex.: "Welcome Drinks"/"Day Off").
export const rsvp = {
  title: "Confirmação de presença",
  intro: "Faça parte da nossa história de amor, confirme sua presença.",
  eventOptions: ["Welcome Party", "Jangaday", "Casamento"],
  declineOption: "Não poderei comparecer",
};

export const guestbook = {
  title: "Deixe sua mensagem de carinho para nós",
  intro:
    "Palavras são carinhos doados. Obrigado por nos dar o seu carinho. Iremos lembrar para sempre deste momento tão esperado.",
};

export type NavLink = { label: string; href: string };

// Nav replicada do site de referência (estudiofestiv.wixsite.com/website-19):
// menu fixo com âncoras que rolam até as seções da página única (Início,
// Programação, R.S.V.P., Dicas, Como Chegar, Presentes, Mensagens). As
// páginas que a referência não tem (Cerimônia, Festa, Chá Bar, Padrinhos,
// Galeria, Fornecedores — issue #5 e o restante da arquitetura multi-página
// anterior) ficam num item "Mais" separado, como páginas de verdade.
export const primaryNav: NavLink[] = [
  { label: "Início", href: "/#topo" },
  { label: "Programação", href: "/#programacao" },
  { label: "R.S.V.P.", href: "/#rsvp" },
  { label: "Dicas", href: "/#dicas" },
  { label: "Como Chegar", href: "/#como-chegar" },
  { label: "Presentes", href: "/#presentes" },
  { label: "Mensagens", href: "/#mensagens" },
];

export const morePages: NavLink[] = [
  { label: "Cerimônia", href: "/cerimonia" },
  { label: "Festa", href: "/festa" },
  { label: "Chá Bar", href: "/cha-bar" },
  { label: "Padrinhos", href: "/padrinhos" },
  { label: "Galeria", href: "/galeria" },
  { label: "Fornecedores", href: "/fornecedores" },
];
