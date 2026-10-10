"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { createAppointment } from "@/lib/actions";
import { formatPrice } from "@/lib/format";
import { SITE, whatsappLink } from "@/lib/site";
import type { ActionState, Service } from "@/lib/types";
import { Icon, WhatsAppIcon } from "./Icon";

const TIMES = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00",
  "11:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30",
];

export function AppointmentForm({
  services,
  initialServiceName,
}: {
  services: Service[];
  initialServiceName?: string;
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    createAppointment,
    { status: "idle" },
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [serviceId, setServiceId] = useState(() => {
    if (!initialServiceName) return "";
    return services.find((s) => s.name === initialServiceName)?.id ?? "";
  });

  const today = new Date().toISOString().slice(0, 10);
  const selected = services.find((s) => s.id === serviceId);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      setServiceId("");
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="card p-6 sm:p-8">
      <h2 className="font-display text-2xl font-bold text-white">Reservar horário</h2>
      <p className="mt-1.5 text-sm text-steel-200">
        Escolha o serviço e o melhor dia para você. Confirmamos por WhatsApp.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label-field" htmlFor="customer_name">
            Seu nome *
          </label>
          <input id="customer_name" name="customer_name" className="input-field" placeholder="Nome completo" required />
          <p className="mt-1.5 text-xs font-medium text-red-300">{state.errors?.customer_name}</p>
        </div>

        <div>
          <label className="label-field" htmlFor="customer_phone">
            WhatsApp *
          </label>
          <input
            id="customer_phone"
            name="customer_phone"
            className="input-field"
            placeholder="(00) 00000-0000"
            inputMode="tel"
            required
          />
          <p className="mt-1.5 text-xs font-medium text-red-300">{state.errors?.customer_phone}</p>
        </div>

        <div>
          <label className="label-field" htmlFor="motorcycle">
            Moto (marca, modelo e ano) *
          </label>
          <input id="motorcycle" name="motorcycle" className="input-field" placeholder="Honda CG 160 2019" required />
          <p className="mt-1.5 text-xs font-medium text-red-300">{state.errors?.motorcycle}</p>
        </div>

        <div>
          <label className="label-field" htmlFor="plate">
            Placa
          </label>
          <input id="plate" name="plate" className="input-field uppercase" placeholder="ABC1D23" />
        </div>

        <div className="sm:col-span-2">
          <label className="label-field" htmlFor="service_id">
            Serviço desejado
          </label>
          <select
            id="service_id"
            name="service_id"
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            className="input-field"
          >
            <option value="">Ainda não sei / outro serviço</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — {formatPrice(s.price)}
              </option>
            ))}
          </select>
          <input type="hidden" name="service_name" value={selected?.name ?? ""} />
        </div>

        <div>
          <label className="label-field" htmlFor="preferred_date">
            Data preferida *
          </label>
          <input
            id="preferred_date"
            name="preferred_date"
            type="date"
            min={today}
            className="input-field"
            required
          />
          <p className="mt-1.5 text-xs font-medium text-red-300">{state.errors?.preferred_date}</p>
        </div>

        <div>
          <label className="label-field" htmlFor="preferred_time">
            Horário *
          </label>
          <select id="preferred_time" name="preferred_time" className="input-field" required defaultValue="09:00">
            {TIMES.map((t) => (
              <option key={t} value={t}>
                {t.replace(":", "h")}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-xs font-medium text-red-300">{state.errors?.preferred_time}</p>
        </div>

        <div className="sm:col-span-2">
          <label className="label-field" htmlFor="notes">
            Observações
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className="input-field resize-y"
            placeholder="Ex.: a moto está fazendo barulho na hora de frear"
          />
        </div>
      </div>

      {state.message && (
        <div
          role="status"
          className={`mt-6 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
            state.status === "success"
              ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
              : "border-red-400/30 bg-red-400/10 text-red-200"
          }`}
        >
          <Icon
            name={state.status === "success" ? "check" : "close"}
            className="mt-0.5 h-5 w-5 shrink-0"
          />
          <p>{state.message}</p>
        </div>
      )}

      <button type="submit" className="btn-primary mt-6 w-full" disabled={pending}>
        <Icon name="calendar" className="h-4 w-4" />
        {pending ? "Enviando..." : "Confirmar agendamento"}
      </button>

      <a
        href={whatsappLink(`Olá, ${SITE.name}! Quero agendar um serviço na oficina.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-ghost mt-3 w-full"
      >
        <WhatsAppIcon className="h-4 w-4" />
        Prefiro agendar pelo WhatsApp
      </a>
    </form>
  );
}
