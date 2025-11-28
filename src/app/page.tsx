import { AcaiMenuSection } from "@/components/sections/acai-menu"
import { AcaiCartCheckoutSection } from "@/components/sections/acai-cart-checkout"

export default function HomePage() {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME ?? "Açai de Casa"

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <div>
            <h1 className="text-lg font-semibold">{storeName}</h1>
            <p className="text-xs text-slate-400">
              Entrega rápida na região — peça direto pelo site
            </p>
          </div>
          <div className="text-right text-xs text-slate-400">
            <p>Aberto agora</p>
            <p>Pagamento via PIX ou dinheiro</p>
          </div>
        </div>
      </header>

      <section className="w-full max-w-5xl mx-auto px-4 pt-4 pb-2">
        <div className="rounded-2xl border border-purple-600/40 bg-gradient-to-r from-purple-900/50 via-slate-950 to-slate-950 p-4">
          <p className="text-sm font-semibold mb-1">
            Promo do dia: pague 1, leve 2
          </p>
          <p className="text-xs text-slate-200">
            Escolha seu combo de açaí, monte com até 9 complementos e finalize
            com PIX gerado automaticamente. Você recebe o código e o QR por
            aqui e pelo WhatsApp.
          </p>
        </div>
      </section>

      <AcaiMenuSection />
      <AcaiCartCheckoutSection />

      <footer className="mt-auto w-full border-t border-slate-800 bg-slate-950/90">
        <div className="max-w-5xl mx-auto px-4 py-3 text-[11px] text-slate-500 flex justify-between">
          <span>© {new Date().getFullYear()} {storeName}</span>
          <span>App piloto baseado em Next.js</span>
        </div>
      </footer>
    </main>
  )
}
