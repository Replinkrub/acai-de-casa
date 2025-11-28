'use client'

import { Leaf, ShieldCheck, CookingPot } from '@phosphor-icons/react'
import { ScrollReveal } from '@/components/scroll-reveal'

interface FeatureCardProps {
  icon: React.ReactNode
  label: string
  title: string
  description: string
}

export function Features() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <ScrollReveal>
            <FeatureCard
              label="RÓTULO"
              icon={<Leaf weight="fill" size={24} />}
              title="Rótulo limpo"
              description="Ingredientes de verdade, sem firula, que você reconhece, sabe pronunciar e confia."
            />
          </ScrollReveal>

          <ScrollReveal>
            <FeatureCard
              label="RESTRIÇÕES"
              icon={<ShieldCheck weight="fill" size={24} />}
              title="Sem glúten / sem lactose"
              description="Linha pensada pra quem precisa cuidar das restrições, com opções claramente identificadas no rótulo."
            />
          </ScrollReveal>

          <ScrollReveal>
            <FeatureCard
              label="PRATICIDADE"
              icon={<CookingPot weight="fill" size={24} />}
              title="Práticos"
              description="Do freezer pra mesa em poucos minutos: forno, air fryer ou micro-ondas."
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon, label, title, description }: FeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-purple-50 bg-white/95 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F4439D] via-[#6C2DC7] to-[#00B8C4] text-white shadow-md transition-transform group-hover:scale-105">
          {icon}
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-900/70">
          {label}
        </span>
      </div>

      <h3 className="mb-2 font-serif text-lg font-bold text-gray-900">
        {title}
      </h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}
