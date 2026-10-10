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

Todas as tabelas usam o prefixo **`jm_`** de propósito — assim elas convivem com as tabelas de
outros projetos sem se misturar.

| Tabela | O que guarda |
| --- | --- |
| `jm_categories` | categorias de peças e materiais |
| `jm_products` | produtos (peças e materiais) |
| `jm_services` | serviços da oficina |
| `jm_quotes` | pedidos de orçamento feitos pelo site |
| `jm_appointments` | agendamentos de serviço |
| `jm_messages` | mensagens do formulário de contato |

---

## 🌐 Site no ar

| | |
| --- | --- |
| **Site** | <https://jefinho-motos-e-obra.onrender.com> |
| **Painel** | <https://jefinho-motos-e-obra.onrender.com/login> |
| **Repositório** | <https://github.com/Lucas3012/jefinho-motos-e-obra> |
| **Banco** | Supabase `lojavirtual` (compartilhado com o site Lojavirtual) |

> ⚠️ O banco é **compartilhado** com outro site, por isso o prefixo `jm_`. Nunca use
> `drop table` fora das tabelas que começam com `jm_`.

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
7. Vá em **Project Settings → API Keys** e copie:
   - **Project URL**
   - a chave **publishable** (`sb_publishable_...`) — é ela que vai no lugar da antiga `anon`
   - a chave **service_role**
   - ⚠️ Neste projeto a chave `anon` legada (JWT) está **desativada** e devolve erro `401`.
     Use sempre a `sb_publishable_...`.

### 4. Publicar no Render

1. Acesse <https://render.com> e crie uma conta (o plano **Free** funciona).
2. Clique em **New → Blueprint** e conecte o repositório do GitHub criado no passo 2.
3. O Render vai ler o arquivo `render.yaml` e criar o serviço automaticamente.
4. Confira as variáveis de ambiente em **Environment → Environment Variables**:

   | Variável | Onde fica | Valor |
   | --- | --- | --- |
   | `NEXT_PUBLIC_SUPABASE_URL` | no `render.yaml` | `https://icchspesfqmeakbajlfh.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | no `render.yaml` | chave **publishable** (`sb_publishable_...`) |
   | `NEXT_PUBLIC_SITE_URL` | no `render.yaml` | endereço do site |
   | `NEXT_PUBLIC_WHATSAPP` | **painel do Render** | `55` + DDD + número |
   | `SUPABASE_SERVICE_ROLE_KEY` | **painel do Render** | chave **service_role** (segredo) |

   As duas últimas ficam com `sync: false`, ou seja: você edita pelo painel do Render e o
   `render.yaml` não sobrescreve. **Nunca** cole a `service_role` no repositório.

5. Clique em **Deploy**. Em alguns minutos o site fica no ar em
   `https://jefinho-motos-e-obra.onrender.com`.

> **Importante:** o Render precisa das variáveis de ambiente **antes** do build, senão o site
> sobe em modo demonstração (com produtos de exemplo). Se isso acontecer, basta clicar em
> **Manual Deploy → Clear build cache & deploy**.
>
> **Também importante:** o `buildCommand` precisa ser `npm ci --include=dev` porque o
> `NODE_ENV=production` faz o `npm ci` pular as devDependencies (onde estão `tailwindcss`,
> `@tailwindcss/postcss` e `typescript`). Já está correto no `render.yaml`.

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
- **Pelo Supabase** → tabelas `jm_categories` e `jm_services` no SQL Editor

### Como publicar uma alteração

```bash
git add .
git commit -m "descreva o que mudou"
git push origin main
```

O Render detecta o `git push` e faz o deploy sozinho (`autoDeploy: true` no `render.yaml`),
em 2 a 4 minutos. Você acompanha em <https://dashboard.render.com>.

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

- [x] Criar conta no **Supabase** e rodar o `supabase/schema.sql`
- [x] Criar o usuário administrador em **Authentication → Users**
- [x] Subir o código para o **GitHub**
- [x] Criar o **Blueprint** no Render
- [x] Configurar as variáveis de ambiente no Render
- [ ] Trocar telefone, endereço e horários em `src/lib/site.ts`
- [ ] Trocar o número do **WhatsApp** (painel do Render → `NEXT_PUBLIC_WHATSAPP`)
- [ ] Trocar a **senha** do painel em **Supabase → Authentication → Users**
- [ ] Substituir os produtos de exemplo pelos reais (painel `/admin`)
- [ ] Testar o formulário de contato e o agendamento

---

## 🔐 Credenciais do painel

| | |
| --- | --- |
| URL | <https://jefinho-motos-e-obra.onrender.com/login> |
| E-mail | `lukinhas87.let@gmail.com` |
| Senha | `JefinhoMotos2026` |

> **Troque essa senha** em Supabase → **Authentication → Users** → usuário → *Reset password*.
