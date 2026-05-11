# Sprint 5 - Performance & Optimization

**Thời gian**: Tuần 9-10  
**Trạng thái**: ✅ In Progress - Core tasks completed

## 📌 Mục Tiêu Sprint

- [x] Image optimization with next/image
- [x] SEO metadata & Open Graph
- [x] Performance monitoring (Web Vitals tracking)
- [x] Caching strategies (HTTP headers)
- [x] Bundle size optimization (Dynamic imports)
- [ ] Core Web Vitals improvement (Testing phase)
- [ ] SSR/SSG/ISR page strategy (Advanced - Phase 2)

## 📊 Key Tasks

### 1. Image Optimization ✅

- [x] Replace `<img>` with `next/image`
- [x] Set image dimensions for CLS prevention
- [x] Implement lazy loading
- [x] WebP format support (configured in next.config.ts)
- [x] Responsive image sizes
- [x] Image placeholder/blur effect
- [x] Product gallery optimization

**Implementation**:

- `next.config.ts`: Added image optimization config with WebP/AVIF formats
- `app/(shop)/shop/[id]/page.tsx`: Product images using next/image with quality 92, responsive sizes
- `components/product/ProductCard.tsx`: Already optimized with next/image

### 2. SEO & Metadata ✅

- [x] Meta tags for all pages
- [x] Open Graph tags for social sharing
- [x] Twitter Card support
- [x] Canonical URLs
- [x] Dynamic metadata for product pages
- [x] Sitemap generation
- [x] Robots.txt configuration

**Implementation**:

- `app/layout.tsx`: Enhanced with comprehensive SEO metadata, Open Graph, Twitter Cards
- `app/page.tsx`: Dynamic import ProductCard + optimized metadata with keywords
- `public/robots.txt`: SEO-friendly robots configuration
- `app/sitemap.ts`: Dynamic sitemap generation from MOCK_PRODUCTS

### 3. Rendering Strategies 🔄

- [x] SSR for SEO-critical pages (home, product detail)
- [x] SSG for static pages (about, terms) - Phase 2 (implemented)
- [x] ISR for product listings (revalidate: 3600) - Phase 2 (implemented)
- [x] Client-side rendering for user-specific content (cart, account, dashboard)

**Bug fixes (hotfix)**:

- Restored missing product detail server route so `/shop/[id]` no longer 404s.
- Fixed search/listing add-to-cart flow: adding now shows a top-right toast "Thêm vào giỏ hàng thành công" and redirects to `/cart`.

**Implementation**:

- Home page (`app/page.tsx`): Renders as dynamic import with server-side metadata
- Product detail (`app/(shop)/shop/[id]/page.tsx`): Client-side for user-specific interactions
- Auth-protected routes: Client-side with isHydrated flag to prevent flickering

- ### 4. Performance Monitoring ✅
- [x] Web Vitals tracking
  - [x] LCP (Largest Contentful Paint)
  - [x] FID (First Input Delay)
  - [x] CLS (Cumulative Layout Shift)
- [x] Analytics integration
      -- [ ] Performance budgets - Phase 2
      -- [x] Core Web Vitals dashboard - Phase 2 (demo placeholder created)

**Implementation**:

- `lib/web-vitals.ts`: Web Vitals tracking library
- `app/api/vitals/route.ts`: API endpoint for logging Web Vitals metrics
- `app/(dashboard)/vitals/page.tsx`: Dashboard placeholder explaining metrics collection (demo)

### 5. Caching Strategies ✅

- [x] HTTP cache headers (configured in next.config.ts)
- [x] Browser caching (max-age: 3600)
- [x] CDN caching (Vercel immutable for /\_next/_, static for /static/_)
- [ ] API response caching - Phase 2
- [ ] Service Worker (optional PWA) - Phase 2

**Implementation**:

- `next.config.ts`: Headers config with Cache-Control for different paths
  - Default: 1 hour cache
  - Static assets: 1 year immutable
  - Next.js chunks: 1 year immutable

### 6. Bundle Optimization ✅

- [x] Code splitting (Next.js automatic)
- [x] Dynamic imports for heavy components (ProductCard on home page)
- [x] Tree shaking (Next.js default with SWC)
- [x] CSS purging (Tailwind automatic)
- [x] Font optimization (Geist preloaded)
- [x] JavaScript minification (SWC enabled)

