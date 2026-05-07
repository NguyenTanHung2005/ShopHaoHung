'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { Badge, Button } from '@/components/common';
import { formatCurrency } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/shop/${product.id}`} className="block">
        <div className="group relative aspect-[4/3] overflow-hidden bg-slate-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute left-4 top-4">
            <Badge variant={product.category === 'shoes' ? 'primary' : 'neutral'}>
              {product.category}
            </Badge>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/shop/${product.id}`}>
          <h3 className="truncate text-lg font-semibold text-slate-900 transition hover:text-blue-600">
            {product.name}
          </h3>
        </Link>

        <p className="mb-3 line-clamp-2 text-sm text-slate-600">{product.description}</p>

        <div className="mb-3 flex items-center justify-between">
          <span className="text-lg font-bold text-slate-950">{formatCurrency(product.price)}</span>
          <span className="text-sm text-amber-500">⭐ {product.rating}</span>
        </div>

        <div className="flex gap-2">
          <Button variant="primary" size="sm" fullWidth onClick={() => onAddToCart?.(product)}>
            Thêm giỏ
          </Button>
          <Link href={`/shop/${product.id}`} className="flex-1">
            <Button variant="outline" size="sm" fullWidth>
              Chi tiết
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
