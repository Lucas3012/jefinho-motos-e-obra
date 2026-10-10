"use client";

import { STATUS_LABELS } from "@/lib/format";

/**
 * Seletor de status que salva automaticamente ao trocar a opção.
 * Recebe uma Server Action como propriedade.
 */
export function StatusSelect({
  action,
  id,
  value,
  options,
  label,
}: {
  action: (formData: FormData) => Promise<void>;
  id: string;
  value: string;
  options: string[];
  label: string;
}) {
  return (
    <form action={action} className="inline-block">
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={value}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="input-field !w-auto !py-1.5 !text-xs"
        aria-label={label}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {STATUS_LABELS[o] ?? o}
          </option>
        ))}
      </select>
    </form>
  );
}
