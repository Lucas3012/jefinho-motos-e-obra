import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

/**
 * Protege a área do lojista. Mesmo que alguém tente acessar direto,
 * o servidor continua verificando a sessão — aqui só evita o trabalho
 * de renderizar a página para quem não está logado.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.url ? new URL(request.url) : { pathname: "" };

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Sem Supabase configurado o painel exibe as instruções de conexão.
  if (!isSupabaseConfigured) {
    return NextResponse.next();
  }

  const hasSession = request.cookies.getAll().some((c) => c.name.startsWith("sb-"));

  if (!hasSession) {
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
