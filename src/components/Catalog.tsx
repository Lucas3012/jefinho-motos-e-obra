"use client";

import { useMemo, useState } from "react";
import type { Category, Product, ProductType } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { Icon } from "./Icon";

type Props = {
  products: Product[];
  categories: Category[];
  type: ProductType;
};

/** Catálogo com busca, filtro por categoria e ordenação. */
export function Catalog({ products, categories, type }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [order, setOrder] = useState<"destaque" | "menor" | "maior" | "nome">("destaque");

  const typeCategories = useMemo(
    () => categories.filter((c) => c.type === type),
    [categories, type],
  );

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    let list = products.filter((p) => {
      if (category !== "all" && p.category_id !== category) return false;
      if (!term) return true;
      const haystack = `${p.name} ${p.description ?? ""} ${p.brand ?? ""} ${
        p.category?.name ?? ""
      }`.toLowerCase();
      return haystack.includes(term);
    });

    list = [...list].sort((a, b) => {
      switch (order) {
        case "menor":
          return (a.price ?? Infinity) - (b.price ?? Infinity);
        case "maior":
          return (b.price ?? -Infinity) - (a.price ?? -Infinity);
        case "nome":
          return a.name.localeCompare(b.name, "pt-BR");
        default:
          return Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name, "pt-BR");
      }
    });

    return list;
  }, [products, search, category, order]);

  return (
    <div>
      {/* Barra de filtros */}
      <div className="card sticky top-[4.5rem] z-30 mb-8 flex flex-col gap-3 bg-ink-900/95 p-4 backdrop-blur md:flex-row md:items-center">
        <div className="relative flex-1">
          <Icon
            name="search"
            className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-steel-500"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              type === "materiais"
                ? "Buscar cimento, brita, areia, tinta..."
                : "Buscar pastilha, kit relação, óleo, bateria..."
            }
            className="input-field !pl-11"
            aria-label="Buscar no catálogo"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input-field md:max-w-56"
          aria-label="Filtrar por categoria"
        >
          <option value="all">Todas as categorias</option>
          {typeCategories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={order}
          onChange={(e) => setOrder(e.target.value as typeof order)}
          className="input-field md:max-w-52"
          aria-label="Ordenar produtos"
        >
          <option value="destaque">Em destaque</option>
          <option value="menor">Menor preço</option>
          <option value="maior">Maior preço</option>
          <option value="nome">Nome (A-Z)</option>
        </select>
      </div>

      <p className="mb-4 text-sm text-steel-500">
        {filtered.length === 0
          ? "Nenhum produto encontrado."
          : `${filtered.length} ${filtered.length === 1 ? "produto encontrado" : "produtos encontrados"}`}
      </p>

      {filtered.length === 0 ? (
        <div className="card grid place-items-center gap-3 p-14 text-center">
          <Icon name="search" className="h-10 w-10 text-steel-500" />
          <p className="text-steel-200">
            Não achamos nada com esse filtro. Fale com a gente pelo WhatsApp — provavelmente
            temos em estoque.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
