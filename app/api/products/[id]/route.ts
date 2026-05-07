import { NextResponse } from 'next/server';
import { MOCK_PRODUCTS } from '@/lib/mock-data';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_: Request, { params }: RouteContext) {
  const { id } = await params;
  const product = MOCK_PRODUCTS.find((item) => item.id === id);

  if (!product) {
    return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: product });
}

export async function PUT(request: Request, { params }: RouteContext) {
  const { id } = await params;
  const body = await request.json();
  const product = MOCK_PRODUCTS.find((item) => item.id === id);

  if (!product) {
    return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    data: {
      ...product,
      ...body,
      updatedAt: new Date().toISOString(),
    },
  });
}

export async function DELETE(_: Request, { params }: RouteContext) {
  const { id } = await params;
  const product = MOCK_PRODUCTS.find((item) => item.id === id);

  if (!product) {
    return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Deleted successfully' });
}
