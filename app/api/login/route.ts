import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // MOCK AUTH: In a real app, check against a database
    if (email === 'admin@test.com' && password === '123456') {
      return NextResponse.json({
        success: true,
        token: 'mock-jwt-token-' + Date.now(),
        user: { name: 'Admin Antigravity', email }
      });
    }

    return NextResponse.json(
      { success: false, message: 'Credenciales incorrectas' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error en el servidor' },
      { status: 500 }
    );
  }
}
