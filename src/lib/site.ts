export const SITE = {
  name: "Jefinho Motos & Obra",
  shortName: "Jefinho",
  tagline: "Conserto de motos, peças e material de construção",
  description:
    "Jefinho Motos & Obra: oficina de motos com mecânico de confiança, venda de peças originais e compatíveis, e material de construção com entrega na sua obra.",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "5511999999999",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "contato@jefinhomotos.com.br",
  phoneDisplay: "(11) 99999-9999",
  address: "Rua das Oficinas, 123 - Centro",
  city: "São Paulo - SP",
  cep: "00000-000",
  hours: [
    { days: "Segunda a Sexta", time: "08h às 18h" },
    { days: "Sábado", time: "08h às 13h" },
    { days: "Domingo", time: "Fechado" },
  ],
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Rua+das+Oficinas+123",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

/** Monta o link de WhatsApp com uma mensagem pré-preenchida. */
export function whatsappLink(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${SITE.whatsapp}?text=${text}`;
}

export const NAV = [
  { href: "/", label: "Início" },
  { href: "/servicos", label: "Serviços" },
  { href: "/pecas", label: "Peças" },
  { href: "/materiais", label: "Materiais" },
  { href: "/agendamento", label: "Agendar" },
  { href: "/contato", label: "Contato" },
] as const;
