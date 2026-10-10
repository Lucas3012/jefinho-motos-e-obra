import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { whatsappLink } from "@/lib/site";
import type { Product } from "@/lib/types";
import { Icon, WhatsAppIcon } from "./Icon";

/** Imagem do produto com placeholder automático quando não há foto. */
function ProductImage({ product }: { product: Product }) {
  if (product.image_url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={product.image_url}
        alt={product.name}
        loading="lazy"
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
    );
  }

  return (
    <div className="grid h-full w-full place-items-center bg-gradient-to-br from-ink-800 to-ink-950">
      <Icon
        name={product.type === "materiais" ? "cement" : "wrench"}
        className="h-14 w-14 text-brand-500/35"
      />
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const message = `Olá! Tenho interesse no produto: ${product.name}${
    product.price ? ` (${formatPrice(product.price)}/${product.unit})` : ""
  }. Pode me passar mais informações?`;

  return (
    <article className="card group flex flex-col overflow-hidden transition hover:border-brand-500/40 hover:bg-white/[0.05]">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-white/8">
        <ProductImage product={product} />

        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {product.featured && (
            <span className="badge !border-brand-400/50 !bg-brand-500 !text-ink-950">Destaque</span>
          )}
          {product.stock !== null && product.stock > 0 && product.stock <= 10 && (
            <span className="badge !border-amber-400/40 !bg-amber-400/90 !text-amber-950">
              Últimas {product.stock} un.
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-bold uppercase tracking-widest text-brand-400">
          {product.brand ? `${product.brand} · ` : ""}
          {product.category?.name ?? (product.type === "materiais" ? "Material de construção" : "Peça de moto")}
        </p>

        <h3 className="mt-1.5 font-display text-xl font-semibold leading-tight text-white">
          {product.name}
        </h3>

        {product.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-steel-200">
            {product.description}
          </p>
        )}

        <div className="mt-4 flex items-baseline gap-1.5">
          <span className="font-display text-3xl font-bold text-white">
            {formatPrice(product.price)}
          </span>
          {product.price !== null && (
            <span className="text-sm text-steel-500">/ {product.unit}</span>
          )}
        </div>

        <div className="mt-4 flex gap-2 pt-1">
          <a
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex-1 !py-2.5 text-sm"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Pedir
          </a>
          <Link
            href={`/contato?produto=${encodeURIComponent(product.name)}&id=${product.id}`}
            className="btn-ghost !px-3 !py-2.5"
            title="Pedir orçamento pelo site"
          >
            <Icon name="mail" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
