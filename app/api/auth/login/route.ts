import { NextResponse } from 'next/server';
import { MOCK_USERS } from '@/lib/mock-data';
import { AUTH_TOKEN_COOKIE, AUTH_USER_COOKIE, encodeSessionUser } from '@/lib/session';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ success: false, error: 'Missing credentials' }, { status: 400 });
  }

  if (password !== '123456') {
    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
  }

  const matchedUser =
    MOCK_USERS.find((user) => user.email === email) ??
    MOCK_USERS[1] ??
    {
      id: 'tmp',
      email,
      name: email.split('@')[0],
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

  const response = NextResponse.json({
    success: true,
    data: {
      user: matchedUser,
      token: `token-${matchedUser.id}-${Date.now()}`,
    },
  });

  response.cookies.set(AUTH_TOKEN_COOKIE, `token-${matchedUser.id}-${Date.now()}`, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });
  response.cookies.set(AUTH_USER_COOKIE, encodeSessionUser(matchedUser), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });

  return response;
}
