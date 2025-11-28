// src/lib/constants/products.ts

export type ToppingOption = {
  id: string
  name: string
  priceDiff?: number // se quiser cobrar adicional em algum item
}

export type ToppingGroup = {
  id: string
  name: string
  description?: string
  min: number
  max: number
  options: ToppingOption[]
}

export type ProductCategoryId =
  | "PROMO_PAGUE_1_LEVE_2"
  | "ZERO_ACUCAR"
  | "ACAI_TRADICIONAL"
  | "ESPECIAIS"

export type Product = {
  id: string
  name: string
  description?: string
  categoryId: ProductCategoryId
  price: number
  promoPrice?: number
  volumeMl?: number
  isZeroSugar?: boolean
  isCombo?: boolean
  imageUrl?: string
  badge?: string
  toppingGroups?: ToppingGroup[]
}

export const PRODUCT_CATEGORIES: { id: ProductCategoryId; label: string }[] = [
  { id: "PROMO_PAGUE_1_LEVE_2", label: "Pague 1, leve 2" },
  { id: "ZERO_ACUCAR", label: "Zero açúcar" },
  { id: "ACAI_TRADICIONAL", label: "Açaí tradicional" },
  { id: "ESPECIAIS", label: "Especiais" },
]

// grupos padrão tipo Nativa Açaí: coberturas, frutas, complementos, adicional
const BASE_TOPPING_GROUPS: ToppingGroup[] = [
  {
    id: "coberturas",
    name: "Coberturas",
    description: "Escolha até 2 coberturas",
    min: 0,
    max: 2,
    options: [
      { id: "cob-amora", name: "Cobertura Amora" },
      { id: "cob-caramelo", name: "Cobertura Caramelo" },
      { id: "cob-chocolate", name: "Cobertura Chocolate" },
      { id: "cob-leite-condensado", name: "Cobertura Leite condensado" },
      { id: "cob-maracuja", name: "Cobertura Maracujá" },
      { id: "cob-mel", name: "Cobertura Mel" },
      { id: "cob-menta", name: "Cobertura Menta" },
      { id: "cob-morango", name: "Cobertura Morango" },
    ],
  },
  {
    id: "frutas",
    name: "Frutas",
    description: "Escolha até 2 frutas",
    min: 0,
    max: 2,
    options: [
      { id: "fru-abacaxi", name: "Abacaxi" },
      { id: "fru-banana", name: "Banana" },
      { id: "fru-kiwi", name: "Kiwi" },
      { id: "fru-manga", name: "Manga" },
      { id: "fru-morango", name: "Morango" },
      { id: "fru-uva", name: "Uva" },
    ],
  },
  {
    id: "complementos",
    name: "Complementos",
    description: "Escolha até 4 complementos",
    min: 0,
    max: 4,
    options: [
      { id: "comp-amendoim", name: "Amendoim" },
      { id: "comp-aveia", name: "Aveia" },
      { id: "comp-castanha-caju", name: "Castanha de caju" },
      { id: "comp-chocoball", name: "Chocoball" },
      { id: "comp-confete", name: "Confete" },
      { id: "comp-creme-banana", name: "Creme de banana" },
      { id: "comp-creme-maracuja", name: "Creme de mousse de maracujá" },
      { id: "comp-creme-morango", name: "Creme de morango" },
      { id: "comp-farinha-cereais", name: "Farinha de cereais" },
      { id: "comp-gotas-chocolate", name: "Gotas de chocolate" },
      { id: "comp-granola", name: "Granola" },
      { id: "comp-leite-po", name: "Leite em pó" },
      { id: "comp-ovomaltine", name: "Ovomaltine" },
      { id: "comp-pacoca", name: "Paçoca" },
      { id: "comp-sucrilhos", name: "Sucrilhos" },
    ],
  },
  {
    id: "adicional-gratis",
    name: "Adicional gratuito",
    description: "Escolha 1 adicional grátis (1º pedido, se quiser usar como gatilho)",
    min: 0,
    max: 1,
    options: [
      { id: "add-bis", name: "Bis (3 un) – Grátis 1º pedido" },
      { id: "add-chantilly", name: "Chantilly – Grátis 1º pedido" },
      { id: "add-nutella", name: "Nutella – Grátis 1º pedido" },
      { id: "add-sorvete", name: "1 bola de sorvete de creme – Grátis 1º pedido" },
      { id: "add-creme-ninho", name: "Creme de Ninho – Grátis 1º pedido" },
      { id: "add-creme-oreo", name: "Creme de Oreo – Grátis 1º pedido" },
      { id: "add-kitkat", name: "KitKat – Grátis 1º pedido" },
    ],
  },
]

