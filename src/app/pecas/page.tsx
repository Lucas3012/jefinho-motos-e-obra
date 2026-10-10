import type { Metadata } from "next";
import { Catalog } from "@/components/Catalog";
import { Icon, WhatsAppIcon } from "@/components/Icon";
import { getCategories, getProducts } from "@/lib/queries";
import { SITE, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Peças para Motos — Originais e Compatíveis",
  description:
    "Óleos, filtros, pastilhas de freio, kit de relação, baterias, pneus e acessórios para Honda, Yamaha, Suzuki e mais. Peça pelo site e retire na loja.",
};

export default async function PecasPage() {
  const [products, categories] = await Promise.all([
    getProducts({ type: "pecas" }),
    getCategories(),
  ]);

  return (
    <>
      <section className="border-b border-white/10 surface-metal">
        <div className="container-site py-14 lg:py-16">
          <p className="badge">
            <Icon name="bike" className="h-3.5 w-3.5" />
            Loja de peças
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            Peças para a sua moto, do óleo ao kit de relação
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-200">
            Trabalhamos com linhas originais e compatíveis das principais marcas. Não achou a
            peça que precisa? Mande o modelo da sua moto que a gente consegue trazer.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-steel-200">
            {[
              { icon: "check", t: "Originais e compatíveis" },
              { icon: "check", t: "Garantia de fábrica" },
              { icon: "check", t: "Instalação na hora" },
            ].map((f) => (
              <span key={f.t} className="inline-flex items-center gap-2">
                <Icon name={f.icon} className="h-4 w-4 text-emerald-400" />
                {f.t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-12">
        <Catalog products={products} categories={categories} type="pecas" />

        <div className="card mt-12 flex flex-col items-start gap-4 p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">
              Procurando uma peça específica?
            </h2>
            <p className="mt-1 text-sm text-steel-200">
              Mande o modelo da moto, o ano e a peça que você precisa. Respondemos com preço e
              prazo.
            </p>
          </div>
          <a
            href={whatsappLink(
              `Olá, ${SITE.name}! Procuro uma peça: (informe modelo da moto, ano e a peça).`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary shrink-0"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Pedir uma peça
          </a>
        </div>
      </section>
    </>
  );
}
