"use client"

import { useState } from "react"
import { useAcaiCart } from "@/lib/store/acai-cart-store"
import type { CartItem } from "@/lib/store/acai-cart-store"

export function AcaiCartCheckoutSection() {
  const { items, removeItem, updateQuantity, clear, totalItems, totalValue } =
    useAcaiCart()
  const [customerName, setCustomerName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [complement, setComplement] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "cash">("pix")
  const [changeValue, setChangeValue] = useState("")
  const [pixPayload, setPixPayload] = useState<string | null>(null)
  const [pixBase64, setPixBase64] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const total = totalValue()

  const storeName = process.env.NEXT_PUBLIC_STORE_NAME ?? "Açai de Casa"
  const pixKey = process.env.NEXT_PUBLIC_PIX_KEY ?? ""
  const pixCity = process.env.NEXT_PUBLIC_PIX_CITY ?? "RECIFE"
  const pixReceiverName =
    process.env.NEXT_PUBLIC_PIX_RECEIVER_NAME ?? "ACAI DE CASA"
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""

  function formatItemLine(item: CartItem, index: number): string {
    const toppingsText = item.toppings
      .filter((g) => g.options.length > 0)
      .map(
        (g) =>
          `${g.groupName}: ${g.options.map((o) => o.name).join(", ")}`,
      )
      .join(" | ")

    const observacao = item.notes ? `Obs: ${item.notes}` : ""

    return [
      `${index + 1}. ${item.productName} x${item.quantity}`,
      toppingsText,
      observacao,
    ]
      .filter(Boolean)
      .join(" — ")
  }

  function buildOrderSummary(): string {
    const linhas: string[] = []

    linhas.push(`Novo pedido via site ${storeName}`)
    if (customerName) linhas.push(`Cliente: ${customerName}`)
    if (phone) linhas.push(`Telefone: ${phone}`)
    if (address) linhas.push(`Endereço: ${address}`)
    if (complement) linhas.push(`Complemento / Referência: ${complement}`)
    linhas.push("")
    linhas.push("Itens:")

    items.forEach((item, index) => {
      linhas.push(formatItemLine(item, index))
    })

    linhas.push("")
    linhas.push(`Total de itens: ${totalItems()}`)
    linhas.push(
      `Valor total: R$ ${total.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    )

    return linhas.join("\n")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!items.length) {
      alert("Adicione pelo menos 1 item ao carrinho.")
      return
    }

    if (!customerName || !phone || !address) {
      alert("Preencha nome, telefone e endereço para finalizar o pedido.")
      return
    }

    setIsSubmitting(true)
    setPixPayload(null)
    setPixBase64(null)

    try {
      const resumo = buildOrderSummary()

      if (paymentMethod === "pix") {
        if (!pixKey) {
          alert(
            "Chave PIX não configurada. Defina NEXT_PUBLIC_PIX_KEY no .env.local.",
          )
          return
        }

        // import dinâmico pra carregar a lib só no browser
        const { QrCodePix } = await import("qrcode-pix")

        const valueNumber = Number(
          total.toFixed(2).replace(",", "."),
        )

        const qrCodePix = QrCodePix({
          version: "01",
          key: pixKey,
          name: pixReceiverName,
          city: pixCity,
          transactionId: `ACAI-${Date.now()}`,
          message: `Pedido via ${storeName}`,
          value: valueNumber,
        })

        const payload = qrCodePix.payload()
        const base64 = await qrCodePix.base64()

        setPixPayload(payload)
        setPixBase64(base64)

        // monta mensagem pro WhatsApp com o resumo + PIX
        if (whatsappNumber) {
          const texto = [
            resumo,
            "",
            "Forma de pagamento: PIX",
            `Valor: R$ ${total.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
            "",
            "Código PIX (copia e cola):",
            payload,
          ].join("\n")

          const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            texto,
          )}`

          window.open(url, "_blank")
        } else {
          console.warn(
            "NEXT_PUBLIC_WHATSAPP_NUMBER não configurado. O pedido não foi enviado automaticamente para o WhatsApp.",
          )
        }
      } else {
        // Dinheiro
        if (whatsappNumber) {
          const texto = [
            resumo,
            "",
            "Forma de pagamento: Dinheiro na entrega",
          ]

          if (changeValue) {
            texto.push(
              `Precisa de troco para: R$ ${Number(changeValue).toLocaleString(
                "pt-BR",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                },
              )}`,
            )
          }

          const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            texto.join("\n"),
          )}`

          window.open(url, "_blank")
        } else {
          alert(
            "Número do WhatsApp não configurado (NEXT_PUBLIC_WHATSAPP_NUMBER).",
          )
        }
      }
    } catch (error) {
      console.error(error)
      alert(
        "Erro ao finalizar. Confira as configurações de PIX e tente novamente.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="w-full max-w-5xl mx-auto px-4 pb-10 pt-4">
      <h2 className="text-2xl font-semibold mb-4">Carrinho e Checkout</h2>

      <div className="grid gap-6 md:grid-cols-[2fr,1.5fr] items-start">
        {/* Lista de itens do carrinho */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-slate-300">
              Itens no carrinho:{" "}
              <span className="font-semibold">{totalItems()}</span>
            </p>
            {items.length > 0 && (
              <button
                type="button"
                onClick={clear}
                className="text-xs text-slate-300 hover:text-red-300 underline"
              >
                Limpar carrinho
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <p className="text-sm text-slate-400">
              Seu carrinho está vazio. Selecione um produto para começar.
            </p>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="rounded-xl border border-slate-700 bg-slate-950/60 p-3 text-sm"
                >
                  <div className="flex justify-between gap-2">
                    <div>
                      <p className="font-semibold">{item.productName}</p>
                      {item.toppings.some((g) => g.options.length > 0) && (
                        <p className="text-xs text-slate-400 mt-1">
                          {item.toppings
                            .filter((g) => g.options.length > 0)
                            .map(
                              (g) =>
                                `${g.groupName}: ${g.options
                                  .map((o) => o.name)
                                  .join(", ")}`,
                            )
                            .join(" | ")}
                        </p>
                      )}
                      {item.notes && (
                        <p className="text-xs text-slate-500 mt-1">
                          Obs: {item.notes}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">Qtd.</p>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-6 h-6 rounded-full border border-slate-600 bg-slate-900"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-6 h-6 rounded-full border border-slate-600 bg-slate-900"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-xs text-emerald-300 mt-1">
                        {(item.basePrice * item.quantity).toLocaleString(
                          "pt-BR",
                          {
                            style: "currency",
                            currency: "BRL",
                          },
                        )}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="mt-1 text-[11px] text-red-300 hover:text-red-200 underline"
                      >
                        remover
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="border-t border-slate-700 pt-3 mt-2 flex items-center justify-between">
            <p className="text-sm text-slate-300">Total</p>
            <p className="text-lg font-semibold text-emerald-300">
              {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
        </div>

        {/* Formulário de checkout */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4 space-y-3"
        >
          <h3 className="text-lg font-semibold mb-1">
            Dados para entrega e pagamento
          </h3>

          <div className="space-y-2">
            <div>
              <label className="block text-xs text-slate-300">
                Nome completo
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-2 py-1 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300">
                Telefone / WhatsApp
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-2 py-1 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="(DDD) 9XXXX-XXXX"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300">
                Endereço (rua, número, bairro)
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-2 py-1 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300">
                Complemento / Referência (opcional)
              </label>
              <input
                type="text"
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-2 py-1 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* pagamento */}
          <div className="border-t border-slate-700 pt-3 mt-2 space-y-2">
            <p className="text-xs text-slate-300 mb-1">Forma de pagamento</p>
            <div className="flex items-center gap-3 text-xs">
              <label className="inline-flex items-center gap-1">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="pix"
                  checked={paymentMethod === "pix"}
                  onChange={() => setPaymentMethod("pix")}
                  className="accent-purple-500"
                />
                <span>PIX (recomendado)</span>
              </label>
              <label className="inline-flex items-center gap-1">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                  className="accent-purple-500"
                />
                <span>Dinheiro na entrega</span>
              </label>
            </div>

            {paymentMethod === "cash" && (
              <div className="mt-2">
                <label className="block text-xs text-slate-300">
                  Troco para quanto? (opcional)
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  min="0"
                  value={changeValue}
                  onChange={(e) => setChangeValue(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-2 py-1 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Ex: 100,00"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !items.length}
            className="w-full rounded-full bg-purple-500 hover:bg-purple-600 disabled:bg-slate-700 disabled:text-slate-400 text-sm font-semibold text-slate-50 py-2 mt-2"
          >
            {isSubmitting ? "Finalizando..." : "Finalizar pedido"}
          </button>

          {/* bloco PIX gerado */}
          {pixPayload && (
            <div className="mt-4 rounded-xl border border-emerald-500/60 bg-emerald-500/10 p-3 space-y-2">
              <p className="text-xs font-semibold text-emerald-200">
                PIX gerado com sucesso
              </p>
              <p className="text-[11px] text-emerald-100">
                Copie o código abaixo e cole no app do seu banco para pagar via
                PIX (copia e cola). Você também recebeu esse código pelo
                WhatsApp, junto com o resumo do pedido.
              </p>
              <textarea
                readOnly
                value={pixPayload}
                className="w-full rounded-lg border border-emerald-500/60 bg-slate-950/80 px-2 py-1 text-[11px] text-emerald-100"
                rows={4}
              />
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard
                    .writeText(pixPayload)
                    .then(() => alert("Código PIX copiado para a área de transferência."))
                    .catch(() =>
                      alert(
                        "Não foi possível copiar automaticamente. Copie manualmente o código.",
                      ),
                    )
                }}
                className="text-xs px-3 py-1 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold"
              >
                Copiar código PIX
              </button>

              {pixBase64 && (
                <div className="pt-2 border-t border-emerald-500/40 mt-2">
                  <p className="text-[11px] text-emerald-100 mb-1">
                    Se preferir, leia o QR Code abaixo:
                  </p>
                  <div className="flex justify-center">
                    <img
                      src={pixBase64}
                      alt="QR Code PIX"
                      className="w-40 h-40 rounded-lg border border-emerald-500/60 bg-slate-950"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
