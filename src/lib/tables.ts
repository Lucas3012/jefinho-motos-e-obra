/**
 * Nomes das tabelas do Jefinho Motos & Obra.
 *
 * Todas usam o prefixo `jm_` de propósito: o site é hospedado no MESMO
 * banco de dados de outro projeto (lojavirtual), e o prefixo garante que
 * nada se misture nem seja apagado por engano.
 */
export const T = {
  categories: "jm_categories",
  products: "jm_products",
  services: "jm_services",
  quotes: "jm_quotes",
  appointments: "jm_appointments",
  messages: "jm_messages",
} as const;
