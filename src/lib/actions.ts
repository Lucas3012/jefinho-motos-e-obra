"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import { isSupabaseConfigured } from "./supabase/config";
import { T } from "./tables";
import type { ActionState } from "./types";

/* ======================================================================
 * Utilidades
 * ==================================================================== */

function text(value: FormDataEntryValue | null | undefined) {
  return typeof value === "string" ? value.trim() : "";
}

function numberOrNull(value: FormDataEntryValue | null | undefined) {
  const raw = text(value).replace(",", ".");
  if (!raw) return null;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

function requireAuth() {
  const supabase = createClient();
  return supabase;
}

/* ======================================================================
 * FORMULÁRIOS PÚBLICOS
 * ==================================================================== */

/** Pedir orçamento de um produto (peça ou material). */
export async function createQuote(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const errors: Record<string, string> = {};

  const name = text(formData.get("customer_name"));
  const phone = text(formData.get("customer_phone"));
  const email = text(formData.get("customer_email"));
  const productId = text(formData.get("product_id"));
  const productName = text(formData.get("product_name"));
  const quantity = Number(text(formData.get("quantity")) || "1");
  const message = text(formData.get("message"));

  if (name.length < 2) errors.customer_name = "Informe seu nome completo.";
  if (phone.replace(/\D/g, "").length < 10)
    errors.customer_phone = "Informe um WhatsApp válido com DDD.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Confira os campos destacados.", errors };
  }

  if (!isSupabaseConfigured) {
    return {
      status: "success",
      message:
        "Modo demonstração: configure o Supabase para que os pedidos cheguem na loja.",
    };
  }

  const supabase = await requireAuth();
  const { error } = await supabase.from(T.quotes).insert({
    customer_name: name,
    customer_phone: phone,
    customer_email: email || null,
    product_id: productId || null,
    product_name: productName || null,
    quantity: quantity > 0 ? quantity : 1,
    message: message || null,
  });

  if (error) {
    return {
      status: "error",
      message: "Não conseguimos enviar seu pedido. Tente novamente ou chame no WhatsApp.",
    };
  }

  revalidatePath("/", "layout");
  return {
    status: "success",
    message: "Pedido enviado! A loja entra em contato pelo WhatsApp em breve.",
  };
}

/** Agendar um serviço na oficina. */
export async function createAppointment(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const errors: Record<string, string> = {};

  const name = text(formData.get("customer_name"));
  const phone = text(formData.get("customer_phone"));
  const motorcycle = text(formData.get("motorcycle"));
  const plate = text(formData.get("plate"));
  const serviceId = text(formData.get("service_id"));
  const serviceName = text(formData.get("service_name"));
  const date = text(formData.get("preferred_date"));
  const time = text(formData.get("preferred_time"));
  const notes = text(formData.get("notes"));

  if (name.length < 2) errors.customer_name = "Informe seu nome completo.";
  if (phone.replace(/\D/g, "").length < 10)
    errors.customer_phone = "Informe um WhatsApp válido com DDD.";
  if (motorcycle.length < 2) errors.motorcycle = "Informe a modelo da moto.";
  if (!date) errors.preferred_date = "Escolha uma data.";
  if (!time) errors.preferred_time = "Escolha um horário.";

  if (date) {
    const chosen = new Date(`${date}T23:59:59`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(chosen.getTime()) || chosen < today) {
      errors.preferred_date = "A data não pode ser no passado.";
    }
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Confira os campos destacados.", errors };
  }

  if (!isSupabaseConfigured) {
    return {
      status: "success",
      message:
        "Modo demonstração: configure o Supabase para confirmar agendamentos de verdade.",
    };
  }

  const supabase = await requireAuth();
  const { error } = await supabase.from(T.appointments).insert({
    customer_name: name,
    customer_phone: phone,
    motorcycle,
    plate: plate || null,
    service_id: serviceId || null,
    service_name: serviceName || null,
    preferred_date: date,
    preferred_time: time,
    notes: notes || null,
  });

  if (error) {
    return {
      status: "error",
      message: "Não foi possível agendar. Tente novamente ou chame no WhatsApp.",
    };
  }

  revalidatePath("/", "layout");
  return { status: "success", message: "Agendamento enviado! Aguarde a confirmação por WhatsApp." };
}

/** Formulário de contato. */
export async function createMessage(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const errors: Record<string, string> = {};

  const name = text(formData.get("name"));
  const phone = text(formData.get("phone"));
  const email = text(formData.get("email"));
  const subject = text(formData.get("subject"));
  const message = text(formData.get("message"));

  if (name.length < 2) errors.name = "Informe seu nome.";
  if (message.length < 10) errors.message = "Escreva uma mensagem um pouco maior.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Confira os campos destacados.", errors };
  }

  if (!isSupabaseConfigured) {
    return {
      status: "success",
      message: "Modo demonstração: configure o Supabase para receber mensagens.",
    };
  }

  const supabase = await requireAuth();
  const { error } = await supabase.from(T.messages).insert({
    name,
    phone: phone || null,
    email: email || null,
    subject: subject || null,
    message,
  });

  if (error) {
    return { status: "error", message: "Não foi possível enviar. Tente novamente." };
  }

  revalidatePath("/", "layout");
  return { status: "success", message: "Mensagem enviada! Responderemos em breve." };
}

/* ======================================================================
 * AUTENTICAÇÃO (área do lojista)
 * ==================================================================== */

