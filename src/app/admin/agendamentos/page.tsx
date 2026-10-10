import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { StatusBadge } from "@/components/AdminBits";
import { StatusSelect } from "@/components/StatusSelect";
import { getAppointments } from "@/lib/admin";
import { deleteAppointment, updateAppointmentStatus } from "@/lib/actions";
import { formatDate, formatPhone, formatTime } from "@/lib/format";

export const metadata: Metadata = { title: "Agendamentos" };

const OPTIONS = ["pendente", "confirmado", "concluido", "cancelado"];

export default async function AgendamentosPage() {
  const appointments = await getAppointments();
  const today = new Date().toISOString().slice(0, 10);

  const upcoming = appointments.filter(
    (a) => a.preferred_date >= today && a.status !== "cancelado",
  );
  const past = appointments.filter(
    (a) => a.preferred_date < today || a.status === "cancelado",
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Agendamentos</h1>
        <p className="mt-1 text-sm text-steel-200">
          {upcoming.length} {upcoming.length === 1 ? "horário reservado" : "horários reservados"}{" "}
          para a frente.
        </p>
      </div>

      {appointments.length === 0 ? (
        <div className="card grid place-items-center gap-3 p-14 text-center">
          <Icon name="calendar" className="h-10 w-10 text-steel-500" />
          <h2 className="font-display text-xl font-bold text-white">Agenda vazia</h2>
          <p className="max-w-md text-sm text-steel-200">
            Os agendamentos feitos pelo site na página{" "}
            <Link href="/agendamento" className="text-brand-400 underline">
              /agendamento
            </Link>{" "}
            aparecem aqui.
          </p>
        </div>
      ) : (
        <Section
          title="Próximos"
          items={upcoming}
          empty="Nenhum agendamento futuro."
        />
      )}

      {past.length > 0 && <Section title="Anteriores e cancelados" items={past} empty="" />}
    </div>
  );

  function Section({
    title,
    items,
    empty,
  }: {
    title: string;
    items: typeof appointments;
    empty: string;
  }) {
    if (items.length === 0) return <p className="text-sm text-steel-500">{empty}</p>;

    return (
      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-brand-400">
          {title}
        </h2>
        <ul className="space-y-3">
          {items.map((a) => {
            const message = `Olá, ${a.customer_name}! Aqui é da Jefinho Motos & Obra. Confirmamos seu agendamento de ${
              a.service_name ?? "serviço"
            } para ${formatDate(a.preferred_date)} às ${formatTime(a.preferred_time)}.`;

            return (
              <li key={a.id} className="card p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-xl font-bold text-white">
                        {a.customer_name}
                      </h3>
                      <StatusBadge status={a.status} />
                    </div>

                    <p className="mt-1 text-sm text-steel-200">
                      <strong className="text-white">{a.motorcycle}</strong>
                      {a.plate ? ` · ${a.plate.toUpperCase()}` : ""} ·{" "}
                      {a.service_name ?? "Serviço a combinar"}
                    </p>

                    <p className="mt-2 inline-flex items-center gap-2 rounded-lg bg-black/30 px-3 py-1.5 text-sm font-semibold text-brand-300">
                      <Icon name="calendar" className="h-4 w-4" />
                      {formatDate(a.preferred_date)} às {formatTime(a.preferred_time)}
                    </p>

                    {a.notes && (
                      <p className="mt-2 rounded-lg bg-black/30 px-3 py-2 text-sm text-steel-200">
                        Observação: {a.notes}
                      </p>
                    )}

                    <p className="mt-2 text-xs text-steel-500">{formatPhone(a.customer_phone)}</p>
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center gap-2 lg:flex-col lg:items-end">
                    <StatusSelect
                      action={updateAppointmentStatus}
                      id={a.id}
                      value={a.status}
                      options={OPTIONS}
                      label="Alterar status do agendamento"
                    />
                    <div className="flex gap-2">
                      <a
                        href={`https://wa.me/${a.customer_phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary !px-3.5 !py-2 text-xs"
                      >
                        <Icon name="phone" className="h-3.5 w-3.5" />
                        Confirmar
                      </a>
                      <form action={deleteAppointment}>
                        <input type="hidden" name="id" value={a.id} />
                        <button
                          type="submit"
                          className="btn-ghost !px-3 !py-2 text-xs !text-red-300"
                          title="Excluir agendamento"
                        >
                          <Icon name="trash" className="h-3.5 w-3.5" />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}
