import { NextResponse } from 'next/server';
import { deleteOrder, getOrder, updateOrder } from '@/lib/admin-store';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_: Request, { params }: RouteContext) {
  const { id } = await params;
  const order = getOrder(id);

  if (!order) {
    return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: order });
}

export async function PUT(request: Request, { params }: RouteContext) {
  const { id } = await params;
  const body = await request.json();
  const order = updateOrder(id, body);

  if (!order) {
    return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: order });
}

export async function DELETE(_: Request, { params }: RouteContext) {
  const { id } = await params;
  const deleted = deleteOrder(id);

  if (!deleted) {
    return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Deleted successfully' });
}