export async function signIn(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = text(formData.get("email"));
  const password = text(formData.get("password"));

  if (!email || !password) {
    return { status: "error", message: "Preencha e-mail e senha." };
  }
  if (!isSupabaseConfigured) {
    return {
      status: "error",
      message: "Supabase não configurado. Adicione as chaves no .env.local.",
    };
  }

  const supabase = await requireAuth();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { status: "error", message: "E-mail ou senha incorretos." };
  }

  revalidatePath("/", "layout");
  redirect("/admin");
}

export async function signOut() {
  if (!isSupabaseConfigured) redirect("/login");
  const supabase = await requireAuth();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}

/* ======================================================================
 * PAINEL — PRODUTOS
 * ==================================================================== */

/** Garante que existe uma sessão válida antes de mexer no banco. */
async function requireOwner() {
  if (!isSupabaseConfigured) {
    return { supabase: null, authorized: false };
  }
  const supabase = await requireAuth();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, authorized: Boolean(user) };
}

export async function createProduct(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { supabase, authorized } = await requireOwner();
  if (!supabase || !authorized) {
    return { status: "error", message: "Faça login para cadastrar produtos." };
  }

  const name = text(formData.get("name"));
  if (name.length < 2) {
    return {
      status: "error",
      message: "Informe o nome do produto.",
      errors: { name: "Obrigatório" },
    };
  }

  const { error } = await supabase.from(T.products).insert({
    name,
    description: text(formData.get("description")) || null,
    type: text(formData.get("type")) === "materiais" ? "materiais" : "pecas",
    category_id: text(formData.get("category_id")) || null,
    brand: text(formData.get("brand")) || null,
    price: numberOrNull(formData.get("price")),
    unit: text(formData.get("unit")) || "un",
    stock: numberOrNull(formData.get("stock")),
    image_url: text(formData.get("image_url")) || null,
    featured: formData.get("featured") === "on",
    active: formData.get("active") === "on",
  });

  if (error) {
    return { status: "error", message: `Erro ao salvar: ${error.message}` };
  }

  revalidatePath("/admin/produtos");
  revalidatePath("/", "layout");
  redirect("/admin/produtos");
}

export async function updateProduct(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { supabase, authorized } = await requireOwner();
  if (!supabase || !authorized) {
    return { status: "error", message: "Faça login para editar produtos." };
  }

  const id = text(formData.get("id"));
  const name = text(formData.get("name"));
  if (!id) return { status: "error", message: "Produto não encontrado." };
  if (name.length < 2) {
    return {
      status: "error",
      message: "Informe o nome do produto.",
      errors: { name: "Obrigatório" },
    };
  }

  const { error } = await supabase
    .from(T.products)
    .update({
      name,
      description: text(formData.get("description")) || null,
      type: text(formData.get("type")) === "materiais" ? "materiais" : "pecas",
      category_id: text(formData.get("category_id")) || null,
      brand: text(formData.get("brand")) || null,
      price: numberOrNull(formData.get("price")),
      unit: text(formData.get("unit")) || "un",
      stock: numberOrNull(formData.get("stock")),
      image_url: text(formData.get("image_url")) || null,
      featured: formData.get("featured") === "on",
      active: formData.get("active") === "on",
    })
    .eq("id", id);

  if (error) {
    return { status: "error", message: `Erro ao atualizar: ${error.message}` };
  }

  revalidatePath("/admin/produtos");
  revalidatePath("/", "layout");
  redirect("/admin/produtos");
}

export async function deleteProduct(formData: FormData) {
  const { supabase, authorized } = await requireOwner();
  if (!supabase || !authorized) return;

  const id = text(formData.get("id"));
  if (id) await supabase.from(T.products).delete().eq("id", id);

  revalidatePath("/admin/produtos");
  revalidatePath("/", "layout");
}

/* ======================================================================
 * PAINEL — ORÇAMENTOS, AGENDAMENTOS E MENSAGENS
 * ==================================================================== */

export async function updateQuoteStatus(formData: FormData) {
  const { supabase, authorized } = await requireOwner();
  if (!supabase || !authorized) return;

  const id = text(formData.get("id"));
  const status = text(formData.get("status"));
  if (!id || !status) return;

  await supabase.from(T.quotes).update({ status }).eq("id", id);
  revalidatePath("/admin/orcamentos");
}

export async function updateAppointmentStatus(formData: FormData) {
  const { supabase, authorized } = await requireOwner();
  if (!supabase || !authorized) return;

  const id = text(formData.get("id"));
  const status = text(formData.get("status"));
  if (!id || !status) return;

  await supabase.from(T.appointments).update({ status }).eq("id", id);
  revalidatePath("/admin/agendamentos");
}

export async function deleteAppointment(formData: FormData) {
  const { supabase, authorized } = await requireOwner();
  if (!supabase || !authorized) return;

  const id = text(formData.get("id"));
  if (id) await supabase.from(T.appointments).delete().eq("id", id);
  revalidatePath("/admin/agendamentos");
}

export async function markMessageRead(formData: FormData) {
  const { supabase, authorized } = await requireOwner();
  if (!supabase || !authorized) return;

  const id = text(formData.get("id"));
  const read = text(formData.get("read")) === "true";
  if (!id) return;

  await supabase.from(T.messages).update({ read: !read }).eq("id", id);
  revalidatePath("/admin/mensagens");
}

export async function deleteMessage(formData: FormData) {
  const { supabase, authorized } = await requireOwner();
  if (!supabase || !authorized) return;

  const id = text(formData.get("id"));
  if (id) await supabase.from(T.messages).delete().eq("id", id);
  revalidatePath("/admin/mensagens");
}
