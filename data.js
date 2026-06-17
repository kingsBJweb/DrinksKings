// ════════════════════════════════════════════════════
//  DRINKS KINGS — data.js
//  Base de dados de drinks e datas especiais
// ════════════════════════════════════════════════════

export const DRINKS = [
  {
    id: "margarita",
    name: "Margarita",
    emoji: "🍹",
    description: "Clássico mexicano com tequila, limão e sal na borda.",
    alcoholLevel: "med",
    alcoholLabel: "Médio · ~15%",
    category: "Clássico",
    ingredients: [
      "60ml de tequila prata",
      "30ml de Cointreau ou Triple Sec",
      "30ml de suco de limão fresco",
      "Sal para a borda do copo",
      "Gelo",
      "Fatia de limão para decorar"
    ],
    steps: [
      "Passe a fatia de limão na borda do copo e mergulhe no sal.",
      "Numa coqueteleira com gelo, coloque a tequila, Cointreau e suco de limão.",
      "Agite por 15 segundos com força.",
      "Coe para o copo preparado com gelo.",
      "Decore com a fatia de limão e sirva imediatamente."
    ],
    tip: "💡 Use limão tahiti recém-espremido — nunca suco de caixinha. O segredo está na acidez natural."
  },
  {
    id: "old-fashioned",
    name: "Old Fashioned",
    emoji: "🥃",
    description: "O mais nobre dos clássicos. Bourbon, açúcar e bitters.",
    alcoholLevel: "high",
    alcoholLabel: "Alto · ~35%",
    category: "Clássico",
    ingredients: [
      "60ml de bourbon ou whiskey rye",
      "1 cubo de açúcar (ou 5ml de xarope de açúcar)",
      "3 dashes de Angostura Bitters",
      "Splash de água com gás",
      "1 twist de laranja",
      "1 cereja marrasquino"
    ],
    steps: [
      "Coloque o cubo de açúcar no copo e adicione os bitters.",
      "Amasse suavemente o açúcar com um pouquinho de água.",
      "Adicione o bourbon e dois cubos de gelo grandes.",
      "Mexa lentamente por 30 segundos — não agite.",
      "Expresse o twist de laranja sobre a superfície e use como decoração.",
      "Finalize com a cereja."
    ],
    tip: "💡 Mexa, nunca chacoalhe. O Old Fashioned é sobre textura sedosa — agitação mata a bebida."
  },
  {
    id: "caipirinha",
    name: "Caipirinha",
    emoji: "🍋",
    description: "A rainha brasileira. Cachaça artesanal, limão e açúcar.",
    alcoholLevel: "med",
    alcoholLabel: "Médio · ~18%",
    category: "Brasileiro",
    ingredients: [
      "60ml de cachaça artesanal",
      "1 limão taiti cortado em 8 partes",
      "2 colheres de sopa de açúcar cristal",
      "Gelo picado"
    ],
    steps: [
      "Coloque o limão cortado no copo e adicione o açúcar.",
      "Macere com força por 20-30 segundos, extraindo bem o suco e os óleos essenciais da casca.",
      "Adicione gelo picado até a borda.",
      "Despeje a cachaça e misture bem com uma colher longa.",
      "Sirva com canudão."
    ],
    tip: "💡 Macere as cascas — elas contêm óleos aromáticos essenciais. Uma cachaça envelhecida em madeira eleva muito o resultado."
  },
  {
    id: "mojito",
    name: "Mojito",
    emoji: "🌿",
    description: "Cuba clássica: rum branco, hortelã fresca e limão.",
    alcoholLevel: "low",
    alcoholLabel: "Baixo · ~10%",
    category: "Refrescante",
    ingredients: [
      "50ml de rum branco",
      "30ml de suco de limão fresco",
      "20ml de xarope de açúcar simples",
      "8–10 folhas de hortelã fresca",
      "Água com gás bem gelada",
      "Gelo",
      "Ramo de hortelã e fatia de limão para decorar"
    ],
    steps: [
      "Coloque a hortelã e o xarope de açúcar no copo.",
      "Macere levemente — apenas para liberar os aromas, sem rasgar as folhas.",
      "Adicione o suco de limão e o rum.",
      "Encha o copo com gelo.",
      "Complete com água com gás e mexa suavemente.",
      "Decore com ramo de hortelã e fatia de limão."
    ],
    tip: "💡 Macere a hortelã levemente, não a destrua. Folhas rasgadas ficam amargas e arruínam o drink."
  },
  {
    id: "negroni",
    name: "Negroni",
    emoji: "🍊",
    description: "Trio perfeito italiano: gin, Campari e vermute doce.",
    alcoholLevel: "high",
    alcoholLabel: "Alto · ~28%",
    category: "Aperitivo",
    ingredients: [
      "30ml de gin London Dry",
      "30ml de Campari",
      "30ml de vermute rosso (doce)",
      "1 twist de laranja",
      "1 cubo de gelo grande"
    ],
    steps: [
      "Combine gin, Campari e vermute numa mixing glass com gelo.",
      "Mexa por 30 segundos — o objetivo é dilatar e resfriar sem aeração.",
      "Coe para um copo rocks com um cubo grande de gelo.",
      "Expresse o twist de laranja sobre a superfície.",
      "Coloque o twist no copo como decoração."
    ],
    tip: "💡 Proporções iguais de 1:1:1 são a lei. Não substitua o vermute por outro ingrediente — o equilíbrio é tudo."
  },
  {
    id: "aperol-spritz",
    name: "Aperol Spritz",
    emoji: "🫧",
    description: "Efervescente italiano perfeito para o happy hour.",
    alcoholLevel: "low",
    alcoholLabel: "Baixo · ~8%",
    category: "Refrescante",
    ingredients: [
      "90ml de Prosecco bem gelado",
      "60ml de Aperol",
      "30ml de água com gás",
      "Fatias de laranja",
      "Azeitona verde (opcional)",
      "Gelo"
    ],
    steps: [
      "Encha uma taça de vinho com gelo generosamente.",
      "Adicione o Prosecco.",
      "Adicione o Aperol.",
      "Finalize com um toque de água com gás.",
      "Mexa suavemente apenas uma vez.",
      "Decore com fatias de laranja e azeitona."
    ],
    tip: "💡 A ordem importa: primeiro o Prosecco, depois o Aperol. Evita que o Aperol afunde e mantém a leveza."
  },
  {
    id: "pina-colada",
    name: "Piña Colada",
    emoji: "🍍",
    description: "Tropical cremoso com rum, coco e abacaxi.",
    alcoholLevel: "med",
    alcoholLabel: "Médio · ~14%",
    category: "Tropical",
    ingredients: [
      "60ml de rum branco ou dourado",
      "90ml de suco de abacaxi",
      "60ml de creme de coco",
      "Abacaxi e cereja para decorar",
      "Gelo (bastante)"
    ],
    steps: [
      "Coloque o rum, suco de abacaxi e creme de coco no liquidificador.",
      "Adicione 1 xícara de gelo.",
      "Bata por 30 segundos até ficar cremoso e uniforme.",
      "Despeje num copo alto ou numa taça.",
      "Decore com abacaxi, cereja e canudão."
    ],
    tip: "💡 Use creme de coco (não leite de coco) para a textura cremosa característica. A diferença é enorme."
  },
  {
    id: "moscow-mule",
    name: "Moscow Mule",
    emoji: "🫚",
    description: "Refrescante e picante: vodka, gengibre e limão.",
    alcoholLevel: "med",
    alcoholLabel: "Médio · ~12%",
    category: "Refrescante",
    ingredients: [
      "60ml de vodka premium",
      "120ml de cerveja de gengibre (ginger beer)",
      "20ml de suco de limão fresco",
      "Ramo de hortelã",
      "Fatia de limão",
      "Gelo"
    ],
    steps: [
      "Encha um copo de cobre (ou copo alto) com gelo.",
      "Adicione a vodka e o suco de limão.",
      "Complete com ginger beer gelada.",
      "Mexa delicadamente apenas uma vez.",
      "Decore com ramo de hortelã e fatia de limão."
    ],
    tip: "💡 O copo de cobre não é só estética — ele mantém o drink mais frio por mais tempo. Vale o investimento."
  }
];

