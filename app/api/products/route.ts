import { NextResponse } from 'next/server';
import { createProduct, listProducts } from '@/lib/admin-store';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get('search')?.toLowerCase() || '';
  const category = url.searchParams.get('category') || '';
  const page = Number(url.searchParams.get('page') || 1);
  const limit = Number(url.searchParams.get('limit') || 12);

  let products = listProducts();

  if (search) {
    products = products.filter((product) =>
      `${product.name} ${product.description}`.toLowerCase().includes(search)
    );
  }

  if (category) {
    products = products.filter((product) => product.category === category);
  }

  const total = products.length;
  const startIndex = (page - 1) * limit;
  const data = products.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    success: true,
    data,
    total,
    page,
    limit,
    totalPages: Math.max(Math.ceil(total / limit), 1),
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const createdProduct = createProduct(body);

  return NextResponse.json({ success: true, data: createdProduct }, { status: 201 });
}
