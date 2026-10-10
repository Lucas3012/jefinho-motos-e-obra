import type { Metadata } from "next";
import { AppointmentForm } from "@/components/AppointmentForm";
import { Icon } from "@/components/Icon";
import { getServices } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Agendar Serviço na Oficina",
  description:
    "Agende a revisão ou o conserto da sua moto online. Escolha o serviço, o dia e o horário — confirmamos por WhatsApp.",
};

export default async function AgendamentoPage({
  searchParams,
}: {
  searchParams: Promise<{ servico?: string }>;
}) {
  const params = await searchParams;
  const services = await getServices();

  return (
    <>
      <section className="border-b border-white/10 surface-metal">
        <div className="container-site py-14 lg:py-16">
          <p className="badge">
            <Icon name="calendar" className="h-3.5 w-3.5" />
            Agenda online
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            Reserve o horário da sua moto em 1 minuto
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-200">
            Preencha os dados abaixo e nossa equipe confirma a disponibilidade pelo WhatsApp.
            Moto em situação de emergência? Chame direto no WhatsApp que a gente encaixa.
          </p>
        </div>
      </section>

      <section className="container-site grid gap-10 py-16 lg:grid-cols-[1fr_22rem]">
        <AppointmentForm services={services} initialServiceName={params.servico} />

        <aside className="space-y-4">
          <div className="card p-6">
            <h2 className="font-display text-xl font-bold text-white">Antes de agendar</h2>
            <ul className="mt-4 space-y-3 text-sm text-steel-200">
              {[
                "Traga o capacete e, se possível, a chave reserva.",
                "Avaliação inicial é gratuita — o serviço só começa após sua aprovação.",
                "Atendemos motos de todas as marcas, inclusive elétricas.",
                "Se precisar remarcar, avise com pelo menos 3 horas de antecedência.",
              ].map((t) => (
                <li key={t} className="flex gap-2.5">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6">
            <h2 className="font-display text-xl font-bold text-white">Horários da oficina</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-steel-200">Segunda a Sexta</span>
                <span className="font-semibold text-white">08h às 18h</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-steel-200">Sábado</span>
                <span className="font-semibold text-white">08h às 13h</span>
              </li>
              <li className="flex justify-between">
                <span className="text-steel-200">Domingo</span>
                <span className="text-steel-500">Fechado</span>
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}
