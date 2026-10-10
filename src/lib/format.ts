/** Formata um número como moeda brasileira (R$ 36,90). */
export function formatPrice(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "Consulte";
  }
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value));
}

/** Formata uma data ISO (2026-10-09) para 09/10/2026. */
export function formatDate(value: string | null | undefined) {
  if (!value) return "—";
  const date = new Date(`${value.slice(0, 10)}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

/** Formata data e hora para exibição no painel. */
export function formatDateTime(value: string | null | undefined) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/** Formata horário (14:30:00) para 14h30. */
export function formatTime(value: string | null | undefined) {
  if (!value) return "—";
  const [h, m] = value.split(":");
  if (!h) return value;
  return `${h}h${(m ?? "00").slice(0, 2)}`;
}

/** Telefone simples para exibição. */
export function formatPhone(value: string | null | undefined) {
  if (!value) return "—";
  const digits = value.replace(/\D/g, "");
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return value;
}

export const STATUS_LABELS: Record<string, string> = {
  // orçamentos
  novo: "Novo",
  contatado: "Contatado",
  aprovado: "Aprovado",
  cancelado: "Cancelado",
  // agendamentos
  pendente: "Pendente",
  confirmado: "Confirmado",
  concluido: "Concluído",
};
