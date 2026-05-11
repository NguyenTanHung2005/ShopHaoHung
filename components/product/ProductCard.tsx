'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { Badge, Button } from '@/components/common';
import { formatCurrency } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const router = useRouter();
  const discount = product.discount ?? 0;
  const originalPrice = discount > 0 ? Math.round(product.price / (1 - discount / 100)) : product.price;

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div
        role="link"
        tabIndex={0}
        onClick={() => router.push(`/shop/${product.id}`)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') router.push(`/shop/${product.id}`);
        }}
        className="group relative aspect-[4/3] cursor-pointer overflow-hidden bg-slate-100"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex flex-col gap-2">
          <Badge variant={product.category === 'shoes' ? 'primary' : 'neutral'}>
            {product.category === 'rackets' && 'Vợt'}
            {product.category === 'shuttlecocks' && 'Ống cầu'}
            {product.category === 'sets' && 'Bộ sản phẩm'}
          </Badge>
          {discount > 0 && (
            <Badge variant="warning">
              -<span className="font-bold">{discount}%</span>
            </Badge>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3
          role="link"
          tabIndex={0}
          onClick={() => router.push(`/shop/${product.id}`)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') router.push(`/shop/${product.id}`);
          }}
          className="truncate text-lg font-semibold text-slate-900 transition hover:text-blue-600 cursor-pointer"
        >
          {product.name}
        </h3>

        {product.brand && <p className="mb-1 text-xs text-gray-500">Hãng: {product.brand}</p>}
        {product.material && <p className="mb-2 text-xs text-gray-500">Chất liệu: {product.material}</p>}

        <p className="mb-3 line-clamp-2 text-sm text-slate-600">{product.description}</p>

        <div className="mb-3 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-slate-950">{formatCurrency(product.price)}</span>
            {discount > 0 && (
              <span className="text-xs text-gray-400 line-through">{formatCurrency(originalPrice)}</span>
            )}
          </div>
          <span className="text-sm text-amber-500">⭐ {product.rating}</span>
        </div>

        <div className="flex gap-2">
          <Button variant="primary" size="sm" fullWidth onClick={() => onAddToCart?.(product)}>
            Thêm giỏ
          </Button>
          <div className="flex-1">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => router.push(`/shop/${product.id}`)}
            >
              Chi tiết
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
