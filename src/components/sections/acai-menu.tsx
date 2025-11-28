"use client"

import { useMemo, useState } from "react"
import { PRODUCTS, PRODUCT_CATEGORIES, type Product } from "@/lib/constants/products"
import { useAcaiCart } from "@/lib/store/acai-cart-store"
import { motion } from "framer-motion"
import { Plus } from "@phosphor-icons/react"

type CategoryFilter = "ALL" | (typeof PRODUCT_CATEGORIES)[number]["id"]

export function AcaiMenuSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("PROMO_PAGUE_1_LEVE_2")
  const { addItem } = useAcaiCart()

  const categoriesWithAll = useMemo(
    () => [
      { id: "ALL" as CategoryFilter, label: "Todos" },
      ...PRODUCT_CATEGORIES,
    ],
    [],
  )

  const filteredProducts = useMemo(
    () =>
      PRODUCTS.filter((product) =>
        activeCategory === "ALL" ? true : product.categoryId === activeCategory,
      ),
    [activeCategory],
  )

  function handleAdd(product: Product) {
    addItem({
      product,
      quantity: 1,
      selectedGroups: [], // toppings vem depois
      notes: "",
    })
  }

  return (
    <section className="w-full max-w-5xl mx-auto px-4 pb-4 md:pb-6">
      {/* Filtros de categoria */}
      <div className="flex gap-2 overflow-x-auto pb-3 mt-3">
        {categoriesWithAll.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id as CategoryFilter)}
            className={[
              "whitespace-nowrap rounded-full border px-3 py-1 text-xs md:text-sm transition-all",
              activeCategory === cat.id
                ? "border-fuchsia-400 bg-fuchsia-600/20 text-fuchsia-100"
                : "border-slate-700 bg-slate-900 text-slate-300 hover:border-fuchsia-300/70 hover:text-fuchsia-100",
            ].join(" ")}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Lista de produtos */}
      <div className="mt-4 space-y-3">
        {filteredProducts.map((product) => {
          const hasPromo = typeof product.promoPrice === "number"

          return (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 md:p-4 flex gap-3 md:gap-4"
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  {product.badge && (
                    <span className="rounded-full bg-fuchsia-600/20 px-2 py-0.5 text-[10px] font-semibold text-fuchsia-200 border border-fuchsia-500/40">
                      {product.badge}
                    </span>
                  )}
                  {product.isZeroSugar && (
                    <span className="rounded-full bg-emerald-600/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-200 border border-emerald-500/40">
                      Zero açúcar
                    </span>
                  )}
                  {product.isCombo && (
                    <span className="rounded-full bg-sky-600/20 px-2 py-0.5 text-[10px] font-semibold text-sky-200 border border-sky-500/40">
                      Combo
                    </span>
                  )}
                </div>

                <h2 className="text-sm md:text-base font-semibold text-slate-50">
                  {product.name}
                </h2>

                {product.description && (
                  <p className="text-xs md:text-sm text-slate-400">
                    {product.description}
                  </p>
                )}

                {product.volumeMl && (
                  <p className="text-[11px] text-slate-500">
                    Aproximadamente {product.volumeMl} ml
                  </p>
                )}
              </div>

              <div className="flex flex-col items-end justify-between gap-2">
                <div className="text-right">
                  {hasPromo ? (
                    <>
                      <div className="text-[11px] text-slate-500 line-through">
                        R$ {product.price.toFixed(2).replace(".", ",")}
                      </div>
                      <div className="text-sm md:text-base font-bold text-emerald-300">
                        R$ {product.promoPrice!.toFixed(2).replace(".", ",")}
                      </div>
                    </>
                  ) : (
                    <div className="text-sm md:text-base font-bold text-slate-50">
                      R$ {product.price.toFixed(2).replace(".", ",")}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleAdd(product)}
                  className="inline-flex items-center gap-1 rounded-full bg-fuchsia-600 px-3 py-1.5 text-xs md:text-sm font-semibold text-white hover:bg-fuchsia-500 active:scale-95 transition"
                >
                  <Plus className="h-3 w-3 md:h-4 md:w-4" />
                  Adicionar
                </button>
              </div>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
