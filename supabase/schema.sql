-- =====================================================================
--  JEFINHO MOTOS & OBRA — Schema do Supabase
--
--  ATENÇÃO: todas as tabelas usam o prefixo `jm_` de propósito.
--  Este site compartilha o banco de dados com o projeto "lojavirtual",
--  e o prefixo garante que nada se misture nem seja apagado por engano.
--
--  Como usar:
--    1) Supabase > SQL Editor > New query
--    2) Cole TODO o conteúdo deste arquivo e clique em "Run"
-- =====================================================================

create extension if not exists "pgcrypto";

-- =====================================================================
-- 1) CATEGORIAS
-- =====================================================================
drop table if exists public.jm_categories cascade;
create table public.jm_categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  type        text not null default 'pecas' check (type in ('pecas', 'materiais')),
  description text,
  icon        text,
  position    int  not null default 0,
  created_at  timestamptz not null default now()
);

-- =====================================================================
-- 2) PRODUTOS (peças de moto + material de construção)
-- =====================================================================
drop table if exists public.jm_products cascade;
create table public.jm_products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  type        text not null default 'pecas' check (type in ('pecas', 'materiais')),
  category_id uuid references public.jm_categories(id) on delete set null,
  brand       text,
  price       numeric(12,2),
  unit        text not null default 'un',
  stock       int,
  image_url   text,
  featured    boolean not null default false,
  active      boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index jm_products_type_idx     on public.jm_products (type);
create index jm_products_active_idx   on public.jm_products (active);
create index jm_products_category_idx on public.jm_products (category_id);

-- =====================================================================
-- 3) SERVIÇOS (conserto / revisão de motos)
-- =====================================================================
drop table if exists public.jm_services cascade;
create table public.jm_services (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  price       numeric(12,2),
  duration    text,
  icon        text,
  featured    boolean not null default false,
  active      boolean not null default true,
  position    int not null default 0,
  created_at  timestamptz not null default now()
);

-- =====================================================================
-- 4) ORÇAMENTOS (pedidos de preço feitos pelo site)
-- =====================================================================
drop table if exists public.jm_quotes cascade;
create table public.jm_quotes (
  id             uuid primary key default gen_random_uuid(),
  customer_name  text not null,
  customer_phone text not null,
  customer_email text,
  product_id     uuid references public.jm_products(id) on delete set null,
  product_name   text,
  quantity       int not null default 1,
  message        text,
  status         text not null default 'novo'
                 check (status in ('novo', 'contatado', 'aprovado', 'cancelado')),
  created_at     timestamptz not null default now()
);

-- =====================================================================
-- 5) AGENDAMENTOS (serviços na oficina)
-- =====================================================================
drop table if exists public.jm_appointments cascade;
create table public.jm_appointments (
  id             uuid primary key default gen_random_uuid(),
  customer_name  text not null,
  customer_phone text not null,
  motorcycle     text not null,
  plate          text,
  service_id     uuid references public.jm_services(id) on delete set null,
  service_name   text,
  preferred_date date not null,
  preferred_time time not null,
  notes          text,
  status         text not null default 'pendente'
                 check (status in ('pendente', 'confirmado', 'concluido', 'cancelado')),
  created_at     timestamptz not null default now()
);

-- =====================================================================
-- 6) MENSAGENS (formulário de contato)
-- =====================================================================
drop table if exists public.jm_messages cascade;
create table public.jm_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  phone      text,
  email      text,
  subject    text,
  message    text not null,
  read       boolean not null default false,
  created_at timestamptz not null default now()
);

-- =====================================================================
-- TRIGGER: updated_at dos produtos
-- =====================================================================
create or replace function public.jm_touch_updated_at()
returns trigger language plpgsql as
'begin
  new.updated_at = now();
  return new;
end;';

drop trigger if exists jm_products_touch on public.jm_products;
create trigger jm_products_touch
  before update on public.jm_products
  for each row execute function public.jm_touch_updated_at();

-- =====================================================================
-- ROW LEVEL SECURITY (RLS)
--   * visitantes => leem produtos/serviços ativos e criam pedidos
--   * lojista    => (usuário logado no Supabase Auth) pode tudo
-- =====================================================================
alter table public.jm_categories   enable row level security;
alter table public.jm_products     enable row level security;
alter table public.jm_services     enable row level security;
alter table public.jm_quotes       enable row level security;
alter table public.jm_appointments enable row level security;
alter table public.jm_messages     enable row level security;

create or replace function public.jm_is_owner()
returns boolean language sql stable as
  'select auth.uid() is not null';

