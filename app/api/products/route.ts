import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

function requireAuth(req: Request) {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  return verifyToken(token);
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error fetching products' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const user = requireAuth(req);
  if (!user) {
    return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const newProduct = await prisma.product.create({
      data: {
        name: body.name,
        category: body.category,
        description: body.description,
        imageUrl: body.imageUrl,
        imageUrl2: body.imageUrl2 || null,
      },
    });
    return NextResponse.json({ success: true, data: newProduct });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error creating product' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const user = requireAuth(req);
  if (!user) {
    return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updated = await prisma.product.update({
      where: { id: body.id },
      data: {
        name: body.name,
        category: body.category,
        description: body.description,
        imageUrl: body.imageUrl,
        imageUrl2: body.imageUrl2 || null,
      },
    });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error updating product' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const user = requireAuth(req);
  if (!user) {
    return NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'Missing ID' }, { status: 400 });

    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error deleting product' }, { status: 500 });
  }
}
