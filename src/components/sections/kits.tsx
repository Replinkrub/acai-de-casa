'use client'

import { KitCard } from '@/components/kit-card'
import { KITS } from '@/lib/constants/kits'
import { ScrollReveal } from '@/components/scroll-reveal'

export function Kits() {
  return (
    <section id="kits" className="py-16 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl md:text-4xl font-serif font-bold bg-gradient-to-r from-gray-900 to-purple-700 bg-clip-text text-transparent">
              Nossos kits
            </h2>
            <p className="text-lg text-gray-600">Escolha o kit que resolve sua semana sem improviso.</p>
          </div>
        </ScrollReveal>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {KITS.map((kit, index) => (
            <ScrollReveal key={kit.id} delay={index * 0.1}>
              <KitCard kit={kit} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}