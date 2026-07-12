import { NextResponse } from 'next/server';
import { AuthService } from '@/server/services/AuthService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, user } = await AuthService.login(body);

    const response = NextResponse.json({
      message: 'Login successful',
      token,
      user,
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    if (error.message === 'Invalid email or password') {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    if (error.message.includes('ValidationFailed')) {
      const parsed = JSON.parse(error.message);
      return NextResponse.json({ error: 'Validation failed', details: parsed.details }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
