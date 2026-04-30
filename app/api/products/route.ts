import { NextResponse } from "next/server";

let products = [
  {
    id: "1",
    name: "Empacadora al Vacío",
    category: "empaque",
    desc: "Sellado hermético",
    img: "https://images.example.com/1.webp",
  },
];

export async function GET() {
  return NextResponse.json({ success: true, data: products });
}

export async function POST(req: Request) {
  const body = await req.json();

  const newProduct = {
    id: Date.now().toString(),
    ...body,
  };

  products.push(newProduct);

  return NextResponse.json({
    success: true,
    data: newProduct,
  });
}
