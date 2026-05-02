import { NextResponse } from 'next/server';

// Mock data store (global to this instance)
let products = [
  { id: '1', name: 'Empacadora al Vacío', category: 'empaque', description: 'Sellado hermético al vacío para prolongar la vida útil de tus productos.', imageUrl: '/images/products/empacadora-al-vacio.webp' },
  { id: '2', name: 'Sierra de Carne y Hueso', category: 'procesamiento', description: 'Sierra industrial de piso para cortes de alta precisión en carne y hueso.', imageUrl: '/images/products/sierra-carne.jpg' },
  { id: '3', name: 'Barra Fría para Ensaladas', category: 'refrigeracion', description: 'Conservación óptima con control digital de temperatura para buffet.', imageUrl: '/images/products/barra-fria-ensaladas.webp' },
  { id: '4', name: 'Madurador de Carnes', category: 'refrigeracion', description: 'Maduración controlada para obtener cortes premium de calidad gourmet.', imageUrl: '/images/products/madurador-carnes.jpg' },
  { id: '5', name: 'Amasadora de Espiral 20L', category: 'procesamiento', description: 'Mezclado profesional para masas de panadería con motor de alta potencia.', imageUrl: '/images/products/amasadora-espiral.webp' },
  { id: '6', name: 'Tostador Eléctrico Comercial', category: 'empaque', description: 'Tostado uniforme de alta velocidad con bandas transportadoras para producción continua.', imageUrl: '/images/products/tostador-electrico.webp' },
];

export async function GET() {
  return NextResponse.json({ success: true, data: products });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newProduct = { ...body, id: String(Date.now()) };
    products.push(newProduct);
    return NextResponse.json({ success: true, data: newProduct });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error creating product' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const index = products.findIndex(p => p.id === body.id);
    if (index === -1) return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    
    products[index] = { ...products[index], ...body };
    return NextResponse.json({ success: true, data: products[index] });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error updating product' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'Missing ID' }, { status: 400 });
    
    products = products.filter(p => p.id !== id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error deleting product' }, { status: 500 });
  }
}
