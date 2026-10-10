import { createClient } from "./supabase/server";
import { T } from "./tables";
import { isSupabaseConfigured } from "./supabase/config";
import type { Appointment, Message, Product, Quote } from "./types";

/** Verifica se existe uma sessão válida de lojista. */
export async function getCurrentUser() {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getQuotes(): Promise<Quote[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from(T.quotes)
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    return (data ?? []) as Quote[];
  } catch {
    return [];
  }
}

export async function getAppointments(): Promise<Appointment[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from(T.appointments)
      .select("*")
      .order("preferred_date", { ascending: true })
      .limit(200);
    return (data ?? []) as Appointment[];
  } catch {
    return [];
  }
}

export async function getMessages(): Promise<Message[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from(T.messages)
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    return (data ?? []) as Message[];
  } catch {
    return [];
  }
}

export async function getAllProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from(T.products)
      .select(`*, category:${T.categories}(*)`)
      .order("created_at", { ascending: false })
      .limit(500);
    return (data ?? []) as Product[];
  } catch {
    return [];
  }
}
