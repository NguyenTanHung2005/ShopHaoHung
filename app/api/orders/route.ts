import { NextResponse } from 'next/server';
import { createOrder, listOrders } from '@/lib/admin-store';

export async function GET() {
  const orders = listOrders();
  return NextResponse.json({ success: true, data: orders, total: orders.length });
}

export async function POST(request: Request) {
  const body = await request.json();
  const createdOrder = createOrder(body);

  return NextResponse.json({ success: true, data: createdOrder }, { status: 201 });
}
