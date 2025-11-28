'use client'

import Image from 'next/image'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <ScrollReveal>
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-600">
                SAGRADO
              </p>
              <h1 className="text-3xl font-semibold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
                Comer bem é sagrado.
                <span className="block text-purple-700">
                  Sem virar refém da cozinha.
                </span>
              </h1>
              <p className="max-w-xl text-base text-gray-600 md:text-lg">
                Kits ultracongelados de comida de verdade, com rótulo limpo e
                opções sem glúten e sem lactose. Você monta o pedido, a gente
                cuida do resto.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="rounded-full px-6">
                  <a href="#kits">Ver kits disponíveis</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-purple-200 bg-white/70 text-purple-700 backdrop-blur"
                >
                  <a
                    href="https://wa.me/5581999874547?text=Quero%20saber%20mais%20sobre%20os%20kits%20Sagrado"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Falar com atendimento
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 md:text-sm">
                <span>🍽️ Kits pra família toda</span>
                <span>•</span>
                <span>❄️ Ultracongelados – sem perder qualidade</span>
                <span>•</span>
                <span>📍 Recife &amp; região</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="relative">
              <div className="relative mx-auto max-w-md">
                <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-purple-100 via-transparent to-yellow-100" />
                <div className="relative overflow-hidden rounded-[2rem] border border-purple-100 bg-white shadow-xl shadow-purple-100/50">
                  <Image
                    src="/images/hero-kit-sagrado.png"
                    alt="Kits Sagrado"
                    width={640}
                    height={480}
                    className="h-auto w-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
