import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { getMessages } from "@/lib/admin";
import { deleteMessage, markMessageRead } from "@/lib/actions";
import { formatDateTime, formatPhone } from "@/lib/format";

export const metadata: Metadata = { title: "Mensagens" };

export default async function MensagensPage() {
  const messages = await getMessages();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Mensagens</h1>
        <p className="mt-1 text-sm text-steel-200">
          Contatos enviados pelo formulário da página{" "}
          <span className="text-brand-400">/contato</span>.
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="card grid place-items-center gap-3 p-14 text-center">
          <Icon name="mail" className="h-10 w-10 text-steel-500" />
          <h2 className="font-display text-xl font-bold text-white">Caixa de entrada vazia</h2>
          <p className="max-w-md text-sm text-steel-200">
            As mensagens do site chegam aqui automaticamente, junto com o contato do cliente.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {messages.map((m) => (
            <li
              key={m.id}
              className={`card p-5 ${m.read ? "opacity-70" : "border-brand-500/30"}`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-xl font-bold text-white">{m.name}</h2>
                    {!m.read && (
                      <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-bold uppercase text-ink-950">
                        Nova
                      </span>
                    )}
                  </div>

                  {m.subject && <p className="mt-0.5 text-sm font-semibold text-brand-400">{m.subject}</p>}

                  <p className="mt-2 whitespace-pre-line rounded-lg bg-black/30 px-3 py-2.5 text-sm leading-relaxed text-steel-200">
                    {m.message}
                  </p>

                  <p className="mt-2 text-xs text-steel-500">
                    {formatPhone(m.phone)}
                    {m.email ? ` · ${m.email}` : ""} · {formatDateTime(m.created_at)}
                  </p>
                </div>

                <div className="flex shrink-0 gap-2">
                  {m.phone && (
                    <a
                      href={`https://wa.me/${m.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                        `Olá, ${m.name}! Aqui é da Jefinho Motos & Obra, respondendo sua mensagem.`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary !px-3.5 !py-2 text-xs"
                    >
                      <Icon name="phone" className="h-3.5 w-3.5" />
                      Responder
                    </a>
                  )}
                  <form action={markMessageRead}>
                    <input type="hidden" name="id" value={m.id} />
                    <input type="hidden" name="read" value={String(m.read)} />
                    <button
                      type="submit"
                      className="btn-ghost !px-3 !py-2 text-xs"
                      title={m.read ? "Marcar como não lida" : "Marcar como lida"}
                    >
                      <Icon name="check" className="h-3.5 w-3.5" />
                    </button>
                  </form>
                  <form action={deleteMessage}>
                    <input type="hidden" name="id" value={m.id} />
                    <button
                      type="submit"
                      className="btn-ghost !px-3 !py-2 text-xs !text-red-300"
                      title="Excluir"
                    >
                      <Icon name="trash" className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
