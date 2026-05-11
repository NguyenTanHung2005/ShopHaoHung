import { MOCK_PRODUCTS } from '@/lib/mock-data';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Static pages
  const staticPages = [
    { url: '', changefreq: 'daily', priority: 1.0 },
    { url: '/shop', changefreq: 'daily', priority: 0.9 },
    { url: '/account', changefreq: 'monthly', priority: 0.5 },
    { url: '/cart', changefreq: 'weekly', priority: 0.6 },
    { url: '/demo', changefreq: 'weekly', priority: 0.4 },
    { url: '/contact', changefreq: 'monthly', priority: 0.3 },
    { url: '/terms', changefreq: 'yearly', priority: 0.2 },
  ];

  // Dynamic product pages
  const productPages = MOCK_PRODUCTS.map((product) => ({
    url: `/shop/${product.id}`,
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: new Date(product.updatedAt).toISOString().split('T')[0],
  }));

  const allPages = [...staticPages, ...productPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map(
      (page: { url: string; changefreq: string; priority: number; lastmod?: string }) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=43200, s-maxage=43200',
    },
  });
}
