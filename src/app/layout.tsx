import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700', '900'],
})

export const metadata: Metadata = {
  title: 'Sagrado – Comer bem é sagrado',
  description:
    'Kits ultracongelados de comida de verdade, com rótulo limpo e opções sem glúten e sem lactose. Monte seu pedido online e finalize no WhatsApp.',
  keywords: [
    'comida congelada',
    'sem glúten',
    'sem lactose',
    'kits família',
    'pizza',
    'sagrado',
  ],
  authors: [{ name: 'Sagrado' }],
  openGraph: {
    title: 'Comer bem é sagrado – Kits ultracongelados pra família toda',
    description:
      'Kits ultracongelados de comida de verdade, com rótulo limpo e opções sem glúten e sem lactose. Monte seu pedido online e finalize no WhatsApp.',
    url: 'https://www.sagradofit.com.br',
    siteName: 'Sagrado',
    images: [
      {
        url: '/images/sagrado-social-banner.png', // 👈 STRING com o caminho da imagem
        width: 2048,
        height: 683,
        alt: 'Sagrado - Kits ultracongelados',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comer bem é sagrado – Kits ultracongelados pra família toda',
    description:
      'Kits ultracongelados de comida de verdade, com rótulo limpo e opções sem glúten e sem lactose. Monte seu pedido online e finalize no WhatsApp.',
    images: ['/images/sagrado-social-banner.png'], // 👈 mesmo caminho aqui
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <Header />
        {children}
        <Footer />
        <Toaster />
        <div id="modal-root" />
      </body>
    </html>
  )
}
