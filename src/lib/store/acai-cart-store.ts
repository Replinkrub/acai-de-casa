"use client"

import { create } from "zustand"
import { Product, ToppingGroup, ToppingOption } from "@/lib/constants/products"

export type SelectedGroupOptions = {
  groupId: string
  groupName: string
  options: ToppingOption[]
}

export type CartItem = {
  id: string
  productId: string
  productName: string
  basePrice: number
  quantity: number
  toppings: SelectedGroupOptions[]
  notes?: string
}

type CartState = {
  items: CartItem[]
  addItem: (params: {
    product: Product
    quantity: number
    selectedGroups: SelectedGroupOptions[]
    notes?: string
  }) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clear: () => void
  totalItems: () => number
  totalValue: () => number
}

function calcUnitPrice(product: Product, selectedGroups: SelectedGroupOptions[]): number {
  const base = product.promoPrice ?? product.price
  const extra =
    selectedGroups
      .flatMap((g) => g.options)
      .reduce((sum, opt) => sum + (opt.priceDiff ?? 0), 0) ?? 0

  return base + extra
}

export const useAcaiCart = create<CartState>((set, get) => ({
  items: [],

  addItem: ({ product, quantity, selectedGroups, notes }) => {
    const unitPrice = calcUnitPrice(product, selectedGroups)

    const newItem: CartItem = {
      id: `${product.id}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      productId: product.id,
      productName: product.name,
      basePrice: unitPrice,
      quantity,
      toppings: selectedGroups,
      notes,
    }

    set((state) => ({
      items: [...state.items, newItem],
    }))
  },

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: quantity <= 0 ? 1 : quantity } : item,
      ),
    })),

  clear: () => set({ items: [] }),

  totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

  totalValue: () =>
    get().items.reduce((sum, item) => sum + item.basePrice * item.quantity, 0),
}))
