"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "./WhatsAppFloat";

/**
 * Cabeçalho, rodapé e botão flutuante do site público.
 * Na área do admin o visual muda para o do painel.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPanel = pathname.startsWith("/admin");

  return (
    <>
      <Header />
      <main id="conteudo" className="flex-1">
        {children}
      </main>
      {!isPanel && <Footer />}
      {!isPanel && <WhatsAppFloat />}
    </>
  );
}
