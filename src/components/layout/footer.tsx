"use client"
import { WhatsappLogo } from '@phosphor-icons/react'

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-600">
            © 2025 Sagrado. Comer bem é sagrado.
          </p>
          <a
            href="https://wa.me/5581999874547"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-2 text-sm font-semibold text-white hover:from-purple-700 hover:to-purple-800"
          >
            <WhatsappLogo className="h-4 w-4" weight="fill" />
            Falar com atendente
          </a>
        </div>
      </div>
    </footer>
  )
}
