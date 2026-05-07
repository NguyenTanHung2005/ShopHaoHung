import { NextResponse } from 'next/server';
import { AUTH_TOKEN_COOKIE, AUTH_USER_COOKIE } from '@/lib/session';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.set(AUTH_TOKEN_COOKIE, '', { path: '/', maxAge: 0 });
  response.cookies.set(AUTH_USER_COOKIE, '', { path: '/', maxAge: 0 });
  return response;
}
