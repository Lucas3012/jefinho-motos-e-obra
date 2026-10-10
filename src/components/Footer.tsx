import Link from "next/link";
import { NAV, SITE, whatsappLink } from "@/lib/site";
import { Icon } from "./Icon";

export function Footer() {
  return (
    <footer className="surface-metal border-t border-white/10">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700">
              <Icon name="bike" className="h-6 w-6 text-ink-950" strokeWidth={2} />
            </span>
            <span className="leading-none">
              <span className="block font-display text-lg font-bold text-white">JEFINHO</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-400">
                Motos &amp; Obra
              </span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-steel-200">
            Oficina de motos com mecânico de confiança, peças originais e compatíveis e
            material de construção com entrega rápida na sua obra.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-brand-400">Navegue</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-steel-200 transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/login" className="text-steel-200 transition hover:text-white">
                Área do lojista
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-brand-400">Contato</h3>
          <ul className="mt-4 space-y-3 text-sm text-steel-200">
            <li className="flex gap-3">
              <Icon name="map" className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
              <span>
                {SITE.address}
                <br />
                {SITE.city} — CEP {SITE.cep}
              </span>
            </li>
            <li className="flex gap-3">
              <Icon name="phone" className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
              <a
                href={whatsappLink("Olá! Vim pelo site da Jefinho Motos & Obra.")}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                {SITE.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <Icon name="mail" className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
              <a href={`mailto:${SITE.email}`} className="transition hover:text-white">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-brand-400">Horários</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SITE.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-4 border-b border-white/5 pb-2">
                <span className="text-steel-200">{h.days}</span>
                <span className={h.time === "Fechado" ? "text-steel-500" : "font-semibold text-white"}>
                  {h.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-5 text-xs text-steel-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.</p>
          <p>Conserto de motos · Peças · Material de construção</p>
        </div>
      </div>
    </footer>
  );
}
