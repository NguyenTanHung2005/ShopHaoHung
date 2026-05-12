import { MetadataRoute } from 'next';
import { MOCK_PRODUCTS } from '@/lib/mock-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/shop`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/account`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/cart`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/demo`, changeFrequency: 'weekly', priority: 0.4 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/terms`, changeFrequency: 'yearly', priority: 0.2 },
  ];

  // Dynamic product pages
  const productPages: MetadataRoute.Sitemap = MOCK_PRODUCTS.map((product) => ({
    url: `${baseUrl}/shop/${product.id}`,
    changeFrequency: 'weekly',
    priority: 0.8,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
  }));

  return [...staticPages, ...productPages];
}
