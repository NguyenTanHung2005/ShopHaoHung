'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/common';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/lib/utils';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const setCart = useCartStore((state) => state.setCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const savedItems = window.localStorage.getItem('cart-items');
    if (savedItems) {
      try {
        const parsed = JSON.parse(savedItems) as typeof items;
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      } catch {
        window.localStorage.removeItem('cart-items');
      }
    }

    setHydrated(true);
  }, [setCart]);

  useEffect(() => {
    if (!hydrated || typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem('cart-items', JSON.stringify(items));
  }, [hydrated, items]);

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const handleClearAll = () => {
    clearCart();
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('cart-items');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Sprint 2</p>
          <h1 className="text-3xl font-black tracking-tight text-slate-950">Giỏ hàng</h1>
        </div>
        <Button variant="outline" size="sm" onClick={handleClearAll} disabled={items.length === 0}>
          Xóa tất cả
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-lg font-medium text-slate-700">Giỏ hàng đang trống.</p>
          <Link href="/shop" className="mt-4 inline-flex">
            <Button>Mua ngay</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div>
                  <div className="font-semibold text-slate-950">{item.product.name}</div>
                  <div className="text-sm text-slate-500">Số lượng: {item.quantity}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-medium text-slate-950">{formatCurrency(item.product.price * item.quantity)}</div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}>
                      -
                    </Button>
                    <span className="min-w-8 text-center text-sm font-semibold text-slate-700">{item.quantity}</span>
                    <Button variant="outline" size="sm" onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}>
                      +
                    </Button>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => removeItem(item.product.id)}>
                    Xóa
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">Tổng thanh toán</h2>
            <div className="mt-4 text-3xl font-black text-slate-950">{formatCurrency(total)}</div>
            <p className="mt-2 text-sm text-slate-500">Chưa gồm phí vận chuyển và thuế.</p>
            <Button className="mt-6" fullWidth>
              Thanh toán
            </Button>
          </aside>
        </div>
      )}
    </div>
  );
}
