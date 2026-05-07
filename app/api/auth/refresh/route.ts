import { NextResponse } from 'next/server';
import { AUTH_TOKEN_COOKIE, AUTH_USER_COOKIE, decodeSessionUser, encodeSessionUser } from '@/lib/session';

export async function POST(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const userCookie = cookieHeader
    .split(';')
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${AUTH_USER_COOKIE}=`));

  const rawUser = userCookie ? userCookie.split('=').slice(1).join('=') : undefined;
  const user = decodeSessionUser(rawUser);

  if (!user) {
    return NextResponse.json({ success: false, error: 'Session expired' }, { status: 401 });
  }

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
