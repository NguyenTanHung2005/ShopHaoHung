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
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div
        role="link"
        tabIndex={0}
        onClick={() => router.push(`/shop/${product.id}`)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') router.push(`/shop/${product.id}`);
        }}
        className="group relative aspect-[16/10] cursor-pointer overflow-hidden bg-white"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          quality={85}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 25vw, 20vw"
          className="object-contain p-2 transition duration-300 group-hover:scale-[1.02]"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
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

      <div className="p-3.5">
        <h3
          role="link"
          tabIndex={0}
          onClick={() => router.push(`/shop/${product.id}`)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') router.push(`/shop/${product.id}`);
          }}
          className="truncate cursor-pointer text-base font-semibold text-slate-900 transition hover:text-blue-600"
        >
          {product.name}
        </h3>

        {product.brand && <p className="mb-1 text-[11px] text-gray-500">Hãng: {product.brand}</p>}
        {product.material && <p className="mb-1.5 text-[11px] text-gray-500">Chất liệu: {product.material}</p>}

        <p className="mb-2.5 line-clamp-2 text-xs leading-5 text-slate-600">{product.description}</p>

        <div className="mb-2.5 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-base font-bold text-slate-950">{formatCurrency(product.price)}</span>
            {discount > 0 && (
              <span className="text-[11px] text-gray-400 line-through">{formatCurrency(originalPrice)}</span>
            )}
          </div>
          <span className="text-xs text-amber-500">⭐ {product.rating}</span>
        </div>

        <div className="flex gap-1.5">
          <Button
            variant="primary"
            size="sm"
            fullWidth
            className="px-3 py-1.5 text-xs"
            onClick={() => onAddToCart?.(product)}
          >
            Thêm giỏ
          </Button>
          <div className="flex-1">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              className="px-3 py-1.5 text-xs"
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
