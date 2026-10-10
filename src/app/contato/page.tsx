import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Icon, WhatsAppIcon } from "@/components/Icon";
import { SITE, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato e Orçamento",
  description:
    "Fale com a Jefinho Motos & Obra: tire dúvidas sobre conserto de motos, peças e material de construção.",
};

type SearchParams = { produto?: string; id?: string };

export default async function ContatoPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const initialProduct = params.produto
    ? { name: params.produto, id: params.id ?? "" }
    : undefined;

  return (
    <section className="container-site py-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
        <div>
          <p className="badge">Fale com a gente</p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            Contato e orçamento
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-200">
            Pergunte sobre uma peça, peça um orçamento de obra ou tire dúvida sobre o serviço da
            sua moto. Respondemos no horário comercial.
          </p>

          <div className="mt-8">
            <ContactForm initialProduct={initialProduct} />
          </div>
        </div>

        <aside className="space-y-4">
          <div className="card p-6">
            <h2 className="font-display text-xl font-bold text-white">Atendimento direto</h2>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex gap-3">
                <Icon name="phone" className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                <div>
                  <p className="font-semibold text-white">WhatsApp / Telefone</p>
                  <a
                    href={whatsappLink(`Olá, ${SITE.name}! Vim pelo site.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-400 hover:underline"
                  >
                    {SITE.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Icon name="mail" className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                <div>
                  <p className="font-semibold text-white">E-mail</p>
                  <a href={`mailto:${SITE.email}`} className="text-brand-400 hover:underline">
                    {SITE.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Icon name="map" className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                <div>
                  <p className="font-semibold text-white">Endereço</p>
                  <p className="text-steel-200">
                    {SITE.address}
                    <br />
                    {SITE.city}
                  </p>
                  <a
                    href={SITE.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-brand-400 hover:underline"
                  >
                    Ver no mapa →
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div className="card p-6">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold text-white">
              <Icon name="clock" className="h-5 w-5 text-brand-400" />
              Horários
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SITE.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-4 border-b border-white/5 pb-2">
                  <span className="text-steel-200">{h.days}</span>
                  <span
                    className={h.time === "Fechado" ? "text-steel-500" : "font-semibold text-white"}
                  >
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <a
            href={whatsappLink(`Olá, ${SITE.name}! Vim pelo site e quero atendimento rápido.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Chamar no WhatsApp
          </a>
        </aside>
      </div>
    </section>
  );
}
