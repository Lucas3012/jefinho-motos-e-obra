import { isSupabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

/** Usado pelo Render para saber se a aplicação está no ar. */
export async function GET() {
  return Response.json({
    status: "ok",
    service: "jefinho-motos-e-obra",
    supabase: isSupabaseConfigured ? "configured" : "demo-mode",
    timestamp: new Date().toISOString(),
  });
}
