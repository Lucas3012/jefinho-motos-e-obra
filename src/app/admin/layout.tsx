import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminNav } from "@/components/AdminNav";
import { signOut } from "@/lib/actions";
import { getCurrentUser } from "@/lib/admin";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: { default: "Painel", template: "%s | Painel | Jefinho Motos & Obra" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  if (!isSupabaseConfigured) {
    return (
      <section className="container-site py-24">
        <div className="card mx-auto max-w-2xl p-10 text-center">
          <h1 className="font-display text-3xl font-bold text-white">
            Supabase ainda não conectado
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-steel-200">
            Para liberar o painel, crie um projeto no{" "}
            <a
              href="https://supabase.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 underline"
            >
              supabase.com
            </a>
            , execute o arquivo <code className="text-brand-300">supabase/schema.sql</code> no
            SQL Editor e copie as chaves para o arquivo <code className="text-brand-300">.env.local</code>.
          </p>
          <p className="mt-4 text-xs text-steel-500">
            Passo a passo completo está no arquivo <strong>README.md</strong>.
          </p>
          <Link href="/" className="btn-primary mt-6">
            Voltar para o site
          </Link>
        </div>
      </section>
    );
  }

  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-ink-950">
      <div className="border-b border-white/10 surface-metal">
        <div className="container-site flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/15 text-brand-400">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
            </span>
            <div>
              <p className="font-display text-lg font-bold leading-none text-white">
                Painel da loja
              </p>
              <p className="mt-1 truncate text-xs text-steel-500">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/" className="btn-ghost !px-3.5 !py-2 text-sm">
              Ver site
            </Link>
            <form action={signOut}>
              <button type="submit" className="btn-ghost !px-3.5 !py-2 text-sm">
                Sair
              </button>
            </form>
          </div>
        </div>

        <AdminNav />
      </div>

      <div className="container-site py-10">{children}</div>
    </div>
  );
}
