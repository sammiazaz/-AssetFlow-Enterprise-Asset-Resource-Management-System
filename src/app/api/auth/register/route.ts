import { NextResponse } from 'next/server';
import { AuthService } from '@/server/services/AuthService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userWithoutPassword = await AuthService.register(body);

    return NextResponse.json(
      { message: 'User registered successfully', user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    if (error.message === 'Email already registered') {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    if (error.message.includes('ValidationFailed')) {
      const parsed = JSON.parse(error.message);
      return NextResponse.json({ error: 'Validation failed', details: parsed.details }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
