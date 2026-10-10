import type { Metadata } from "next";
import Link from "next/link";
import { ProductForm } from "@/components/ProductForm";
import { getAllProducts } from "@/lib/admin";
import { getCategories } from "@/lib/queries";

export const metadata: Metadata = { title: "Editar produto" };

export default async function EditarProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [products, categories] = await Promise.all([getAllProducts(), getCategories()]);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="card grid place-items-center gap-3 p-14 text-center">
        <h1 className="font-display text-2xl font-bold text-white">Produto não encontrado</h1>
        <p className="text-sm text-steel-200">
          Ele pode ter sido excluído ou você abriu um link antigo.
        </p>
        <Link href="/admin/produtos" className="btn-primary mt-2">
          Voltar para produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Editar produto</h1>
        <p className="mt-1 text-sm text-steel-200">{product.name}</p>
      </div>

      <ProductForm categories={categories} product={product} />
    </div>
  );
}
