export interface Kit {
  id: string
  name: string
  description: string
  price: number
  portions: string
  img: string
  tags?: string[]
}

export const KITS: Kit[] = [
  {
    id: 'K1',
    name: 'Premium Família',
    description: 'Kit completo pra semana da família.',
    price: 169.90,
    portions: '3 pizzas, 1 mini coxinha (6und), 1 tortinha (3und), 2 dadinhos',
    img: '/kits/kits/kit-premium.png',
    tags: ['premium', 'família', 'completo']
  },
  {
    id: 'K3',
    name: 'Pizza + Mini Coxinha',
    description: 'Noite da pizza reforçada, com salgadinho pra acompanhar.',
    price: 85.90,
    portions: '3 pizzas (Margherita/Calabresa/Frango), 1 mini coxinha (6und)',
    img: '/kits/kits/kit-pizza-mini.png',
    tags: ['pizza', 'salgado', 'refeição']
  },
  {
    id: 'K4',
    name: 'Dadinhos',
    description: 'Petisco oficial da casa, pronto pra qualquer momento.',
    price: 58.90,
    portions: '3 pacotes de dadinho 250g',
    img: '/kits/kits/kit-dadinhos.png',
    tags: ['petisco', 'prático', 'tapioca']
  },
  {
    id: 'K6',
    name: 'Duo Salgados',
    description: 'Dois clássicos sempre à mão no freezer.',
    price: 39.90,
    portions: '1 mini coxinha (6und), 1 tortinha salgada (3und)',
    img: '/kits/kits/kit-duo-salgados.png',
    tags: ['duo', 'econômico', 'essencial']
  }
]

// WhatsApp number for order integration
export const WHATSAPP_NUMBER = '5581999874547'

// Kit categories for filtering (if needed)
export const KIT_CATEGORIES = {
  COMPLETE: 'Completo',
  PIZZA: 'Pizza',
  SNACK: 'Salgado',
  FAMILY: 'Família'
}
