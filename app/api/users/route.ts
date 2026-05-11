import { NextResponse } from 'next/server';
import { createUser, listUsers } from '@/lib/admin-store';

export async function GET() {
  const users = listUsers();
  return NextResponse.json({ success: true, data: users, total: users.length });
}

export async function POST(request: Request) {
  const body = await request.json();
  const createdUser = createUser(body);

  return NextResponse.json({ success: true, data: createdUser }, { status: 201 });
}
