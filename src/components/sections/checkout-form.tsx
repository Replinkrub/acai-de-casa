'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { z } from 'zod'
import { useCart } from '@/lib/store/cart'
import { generateWhatsAppLink } from '@/lib/generate-whatsapp-link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { toast } from 'sonner'
import { CircleNotch } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

const checkoutSchema = z.object({
  nome: z.string().min(2, 'Informe seu nome'),
  telefone: z.string().min(8, 'Informe um telefone válido'),
  cep: z.string().min(8, 'Informe o CEP'),
  rua: z.string().min(2, 'Informe a rua'),
  numero: z.string().min(1, 'Informe o número'),
  bairro: z.string().min(2, 'Informe o bairro'),
  cidade: z.string().min(2, 'Informe a cidade'),
  uf: z.string().min(2, 'UF').max(2, 'UF deve ter 2 letras'),
  referencia: z.string().optional(),
  pagamento: z.string().min(1, 'Escolha a forma de pagamento'),
  observacoes: z.string().optional(),
})

type FormValues = z.infer<typeof checkoutSchema>

export function CheckoutForm() {
  const { getItems, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      nome: '',
      telefone: '',
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      uf: '',
      referencia: '',
      pagamento: '',
      observacoes: '',
    },
  })

  const handleBuscarCep = async () => {
    const cepRaw = form.getValues('cep') || ''
    const cep = cepRaw.replace(/\D/g, '')
    if (cep.length !== 8) {
      toast.error('CEP inválido. Use 8 dígitos.')
      return
    }

    try {
      setIsLoading(true)
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await res.json()

      if (data.erro) {
        toast.error('CEP não encontrado.')
        return
      }

      form.setValue('rua', data.logradouro || '')
      form.setValue('bairro', data.bairro || '')
      form.setValue('cidade', data.localidade || '')
      form.setValue('uf', data.uf || '')
      toast.success('Endereço preenchido pelo CEP.')
    } catch (err) {
      console.error(err)
      toast.error('Erro ao buscar CEP. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: FormValues) => {
    const items = getItems()
    if (!items || items.length === 0) {
      toast.error('Seu carrinho está vazio.')
      return
    }

    try {
      setIsLoading(true)
      const url = generateWhatsAppLink(items, data)
      window.open(url, '_blank')
      clearCart()
      toast.success('Pedido enviado para o WhatsApp.')
    } catch (err) {
      console.error(err)
      toast.error('Não foi possível abrir o WhatsApp. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="grid gap-3"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Como podemos te chamar?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp</FormLabel>
                  <FormControl>
                    <Input placeholder="(81) 9 9999-9999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-[2fr,3fr]">
            <FormField
              control={form.control}
              name="cep"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input placeholder="00000-000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-end">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleBuscarCep}
                disabled={isLoading}
              >
                Buscar CEP
              </Button>
            </div>
          </div>

          <FormField
            control={form.control}
            name="rua"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rua</FormLabel>
                <FormControl>
                  <Input placeholder="Nome da rua" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-3 sm:grid-cols-[1fr,1fr]">
            <FormField
              control={form.control}
              name="numero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input placeholder="Nº" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bairro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input placeholder="Bairro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-[2fr,1fr]">
            <FormField
              control={form.control}
              name="cidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Cidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="uf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>UF</FormLabel>
                  <FormControl>
                    <Input placeholder="PE" maxLength={2} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="referencia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ponto de referência</FormLabel>
                <FormControl>
                  <Input placeholder="Apartamento, portão, ponto conhecido..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pagamento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Forma de pagamento</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Pix">Pix</SelectItem>
                    <SelectItem value="Crédito">Cartão de crédito</SelectItem>
                    <SelectItem value="Débito">Cartão de débito</SelectItem>
                    <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="observacoes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <Input placeholder="Alguma orientação extra para entrega?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.05 }}
        >
          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold"
            disabled={isLoading}
          >
            {isLoading && <CircleNotch className="mr-2 h-5 w-5 animate-spin" />}
            <span className="flex items-center gap-2">
              Finalizar pedido no WhatsApp
            </span>
          </Button>
        </motion.div>
      </form>
    </Form>
  )
}
