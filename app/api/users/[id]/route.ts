import { NextResponse } from 'next/server';
import { MOCK_USERS } from '@/lib/mock-data';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_: Request, { params }: RouteContext) {
  const { id } = await params;
  const user = MOCK_USERS.find((item) => item.id === id);

  if (!user) {
    return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: user });
}
