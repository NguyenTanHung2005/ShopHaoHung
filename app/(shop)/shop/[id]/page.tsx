'use client';

import Image from 'next/image';
import { useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Badge, Button } from '@/components/common';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { Product } from '@/types';

export default function ShopProductDetailPage() {
  const params = useParams<{ id?: string | string[] }>();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const addToast = useUIStore((state) => state.addToast);
  const rawId = params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const product = MOCK_PRODUCTS.find((item) => item.id === id) ?? null;

  const handleAddToCart = useCallback(() => {
    if (!product) {
      return;
    }

    addItem(product, 1);
    addToast({
      message: `Đã thêm "${product.name}" vào giỏ hàng`,
      type: 'success',
      duration: 2000,
    });
    router.push('/cart');
  }, [addItem, addToast, product, router]);

  if (!product) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-10 text-slate-600 shadow-sm">Không tìm thấy sản phẩm.</div>;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
        <div className="relative aspect-[4/3] bg-slate-50">
          <Image src={product.image} alt={product.name} fill className="object-cover" priority />
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Badge variant="primary">{product.category}</Badge>
          <h1 className="text-4xl font-black tracking-tight text-slate-950">{product.name}</h1>
          <p className="text-lg leading-8 text-slate-600">{product.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-sm text-slate-500">Giá</div>
            <div className="mt-1 text-2xl font-black text-slate-950">{formatCurrency(product.price)}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-sm text-slate-500">Đánh giá</div>
            <div className="mt-1 text-2xl font-black text-slate-950">⭐ {product.rating}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-sm text-slate-500">Tồn kho</div>
            <div className="mt-1 text-2xl font-black text-slate-950">{product.stock}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-sm text-slate-500">Cập nhật</div>
            <div className="mt-1 text-lg font-semibold text-slate-950">{formatDate(product.updatedAt)}</div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleAddToCart} className="flex-1">
            Thêm vào giỏ hàng
          </Button>
          <Button variant="outline" onClick={() => router.back()}>
            Quay lại
          </Button>
        </div>
      </div>
    </div>
  );
}