drop policy if exists "jm categorias leitura" on public.jm_categories;
create policy "jm categorias leitura"
  on public.jm_categories for select using (true);
drop policy if exists "jm categorias dono" on public.jm_categories;
create policy "jm categorias dono"
  on public.jm_categories for all using (public.jm_is_owner()) with check (public.jm_is_owner());

drop policy if exists "jm produtos leitura" on public.jm_products;
create policy "jm produtos leitura"
  on public.jm_products for select using (active = true);
drop policy if exists "jm produtos dono" on public.jm_products;
create policy "jm produtos dono"
  on public.jm_products for all using (public.jm_is_owner()) with check (public.jm_is_owner());

drop policy if exists "jm servicos leitura" on public.jm_services;
create policy "jm servicos leitura"
  on public.jm_services for select using (active = true);
drop policy if exists "jm servicos dono" on public.jm_services;
create policy "jm servicos dono"
  on public.jm_services for all using (public.jm_is_owner()) with check (public.jm_is_owner());

drop policy if exists "jm orcamentos criar" on public.jm_quotes;
create policy "jm orcamentos criar"
  on public.jm_quotes for insert with check (true);
drop policy if exists "jm orcamentos dono" on public.jm_quotes;
create policy "jm orcamentos dono"
  on public.jm_quotes for all using (public.jm_is_owner()) with check (public.jm_is_owner());

drop policy if exists "jm agendamentos criar" on public.jm_appointments;
create policy "jm agendamentos criar"
  on public.jm_appointments for insert with check (true);
drop policy if exists "jm agendamentos dono" on public.jm_appointments;
create policy "jm agendamentos dono"
  on public.jm_appointments for all using (public.jm_is_owner()) with check (public.jm_is_owner());

drop policy if exists "jm mensagens criar" on public.jm_messages;
create policy "jm mensagens criar"
  on public.jm_messages for insert with check (true);
drop policy if exists "jm mensagens dono" on public.jm_messages;
create policy "jm mensagens dono"
  on public.jm_messages for all using (public.jm_is_owner()) with check (public.jm_is_owner());

-- =====================================================================
-- DADOS DE EXEMPLO (apague depois de colocar seus produtos reais)
-- =====================================================================
insert into public.jm_categories (name, slug, type, description, icon, position) values
  ('Filtros e Óleos',       'filtros-e-oleos',        'pecas',    'Óleo de motor, filtros de óleo, ar e combustível',      'oil', 1),
  ('Freios',                'freios',                 'pecas',    'Pastilhas, discos, sapatas e sangria de freio',         'brake', 2),
  ('Transmissão',           'transmissao',            'pecas',    'Correntes, pinhões, kit relação e coroa',               'chain', 3),
  ('Elétrica',              'eletrica',               'pecas',    'Baterias, velas, lâmpadas e chicotes',                  'bolt', 4),
  ('Suspensão e Pneus',     'suspensao-e-pneus',      'pecas',    'Amortecedores, pneus, câmaras e rodas',                 'wheel', 5),
  ('Cimento e Argamassa',   'cimento-e-argamassa',    'materiais','Cimento, argamassa, cal e gesso',                       'cement', 1),
  ('Aço e Ferragens',       'aco-e-ferragens',        'materiais','Vergalhão, tela, perfil, parafusos e ferragens',        'steel', 2),
  ('Areia, Brita e Solo',   'areia-brita-e-solo',     'materiais','Areia lavada, brita, pedrisco e terra vegetal',         'sand', 3),
  ('Tintas e Revestimentos','tintas-e-revestimentos', 'materiais','Tintas, primers, revestimentos e texturas',             'paint', 4),
  ('Hidráulica e Elétrico', 'hidraulica-e-eletrico',  'materiais','Tubos, conexões, fios, disjuntores e caixas',           'pipe', 5),
  ('Madeira e Contraplacado','madeira-e-contraplacado','materiais','Madeira, compensado, MDF, tábuas e ripas',             'wood', 6);

