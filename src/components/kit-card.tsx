'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/lib/store/cart'
import { Kit } from '@/lib/constants/kits'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Plus, Minus, ShoppingCart } from '@phosphor-icons/react'

interface KitCardProps {
  kit: Kit
}

export function KitCard({ kit }: KitCardProps) {
  const [qty, setQty] = useState(0)
  const { addItem } = useCart()
  const [isAdded, setIsAdded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  function handleAdd() {
    const quantity = qty <= 0 ? 1 : qty
    addItem(kit, quantity)

    setIsAdded(true)
    toast.success('✅ Adicionado ao carrinho!', {
      description: `${kit.name} (${quantity}x)`,
    })

    setTimeout(() => setIsAdded(false), 2000)
    setQty(0)
  }

  function handleQtyChange(delta: number) {
    setQty(prev => Math.max(0, prev + delta))
  }

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Efeito de brilho no hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -inset-x-1/2 -inset-y-1/2 h-[200%] w-[200%] rotate-45 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent" />
      </div>

      {/* Imagem com altura fixa pra alinhar os cards */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={kit.img}
          alt={kit.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />

        {/* Badge animado */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-4 right-4 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 px-3 py-1 text-xs font-bold text-white shadow-md"
            >
              + Prático
            </motion.div>
          )}
        </AnimatePresence>

        {/* Badge de adicionado */}
        <AnimatePresence>
          {isAdded && (
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -180 }}
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 font-bold text-white shadow-lg"
            >
              ✓
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-xl font-serif font-bold text-gray-900 transition-colors group-hover:text-purple-700">
          {kit.name}
        </h3>
        <p className="mb-3 text-sm text-gray-600">{kit.description}</p>
        <p className="mb-4 text-xs text-gray-500">{kit.portions}</p>

        {/* Rodapé: duas linhas */}
        <div className="mt-auto pt-3">
          {/* Linha 1: preço */}
          <div className="mb-3">
            <span className="text-2xl font-bold text-purple-600">
              {formatPrice(kit.price)}
            </span>
          </div>

          {/* Linha 2: quantidade + botão Add */}
          <div className="flex items-center gap-3">
            {/* Quantidade */}
            <div className="flex items-center rounded-full border border-gray-200 bg-gray-50 px-2 py-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() => handleQtyChange(-1)}
              >
                <Minus className="h-5 w-5" />
              </Button>

              <span className="mx-2 min-w-[2.5rem] text-center text-base font-semibold text-gray-900 tabular-nums">
                {qty}
              </span>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() => handleQtyChange(1)}
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>

            {/* Botão Add */}
            <Button
              type="button"
              onClick={handleAdd}
              className="flex-1 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:from-purple-700 hover:to-purple-800 hover:shadow-lg"
            >
              <span className="flex items-center justify-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                {qty > 0 ? `Add (${qty})` : 'Add'}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
