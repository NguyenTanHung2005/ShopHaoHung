'use client';

import Link from 'next/link';
import { Badge, Button } from '@/components/common';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { useState } from 'react';

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock'>('name');

  const sortedProducts = [...MOCK_PRODUCTS].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'stock':
        return b.stock - a.stock;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Sprint 3</p>
          <h2 className="text-3xl font-black tracking-tight text-slate-950">🛍️ Products CRUD</h2>
          <p className="mt-2 text-slate-600">Quản lý danh sách sản phẩm, giá, kho hàng.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-3xl font-black text-blue-600">{MOCK_PRODUCTS.length}</div>
          <div className="text-sm text-slate-600">Tổng sản phẩm</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-3xl font-black text-green-600">
            {MOCK_PRODUCTS.filter((p) => p.stock > 30).length}
          </div>
          <div className="text-sm text-slate-600">In stock</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-3xl font-black text-amber-600">
            {MOCK_PRODUCTS.filter((p) => p.stock <= 30 && p.stock > 0).length}
          </div>
          <div className="text-sm text-slate-600">Low stock</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-3xl font-black text-red-600">
            {MOCK_PRODUCTS.filter((p) => p.stock === 0).length}
          </div>
          <div className="text-sm text-slate-600">Out of stock</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={sortBy === 'name' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSortBy('name')}
          >
            Sort by Name
          </Button>
          <Button
            variant={sortBy === 'price' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSortBy('price')}
          >
            Sort by Price
          </Button>
          <Button
            variant={sortBy === 'stock' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSortBy('stock')}
          >
            Sort by Stock
          </Button>
        </div>
        <Link href="/dashboard/products/new">
          <Button variant="primary">+ Thêm sản phẩm mới</Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Product</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Category</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Price</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Stock</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Rating</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {sortedProducts.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50">
                <td className="px-4 py-4 font-medium text-slate-950">{product.name}</td>
                <td className="px-4 py-4 text-slate-600">{product.category}</td>
                <td className="px-4 py-4 font-medium text-blue-600">{formatCurrency(product.price)}</td>
                <td className="px-4 py-4 text-slate-600 font-medium">{product.stock} units</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
                    <span className="text-xs text-slate-500">({product.reviews})</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <Badge
                    variant={
                      product.stock > 30
                        ? 'success'
                        : product.stock > 0
                          ? 'warning'
                          : 'error'
                    }
                  >
                    {product.stock > 30 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
