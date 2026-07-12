import { NextResponse } from 'next/server';
import { AuthService } from '@/server/services/AuthService';

export async function GET(request: Request) {
  try {
    let token = '';

    const authHeader = request.headers.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      const cookieHeader = request.headers.get('cookie') || '';
      const match = cookieHeader.match(/token=([^;]+)/);
      if (match) {
        token = match[1];
      }
    }

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userWithoutPassword = await AuthService.getCurrentUser(token);
    return NextResponse.json({ user: userWithoutPassword });
  } catch (error: any) {
    console.error('Auth check error:', error);
    if (error.message === 'Invalid or expired token' || error.message === 'User not found') {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
