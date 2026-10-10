import { DEMO_CATEGORIES, DEMO_PRODUCTS, DEMO_SERVICES } from "./demo";
import { isSupabaseConfigured } from "./supabase/config";
import { createClient } from "./supabase/server";
import { T } from "./tables";
import type { Category, Product, ProductType, Service } from "./types";

/**
 * Camada de leitura. Toda função devolve um array vazio em caso de erro,
 * para que o site nunca quebre por causa do banco.
 */

export async function getCategories(type?: ProductType): Promise<Category[]> {
  if (!isSupabaseConfigured) {
    return DEMO_CATEGORIES.filter((c) => !type || c.type === type);
  }

  try {
    const supabase = await createClient();
    let query = supabase
      .from(T.categories)
      .select("*")
      .order("position", { ascending: true })
      .order("name", { ascending: true });

    if (type) query = query.eq("type", type);

    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []) as Category[];
  } catch {
    return DEMO_CATEGORIES.filter((c) => !type || c.type === type);
  }
}

export async function getProducts(options?: {
  type?: ProductType;
  featured?: boolean;
  limit?: number;
  categoryId?: string;
  search?: string;
  includeInactive?: boolean;
}): Promise<Product[]> {
  const { type, featured, limit, categoryId, search, includeInactive } = options ?? {};

  if (!isSupabaseConfigured) {
    return DEMO_PRODUCTS.filter((p) => {
      if (!includeInactive && !p.active) return false;
      if (type && p.type !== type) return false;
      if (featured && !p.featured) return false;
      if (categoryId && p.category_id !== categoryId) return false;
      if (search) {
        const term = search.toLowerCase();
        const haystack = `${p.name} ${p.description ?? ""} ${p.brand ?? ""}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      return true;
    }).slice(0, limit ?? 1000);
  }

  try {
    const supabase = await createClient();
    let query = supabase
      .from(T.products)
      .select(`*, category:${T.categories}(*)`)
      .order("featured", { ascending: false })
      .order("name", { ascending: true });

    if (!includeInactive) query = query.eq("active", true);
    if (type) query = query.eq("type", type);
    if (featured) query = query.eq("featured", true);
    if (categoryId) query = query.eq("category_id", categoryId);
    if (search) query = query.ilike("name", `%${search}%`);
    if (limit) query = query.limit(limit);

    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []) as Product[];
  } catch {
    return DEMO_PRODUCTS.slice(0, limit ?? 1000);
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!isSupabaseConfigured) {
    return DEMO_PRODUCTS.find((p) => p.id === id) ?? null;
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from(T.products)
      .select(`*, category:${T.categories}(*)`)
      .eq("id", id)
      .single();
    if (error) throw error;
    return data as Product;
  } catch {
    return null;
  }
}

export async function getServices(featured?: boolean): Promise<Service[]> {
  if (!isSupabaseConfigured) {
    return DEMO_SERVICES.filter((s) => !featured || s.featured);
  }
  try {
    const supabase = await createClient();
    let query = supabase
      .from(T.services)
      .select("*")
      .eq("active", true)
      .order("position", { ascending: true });
    if (featured) query = query.eq("featured", true);

    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []) as Service[];
  } catch {
    return DEMO_SERVICES.filter((s) => !featured || s.featured);
  }
}
