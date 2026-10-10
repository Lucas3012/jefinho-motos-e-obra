import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { StatusBadge } from "@/components/AdminBits";
import { StatusSelect } from "@/components/StatusSelect";
import { getQuotes, getAllProducts } from "@/lib/admin";
import { updateQuoteStatus } from "@/lib/actions";
import { formatDate, formatPhone, formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Orçamentos" };

const OPTIONS = ["novo", "contatado", "aprovado", "cancelado"];

export default async function OrcamentosPage() {
  const [quotes, products] = await Promise.all([getQuotes(), getAllProducts()]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Orçamentos</h1>
        <p className="mt-1 text-sm text-steel-200">
          Pedidos de preço feitos pelos clientes no site. Clique no status para atualizar.
        </p>
      </div>

      {quotes.length === 0 ? (
        <div className="card grid place-items-center gap-3 p-14 text-center">
          <Icon name="tag" className="h-10 w-10 text-steel-500" />
          <h2 className="font-display text-xl font-bold text-white">Nenhum orçamento ainda</h2>
          <p className="max-w-md text-sm text-steel-200">
            Quando um cliente pedir preço pelo site, o pedido aparece aqui com o WhatsApp dele
            pronto para contato.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {quotes.map((q) => {
            const product = products.find((p) => p.id === q.product_id);
            const message = `Olá, ${q.customer_name}! Aqui é da Jefinho Motos & Obra. Recebemos seu pedido de orçamento${
              q.product_name ? ` para ${q.product_name}` : ""
            }.}`;

            return (
              <li key={q.id} className="card p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-display text-xl font-bold text-white">
                        {q.customer_name}
                      </h2>
                      <StatusBadge status={q.status} />
                    </div>

                    <p className="mt-1 text-sm text-steel-200">
                      <strong className="text-white">{q.product_name ?? "Pedido geral"}</strong>
                      {q.product_name && product?.price
                        ? ` — ${formatPrice(product.price)}`
                        : ""} · Qtd:{" "}
                      {q.quantity}
                    </p>

                    {q.message && (
                      <p className="mt-2 rounded-lg bg-black/30 px-3 py-2 text-sm text-steel-200">
                        “{q.message}”
                      </p>
                    )}

                    <p className="mt-2 text-xs text-steel-500">
                      {formatPhone(q.customer_phone)}
                      {q.customer_email ? ` · ${q.customer_email}` : ""} ·{" "}
                      {formatDate(q.created_at)}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                    <StatusSelect
                      action={updateQuoteStatus}
                      id={q.id}
                      value={q.status}
                      options={OPTIONS}
                      label="Alterar status do orçamento"
                    />
                    <a
                      href={`https://wa.me/${q.customer_phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary !px-3.5 !py-2 text-xs"
                    >
                      <Icon name="phone" className="h-3.5 w-3.5" />
                      Responder
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

async function getProductsForAdmin() {
  const { getAllProducts } = await import("@/lib/admin");
  return getAllProducts();
}

function formatPriceText(value: number | null) {
  if (value === null) return "Consulte";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}