insert into public.jm_products (name, description, type, category_id, brand, price, unit, stock, image_url, featured) values
  ('Óleo de Motor 20W50 - 1L', 'Óleo mineral para motos 4 tempos. Ideal para uso urbano e viagens curtas.', 'pecas',
     (select id from public.jm_categories where slug = 'filtros-e-oleos'), 'Ipiranga', 39.90, 'un', 48, null, true),
  ('Kit de Relação 428H', 'Kit completo com corrente, pinhão e coroa. Durabilidade elevada para motos 125cc e 160cc.', 'pecas',
     (select id from public.jm_categories where slug = 'transmissao'), 'DID', 189.90, 'kit', 12, null, true),
  ('Pastilha de Freio Dianteira', 'Pastilha sem amianto para motos populares. Excelente frenagem e baixo ruído.', 'pecas',
     (select id from public.jm_categories where slug = 'freios'), 'Bosch', 79.90, 'par', 25, null, true),
  ('Bateria 5Ah Motocicleta', 'Bateria selada, sem manutenção. Compatível com CG, Fan, Factor e Biz.', 'pecas',
     (select id from public.jm_categories where slug = 'eletrica'), 'Moura', 229.90, 'un', 8, null, false),
  ('Filtro de Ar - CG 160', 'Filtro de ar original, garante rendimento e protege o motor.', 'pecas',
     (select id from public.jm_categories where slug = 'filtros-e-oleos'), 'Honda', 44.90, 'un', 30, null, false),
  ('Pneu Traseiro 110/80-14', 'Pneu tubeless para motos urbanas. Ótima aderência em piso molhado.', 'pecas',
     (select id from public.jm_categories where slug = 'suspensao-e-pneus'), 'Pirelli', 259.90, 'un', 10, null, false),
  ('Cimento CP II - 50kg', 'Cimento Portland comum para alvenaria, contrapiso e fundações.', 'materiais',
     (select id from public.jm_categories where slug = 'cimento-e-argamassa'), 'Votorantim', 36.90, 'saco', 400, null, true),
  ('Brita 0 (Pedrisco) - m³', 'Brita graduada para contrapiso, alicerce e concreto armado.', 'materiais',
     (select id from public.jm_categories where slug = 'areia-brita-e-solo'), null, 289.00, 'm³', null, null, true),
  ('Areia Lavada - m³', 'Areia lavada e peneirada para argamassa, reboco e assentamento.', 'materiais',
     (select id from public.jm_categories where slug = 'areia-brita-e-solo'), null, 219.00, 'm³', null, null, false),
  ('Vergalhão 10mm - 12m', 'Vergalhão CA-50 para armadura de fundação, laje e pilares.', 'materiais',
     (select id from public.jm_categories where slug = 'aco-e-ferragens'), 'Gerdau', 79.90, 'barra', 150, null, false),
  ('Tinta Acrílica Fosca - 18L', 'Tinta acrílica de alta cobertura para paredes internas e externas.', 'materiais',
     (select id from public.jm_categories where slug = 'tintas-e-revestimentos'), 'Suvinil', 329.90, 'lata', 20, null, true),
  ('Tubo PVC Esgoto 100mm - 6m', 'Tubo PVC sanfonado para esgotamento sanitário e pluvial.', 'materiais',
     (select id from public.jm_categories where slug = 'hidraulica-e-eletrico'), 'Tigre', 89.90, 'barra', 60, null, false);

insert into public.jm_services (name, description, price, duration, icon, featured, position) values
  ('Troca de Óleo e Filtros', 'Troca de óleo do motor, limpeza ou troca do filtro de ar e verificação geral dos fluidos.', 90.00, '30 min', 'oil', true, 1),
  ('Revisão Completa', 'Revisão de 20 mil km: freios, relação, velas, cabos, pneus, nivelamento e aperto geral.', 180.00, '2h', 'wrench', true, 2),
  ('Troca de Relação', 'Instalação de kit de relação novo com regulagem de tensão e alinhamento da roda traseira.', 120.00, '1h', 'chain', true, 3),
  ('Troca de Pastilha e Disco', 'Substituição de pastilhas, retífica de disco quando necessário e sangria do sistema de freio.', 110.00, '1h', 'brake', false, 4),
  ('Serviço de Elétrica', 'Diagnóstico e reparo de partida, regulação de voltagem, troca de baterias, velas e lâmpadas.', 100.00, '1h', 'bolt', false, 5),
  ('Alinhamento e Balanceamento', 'Alinhamento de direção e balanceamento de rodas para direção mais segura e economia de pneu.', 70.00, '40 min', 'wheel', false, 6),
  ('Troca de Amortecedores', 'Substituição de amortecedores dianteiros e/ou traseiros com verificação da suspensão completa.', 140.00, '1h30', 'spring', false, 7),
  ('Montagem de Moto Nova', 'Montagem completa de motocicleta zero com check-list de 32 itens e primeira revisão.', 250.00, '4h', 'bike', true, 8);

-- =====================================================================
-- FIM — lembre-se de criar seu usuário de administrador em
--        Authentication > Users > "Add user" (e-mail + senha)
-- =====================================================================
