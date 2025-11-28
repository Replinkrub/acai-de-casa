"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useCart } from '@/lib/store/cart'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from 'sonner'
import { Minus, Plus, Trash, ShoppingCart } from '@phosphor-icons/react'
import { CheckoutForm } from './checkout-form'

export function CartSheet() {
  const { items, removeItem, updateQty, getTotalItems, getSubtotal } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const totalItems = getTotalItems()
  const subtotal = getSubtotal()

  const hasItems = totalItems > 0

  const handleDecrement = (id: string, currentQty: number) => {
    const next = currentQty - 1
    updateQty(id, next)
  }

  const handleIncrement = (id: string, currentQty: number) => {
    const next = currentQty + 1
    updateQty(id, next)
  }

  const handleOpenChange = (open: boolean) => {
    if (!hasItems && open) {
      toast.info('Adicione pelo menos um kit antes de abrir o carrinho.')
      return
    }
    setIsOpen(open)
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <motion.button
          type="button"
          className="fixed bottom-4 right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.4 }}
        >
          <ShoppingCart className="h-6 w-6" weight="bold" />
          <AnimatePresence>
            {hasItems && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-green-600 text-xs font-bold text-white"
              >
                {totalItems}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Seu carrinho</SheetTitle>
        </SheetHeader>

        {!hasItems ? (
          <div className="mt-8 text-center text-sm text-gray-500">
            Seu carrinho está vazio. Escolha um kit e clique em “Adicionar ao carrinho”.
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            <div>
              <ScrollArea className="max-h-64 pr-2">
                <div className="space-y-4">
                  {Object.values(items).map(item => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-3 shadow-sm"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">
                          {item.name}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {formatPrice(item.price)} / kit
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleDecrement(item.id, item.qty)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => handleIncrement(item.id, item.qty)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="ml-4 flex flex-col items-end">
                        <span className="text-sm font-semibold text-gray-900">
                          {formatPrice(item.price * item.qty)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="mt-1 inline-flex items-center text-xs text-red-500 hover:text-red-600"
                        >
                          <Trash className="mr-1 h-3 w-3" />
                          Remover
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="mt-4 rounded-xl bg-gray-50 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  O valor final pode ajustar conforme frete ou condição combinada com o atendimento.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <h3 className="mb-3 text-sm font-semibold text-gray-900">
                Dados pra finalizar seu pedido
              </h3>
              <CheckoutForm />
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
