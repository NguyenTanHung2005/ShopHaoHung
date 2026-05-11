# Sprint 5 - Performance & Optimization

**Thời gian**: Tuần 9-10  
**Trạng thái**: 🔄 Planned

## 📌 Mục Tiêu Sprint

- [ ] Image optimization with next/image
- [ ] SSR/SSG/ISR page strategy
- [ ] SEO metadata & Open Graph
- [ ] Performance monitoring
- [ ] Caching strategies
- [ ] Bundle size optimization
- [ ] Core Web Vitals improvement

## 📊 Key Tasks

### 1. Image Optimization
- [ ] Replace `<img>` with `next/image`
- [ ] Set image dimensions for CLS prevention
- [ ] Implement lazy loading
- [ ] WebP format support
- [ ] Responsive image sizes
- [ ] Image placeholder/blur effect
- [ ] Product gallery optimization

### 2. SEO & Metadata
- [ ] Meta tags for all pages
- [ ] Open Graph tags for social sharing
- [ ] Twitter Card support
- [ ] Canonical URLs
- [ ] Dynamic metadata for product pages
- [ ] Sitemap generation
- [ ] Robots.txt configuration

### 3. Rendering Strategies
- [ ] SSR for SEO-critical pages (home, product detail)
- [ ] SSG for static pages (about, terms)
- [ ] ISR for product listings (revalidate: 3600)
- [ ] Client-side rendering for user-specific content

### 4. Performance Monitoring
- [ ] Web Vitals tracking
  - LCP (Largest Contentful Paint)
  - FID (First Input Delay)
  - CLS (Cumulative Layout Shift)
- [ ] Analytics integration
- [ ] Performance budgets
- [ ] Core Web Vitals dashboard

### 5. Caching Strategies
- [ ] HTTP cache headers
- [ ] Browser caching
- [ ] CDN caching (Vercel)
- [ ] API response caching
- [ ] Service Worker (optional PWA)

### 6. Bundle Optimization
- [ ] Code splitting
- [ ] Dynamic imports for heavy components
- [ ] Tree shaking unused code
- [ ] CSS purging
- [ ] Font optimization (Geist)
- [ ] JavaScript minification

## 🛠️ Expected Files to Update

- [ ] `app/layout.tsx` - Add metadata
- [ ] `app/page.tsx` - SSG metadata
- [ ] `app/(shop)/shop/[id]/page.tsx` - Dynamic metadata
- [ ] `components/product/ProductCard.tsx` - Use next/image
- [ ] `app/(shop)/layout.tsx` - Add SEO defaults
- [ ] `next.config.js` - Image & performance config

## 🧪 Metrics & Goals

### Page Speed
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1
- FCP: < 1.8s

### Bundle Size
- JS: < 200KB
- CSS: < 50KB
- First Load: < 300KB

### Lighthouse Scores
- Performance: 90+
- SEO: 100
- Best Practices: 95+
- Accessibility: 95+

## ✨ Next Steps (Sprint 6)
- Unit & E2E testing
- GitHub Actions CI/CD
- Production deployment
- Final bug fixes

## 📝 Notes

- Image optimization is priority #1
- SEO is important for product discovery
- Performance metrics tracked in Vercel Analytics
- Consider Next.js 14+ rendering optimizations
