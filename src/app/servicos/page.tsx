import type { Metadata } from "next";
import Link from "next/link";
import { Icon, WhatsAppIcon } from "@/components/Icon";
import { formatPrice } from "@/lib/format";
import { getServices } from "@/lib/queries";
import { SITE, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Serviços de Conserto e Revisão de Motos",
  description:
    "Troca de óleo, revisão completa, kit de relação, freios, elétrica, alinhamento e montagem de moto nova. Agende seu serviço na Jefinho Motos & Obra.",
};

export default async function ServicosPage() {
  const services = await getServices();

  return (
    <>
      <section className="border-b border-white/10 surface-metal">
        <div className="container-site py-16 lg:py-20">
          <p className="badge">Oficina mecânica</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            Conserto e revisão de motos com orçamento antes de começar
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-200">
            Nada de serviço escondido: a gente mostra o que está gastando, explica o porquê e só
            mexe na sua moto depois que você aprovar. Trabalhamos com Honda, Yamaha, Suzuki,
            Harley, Royal Enfield e motos elétricas.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/agendamento" className="btn-primary">
              <Icon name="calendar" className="h-5 w-5" />
              Agendar agora
            </Link>
            <a
              href={whatsappLink(`Olá, ${SITE.name}! Quero tirar uma dúvida sobre um serviço.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Tirar dúvida no WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="container-site py-16">
        {services.length === 0 ? (
          <div className="card p-12 text-center text-steel-200">
            Nenhum serviço cadastrado ainda. Faça login na área do lojista para adicionar.
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {services.map((service) => (
              <article key={service.id} className="card flex gap-5 p-6 sm:p-7">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-500/12 text-brand-400">
                  <Icon name={service.icon} className="h-7 w-7" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="font-display text-2xl font-semibold text-white">
                      {service.name}
                    </h2>
                    {service.duration && (
                      <span className="badge">{service.duration}</span>
                    )}
                  </div>

                  {service.description && (
                    <p className="mt-2 text-sm leading-relaxed text-steel-200">
                      {service.description}
                    </p>
                  )}

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                    <p className="font-display text-2xl font-bold text-brand-400">
                      {service.price ? (
                        <>
                          <span className="text-xs font-semibold uppercase tracking-wider text-steel-500">
                            a partir de{" "}
                          </span>
                          {formatPrice(service.price)}
                        </>
                      ) : (
                        "Sob consulta"
                      )}
                    </p>

                    <div className="flex gap-2">
                      <Link
                        href={`/agendamento?servico=${encodeURIComponent(service.name)}`}
                        className="btn-primary !px-4 !py-2 text-sm"
                      >
                        Agendar
                      </Link>
                      <a
                        href={whatsappLink(
                          `Olá! Quero saber mais sobre o serviço: ${service.name}.`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost !px-3 !py-2"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="card mt-10 flex flex-col items-start gap-4 p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">
              Não achou o serviço que precisa?
            </h2>
            <p className="mt-1 text-sm text-steel-200">
              Fazemos retífica, injeção eletrônica, instalação de acessórios e muito mais.
              Chame e conte o problema.
            </p>
          </div>
          <a
            href={whatsappLink(`Olá, ${SITE.name}! Preciso de um serviço especial: `)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary shrink-0"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Falar com a oficina
          </a>
        </div>
      </section>
    </>
  );
}
