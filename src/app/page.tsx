import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/UI";
import { Icon, WhatsAppIcon } from "@/components/Icon";
import { getProducts, getServices } from "@/lib/queries";
import { SITE, whatsappLink } from "@/lib/site";
import { DEMO_TESTIMONIALS } from "@/lib/demo";
import { formatPrice } from "@/lib/format";

export default async function HomePage() {
  const [services, pecas, materiais] = await Promise.all([
    getServices(true),
    getProducts({ type: "pecas", featured: true, limit: 4 }),
    getProducts({ type: "materiais", featured: true, limit: 4 }),
  ]);

  const featured = [...pecas, ...materiais].slice(0, 8);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 surface-grid opacity-60" />
        <div className="absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-brand-600/20 blur-[130px]" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-amber-500/10 blur-[120px]" />

        <div className="container-site relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div className="animate-fade-up">
            <p className="badge">
              <Icon name="wrench" className="h-3.5 w-3.5" />
              Oficina + Loja de materiais
            </p>

            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] text-white sm:text-6xl">
              Sua moto em boas mãos
              <br />
              <span className="text-brand-500">e sua obra bem feita.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-steel-200 sm:text-lg">
              A <strong className="text-white">{SITE.name}</strong> é a solução completa para o
              seu dia a dia: conserto e revisão de motos com mecânico de confiança, peças
              originais e compatíveis, e material de construção com entrega rápida.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/agendamento" className="btn-primary !px-6 !py-3.5 text-base">
                <Icon name="calendar" className="h-5 w-5" />
                Agendar serviço
              </Link>
              <Link href="/pecas" className="btn-ghost !px-6 !py-3.5 text-base">
                <Icon name="tag" className="h-5 w-5" />
                Ver peças
              </Link>
              <a
                href={whatsappLink(`Olá, ${SITE.name}! Vim pelo site.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost !border-emerald-400/40 !text-emerald-300 hover:!bg-emerald-400/10 !px-6 !py-3.5 text-base"
              >
                <WhatsAppIcon className="h-5 w-5" />
                WhatsApp
              </a>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {[
                { n: "+8", l: "anos de estrada" },
                { n: "+1.500", l: "motos atendidas" },
                { n: "24h", l: "para entrega local" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="font-display text-3xl font-bold text-brand-400">{s.n}</dt>
                  <dd className="text-xs uppercase tracking-wider text-steel-500">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <Illustration />
        </div>
      </section>

      {/* ================= FAIXA DE CONFIANÇA ================= */}
      <section className="border-b border-white/10 bg-ink-900">
        <div className="container-site grid gap-6 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: "shield", t: "Garantia no serviço", d: "Peça e mão de obra com garantia" },
            { icon: "truck", t: "Entrega na obra", d: "Material entregue no seu endereço" },
            { icon: "clock", t: "Atendimento rápido", d: "Motos prontas no mesmo dia" },
            { icon: "tag", t: "Preço justo", d: "Orçamento sem compromisso" },
          ].map((f) => (
            <div key={f.t} className="flex items-start gap-3">
              <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-500/12 text-brand-400">
                <Icon name={f.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-white">{f.t}</p>
                <p className="text-xs text-steel-200">{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= O QUE FAZEMOS ================= */}
      <section className="container-site py-20">
        <SectionHeading
          align="center"
          badge="Três frentes, uma solução"
          title="Tudo o que você precisa em um lugar só"
          description="Da manutenção da moto ao material da sua obra: atendimento direto, sem enrolação e com preço combinado antes."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: "wrench",
              title: "Conserto e Revisão",
              text: "Diagnóstico honesto, troca de óleo, freios, relação, elétrica e revisões completas. Sua moto sai pronta e no prazo.",
              href: "/servicos",
              cta: "Ver serviços",
              accent: "from-brand-500/25 to-brand-500/5 text-brand-400",
            },
            {
              icon: "bike",
              title: "Peças para Motos",
              text: "Óleos, filtros, freios, relação, baterias e pneus. Originais e compatíveis para Honda, Yamaha, Suzuki e mais.",
              href: "/pecas",
              cta: "Ver peças",
              accent: "from-sky-500/25 to-sky-500/5 text-sky-300",
            },
            {
              icon: "hammer",
              title: "Material de Construção",
              text: "Cimento, argamassa, areia, brita, vergalhão, tintas e hidráulica. Do saco de cimento à carga inteira da obra.",
              href: "/materiais",
              cta: "Ver materiais",
              accent: "from-amber-500/25 to-amber-500/5 text-amber-300",
            },
          ].map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="card group flex flex-col p-7 transition hover:-translate-y-1 hover:border-brand-500/40 hover:bg-white/[0.05]"
            >
              <span
                className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${c.accent}`}
              >
                <Icon name={c.icon} className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-white">{c.title}</h3>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-steel-200">{c.text}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-400">
                {c.cta}
                <Icon
                  name="arrow"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= SERVIÇOS EM DESTAQUE ================= */}
      <section className="surface-metal border-y border-white/10">
        <div className="container-site py-20">
          <SectionHeading
            badge="Oficina"
            title="Serviços mais procurados"
            description="Valores de referência. O preço final é combinado depois da avaliação da moto."
            action={{ href: "/servicos", label: "Todos os serviços" }}
          />

          {services.length === 0 ? (
            <p className="mt-10 text-steel-200">
              Cadastre seus serviços no painel para exibi-los aqui.
            </p>
          ) : (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s) => (
                <div
                  key={s.id}
                  className="card flex flex-col p-6 transition hover:border-brand-500/40"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/12 text-brand-400">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-white">{s.name}</h3>
                  {s.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-steel-200">{s.description}</p>
                  )}
                  <div className="mt-4 flex items-baseline justify-between border-t border-white/10 pt-4">
                    <span className="text-xs uppercase tracking-wider text-steel-500">
                      {s.duration ?? "Sob consulta"}
                    </span>
                    <span className="font-display text-2xl font-bold text-brand-400">
                      {s.price ? `a partir de ${formatPrice(s.price)}` : "Consulte"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= PRODUTOS EM DESTAQUE ================= */}
      {featured.length > 0 && (
        <section className="container-site py-20">
          <SectionHeading
            badge="Loja"
            title="Destaques da semana"
            description="Peças de moto e material de construção com os melhores preços da região."
            action={{ href: "/pecas", label: "Ver catálogo completo" }}
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* ================= COMO FUNCIONA ================= */}
      <section className="border-y border-white/10 bg-ink-900">
        <div className="container-site py-20">
          <SectionHeading
            align="center"
            badge="Simples assim"
            title="Como funciona o atendimento"
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { n: "1", t: "Fale com a gente", d: "Entre em contato pelo site, WhatsApp ou telefone e conte o que você precisa." },
              { n: "2", t: "Receba o orçamento", d: "Avaliamos a peça, o material ou a moto e enviamos o preço fechado, sem surpresa." },
              { n: "3", t: "Pague e aproveite", d: "Aceitamos dinheiro, Pix e cartão. Material entregue na obra e moto pronta no prazo." },
            ].map((s) => (
              <li key={s.n} className="card relative p-7">
                <span className="absolute -top-4 left-7 grid h-9 w-9 place-items-center rounded-full bg-brand-500 font-display text-lg font-bold text-ink-950">
                  {s.n}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-white">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-200">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= DEPOIMENTOS ================= */}
      <section className="container-site py-20">
        <SectionHeading align="center" badge="Quem já é cliente" title="Confiança que a gente conquistou na marra" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {DEMO_TESTIMONIALS.map((t) => (
            <figure key={t.name} className="card flex flex-col p-7">
              <div className="flex gap-1 text-brand-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-steel-200">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-5 border-t border-white/10 pt-4">
                <p className="text-sm font-bold text-white">{t.name}</p>
                <p className="text-xs text-steel-500">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ================= CTA FINAL ================= */}
      <section className="container-site pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-brand-500/25 bg-gradient-to-br from-brand-700 via-brand-600 to-amber-600 p-10 text-center sm:p-16">
          <div className="absolute inset-0 surface-grid opacity-20" />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold text-white sm:text-5xl">
              Precisou? É só chamar.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/85 sm:text-lg">
              Orçamento rápido para conserto de moto, peças e material de construção. Atendemos
              na loja e entregamos na sua casa ou obra.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={whatsappLink(`Olá, ${SITE.name}! Preciso de um orçamento.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink-950 px-6 py-3.5 font-bold text-white transition hover:bg-black"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Falar no WhatsApp
              </a>
              <Link
                href="/contato"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/50 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                <Icon name="mail" className="h-5 w-5" />
                Enviar mensagem
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/** Ilustração da hero: moto desenhada em SVG com cards flutuantes. */
function Illustration() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="card relative overflow-hidden p-8 surface-grid">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 to-transparent" />
        <svg
          viewBox="0 0 240 140"
          className="relative w-full drop-shadow-2xl"
          fill="none"
          stroke="currentColor"
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
          role="img"
          aria-label="Ilustração de uma motocicleta"
        >
          <g className="text-brand-400">
            <circle cx="50" cy="100" r="26" />
            <circle cx="50" cy="100" r="9" />
            <circle cx="190" cy="100" r="26" />
            <circle cx="190" cy="100" r="9" />
          </g>
          <g className="text-white">
            <path d="M50 100 L95 62 L145 62 L190 100" />
            <path d="M145 62 L190 100" />
            <path d="M85 62 L100 46 L142 46 L152 62" />
            <path d="M148 50 L162 40 L178 44" />
            <path d="M95 82 L138 88 L168 80" />
            <path d="M100 46 L92 34 L76 34" />
          </g>
        </svg>

        <div className="relative mt-6 grid grid-cols-2 gap-3">
          {[
            { icon: "wrench", t: "Oficina de motos" },
            { icon: "cement", t: "Material de obra" },
          ].map((c) => (
            <div
              key={c.t}
              className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5"
            >
              <Icon name={c.icon} className="h-4 w-4 text-brand-400" />
              <span className="text-xs font-bold text-white">{c.t}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-white/10 bg-ink-900 px-4 py-3 shadow-2xl sm:block">
        <p className="text-[10px] font-bold uppercase tracking-widest text-steel-500">
          Serviço em destaque
        </p>
        <p className="mt-0.5 font-display text-lg font-bold text-white">Revisão Completa</p>
        <p className="text-sm font-bold text-brand-400">a partir de R$ 180,00</p>
      </div>

      <div className="absolute -right-4 top-8 hidden rounded-2xl border border-white/10 bg-ink-900 px-4 py-3 shadow-2xl sm:block">
        <p className="text-[10px] font-bold uppercase tracking-widest text-steel-500">
          Loja
        </p>
        <p className="mt-0.5 font-display text-lg font-bold text-white">Cimento 50kg</p>
        <p className="text-sm font-bold text-brand-400">R$ 36,90 / saco</p>
      </div>
    </div>
  );
}
