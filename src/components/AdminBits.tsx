import { STATUS_LABELS } from "@/lib/format";

const STYLES: Record<string, string> = {
  novo: "bg-sky-400/15 text-sky-200 border-sky-400/30",
  pendente: "bg-amber-400/15 text-amber-200 border-amber-400/30",
  contatado: "bg-violet-400/15 text-violet-200 border-violet-400/30",
  confirmado: "bg-sky-400/15 text-sky-200 border-sky-400/30",
  aprovado: "bg-emerald-400/15 text-emerald-200 border-emerald-400/30",
  concluido: "bg-emerald-400/15 text-emerald-200 border-emerald-400/30",
  cancelado: "bg-red-400/15 text-red-200 border-red-400/30",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold ${
        STYLES[status] ?? "border-white/20 bg-white/10 text-white"
      }`}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}
