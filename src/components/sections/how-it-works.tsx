'use client'

import { ScrollReveal } from '@/components/scroll-reveal'
import { ShoppingCartSimple, WhatsappLogo, Truck } from '@phosphor-icons/react'

export function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl md:text-4xl font-serif bg-gradient-to-r from-gray-900 to-purple-700 bg-clip-text text-transparent">
              Como funciona
            </h2>
            <p className="text-lg text-gray-600">
              Pedir seus kits Sagrado é simples: você escolhe, a gente organiza e o freezer da sua casa fica sempre pronto.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          <ScrollReveal>
            <div className="rounded-2xl bg-purple-50 p-6 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                <ShoppingCartSimple className="h-6 w-6" weight="bold" />
              </div>
              <h3 className="mb-2 font-serif text-lg font-bold text-gray-900">1. Escolha o kit</h3>
              <p className="text-sm text-gray-600">
                Veja os kits, confira as porções e selecione o que resolve melhor a rotina da sua casa.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl bg-purple-50 p-6 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                <WhatsappLogo className="h-6 w-6" weight="fill" />
              </div>
              <h3 className="mb-2 font-serif text-lg font-bold text-gray-900">2. Finalize pelo WhatsApp</h3>
              <p className="text-sm text-gray-600">
                Clique em "Finalizar pedido no WhatsApp", confirme endereço, forma de pagamento e pronto.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="rounded-2xl bg-purple-50 p-6 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                <Truck className="h-6 w-6" weight="bold" />
              </div>
              <h3 className="mb-2 font-serif text-lg font-bold text-gray-900">3. Receba e congele</h3>
              <p className="text-sm text-gray-600">
                Você recebe os kits ultracongelados, coloca no freezer e só esquenta na hora de servir. Sem improviso.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}