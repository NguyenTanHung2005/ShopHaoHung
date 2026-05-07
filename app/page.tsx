import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/common';
import { ProductCard } from '@/components/product';
import { APP_NAME, APP_DESCRIPTION } from '@/constants';
import { MOCK_PRODUCTS } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: `${APP_NAME} - ${APP_DESCRIPTION}`,
  description: APP_DESCRIPTION,
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: '/',
    type: 'website',
  },
};

export default function Home() {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 3);

  return (
    <div className="space-y-16">
      <section className="grid gap-8 overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-8 text-white shadow-2xl lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-12">
        <div className="flex flex-col justify-center gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200">
            Sprint 1 UI foundation
          </div>
          <h1 className="max-w-xl text-4xl font-black leading-tight tracking-tight lg:text-6xl">
            {APP_NAME}
          </h1>
          <p className="max-w-xl text-lg text-slate-300">{APP_DESCRIPTION}. Khởi động với UI đẹp, ảnh thật, dữ liệu mẫu và cấu trúc sẵn cho các sprint tiếp theo.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/shop">
              <Button variant="primary" size="lg">
                Mua sắm ngay
              </Button>
            </Link>
            <Link href="#featured">
              <Button variant="outline" size="lg">
                Xem sản phẩm nổi bật
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-blue-500 via-cyan-400 to-emerald-400 p-4">
          <Image
            src="/assets/hero-sport.svg"
            alt="Sports Shop hero"
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 text-3xl">🚚</div>
          <h3 className="text-xl font-semibold">Giao hàng nhanh</h3>
          <p className="mt-2 text-slate-600">Miễn phí giao hàng cho đơn hàng trên 1 triệu.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 text-3xl">🛡️</div>
          <h3 className="text-xl font-semibold">Thanh toán an toàn</h3>
          <p className="mt-2 text-slate-600">Bảo vệ thông tin cá nhân của bạn.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 text-3xl">↩️</div>
          <h3 className="text-xl font-semibold">Trả hàng dễ dàng</h3>
          <p className="mt-2 text-slate-600">30 ngày trả hàng miễn phí.</p>
        </div>
      </section>

      <section id="featured" className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Featured</p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-950">Sản phẩm nổi bật</h2>
          </div>
          <Link href="/shop" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            Xem toàn bộ
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] bg-slate-100 p-8 text-center lg:p-12">
        <h2 className="text-3xl font-bold tracking-tight text-slate-950">Bạn mới lần đầu?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600">Khám phá các sản phẩm thể thao chất lượng cao từ các thương hiệu nổi tiếng. Sprint 1 đã có đầy đủ khung giao diện để đi tiếp sang auth, CRUD và dashboard.</p>
        <div className="mt-8">
          <Link href="/shop">
            <Button variant="primary" size="lg">
              Khám phá sản phẩm
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
