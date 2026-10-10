# 🏍️ Jefinho Motos & Obra

Site oficial da **Jefinho Motos & Obra** — oficina de motos, loja de peças e depósito de
material de construção.

Feito com **Next.js 16** + **Supabase** (banco de dados e login) e publicado no **Render**.

---

## O que o site tem

| Página | Descrição |
| --- | --- |
| `/` | Página inicial com apresentação, serviços e produtos em destaque |
| `/servicos` | Lista de serviços da oficina com preços |
| `/pecas` | Catálogo de peças de moto com busca e filtros |
| `/materiais` | Catálogo de material de construção com busca e filtros |
| `/agendamento` | Cliente agenda o conserto/revisão da moto online |
| `/contato` | Formulário de contato e orçamento |
| `/login` | Área do lojista (e-mail e senha) |
| `/admin` | Painel: visão geral, produtos, orçamentos, agendamentos e mensagens |
| `/api/health` | Verificação de saúde usada pelo Render |

**Banco de dados (Supabase):**

- `categories` — categorias de peças e materiais
- `products` — produtos (peças e materiais)
- `services` — serviços da oficina
- `quotes` — pedidos de orçamento feitos pelo site
- `appointments` — agendamentos de serviço
- `messages` — mensagens do formulário de contato

---

## 🚀 Passo a passo para colocar no ar

### 1. Criar a conta no GitHub

1. Acesse <https://github.com> e crie uma conta gratuita.
2. Instale o Git: <https://git-scm.com/download/win>.

### 2. Subir o projeto para o GitHub

Abra o terminal **dentro da pasta do projeto** e rode:

```bash
git init
git add .
git commit -m "Jefinho Motos & Obra - site inicial"
git branch -M main
```

Depois crie um repositório em <https://github.com/new> (pode ser público ou privado) e rode:

```bash
git remote add origin https://github.com/SEU-USUARIO/jefinho-motos-e-obra.git
git push -u origin main
```

> Troque `SEU-USUARIO/jefinho-motos-e-obra` pelo endereço que o GitHub mostrar.

### 3. Criar o banco no Supabase

1. Acesse <https://supabase.com> e crie uma conta gratuita.
2. Clique em **New Project**, escolha um nome (ex.: `jefinho-motos-e-obra`) e defina uma senha.
3. Aguarde o projeto ficar verde (**Active**).
4. No menu lateral, vá em **SQL Editor** → **New query**.
5. Cole **todo o conteúdo** do arquivo [`supabase/schema.sql`](supabase/schema.sql) e clique em **Run**.
6. Vá em **Authentication → Users → Add user**:
   - marque **Auto Confirm User**
   - informe o e-mail e a senha que você vai usar no painel (`/login`)
7. Vá em **Project Settings → API** e copie:
   - **Project URL**
   - **anon public** key
   - **service_role** key

### 4. Publicar no Render

1. Acesse <https://render.com> e crie uma conta (o plano **Free** funciona).
2. Clique em **New → Blueprint** e conecte o repositório do GitHub criado no passo 2.
3. O Render vai ler o arquivo `render.yaml` e criar o serviço automaticamente.
4. Adicione as variáveis de ambiente no painel do Render
   (**Environment → Environment Variables**):

   | Variável | Valor |
   | --- | --- |
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://SEU-PROJETO.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | chave **anon public** |
   | `SUPABASE_SERVICE_ROLE_KEY` | chave **service_role** |
   | `NEXT_PUBLIC_WHATSAPP` | `5511999999999` (com DDI e DDD) |

5. Clique em **Deploy**. Em alguns minutos o site fica no ar em
   `https://jefinho-motos-e-obra.onrender.com`.

> **Importante:** o Render precisa das variáveis de ambiente **antes** do build, senão o site
> sobe em modo demonstração (com produtos de exemplo). Se isso acontecer, basta clicar em
> **Manual Deploy → Clear build cache & deploy**.

### 5. Rodando o site no seu computador

```bash
# 1) instale as dependências
npm install

# 2) copie o exemplo de variáveis de ambiente
copy .env.example .env.local      # no macOS/Linux: cp .env.example .env.local

# 3) preencha o .env.local com as chaves do Supabase

# 4) rode em modo desenvolvimento
npm run dev
```

O site abre em <http://localhost:3000>.

> Sem configurar o Supabase, o site funciona em **modo demonstração** com produtos de exemplo —
> ótimo para conferir o visual antes de conectar o banco.

---

## 🧰 Como usar o painel do lojista

1. Acesse `https://SEU-SITE.onrender.com/login`.
2. Entre com o e-mail e a senha criados no Supabase (passo 3.6).
3. No painel você pode:
   - **Produtos** → cadastrar, editar, ocultar e excluir peças e materiais
   - **Orçamentos** → ver quem pediu preço e mudar o status
   - **Agendamentos** → confirmar ou cancelar horários
   - **Mensagens** → ler os contatos do formulário

---

## 🔧 Personalizando

### Telefone, endereço e horários

Edite o arquivo [`src/lib/site.ts`](src/lib/site.ts):

```ts
export const SITE = {
  whatsapp: "5511999999999",   // formato: 55 + DDD + número
  phoneDisplay: "(11) 99999-9999",
  address: "Rua das Oficinas, 123 - Centro",
  city: "São Paulo - SP",
  ...
};
```

### Produtos, categorias e serviços

- **Pelo painel** (`/admin`) → produtos
- **Pelo Supabase** → tabelas `categories` e `services` no SQL Editor

### Cores da marca

Todas as cores ficam em [`src/app/globals.css`](src/app/globals.css), na seção `@theme`.
Basta trocar os valores `--color-brand-*` para mudar o laranja do site.

---

## 📁 Estrutura do projeto

```
jefinho-motos-e-obra/
├── render.yaml               # configuração de deploy no Render
├── supabase/
│   └── schema.sql            # tabelas, permissões e dados iniciais
└── src/
    ├── app/                  # páginas (App Router)
    │   ├── page.tsx          # home
    │   ├── pecas/            # catálogo de peças
    │   ├── materiais/        # catálogo de materiais
    │   ├── servicos/         # serviços da oficina
    │   ├── agendamento/      # agendamento online
    │   ├── contato/          # formulário de contato
    │   ├── login/            # login do lojista
    │   ├── admin/            # painel de gestão
    │   └── api/health/       # health check do Render
    ├── components/           # botões, cards, formulários
    └── lib/
        ├── site.ts           # telefone, endereço, textos da loja
        ├── queries.ts        # leitura dos dados
        ├── actions.ts        # formulários e CRUD do painel
        └── supabase/         # conexão com o banco
```

---

## ✅ Checklist antes de publicar

- [ ] Criar conta no **Supabase** e rodar o `supabase/schema.sql`
- [ ] Criar o usuário administrador em **Authentication → Users**
- [ ] Subir o código para o **GitHub**
- [ ] Criar o **Blueprint** no Render
- [ ] Configurar as variáveis de ambiente no Render
- [ ] Trocar telefone, endereço e horários em `src/lib/site.ts`
- [ ] Substituir os produtos de exemplo pelos reais (painel `/admin`)
- [ ] Testar o formulário de contato e o agendamento
