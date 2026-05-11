"use client";

import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge, Button } from '@/components/common';
import { ProductCard } from '@/components/product';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { useAuth } from '@/hooks';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';

const COLOR_OPTIONS = ['Đen', 'Trắng'] as const;
const SIZE_OPTIONS = ['3U', '4U'] as const;

export default function ClientProductDetail({ id }: { id: string | string[] }) {
  const router = useRouter();
  const idStr = Array.isArray(id) ? id[0] : String(id);
  const { isAuthenticated, isHydrated } = useAuth();
  const addItem = useCartStore((state) => state.addItem);
  const addToast = useUIStore((state) => state.addToast);
  // Try a few matching strategies to be resilient to id shapes
  const product =
    MOCK_PRODUCTS.find((item) => item.id === idStr) ??
    MOCK_PRODUCTS.find((item) => String(item.id) === decodeURIComponent(idStr)) ??
    MOCK_PRODUCTS.find((item) => String(item.id) === String(Number(idStr))) ??
    null;
  const [selectedColor, setSelectedColor] = useState<(typeof COLOR_OPTIONS)[number]>('Đen');
  const [selectedSize, setSelectedSize] = useState<(typeof SIZE_OPTIONS)[number]>('3U');
  const [quantity, setQuantity] = useState(1);
  const discount = product?.discount ?? 0;
  const originalPrice = product ? (discount > 0 ? Math.round(product.price / (1 - discount / 100)) : product.price) : 0;

  const handleAddToCart = () => {
    if (!product) return;
    if (!isHydrated || !isAuthenticated) {
      addToast({ message: 'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng', type: 'warning', duration: 2500 });
      router.push(`/auth/login?redirect=${encodeURIComponent(`/shop/${product.id}`)}`);
      return;
    }

    addItem(product, quantity);
    addToast({ message: `Đã thêm ${quantity} "${product.name}" (${selectedColor}, ${selectedSize}) vào giỏ hàng`, type: 'success', duration: 2000 });
    router.push('/cart');
  };

  if (!product) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-10 text-slate-600 shadow-sm">Không tìm thấy sản phẩm.</div>;
  }

  const relatedProducts = MOCK_PRODUCTS.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 5);

  const updateQuantity = (next: number) => setQuantity(Math.max(1, Math.min(product?.stock ?? 1, next)));

  return (
    <div className="space-y-10">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] xl:gap-8">
        <div className="mx-auto w-full max-w-[520px] overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
          <div className="relative aspect-square bg-white p-3 sm:p-4">
            <Image src={product.image} alt={product.name} fill priority quality={92} sizes="(max-width: 1024px) 100vw, 44vw" className="object-contain p-2 transition duration-500 hover:scale-[1.02]" />
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-3">
            <div className="flex gap-2">
              <Badge variant="primary">{product.category === 'rackets' && 'Vợt'}{product.category === 'shuttlecocks' && 'Ống cầu'}{product.category === 'sets' && 'Bộ sản phẩm'}</Badge>
              {discount > 0 && (<Badge variant="warning">-<span className="font-bold">{discount}%</span></Badge>)}
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-950 xl:text-[2rem]">{product.name}</h1>
            {product.brand && (<p className="text-base text-gray-600">Hãng: <span className="font-semibold">{product.brand}</span></p>)}
            <p className="text-base leading-7 text-slate-600">{product.description}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-semibold text-slate-700">Chọn màu sắc</p>
                <div className="flex gap-2">{COLOR_OPTIONS.map((color) => (
                  <button key={color} type="button" onClick={() => setSelectedColor(color)} className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${selectedColor === color ? 'border-blue-600 bg-blue-600 text-white shadow-sm' : 'border-slate-300 bg-white text-slate-700 hover:border-blue-300'}`}>{color}</button>
                ))}</div>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-slate-700">Chọn size</p>
                <div className="flex gap-2">{SIZE_OPTIONS.map((size) => (
                  <button key={size} type="button" onClick={() => setSelectedSize(size)} className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${selectedSize === size ? 'border-blue-600 bg-blue-600 text-white shadow-sm' : 'border-slate-300 bg-white text-slate-700 hover:border-blue-300'}`}>{size}</button>
                ))}</div>
              </div>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-sm font-semibold text-slate-700">Số lượng đặt hàng</p>
              <div className="inline-flex items-center overflow-hidden rounded-lg border border-slate-300 bg-white">
                <button type="button" onClick={() => updateQuantity(quantity - 1)} className="px-3 py-2 text-base font-bold text-slate-700 transition hover:bg-slate-100" aria-label="Giảm số lượng">-</button>
                <input type="number" min={1} max={product.stock} value={quantity} onChange={(event) => updateQuantity(Number(event.target.value || 1))} className="w-16 border-x border-slate-200 py-2 text-center text-sm font-semibold text-slate-900 focus:outline-none" />
                <button type="button" onClick={() => updateQuantity(quantity + 1)} className="px-3 py-2 text-base font-bold text-slate-700 transition hover:bg-slate-100" aria-label="Tăng số lượng">+</button>
              </div>
              <p className="mt-2 text-xs text-slate-500">Tối đa {product.stock} sản phẩm cho đơn hàng này.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4"> 
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-sm text-slate-500">Giá</div>
              <div className="mt-1 flex flex-col"><div className="text-2xl font-black text-slate-950">{formatCurrency(product.price)}</div>{discount > 0 && <div className="text-xs text-gray-400 line-through">{formatCurrency(originalPrice)}</div>}</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="text-sm text-slate-500">Đánh giá</div><div className="mt-1 text-2xl font-black text-slate-950">⭐ {product.rating}</div></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="text-sm text-slate-500">Tồn kho</div><div className="mt-1 text-2xl font-black text-slate-950">{product.stock}</div></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="text-sm text-slate-500">Cập nhật</div><div className="mt-1 text-lg font-semibold text-slate-950">{formatDate(product.updatedAt)}</div></div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleAddToCart} className="flex-1">Thêm vào giỏ hàng</Button>
            <Button variant="outline" onClick={() => router.back()}>Quay lại</Button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Gợi ý</p><h2 className="text-2xl font-black tracking-tight text-slate-950">Sản phẩm tương tự</h2></div></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 xl:gap-5">{relatedProducts.map((relatedProduct) => (<ProductCard key={relatedProduct.id} product={relatedProduct} />))}</div>
        </section>
      )}
    </div>
  );
}
