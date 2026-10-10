"use client";

import { useActionState } from "react";
import { signIn } from "@/lib/actions";
import type { ActionState } from "@/lib/types";
import { Icon } from "./Icon";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(signIn, {
    status: "idle",
  });

  return (
    <form action={formAction} className="card p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/15 text-brand-400">
          <Icon name="user" className="h-6 w-6" />
        </span>
        <div>
          <h1 className="font-display text-2xl font-bold leading-none text-white">Área do lojista</h1>
          <p className="mt-1 text-sm text-steel-200">Gerencie produtos, orçamentos e agendas.</p>
        </div>
      </div>

      <div className="grid gap-4">
        <div>
          <label className="label-field" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="input-field"
            placeholder="voce@email.com"
            required
          />
        </div>

        <div>
          <label className="label-field" htmlFor="password">
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="input-field"
            placeholder="••••••••"
            required
          />
        </div>
      </div>

      {state.message && (
        <p
          role="status"
          className={`mt-5 flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${
            state.status === "success"
              ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
              : "border-red-400/30 bg-red-400/10 text-red-200"
          }`}
        >
          <Icon
            name={state.status === "success" ? "check" : "close"}
            className="mt-0.5 h-4 w-4 shrink-0"
          />
          {state.message}
        </p>
      )}

      <button type="submit" className="btn-primary mt-6 w-full" disabled={pending}>
        {pending ? "Entrando..." : "Entrar"}
      </button>

      <p className="mt-4 text-center text-xs text-steel-500">
        O acesso é criado pelo administrador no painel do Supabase.
      </p>
    </form>
  );
}