**Implementation**:

- `app/page.tsx`: Dynamic import ProductCard with loading skeleton
- `next.config.ts`: swcMinify: true, compress: true
- Layout: Geist fonts optimized with next/font/google

## 🛠️ Files Modified/Created

- [x] `app/layout.tsx` - Enhanced with full SEO metadata
- [x] `app/page.tsx` - Dynamic import ProductCard + optimized metadata
- [x] `app/(shop)/shop/[id]/page.tsx` - Image optimization with next/image
- [x] `components/product/ProductCard.tsx` - Already using next/image
- [x] `next.config.ts` - Image & performance optimization config
- [x] `public/robots.txt` - SEO robots configuration
- [x] `app/sitemap.ts` - Dynamic sitemap generation
- [x] `lib/web-vitals.ts` - Web Vitals tracking library
- [x] `app/api/vitals/route.ts` - Web Vitals API endpoint
- [x] `app/layout.tsx` - Enhanced with full SEO metadata
- [x] `app/page.tsx` - Dynamic import ProductCard + optimized metadata
- [x] `app/(shop)/shop/page.tsx` - ISR-enabled shop listing (revalidate=3600)
- [x] `app/(shop)/shop/ClientShopPage.tsx` - Client shop UI (receives initialProducts)
- [x] `app/(shop)/shop/[id]/page.tsx` - Product detail (dynamic metadata)
- [x] `components/product/ProductCard.tsx` - Already using next/image
- [x] `next.config.ts` - Image & performance optimization config
- [x] `public/robots.txt` - SEO robots configuration
- [x] `app/sitemap.ts` - Dynamic sitemap generation
- [x] `lib/web-vitals.ts` - Web Vitals tracking library
- [x] `app/api/vitals/route.ts` - Web Vitals API endpoint
- [x] `app/about/page.tsx` - SSG static About page
- [x] `app/terms/page.tsx` - SSG static Terms page
- [x] `app/(dashboard)/vitals/page.tsx` - Web Vitals dashboard placeholder

## 🧪 Metrics & Goals

### Completed ✅

- [x] Image optimization with WebP/AVIF support
- [x] Sitemap auto-generation from products
- [x] Robots.txt for search engine crawling
- [x] Full SEO metadata (OG, Twitter Cards)
- [x] Web Vitals tracking infrastructure
- [x] HTTP caching headers configured
- [x] Dynamic imports for bundle optimization
- [x] Font optimization with next/font

### Targets (Phase 2)

- [ ] LCP: < 2.5s
- [ ] FID: < 100ms
- [ ] CLS: < 0.1
- [ ] FCP: < 1.8s

### Bundle Size

- [ ] JS: < 200KB (baseline ~280KB, optimize further in Phase 2)
- [ ] CSS: < 50KB
- [ ] First Load: < 300KB

## ✨ Next Steps (Sprint 5 Phase 2 & Sprint 6)

### Sprint 5 Phase 2

- [ ] ISR for product listings (revalidate: 3600)
- [ ] SSG for static pages (about, terms)
- [ ] Advanced Web Vitals dashboard
- [ ] Performance budgets
- [ ] Service Worker for PWA

### Sprint 6 - Testing & Deployment

- [ ] Unit tests (Jest)
- [ ] E2E tests (Playwright)
- [ ] GitHub Actions CI/CD
- [ ] Production deployment
- [ ] Final bug fixes & optimizations

## 📝 Notes

### Completed in Sprint 5 Phase 1

1. **Image Optimization**: next/image configured with WebP/AVIF, responsive sizes, quality optimization
2. **SEO**: Full metadata setup, Open Graph, Twitter Cards, robots.txt, dynamic sitemap
3. **Performance**: Web Vitals tracking, caching headers, dynamic imports
4. **Bundle**: Optimized with SWC minification, Tailwind purging, font loading

### Performance Improvements Delivered

- Image delivery optimized with next/image (estimated 30-40% reduction in image payload)
- HTTP caching configured for faster repeat visits
- Dynamic imports reduce initial bundle (ProductCard loads on demand)
- WebP format support for modern browsers
- SEO foundation for better search rankings
