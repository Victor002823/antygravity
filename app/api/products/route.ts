import { NextResponse } from "next/server";

const products = [
  {
    id: "1",
    name: "Empacadora al Vacío",
    category: "empaque",
    desc: "Sellado hermético para conservación premium.",
    img: "https://images.example.com/empacadora.webp",
  },
  {
    id: "2",
    name: "Sierra de Carne y Hueso",
    category: "procesamiento",
    desc: "Corte industrial de alta precisión.",
    img: "https://images.example.com/sierra.webp",
  },
  {
    id: "3",
    name: "Barra Fría para Ensaladas",
    category: "refrigeracion",
    desc: "Conservación óptima con control de temperatura.",
    img: "https://images.example.com/barra-fria.webp",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    count: products.length,
    data: products,
  });
}