export const PRODUCTS: Product[] = [
  // Pague 1, leve 2
  {
    id: "combo-300-2x",
    name: "2 Copos Açaí 300ml",
    description: "Promoção especial com entrega grátis na região.",
    categoryId: "PROMO_PAGUE_1_LEVE_2",
    price: 39.8,
    promoPrice: 19.9,
    volumeMl: 300,
    isCombo: true,
    badge: "Pague 1, leve 2",
    toppingGroups: BASE_TOPPING_GROUPS,
  },
  {
    id: "combo-500-2x",
    name: "2 Copos Açaí 500ml",
    description: "Perfeito para dividir, com até 9 complementos por copo.",
    categoryId: "PROMO_PAGUE_1_LEVE_2",
    price: 43.8,
    promoPrice: 22.9,
    volumeMl: 500,
    isCombo: true,
    badge: "Pague 1, leve 2",
    toppingGroups: BASE_TOPPING_GROUPS,
  },
  {
    id: "combo-700-2x",
    name: "2 Copos Açaí 700ml",
    description: "Serve bem 2 pessoas com fome de açaí.",
    categoryId: "PROMO_PAGUE_1_LEVE_2",
    price: 53.8,
    promoPrice: 26.9,
    volumeMl: 700,
    isCombo: true,
    badge: "Pague 1, leve 2",
    toppingGroups: BASE_TOPPING_GROUPS,
  },
  {
    id: "combo-1000-2x",
    name: "2 Copos Açaí 1L",
    description: "Opção família com frete grátis na região.",
    categoryId: "PROMO_PAGUE_1_LEVE_2",
    price: 75.8,
    promoPrice: 37.9,
    volumeMl: 1000,
    isCombo: true,
    badge: "Pague 1, leve 2",
    toppingGroups: BASE_TOPPING_GROUPS,
  },

  // Zero açúcar
  {
    id: "combo-300-2x-zero",
    name: "2 Copos Açaí 300ml ZERO",
    description: "Sem adição de açúcar, com até 9 complementos.",
    categoryId: "ZERO_ACUCAR",
    price: 45.8,
    promoPrice: 22.9,
    volumeMl: 300,
    isCombo: true,
    isZeroSugar: true,
    badge: "Zero açúcar",
    toppingGroups: BASE_TOPPING_GROUPS,
  },
  {
    id: "combo-500-2x-zero",
    name: "2 Copos Açaí 500ml ZERO",
    description: "Mais volume, mesmo cuidado no sabor e na dieta.",
    categoryId: "ZERO_ACUCAR",
    price: 49.8,
    promoPrice: 25.9,
    volumeMl: 500,
    isCombo: true,
    isZeroSugar: true,
    badge: "Zero açúcar",
    toppingGroups: BASE_TOPPING_GROUPS,
  },

  // Copos unitários tradicionais
  {
    id: "copo-300",
    name: "Copo Açaí 300ml",
    description: "Clássico da casa, cremoso e bem servido.",
    categoryId: "ACAI_TRADICIONAL",
    price: 19.9,
    volumeMl: 300,
    toppingGroups: BASE_TOPPING_GROUPS,
  },
  {
    id: "copo-500",
    name: "Copo Açaí 500ml",
    description: "Para quem gosta de caprichar no açaí.",
    categoryId: "ACAI_TRADICIONAL",
    price: 22.9,
    volumeMl: 500,
    toppingGroups: BASE_TOPPING_GROUPS,
  },
  {
    id: "copo-700",
    name: "Copo Açaí 700ml",
    description: "Serve bem quem tem fome de verdade.",
    categoryId: "ACAI_TRADICIONAL",
    price: 26.9,
    volumeMl: 700,
    toppingGroups: BASE_TOPPING_GROUPS,
  },
  {
    id: "copo-1000",
    name: "Copo Açaí 1L",
    description: "Para dividir na família ou matar a vontade sozinho.",
    categoryId: "ACAI_TRADICIONAL",
    price: 37.9,
    volumeMl: 1000,
    toppingGroups: BASE_TOPPING_GROUPS,
  },

  // Especial
  {
    id: "super-barca",
    name: "Super Barca Açaí 850g",
    description: "Até 2 pessoas, decoração especial e muitos complementos.",
    categoryId: "ESPECIAIS",
    price: 69.9,
    promoPrice: 49.0,
    volumeMl: 850,
    isCombo: true,
    badge: "Oferta especial",
    toppingGroups: BASE_TOPPING_GROUPS,
  },
]
