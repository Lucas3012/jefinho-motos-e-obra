import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, hasServiceRole } from "./config";

/**
 * Cliente administrativo (service_role) — ignora as políticas de RLS.
 * Use APENAS em código de servidor. Se a chave não estiver configurada,
 * retorna null e o chamador decide o que fazer.
 */
export function createAdminClient() {
  if (!hasServiceRole) return null;
  return createSupabaseClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
