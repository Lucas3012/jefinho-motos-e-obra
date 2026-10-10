import { SITE, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./Icon";

/** Bolha fixa de WhatsApp em todas as páginas públicas. */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(`Olá, ${SITE.name}! Gostaria de um atendimento.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 font-semibold text-[#073b1c] shadow-xl shadow-black/40 transition hover:scale-105 hover:bg-[#3ee87a] sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span className="hidden text-sm sm:inline">Chamar no WhatsApp</span>
    </a>
  );
}
