import { NextResponse } from 'next/server';
import { MOCK_ORDERS } from '@/lib/mock-data';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_: Request, { params }: RouteContext) {
  const { id } = await params;
  const order = MOCK_ORDERS.find((item) => item.id === id);

  if (!order) {
    return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: order });
}
