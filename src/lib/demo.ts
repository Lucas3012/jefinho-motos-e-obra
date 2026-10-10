import type { Category, Product, Service } from "./types";

/**
 * Dados de demonstração usados quando o Supabase ainda não foi configurado.
 * Assim você consegue ver o site rodando antes de conectar o banco.
 */

export const DEMO_CATEGORIES: Category[] = [
  { id: "c1", name: "Filtros e Óleos", slug: "filtros-e-oleos", type: "pecas", description: "Óleo de motor, filtros de óleo, ar e combustível", icon: "oil", position: 1 },
  { id: "c2", name: "Freios", slug: "freios", type: "pecas", description: "Pastilhas, discos, sapatas e sangria de freio", icon: "brake", position: 2 },
  { id: "c3", name: "Transmissão", slug: "transmissao", type: "pecas", description: "Correntes, pinhões, kit relação e coroa", icon: "chain", position: 3 },
  { id: "c4", name: "Elétrica", slug: "eletrica", type: "pecas", description: "Baterias, velas, lâmpadas e chicotes", icon: "bolt", position: 4 },
  { id: "c5", name: "Suspensão e Pneus", slug: "suspensao-e-pneus", type: "pecas", description: "Amortecedores, pneus, câmaras e rodas", icon: "wheel", position: 5 },
  { id: "c6", name: "Cimento e Argamassa", slug: "cimento-e-argamassa", type: "materiais", description: "Cimento, argamassa, cal e gesso", icon: "cement", position: 1 },
  { id: "c7", name: "Aço e Ferragens", slug: "aco-e-ferragens", type: "materiais", description: "Vergalhão, tela, perfil, parafusos e ferragens", icon: "steel", position: 2 },
  { id: "c8", name: "Areia, Brita e Solo", slug: "areia-brita-e-solo", type: "materiais", description: "Areia lavada, brita, pedrisco e terra vegetal", icon: "sand", position: 3 },
  { id: "c9", name: "Tintas e Revestimentos", slug: "tintas-e-revestimentos", type: "materiais", description: "Tintas, primers, revestimentos e texturas", icon: "paint", position: 4 },
  { id: "c10", name: "Hidráulica e Elétrico", slug: "hidraulica-e-eletrico", type: "materiais", description: "Tubos, conexões, fios, disjuntores e caixas", icon: "pipe", position: 5 },
  { id: "c11", name: "Madeira e Contraplacado", slug: "madeira-e-contraplacado", type: "materiais", description: "Madeira, compensado, MDF, tábuas e ripas", icon: "wood", position: 6 },
];

const cat = (slug: string) => DEMO_CATEGORIES.find((c) => c.slug === slug) ?? null;

export const DEMO_PRODUCTS: Product[] = [
  { id: "p1", name: "Óleo de Motor 20W50 - 1L", description: "Óleo mineral para motos 4 tempos. Ideal para uso urbano e viagens curtas.", type: "pecas", category_id: cat("filtros-e-oleos")?.id ?? null, brand: "Ipiranga", price: 39.9, unit: "un", stock: 48, image_url: null, featured: true, active: true, created_at: "", updated_at: "", category: cat("filtros-e-oleos") },
  { id: "p2", name: "Kit de Relação 428H", description: "Kit completo com corrente, pinhão e coroa. Durabilidade elevada para motos 125cc e 160cc.", type: "pecas", category_id: cat("transmissao")?.id ?? null, brand: "DID", price: 189.9, unit: "kit", stock: 12, image_url: null, featured: true, active: true, created_at: "", updated_at: "", category: cat("transmissao") },
  { id: "p3", name: "Pastilha de Freio Dianteira", description: "Pastilha sem amianto para motos populares. Excelente frenagem e baixo ruído.", type: "pecas", category_id: cat("freios")?.id ?? null, brand: "Bosch", price: 79.9, unit: "par", stock: 25, image_url: null, featured: true, active: true, created_at: "", updated_at: "", category: cat("freios") },
  { id: "p4", name: "Bateria 5Ah Motocicleta", description: "Bateria selada, sem manutenção. Compatível com CG, Fan, Factor e Biz.", type: "pecas", category_id: cat("eletrica")?.id ?? null, brand: "Moura", price: 229.9, unit: "un", stock: 8, image_url: null, featured: false, active: true, created_at: "", updated_at: "", category: cat("eletrica") },
  { id: "p5", name: "Filtro de Ar - CG 160", description: "Filtro de ar original, garante rendimento e protege o motor.", type: "pecas", category_id: cat("filtros-e-oleos")?.id ?? null, brand: "Honda", price: 44.9, unit: "un", stock: 30, image_url: null, featured: false, active: true, created_at: "", updated_at: "", category: cat("filtros-e-oleos") },
  { id: "p6", name: "Pneu Traseiro 110/80-14", description: "Pneu tubeless para motos urbanas. Ótima aderência em piso molhado.", type: "pecas", category_id: cat("suspensao-e-pneus")?.id ?? null, brand: "Pirelli", price: 259.9, unit: "un", stock: 10, image_url: null, featured: false, active: true, created_at: "", updated_at: "", category: cat("suspensao-e-pneus") },
  { id: "p7", name: "Cimento CP II - 50kg", description: "Cimento Portland comum para alvenaria, contrapiso e fundações.", type: "materiais", category_id: cat("cimento-e-argamassa")?.id ?? null, brand: "Votorantim", price: 36.9, unit: "saco", stock: 400, image_url: null, featured: true, active: true, created_at: "", updated_at: "", category: cat("cimento-e-argamassa") },
  { id: "p8", name: "Brita 0 (Pedrisco) - m³", description: "Brita graduada para contrapiso, alicerce e concreto armado.", type: "materiais", category_id: cat("areia-brita-e-solo")?.id ?? null, brand: null, price: 289, unit: "m³", stock: null, image_url: null, featured: true, active: true, created_at: "", updated_at: "", category: cat("areia-brita-e-solo") },
  { id: "p9", name: "Areia Lavada - m³", description: "Areia lavada e peneirada para argamassa, reboco e assentamento.", type: "materiais", category_id: cat("areia-brita-e-solo")?.id ?? null, brand: null, price: 219, unit: "m³", stock: null, image_url: null, featured: false, active: true, created_at: "", updated_at: "", category: cat("areia-brita-e-solo") },
  { id: "p10", name: "Vergalhão 10mm - 12m", description: "Vergalhão CA-50 para armadura de fundação, laje e pilares.", type: "materiais", category_id: cat("aco-e-ferragens")?.id ?? null, brand: "Gerdau", price: 79.9, unit: "barra", stock: 150, image_url: null, featured: false, active: true, created_at: "", updated_at: "", category: cat("aco-e-ferragens") },
  { id: "p11", name: "Tinta Acrílica Fosca - 18L", description: "Tinta acrílica de alta cobertura para paredes internas e externas.", type: "materiais", category_id: cat("tintas-e-revestimentos")?.id ?? null, brand: "Suvinil", price: 329.9, unit: "lata", stock: 20, image_url: null, featured: true, active: true, created_at: "", updated_at: "", category: cat("tintas-e-revestimentos") },
  { id: "p12", name: "Tubo PVC Esgoto 100mm - 6m", description: "Tubo PVC sanfonado para esgotamento sanitário e pluvial.", type: "materiais", category_id: cat("hidraulica-e-eletrico")?.id ?? null, brand: "Tigre", price: 89.9, unit: "barra", stock: 60, image_url: null, featured: false, active: true, created_at: "", updated_at: "", category: cat("hidraulica-e-eletrico") },
];

