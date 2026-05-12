import { NextResponse } from 'next/server';
import { AUTH_USER_COOKIE, decodeSessionUser } from '@/lib/session';

export async function GET(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const userCookie = cookieHeader
    .split(';')
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${AUTH_USER_COOKIE}=`));

  const rawUser = userCookie ? userCookie.split('=').slice(1).join('=') : undefined;
  const user = decodeSessionUser(rawUser);

  if (!user) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
  }

  return NextResponse.json({ success: true, data: { user } });
}
