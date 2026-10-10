import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { deleteProduct } from "@/lib/actions";
import { getAllProducts } from "@/lib/admin";
import { formatPrice } from "@/lib/format";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = { title: "Produtos" };

export default async function AdminProdutosPage() {
  const products = await getAllProducts();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Produtos</h1>
          <p className="mt-1 text-sm text-steel-200">
            {products.length} {products.length === 1 ? "item cadastrado" : "itens cadastrados"} —
            peças de moto e material de construção.
          </p>
        </div>
        <Link href="/admin/produtos/novo" className="btn-primary shrink-0">
          <Icon name="plus" className="h-4 w-4" />
          Novo produto
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="card grid place-items-center gap-3 p-14 text-center">
          <Icon name="box" className="h-10 w-10 text-steel-500" />
          <h2 className="font-display text-xl font-bold text-white">Nenhum produto ainda</h2>
          <p className="max-w-md text-sm text-steel-200">
            Cadastre sua primeira peça ou material para aparecer no catálogo do site.
          </p>
          <Link href="/admin/produtos/novo" className="btn-primary mt-2">
            <Icon name="plus" className="h-4 w-4" />
            Cadastrar produto
          </Link>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/10 bg-black/30 text-xs uppercase tracking-wider text-steel-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Produto</th>
                  <th className="px-5 py-3 font-semibold">Tipo</th>
                  <th className="px-5 py-3 font-semibold">Preço</th>
                  <th className="px-5 py-3 font-semibold">Estoque</th>
                  <th className="px-5 py-3 font-semibold">Situação</th>
                  <th className="px-5 py-3 text-right font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.03]">
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-white">{p.name}</p>
                      <p className="text-xs text-steel-500">
                        {p.brand ? `${p.brand} · ` : ""}
                        {p.category?.name ?? "Sem categoria"}
                      </p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs font-semibold text-steel-200">
                        {p.type === "pecas" ? "Peça" : "Material"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-white">
                      {formatPrice(p.price)}
                      <span className="text-xs font-normal text-steel-500"> / {p.unit}</span>
                    </td>
                    <td className="px-5 py-3.5 text-steel-200">
                      {p.stock ?? "—"}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-bold ${
                          p.active
                            ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                            : "border-white/15 bg-white/5 text-steel-500"
                        }`}
                      >
                        {p.active ? "Visível" : "Oculto"}
                        {p.featured && p.active ? " · Destaque" : ""}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={whatsappLink(`Olá! Sobre o produto: ${p.name}`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg p-2 text-steel-200 transition hover:bg-white/10 hover:text-white"
                          title="Abrir no WhatsApp"
                        >
                          <Icon name="phone" className="h-4 w-4" />
                        </a>
                        <Link
                          href={`/admin/produtos/${p.id}`}
                          className="rounded-lg p-2 text-steel-200 transition hover:bg-white/10 hover:text-white"
                          title="Editar"
                        >
                          <Icon name="edit" className="h-4 w-4" />
                        </Link>
                        <form action={deleteProduct}>
                          <input type="hidden" name="id" value={p.id} />
                          <button
                            type="submit"
                            className="rounded-lg p-2 text-red-300 transition hover:bg-red-400/15"
                            title="Excluir"
                          >
                            <Icon name="trash" className="h-4 w-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
