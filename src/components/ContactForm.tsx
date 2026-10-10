"use client";

import { useActionState, useEffect, useRef } from "react";
import { createMessage } from "@/lib/actions";
import { SITE, whatsappLink } from "@/lib/site";
import type { ActionState } from "@/lib/types";
import { Icon, WhatsAppIcon } from "./Icon";

function Feedback({ state }: { state: ActionState }) {
  if (state.status === "idle" || !state.message) return null;

  const ok = state.status === "success";
  return (
    <div
      role="status"
      className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
        ok
          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
          : "border-red-400/30 bg-red-400/10 text-red-200"
      }`}
    >
      <Icon name={ok ? "check" : "close"} className="mt-0.5 h-5 w-5 shrink-0" />
      <p>{state.message}</p>
    </div>
  );
}

function ErrorText({ children }: { children?: string }) {
  if (!children) return null;
  return <p className="mt-1.5 text-xs font-medium text-red-300">{children}</p>;
}

/** Formulário de contato geral. */
export function ContactForm({
  initialProduct,
}: {
  initialProduct?: { name: string; id: string };
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    createMessage,
    { status: "idle" },
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="card p-6 sm:p-8">
      <h2 className="font-display text-2xl font-bold text-white">Envie sua mensagem</h2>
      <p className="mt-1.5 text-sm text-steel-200">
        Pergunte sobre peças, materiais ou serviços. Respondemos pelo WhatsApp.
      </p>

      {initialProduct && (
        <input type="hidden" name="subject" value={`Orçamento: ${initialProduct.name}`} />
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label-field" htmlFor="name">
            Seu nome *
          </label>
          <input id="name" name="name" className="input-field" placeholder="Nome completo" required />
          <ErrorText>{state.errors?.name}</ErrorText>
        </div>

        <div>
          <label className="label-field" htmlFor="phone">
            WhatsApp
          </label>
          <input id="phone" name="phone" className="input-field" placeholder="(00) 00000-0000" inputMode="tel" />
        </div>

        <div className="sm:col-span-2">
          <label className="label-field" htmlFor="email">
            E-mail
          </label>
          <input id="email" name="email" type="email" className="input-field" placeholder="voce@email.com" />
        </div>

        <div className="sm:col-span-2">
          <label className="label-field" htmlFor="subject">
            Assunto
          </label>
          <input
            id="subject"
            name="subject"
            className="input-field"
            placeholder="Ex.: Kit relação para CG 160"
            defaultValue={initialProduct ? `Orçamento: ${initialProduct.name}` : ""}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="label-field" htmlFor="message">
            Mensagem *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="input-field resize-y"
            placeholder={
              initialProduct
                ? `Olá! Gostaria de um orçamento para ${initialProduct.name}.`
                : "Conte o que você precisa..."
            }
            required
          />
          <ErrorText>{state.errors?.message}</ErrorText>
        </div>
      </div>

      <Feedback state={state} />

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="submit" className="btn-primary flex-1" disabled={pending}>
          {pending ? "Enviando..." : "Enviar mensagem"}
        </button>
        <a
          href={whatsappLink(
            initialProduct
              ? `Olá! Quero um orçamento para: ${initialProduct.name}.`
              : `Olá, ${SITE.name}! Vim pelo site.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Chamar no WhatsApp
        </a>
      </div>
    </form>
  );
}
