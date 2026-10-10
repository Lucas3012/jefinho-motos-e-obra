"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV, SITE, whatsappLink } from "@/lib/site";
import { Icon, WhatsAppIcon } from "./Icon";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isAdminArea = pathname.startsWith("/admin");
  if (isAdminArea) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-950/85 backdrop-blur-md">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <Logo />
          <span className="leading-none">
            <span className="block font-display text-lg font-bold tracking-tight text-white">
              JEFINHO
            </span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-400">
              Motos &amp; Obra
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-white/8 text-white"
                    : "text-steel-200 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink(`Olá, ${SITE.name}! Vim pelo site e gostaria de atendimento.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden !px-4 !py-2.5 text-sm sm:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>

          <Link
            href="/login"
            className="hidden rounded-lg p-2.5 text-steel-200 transition hover:bg-white/5 hover:text-white sm:block"
            title="Área do lojista"
          >
            <Icon name="user" className="h-5 w-5" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-2.5 text-steel-200 transition hover:bg-white/5 hover:text-white lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-ink-900 lg:hidden">
          <nav className="container-site flex flex-col gap-1 py-3">
            {NAV.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-semibold ${
                    active ? "bg-brand-500/15 text-brand-300" : "text-steel-200"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-lg border border-white/15 px-3 py-2.5 text-sm font-semibold text-white"
            >
              Área do lojista
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function Logo() {
  return (
    <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 shadow-lg shadow-brand-700/30">
      <Icon name="bike" className="h-6 w-6 text-ink-950" strokeWidth={2} />
    </span>
  );
}
