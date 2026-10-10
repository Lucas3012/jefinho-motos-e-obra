import type { Metadata } from "next";
import { ProductForm } from "@/components/ProductForm";
import { getCategories } from "@/lib/queries";

export const metadata: Metadata = { title: "Novo produto" };

export default async function NovoProdutoPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Novo produto</h1>
        <p className="mt-1 text-sm text-steel-200">
          Preencha os dados da peça ou do material. Ele aparece no site imediatamente.
        </p>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}
