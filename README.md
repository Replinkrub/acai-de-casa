# Sagrado LP - Landing Page

Landing page responsiva para Sagrado, marca de kits ultracongelados de comida de verdade.

## 🚀 Correções Aplicadas

### Migração Toaster → Sonner
- ✅ Substituído sistema de toast personalizado pelo **Sonner** oficial
- ✅ Removida dependência `@radix-ui/react-toast` 
- ✅ Adicionada dependência `sonner` v1.4.0
- ✅ Adicionada dependência `next-themes` para suporte a temas
- ✅ Atualizados todos os imports de toast nos componentes:
  - `src/components/kit-card.tsx`
  - `src/components/sections/cart-sheet.tsx` 
  - `src/components/sections/checkout-form.tsx`
  - `src/app/layout.tsx`
- ✅ Implementado Toaster oficial do Sonner com suporte a temas

## 🛠️ Tech Stack

- **Framework**: Next.js 14.0.4
- **UI**: React 18 + Tailwind CSS
- **Animações**: Framer Motion
- **Ícones**: Phosphor Icons React
- **Notificações**: Sonner
- **Estado**: Zustand
- **Formulários**: React Hook Form + Zod
- **Tipografia**: Inter + Playfair Display

## 🚀 Deploy no Vercel

### Pré-requisitos
```bash
npm install
```

### Configurações do Vercel

1. **Conecte o repositório** no Vercel Dashboard
2. **Framework Preset**: Next.js
3. **Build Command**: `npm run build`
4. **Output Directory**: `.next`
5. **Install Command**: `npm install`

### Variáveis de Ambiente (se necessário)
```env
NEXT_PUBLIC_SITE_URL=https://sua-dominio.vercel.app
```

### Comandos de Deploy
```bash
# Instalar dependências
npm install

# Build para produção
npm run build

# Testar build localmente
npm start
```

### Estrutura do Projeto
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout raiz com Toaster
│   ├── page.tsx           # Página principal
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── layout/           # Header e Footer
│   ├── sections/         # Seções da página
│   └── ui/              # Componentes UI
└── lib/                  # Utilitários e configurações
    ├── constants/        # Constantes
    └── store/           # Estado global (Zustand)
```

## 📱 Funcionalidades

- ✅ Carrinho de compras com Zustand
- ✅ Formulário de checkout integrado ao WhatsApp
- ✅ Busca automática de CEP (ViaCEP API)
- ✅ Notificações toast com Sonner
- ✅ Animações suaves com Framer Motion
- ✅ Design responsivo com Tailwind CSS
- ✅ Otimizado para SEO e performance

## 🎨 Paleta de Cores

- **Primary**: Purple (600-700)
- **Secondary**: Green (500-600)
- **Background**: White/Gray
- **Text**: Gray (900/600)

## 📄 Licença

Este projeto é propriedade da Sagrado.
