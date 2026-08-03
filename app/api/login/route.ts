import { NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const validEmail = process.env.ADMIN_EMAIL;
    const validPassword = process.env.ADMIN_PASSWORD;

    if (email === validEmail && password === validPassword) {
      const token = signToken({ email });
      return NextResponse.json({
        success: true,
        token,
        user: { name: 'Admin Antigravity', email },
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
