export type ProductType = "pecas" | "materiais";

export type Category = {
  id: string;
  name: string;
  slug: string;
  type: ProductType;
  description: string | null;
  icon: string | null;
  position: number;
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  type: ProductType;
  category_id: string | null;
  brand: string | null;
  price: number | null;
  unit: string;
  stock: number | null;
  image_url: string | null;
  featured: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
  category?: Category | null;
};

export type Service = {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  duration: string | null;
  icon: string | null;
  featured: boolean;
  active: boolean;
  position: number;
};

export type QuoteStatus = "novo" | "contatado" | "aprovado" | "cancelado";
export type Quote = {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  product_id: string | null;
  product_name: string | null;
  quantity: number;
  message: string | null;
  status: QuoteStatus;
  created_at: string;
};

export type AppointmentStatus = "pendente" | "confirmado" | "concluido" | "cancelado";
export type Appointment = {
  id: string;
  customer_name: string;
  customer_phone: string;
  motorcycle: string;
  plate: string | null;
  service_id: string | null;
  service_name: string | null;
  preferred_date: string;
  preferred_time: string;
  notes: string | null;
  status: AppointmentStatus;
  created_at: string;
};

export type Message = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  subject: string | null;
  message: string;
  read: boolean;
  created_at: string;
};

/** Forma padrão de retorno das Server Actions. */
export type ActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
};