export const DEMO_SERVICES: Service[] = [
  { id: "s1", name: "Troca de Óleo e Filtros", description: "Troca de óleo do motor, limpeza ou troca do filtro de ar e verificação geral dos fluidos.", price: 90, duration: "30 min", icon: "oil", featured: true, active: true, position: 1 },
  { id: "s2", name: "Revisão Completa", description: "Revisão de 20 mil km: freios, relação, velas, cabos, pneus, nivelamento e aperto geral.", price: 180, duration: "2h", icon: "wrench", featured: true, active: true, position: 2 },
  { id: "s3", name: "Troca de Relação", description: "Instalação de kit de relação novo com regulagem de tensão e alinhamento da roda traseira.", price: 120, duration: "1h", icon: "chain", featured: true, active: true, position: 3 },
  { id: "s4", name: "Troca de Pastilha e Disco", description: "Substituição de pastilhas, retífica de disco quando necessário e sangria do sistema de freio.", price: 110, duration: "1h", icon: "brake", featured: false, active: true, position: 4 },
  { id: "s5", name: "Serviço de Elétrica", description: "Diagnóstico e reparo de partida, regulação de voltagem, troca de baterias, velas e lâmpadas.", price: 100, duration: "1h", icon: "bolt", featured: false, active: true, position: 5 },
  { id: "s6", name: "Alinhamento e Balanceamento", description: "Alinhamento de direção e balanceamento de rodas para direção mais segura e economia de pneu.", price: 70, duration: "40 min", icon: "wheel", featured: false, active: true, position: 6 },
  { id: "s7", name: "Troca de Amortecedores", description: "Substituição de amortecedores dianteiros e/ou traseiros com verificação da suspensão completa.", price: 140, duration: "1h30", icon: "spring", featured: false, active: true, position: 7 },
  { id: "s8", name: "Montagem de Moto Nova", description: "Montagem completa de motocicleta zero com check-list de 32 itens e primeira revisão.", price: 250, duration: "4h", icon: "bike", featured: true, active: true, position: 8 },
];

export const DEMO_TESTIMONIALS = [
  {
    name: "Marcos Silva",
    role: "Cliente desde 2021",
    text: "Levo minha CG no Jefinho há anos. Sempre explica o que precisa ser feito e o preço é justo. Recomendo de olhos fechados.",
  },
  {
    name: "Construtora Oliveira",
    role: "Obra residencial - Vila Mariana",
    text: "Compramos cimento, brita e argamassa para uma obra inteira. Entregaram no dia seguinte, tudo certinho. Virou fornecedor fixo.",
  },
  {
    name: "Ana Paula",
    role: "Cliente nova",
    text: "Agendei pelo site e cheguei no horário marcado, a moto saiu pronta no mesmo dia. Atendimento rápido e sem enrolação.",
  },
];
