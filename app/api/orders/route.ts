import { NextResponse } from 'next/server';
import { MOCK_ORDERS } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({ success: true, data: MOCK_ORDERS, total: MOCK_ORDERS.length });
}

export async function POST(request: Request) {
  const body = await request.json();
  const createdOrder = {
    id: `ORD-${Date.now()}`,
    userId: body.userId || '1',
    items: body.items || [],
    totalPrice: body.totalPrice || 0,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return NextResponse.json({ success: true, data: createdOrder }, { status: 201 });
}
