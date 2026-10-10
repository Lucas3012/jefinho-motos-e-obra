import type { Metadata } from "next";
import { Catalog } from "@/components/Catalog";
import { Icon, WhatsAppIcon } from "@/components/Icon";
import { getCategories, getProducts } from "@/lib/queries";
import { SITE, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Material de Construção com Entrega",
  description:
    "Cimento, argamassa, areia, brita, vergalhão, tintas, tubos e conexões. Material de construção com entrega rápida na sua obra.",
};

export default async function MateriaisPage() {
  const [products, categories] = await Promise.all([
    getProducts({ type: "materiais" }),
    getCategories(),
  ]);

  return (
    <>
      <section className="border-b border-white/10 surface-metal">
        <div className="container-site py-14 lg:py-16">
          <p className="badge">
            <Icon name="hammer" className="h-3.5 w-3.5" />
            Depósito de materiais
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            Material de construção com entrega na sua obra
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-200">
            Do saco de cimento ao caminhão de areia e brita. Atendemos obras grandes e pequenas,
            com orçamento fechado e entrega combinada.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-steel-200">
            {[
              { icon: "truck", t: "Entrega rápida na região" },
              { icon: "tag", t: "Preço por atacado e varejo" },
              { icon: "check", t: "Nota fiscal para obras" },
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
        <Catalog products={products} categories={categories} type="materiais" />

        <div className="card mt-12 flex flex-col items-start gap-4 p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">
              Precisa de um orçamento de obra?
            </h2>
            <p className="mt-1 text-sm text-steel-200">
              Envie a lista de materiais (ou o projeto) e devolvemos o valor total com frete já
              calculado.
            </p>
          </div>
          <a
            href={whatsappLink(
              `Olá, ${SITE.name}! Preciso de um orçamento de material de construção: (informe a lista).`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary shrink-0"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Orçar minha obra
          </a>
        </div>
      </section>
    </>
  );
}
