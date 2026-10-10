import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/servicos", "/pecas", "/materiais", "/agendamento", "/contato"];

  return routes.map((route) => ({
    url: `${SITE.siteUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
