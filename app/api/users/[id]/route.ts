import { NextResponse } from 'next/server';
import { deleteUser, getUser, updateUser } from '@/lib/admin-store';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_: Request, { params }: RouteContext) {
  const { id } = await params;
  const user = getUser(id);

  if (!user) {
    return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: user });
}

export async function PUT(request: Request, { params }: RouteContext) {
  const { id } = await params;
  const body = await request.json();
  const user = updateUser(id, body);

  if (!user) {
    return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: user });
}

export async function DELETE(_: Request, { params }: RouteContext) {
  const { id } = await params;
  const deleted = deleteUser(id);

  if (!deleted) {
    return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Deleted successfully' });
}
