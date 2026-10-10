import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { StatusBadge } from "@/components/AdminBits";
import { getAllProducts, getAppointments, getMessages, getQuotes } from "@/lib/admin";
import { formatDate, formatPhone, formatTime } from "@/lib/format";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = { title: "Visão geral" };

export default async function AdminHomePage() {
  const [products, quotes, appointments, messages] = await Promise.all([
    getAllProducts(),
    getQuotes(),
    getAppointments(),
    getMessages(),
  ]);

  const today = new Date().toISOString().slice(0, 10);
  const stats = [
    {
      label: "Produtos ativos",
      value: products.filter((p) => p.active).length,
      href: "/admin/produtos",
      icon: "box",
    },
    {
      label: "Orçamentos novos",
      value: quotes.filter((q) => q.status === "novo").length,
      href: "/admin/orcamentos",
      icon: "tag",
    },
    {
      label: "Agendamentos pendentes",
      value: appointments.filter((a) => a.status === "pendente").length,
      href: "/admin/agendamentos",
      icon: "calendar",
    },
    {
      label: "Mensagens não lidas",
      value: messages.filter((m) => !m.read).length,
      href: "/admin/mensagens",
      icon: "mail",
    },
  ] as const;

  const nextAppointments = appointments
    .filter((a) => a.preferred_date >= today && a.status !== "cancelado")
    .slice(0, 5);

  const latestQuotes = quotes.slice(0, 5);

  return (
    <div className="space-y-8">
      {!isSupabaseConfigured && (
        <p className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
          Você está em modo demonstração. Conecte o Supabase para começar a cadastrar produtos
          de verdade.
        </p>
      )}

      <div>
        <h1 className="font-display text-3xl font-bold text-white">Visão geral</h1>
        <p className="mt-1 text-sm text-steel-200">
          Acompanhe em tempo real o que está acontecendo na loja e na oficina.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="card flex items-center gap-4 p-5 transition hover:border-brand-500/40 hover:bg-white/[0.05]"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-500/12 text-brand-400">
              <Icon name={s.icon} className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-3xl font-bold leading-none text-white">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-steel-500">{s.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Próximos agendamentos */}
        <section className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-white">Próximos agendamentos</h2>
            <Link href="/admin/agendamentos" className="text-sm font-semibold text-brand-400 hover:underline">
              Ver todos
            </Link>
          </div>

          {nextAppointments.length === 0 ? (
            <p className="text-sm text-steel-500">Nenhum agendamento para os próximos dias.</p>
          ) : (
            <ul className="space-y-3">
              {nextAppointments.map((a) => (
                <li key={a.id} className="flex items-start justify-between gap-3 border-b border-white/5 pb-3 last:border-0">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">{a.customer_name}</p>
                    <p className="truncate text-xs text-steel-200">
                      {a.motorcycle} · {a.service_name ?? "Serviço a combinar"}
                    </p>
                    <p className="mt-0.5 text-xs text-brand-400">
                      {formatDate(a.preferred_date)} às {formatTime(a.preferred_time)} ·{" "}
                      {formatPhone(a.customer_phone)}
                    </p>
                  </div>
                  <StatusBadge status={a.status} />
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Últimos orçamentos */}
        <section className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-white">Últimos orçamentos</h2>
            <Link href="/admin/orcamentos" className="text-sm font-semibold text-brand-400 hover:underline">
              Ver todos
            </Link>
          </div>

          {latestQuotes.length === 0 ? (
            <p className="text-sm text-steel-500">Nenhum pedido de orçamento ainda.</p>
          ) : (
            <ul className="space-y-3">
              {latestQuotes.map((q) => (
                <li key={q.id} className="flex items-start justify-between gap-3 border-b border-white/5 pb-3 last:border-0">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">{q.customer_name}</p>
                    <p className="truncate text-xs text-steel-200">
                      {q.product_name ?? "Pedido geral"} · {q.quantity} un.
                    </p>
                    <p className="mt-0.5 text-xs text-brand-400">{formatPhone(q.customer_phone)}</p>
                  </div>
                  <StatusBadge status={q.status} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
