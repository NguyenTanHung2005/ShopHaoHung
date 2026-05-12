import { NextResponse } from 'next/server';
import { deleteProduct, getProduct, updateProduct } from '@/lib/admin-store';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_: Request, { params }: RouteContext) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: product });
}

export async function PUT(request: Request, { params }: RouteContext) {
  const { id } = await params;
  const body = await request.json();
  const product = updateProduct(id, body);

  if (!product) {
    return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: product });
}

export async function DELETE(_: Request, { params }: RouteContext) {
  const { id } = await params;
  const deleted = deleteProduct(id);

  if (!deleted) {
    return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: 'Deleted successfully' });
}