export const SPECIAL_DATES = [
  {
    id: "valentines",
    icon: "💕",
    name: "Dia dos Namorados",
    date: "12 de Junho",
    drinks: [
      { id: "cosmopolitan", emoji: "🍸", name: "Cosmopolitan" },
      { id: "french-75",    emoji: "🥂", name: "French 75" },
      { id: "kir-royale",   emoji: "💜", name: "Kir Royale" }
    ]
  },
  {
    id: "sao-joao",
    icon: "🎉",
    name: "São João",
    date: "24 de Junho",
    drinks: [
      { id: "quentao",    emoji: "🔥", name: "Quentão" },
      { id: "caipirinha", emoji: "🍋", name: "Caipirinha de Maracujá" },
      { id: "licor-jaca", emoji: "🫙", name: "Licor de Jaca" }
    ]
  },
  {
    id: "carnaval",
    icon: "🎭",
    name: "Carnaval",
    date: "Fevereiro / Março",
    drinks: [
      { id: "caipirinha",    emoji: "🍋", name: "Caipirinha Clássica" },
      { id: "mojito",        emoji: "🌿", name: "Mojito" },
      { id: "aperol-spritz", emoji: "🫧", name: "Aperol Spritz" }
    ]
  },
  {
    id: "ano-novo",
    icon: "🎆",
    name: "Ano Novo",
    date: "31 de Dezembro",
    drinks: [
      { id: "champagne",   emoji: "🥂", name: "Champagne" },
      { id: "negroni",     emoji: "🍊", name: "Negroni" },
      { id: "old-fashioned", emoji: "🥃", name: "Old Fashioned" }
    ]
  }
];
