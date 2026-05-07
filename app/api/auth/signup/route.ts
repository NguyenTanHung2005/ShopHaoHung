import { NextResponse } from 'next/server';
import { AUTH_TOKEN_COOKIE, AUTH_USER_COOKIE, encodeSessionUser } from '@/lib/session';
import type { User } from '@/types';

export async function POST(request: Request) {
  const { email, password, name } = await request.json();

  if (!email || !password || !name) {
    return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ success: false, error: 'Password too short' }, { status: 400 });
  }

  const user: User = {
    id: `user-${Date.now()}`,
    email,
    name,
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const token = `token-${user.id}-${Date.now()}`;
  const response = NextResponse.json({ success: true, data: { user, token } });
  response.cookies.set(AUTH_TOKEN_COOKIE, token, { httpOnly: true, sameSite: 'lax', path: '/' });
  response.cookies.set(AUTH_USER_COOKIE, encodeSessionUser(user), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });

  return response;
}
