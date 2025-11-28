'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { WhatsappLogo } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

export function Header() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      className="fixed top-0 z-50 w-full bg-[#F4439D] shadow-sm"
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo com leve animação no hover */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/sagrado-logo.png"
                alt="Sagrado"
                width={120}
                height={60}
                className="h-auto"
                priority
              />
            </Link>
          </motion.div>

          <div className="flex items-center gap-3">
            {/* Ver kits – pill clara sobre o rosa */}
            <Button
              variant="outline"
              className="hidden rounded-full border-white/40 bg-white/15 px-5 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur hover:bg-white/25 hover:text-white md:inline-flex"
              onClick={() => {
                const el = document.getElementById('kits')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Ver kits
            </Button>

            {/* WhatsApp – botão branco destacado */}
            <Button
              asChild
              variant="outline"
              className="gap-2 rounded-full border-transparent bg-white px-5 py-2 text-sm font-semibold text-[#5E2BBF] shadow-md hover:bg-white/90"
            >
              <a
                href="https://wa.me/5581999874547"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsappLogo className="h-5 w-5" weight="fill" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
