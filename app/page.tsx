import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/common';
import { APP_NAME, APP_DESCRIPTION } from '@/constants';
import { MOCK_PRODUCTS } from '@/lib/mock-data';

const ProductCard = dynamic(() => import('@/components/product').then(mod => ({ default: mod.ProductCard })), {
  loading: () => <div className="h-72 bg-slate-100 rounded-2xl animate-pulse" />,
  ssr: true,
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  keywords: ['vợt cầu lông', 'cầu lông', 'badminton', 'vợt', 'phụ kiện cầu lông'],
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: '/',
    type: 'website',
    images: [
      {
        url: '/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: ['/assets/og-image.png'],
  },
};

export default function Home() {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 5);
  const newProducts = MOCK_PRODUCTS.slice(5, 10);

  return (
    <div className="space-y-16">
      <section className="grid gap-8 overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-8 text-white shadow-2xl lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-12">
        <div className="flex flex-col justify-center gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200">
            Cầu lông chuyên nghiệp
          </div>
          <h1 className="max-w-xl text-4xl font-black leading-tight tracking-tight lg:text-6xl">
            {APP_NAME}
          </h1>
          <p className="max-w-xl text-lg text-slate-300">{APP_DESCRIPTION}. Tìm kiếm vợt cầu lông chuyên nghiệp từ các thương hiệu hàng đầu như Yonex, Victor, LiNing.</p>
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
            alt="ShopHaoHung hero"
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 text-3xl">🚚</div>
          <h3 className="text-xl font-semibold">Hàng chính hãng</h3>
          <p className="mt-2 text-slate-600">100% sản phẩm chính hãng từ các hãng nổi tiếng.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 text-3xl">🛡️</div>
          <h3 className="text-xl font-semibold">Giá cạnh tranh</h3>
          <p className="mt-2 text-slate-600">Giá tốt nhất trên thị trường.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 text-3xl">↩️</div>
          <h3 className="text-xl font-semibold">Trả hàng dễ dàng</h3>
          <p className="mt-2 text-slate-600">30 ngày trả hàng miễn phí.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-black tracking-tight text-slate-950">🎯 Quảng Cáo Nổi Bật</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="group overflow-hidden rounded-[2rem] bg-gradient-to-br from-yellow-400 via-amber-300 to-orange-400 p-6 shadow-lg transition hover:shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <div className="text-white">
                <p className="text-sm font-bold uppercase tracking-widest opacity-90">Sản phẩm nổi bật</p>
                <h3 className="mt-2 text-2xl font-black">Yonex Nanoflare 1000</h3>
                <p className="mt-2 text-sm opacity-90">Sức mạnh tinh khiết - Hiệu suất tối đa</p>
                <button className="mt-4 rounded-full bg-white px-6 py-2 text-sm font-bold text-amber-600 transition hover:bg-amber-50">
                  Xem ngay
                </button>
              </div>
              <div className="text-5xl">⚡</div>
            </div>
          </div>

          <div className="group overflow-hidden rounded-[2rem] bg-gradient-to-br from-red-500 via-red-400 to-rose-400 p-6 shadow-lg transition hover:shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <div className="text-white">
                <p className="text-sm font-bold uppercase tracking-widest opacity-90">Thiên công mạnh mẽ</p>
                <h3 className="mt-2 text-2xl font-black">VS Energetic Long</h3>
                <p className="mt-2 text-sm opacity-90">Chinh phục mọi đối thủ</p>
                <button className="mt-4 rounded-full bg-white px-6 py-2 text-sm font-bold text-red-600 transition hover:bg-red-50">
                  Xem ngay
                </button>
              </div>
              <div className="text-5xl">🔥</div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">🏆 Thương Hiệu Ưa Chuộng</h2>
          <Link href="/shop" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            Xem tất cả →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { name: 'Yonex', emoji: '🎾', color: 'from-red-100 to-red-50' },
            { name: 'Victor', emoji: '⚡', color: 'from-blue-100 to-blue-50' },
            { name: 'Li-Ning', emoji: '💫', color: 'from-orange-100 to-orange-50' },
            { name: 'Gosen', emoji: '🌟', color: 'from-cyan-100 to-cyan-50' },
            { name: 'Apacs', emoji: '🚀', color: 'from-purple-100 to-purple-50' },
          ].map((brand) => (
            <Link
              key={brand.name}
              href="/shop"
              className={`rounded-2xl border border-slate-200 bg-gradient-to-br ${brand.color} p-6 text-center shadow-sm transition hover:shadow-lg hover:-translate-y-1 cursor-pointer`}
            >
              <div className="text-4xl">{brand.emoji}</div>
              <h3 className="mt-3 font-bold text-slate-900">{brand.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-black tracking-tight text-slate-950">📸 Bộ Sưu Tập Nổi Bật</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {[
            { src: '/assets/PanelHome/imgi_104_vs-long-ma_1774643350.webp', alt: 'VS Energetic Long' },
            { src: '/assets/PanelHome/imgi_108_62-1-_1764612898.webp', alt: 'Gosen Ryzonic 62' },
            { src: '/assets/PanelHome/imgi_113_victor-axelsen_1759089349.webp', alt: 'Victor Axelsen' },
            { src: '/assets/PanelHome/imgi_118_yonex-astrox-99_1757731351.webp', alt: 'Yonex Astrox 99' },
            { src: '/assets/PanelHome/imgi_123_grpht-thrttl_1759089897.webp', alt: 'Yonex Graphite Throttle' },
            { src: '/assets/PanelHome/imgi_128_1000z-launch-website-banner_1695177885.webp', alt: 'Yonex 1000 Z' },
            { src: '/assets/PanelHome/imgi_133_ynx-eclp-banner_1695178004.webp', alt: 'Yonex Eclipse' },
          ].map((panel, index) => (
            <Link
              key={index}
              href="/shop"
              className="group overflow-hidden rounded-2xl border border-slate-200 shadow-sm transition hover:shadow-lg hover:-translate-y-1 bg-white"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <Image
                  src={panel.src}
                  alt={panel.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-3 text-center">
                <p className="text-sm font-semibold text-slate-900">{panel.alt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="featured" className="relative overflow-hidden rounded-[2rem] border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-amber-50 p-5 shadow-xl sm:p-6 lg:p-8">
        <div className="pointer-events-none absolute -left-24 -top-28 h-64 w-64 rounded-full bg-cyan-300/35 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-amber-300/35 blur-3xl" />

        <div className="relative space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-700">Featured Collection</p>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Vợt nổi bật nhất tuần này</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">Những mẫu vợt có hiệu năng cao và được khách hàng lựa chọn nhiều nhất.</p>
            </div>
            <Link href="/shop" className="rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-sm font-semibold text-cyan-700 transition hover:border-cyan-300 hover:bg-white hover:text-cyan-800">
              Xem toàn bộ
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 xl:gap-5">
            {featuredProducts.map((product) => (
              <div key={product.id} className="rounded-2xl bg-white/70 p-1 backdrop-blur-sm ring-1 ring-cyan-100 transition hover:-translate-y-0.5 hover:ring-cyan-300">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-black tracking-tight text-slate-950">✨ Sản Phẩm Mới Ra Mắt</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="overflow-hidden rounded-[2rem] border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 shadow-sm transition hover:shadow-lg">
            <div className="flex items-start justify-between gap-4 md:flex-col">
              <div>
                <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">Mới nhất 2026</span>
                <h3 className="mt-3 text-xl font-black text-slate-900">Yonex Astrox 99</h3>
                <p className="mt-2 text-sm text-slate-600">Công nghệ mới nhất, đáp ứng chuẩn quốc tế</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-lg font-bold text-blue-600">2.890.000₫</span>
                  <span className="text-sm text-slate-500 line-through">3.200.000₫</span>
                </div>
              </div>
              <div className="text-5xl">🆕</div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-sm transition hover:shadow-lg">
            <div className="flex items-start justify-between gap-4 md:flex-col">
              <div>
                <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">Xu hướng 2026</span>
                <h3 className="mt-3 text-xl font-black text-slate-900">Victor Thruster FK</h3>
                <p className="mt-2 text-sm text-slate-600">Thiết kế cải tiến, độ bền cao</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-lg font-bold text-green-600">1.950.000₫</span>
                  <span className="text-sm text-slate-500 line-through">2.100.000₫</span>
                </div>
              </div>
              <div className="text-5xl">🌿</div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-center text-white shadow-2xl lg:p-12">
        <h2 className="text-3xl font-bold tracking-tight">Bạn mới lần đầu?</h2>
        <p className="mx-auto mt-4 max-w-2xl opacity-90">Khám phá bộ sưu tập vợt cầu lông chuyên nghiệp và ống cầu lông chất lượng cao từ các thương hiệu hàng đầu thế giới. Nhận tư vấn miễn phí từ các chuyên gia của chúng tôi.</p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link href="/shop">
            <Button variant="primary" size="lg">
              Khám phá sản phẩm
            </Button>
          </Link>
          <Link href="/demo">
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Xem Demo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
