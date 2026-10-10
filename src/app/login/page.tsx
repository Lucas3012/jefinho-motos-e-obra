import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";
import { Icon } from "@/components/Icon";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Área do Lojista",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) redirect("/admin");
  }

  return (
    <section className="container-site grid items-center gap-10 py-20 lg:grid-cols-2">
      <div>
        <p className="badge">Painel de gestão</p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
          Gerencie sua loja pelo celular ou computador
        </h1>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-steel-200">
          Cadastre produtos e materiais, acompanhe os pedidos de orçamento e confirme os
          agendamentos da oficina — tudo em um lugar só.
        </p>

        <ul className="mt-8 space-y-3">
          {[
            { icon: "box", t: "Catálogo de peças e materiais atualizado em minutos" },
            { icon: "mail", t: "Orçamentos pedidos pelos clientes em uma única lista" },
            { icon: "calendar", t: "Agenda de serviços com status de cada atendimento" },
          ].map((f) => (
            <li key={f.t} className="flex items-start gap-3 text-sm text-steel-200">
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-500/12 text-brand-400">
                <Icon name={f.icon} className="h-4 w-4" />
              </span>
              {f.t}
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto w-full max-w-md">
        <LoginForm />
      </div>
    </section>
  );
}
