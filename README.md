# Açaí de Casa – App de Loja Virtual

App de loja virtual para o **Açaí de Casa**, focado em pedido online rápido, catálogo de produtos e fechamento simplificado de pedidos (via WhatsApp ou futuro gateway de pagamento).

Este projeto foi construído sobre uma base moderna com **Next.js 14 (App Router)** e pensado para ser leve, responsivo e fácil de escalar.

---

## 🎯 Objetivo do projeto

Entregar um **MVP de loja virtual** para o Açaí de Casa com:

- Catálogo organizado de produtos (copos, combos, adicionais etc.).
- Carrinho de compras com controle de quantidade.
- Tela de checkout simples, focada em conversão.
- Envio do pedido de forma prática (WhatsApp hoje, gateway depois).
- Estrutura pronta para crescer sem refazer tudo do zero.

---

## 🚀 Funcionalidades

- ✅ **Catálogo de produtos** exibido em cards.
- ✅ **Carrinho de compras** com Zustand (adicionar, remover, atualizar quantidade).
- ✅ **Resumo de pedido** com totais.
- ✅ **Formulário de checkout** validado com React Hook Form + Zod.
- ✅ **Integração de checkout com WhatsApp** (envio de resumo do pedido).
- ✅ **Busca de CEP via ViaCEP** (quando configurado).
- ✅ **Toasts de feedback** com Sonner (sucesso/erro).
- ✅ **Animações suaves** com Framer Motion.
- ✅ **Design 100% responsivo** com Tailwind CSS.
- ✅ Estrutura preparada para integração futura com **gateway de pagamento**.

---

## 🧱 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript
- **UI:** React 18 + Tailwind CSS
- **Estado Global:** Zustand
- **Formulários:** React Hook Form + Zod
- **Toasts / Notificações:** Sonner
- **Animações:** Framer Motion
- **Ícones:** Phosphor Icons React
- **Tipografia:** Inter + Playfair Display
- **Deploy:** Vercel

---

## 📁 Estrutura do Projeto

```txt
src/
├── app/
│   ├── layout.tsx        # Layout raiz, fontes, tema, Toaster
│   ├── page.tsx          # Página principal (home da loja)
│   └── globals.css       # Estilos globais
├── components/
│   ├── layout/           # Header, Footer e componentes de estrutura
│   ├── sections/         # Seções da página (hero, lista de produtos, carrinho, checkout)
│   └── ui/               # Botões, inputs, cards e componentes reutilizáveis
└── lib/
    ├── constants/        # Listas de produtos, textos fixos, configs
    └── store/            # Store do Zustand (carrinho, estado global)
A ideia é manter produto, texto e regras de negócio em lib/constants e lib/store, e deixar a parte visual concentrada em components e app.

🛠️ Como rodar localmente
1. Pré-requisitos
Node.js 18+

npm (ou pnpm/yarn, se preferir adaptar os comandos)

Confirme a versão:

bash
Copiar código
node -v
npm -v
2. Clonar o repositório
bash
Copiar código
git clone https://github.com/Replinkrub/acai-de-casa.git
cd acai-de-casa
3. Instalar dependências
bash
Copiar código
npm install
4. Rodar em modo desenvolvimento
bash
Copiar código
npm run dev
Acesse no navegador:

text
Copiar código
http://localhost:3000
5. Build de produção
bash
Copiar código
npm run build
npm start   # Sobe o servidor com o build pronto
🌐 Variáveis de ambiente
Hoje o projeto pode rodar sem variáveis obrigatórias, mas está preparado para configuração de URL pública.

Crie um arquivo .env.local na raiz do projeto, quando necessário:

bash
Copiar código
touch .env.local
Exemplo de variável já suportada:

env
Copiar código
NEXT_PUBLIC_SITE_URL=https://acai-de-casa.vercel.app
Use essa variável para montar links absolutos, redirecionamentos ou mensagens de checkout.

Se forem adicionadas novas integrações (gateway de pagamento, API própria etc.), as novas variáveis devem ser documentadas aqui.

☁️ Deploy na Vercel
Conecte o repositório no Vercel Dashboard.

Configurações recomendadas:

Framework Preset: Next.js

Build Command: npm run build

Install Command: npm install

Output Directory: .next

Configure as variáveis de ambiente da Vercel (se usar .env.local, replique lá).

Cada push na branch main dispara um novo deploy.

📌 Padrões de código
Projeto em TypeScript – manter tipagens atualizadas.

Estilos com Tailwind CSS – evitar CSS solto fora do padrão.

Estado global com Zustand – toda lógica de carrinho e sessão de compra deve ficar na store.

Formulários com React Hook Form + Zod – sempre que houver input do usuário, validar.

Sugestão de scripts (já presentes no package.json):

bash
Copiar código
npm run dev     # desenvolvimento
npm run build   # build de produção
npm start       # servir build
npm run lint    # (se configurado) checagem de lint
🗺️ Próximos passos (roadmap)
 Adaptar textos e identidade visual 100% para o Açaí de Casa (copys, cores, imagens).

 Cadastrar catálogo real de produtos (sabores, tamanhos, adicionais).

 Ajustar fluxo do checkout para a rotina real da loja.

 Integrar com gateway de pagamento (opcional — hoje o foco é pedido via WhatsApp).

 Criar painel simples de gestão de pedidos (futuro).

⚖️ Licença / Uso
Este projeto é de uso interno da operação Açaí de Casa.
Não é autorizada a distribuição, revenda ou reutilização do código sem autorização prévia do proprietário do repositório.
