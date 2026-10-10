"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "Visão geral" },
  { href: "/admin/produtos", label: "Produtos" },
  { href: "/admin/orcamentos", label: "Orçamentos" },
  { href: "/admin/agendamentos", label: "Agendamentos" },
  { href: "/admin/mensagens", label: "Mensagens" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="container-site flex gap-1 overflow-x-auto pb-3">
      {LINKS.map((link) => {
        const active =
          link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`shrink-0 rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
              active
                ? "bg-brand-500 text-ink-950"
                : "text-steel-200 hover:bg-white/5 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
