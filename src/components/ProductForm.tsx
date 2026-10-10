"use client";

import { useActionState } from "react";
import { createProduct, updateProduct } from "@/lib/actions";
import type { ActionState, Category, Product, ProductType } from "@/lib/types";
import { Icon } from "./Icon";

type Props = {
  categories: Category[];
  product?: Product;
};

export function ProductForm({ categories, product }: Props) {
  const isEdit = Boolean(product);
  const action = isEdit ? updateProduct : createProduct;
  const [state, formAction, pending] = useActionState<ActionState, FormData>(action, {
    status: "idle",
  });

  const type: ProductType = product?.type ?? "pecas";

  return (
    <form action={formAction} className="card p-6 sm:p-8">
      {isEdit && <input type="hidden" name="id" value={product!.id} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label-field" htmlFor="name">
            Nome do produto *
          </label>
          <input
            id="name"
            name="name"
            defaultValue={product?.name}
            className="input-field"
            placeholder="Ex.: Kit de Relação 428H"
            required
          />
        </div>

        <div>
          <label className="label-field" htmlFor="type">
            Tipo
          </label>
          <select id="type" name="type" defaultValue={type} className="input-field">
            <option value="pecas">Peça de moto</option>
            <option value="materiais">Material de construção</option>
          </select>
        </div>

        <div>
          <label className="label-field" htmlFor="category_id">
            Categoria
          </label>
          <select
            id="category_id"
            name="category_id"
            defaultValue={product?.category_id ?? ""}
            className="input-field"
          >
            <option value="">Sem categoria</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.type === "pecas" ? "Peças" : "Materiais"})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label-field" htmlFor="brand">
            Marca / Fabricante
          </label>
          <input id="brand" name="brand" defaultValue={product?.brand ?? ""} className="input-field" placeholder="Honda, Votorantim..." />
        </div>

        <div>
          <label className="label-field" htmlFor="price">
            Preço (R$) — deixe vazio para “Consulte”
          </label>
          <input
            id="price"
            name="price"
            defaultValue={product?.price ?? ""}
            className="input-field"
            inputMode="decimal"
            placeholder="36,90"
          />
        </div>

        <div>
          <label className="label-field" htmlFor="unit">
            Unidade
          </label>
          <select id="unit" name="unit" defaultValue={product?.unit ?? "un"} className="input-field">
            {["un", "par", "kit", "cx", "saco", "m³", "barra", "lata", "m", "kg", "rolo", "fardo"].map(
              (u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ),
            )}
          </select>
        </div>

        <div>
          <label className="label-field" htmlFor="stock">
            Estoque (opcional)
          </label>
          <input
            id="stock"
            name="stock"
            defaultValue={product?.stock ?? ""}
            className="input-field"
            inputMode="numeric"
            placeholder="Ex.: 25"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="label-field" htmlFor="image_url">
            Link da foto (URL)
          </label>
          <input
            id="image_url"
            name="image_url"
            defaultValue={product?.image_url ?? ""}
            className="input-field"
            placeholder="https://..."
          />
          <p className="mt-1.5 text-xs text-steel-500">
            Dica: suba a foto em um site como o Google Fotos ou Imgur e cole o link direto da imagem.
          </p>
        </div>

        <div className="sm:col-span-2">
          <label className="label-field" htmlFor="description">
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={product?.description ?? ""}
            className="input-field resize-y"
            placeholder="Descreva o produto, compatibilidade e diferenciais..."
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label className="flex flex-1 cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={product?.featured ?? false}
            className="h-4 w-4 accent-[var(--color-brand-500)]"
          />
          <span className="font-semibold text-white">Destacar na página inicial</span>
        </label>

        <label className="flex flex-1 cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm">
          <input
            type="checkbox"
            name="active"
            defaultChecked={product?.active ?? true}
            className="h-4 w-4 accent-[var(--color-brand-500)]"
          />
          <span className="font-semibold text-white">Visível no site</span>
        </label>
      </div>

      {state.message && (
        <p
          role="status"
          className="mt-5 flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200"
        >
          <Icon name="close" className="mt-0.5 h-4 w-4 shrink-0" />
          {state.message}
        </p>
      )}

      <div className="mt-6 flex gap-3">
        <button type="submit" className="btn-primary" disabled={pending}>
          <Icon name="check" className="h-4 w-4" />
          {pending ? "Salvando..." : isEdit ? "Salvar alterações" : "Cadastrar produto"}
        </button>
        <a href="/admin/produtos" className="btn-ghost">
          Cancelar
        </a>
      </div>
    </form>
  );
}
