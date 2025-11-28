import { CartItem } from './store/cart'
import { WHATSAPP_NUMBER } from './constants/kits'

export interface CheckoutData {
  nome: string
  telefone?: string
  cep: string
  rua: string
  numero: string
  bairro: string
  cidade: string
  uf: string
  referencia?: string
  pagamento: string
  observacoes?: string
}

export function generateWhatsAppLink(items: CartItem[], data: CheckoutData): string {
  if (!items.length) {
    throw new Error('Carrinho vazio')
  }

  let msg = '*Novo pedido – Sagrado*\n\n'

  msg += `*Cliente:* ${data.nome}\n`
  if (data.telefone) {
    msg += `*Telefone:* ${data.telefone}\n`
  }

  msg += '\n*Itens do pedido:*\n'
  items.forEach(item => {
    const unit = item.price.toFixed(2).replace('.', ',')
    const total = (item.price * item.qty).toFixed(2).replace('.', ',')
    msg += `• ${item.qty}x ${item.name} – R$ ${unit} (subtotal R$ ${total})\n`
  })

  const totalGeral = items.reduce((acc, item) => acc + item.price * item.qty, 0)
  msg += `\n*Total:* R$ ${totalGeral.toFixed(2).replace('.', ',')}\n`

  msg += '\n*Endereço de entrega:*\n'
  msg += `${data.rua}, ${data.numero}\n`
  msg += `${data.bairro} – ${data.cidade}/${data.uf}\n`
  msg += `CEP: ${data.cep}\n`
  if (data.referencia) {
    msg += `Referência: ${data.referencia}\n`
  }

  msg += `\n*Forma de pagamento:* ${data.pagamento}\n`
  if (data.observacoes) {
    msg += `\n*Observações:* ${data.observacoes}\n`
  }

  msg += '\n🙏 Obrigado por escolher o Sagrado!'

  const encodedMsg = encodeURIComponent(msg)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`
}

export function getSubtotal(items: CartItem[]): number {
  return items.reduce((acc, item) => acc + item.price * item.qty, 0)
}
