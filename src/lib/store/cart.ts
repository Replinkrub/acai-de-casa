import { create } from 'zustand'
import { Kit } from '@/lib/constants/kits'

export interface CartItem extends Kit {
  qty: number
}

interface CartState {
  items: Record<string, CartItem>
  addItem: (kit: Kit, qty?: number) => void
  removeItem: (kitId: string) => void
  updateQty: (kitId: string, qty: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getSubtotal: () => number
  getItems: () => CartItem[]
}

const STORAGE_KEY = 'sagrado-cart'

const readFromStorage = (): Record<string, CartItem> => {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object' && parsed.items) {
      return parsed.items as Record<string, CartItem>
    }
    return {}
  } catch {
    return {}
  }
}

const writeToStorage = (items: Record<string, CartItem>) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items }))
  } catch {
    // ignora erro de storage
  }
}

export const useCart = create<CartState>((set, get) => ({
  items: {},

  addItem: (kit, qty = 1) => {
    if (qty <= 0) return
    set(state => {
      const current = state.items ?? {}
      const existing = current[kit.id]
      const nextQty = (existing?.qty ?? 0) + qty

      const nextItems: Record<string, CartItem> = {
        ...current,
        [kit.id]: { ...kit, qty: nextQty },
      }

      writeToStorage(nextItems)
      return { items: nextItems }
    })
  },

  removeItem: kitId => {
    set(state => {
      const current: Record<string, CartItem> = { ...(state.items ?? {}) }
      delete current[kitId]
      writeToStorage(current)
      return { items: current }
    })
  },

  updateQty: (kitId, qty) => {
    set(state => {
      const current: Record<string, CartItem> = { ...(state.items ?? {}) }
      const item = current[kitId]
      if (!item) return { items: current }

      if (qty <= 0) {
        delete current[kitId]
      } else {
        current[kitId] = { ...item, qty }
      }

      writeToStorage(current)
      return { items: current }
    })
  },

  clearCart: () => {
    writeToStorage({})
    set({ items: {} })
  },

  getTotalItems: () => {
    const items = get().items ?? {}
    return Object.values(items).reduce((total, item) => total + (item.qty || 0), 0)
  },

  getSubtotal: () => {
    const items = get().items ?? {}
    return Object.values(items).reduce(
      (acc, item) => acc + (item.price * item.qty || 0),
      0,
    )
  },

  getItems: () => {
    const items = get().items ?? {}
    return Object.values(items)
  },
}))

// Hidrata o estado inicial no client com o que estiver salvo no localStorage
if (typeof window !== 'undefined') {
  const initial = readFromStorage()
  if (Object.keys(initial).length > 0) {
    useCart.setState({ items: initial })
  }
}
