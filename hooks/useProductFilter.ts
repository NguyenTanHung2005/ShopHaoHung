import { useMemo } from 'react';
import { Product } from '@/types';

export interface FilterOptions {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  subcategory?: string;
  brand?: string;
  material?: string;
  sortBy?: 'name' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

type ExtendedProduct = Product & {
  subcategory?: string;
  brand?: string;
  material?: string | string[];
};

export function useProductFilter(products: Product[], filters: FilterOptions) {
  const filtered = useMemo(() => {
    let result = [...products];

    // Search by name or description
    if (filters.search) {
      const query = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Filter by price range
    if (filters.minPrice !== undefined) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }

    // Filter by category
    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    // Filter by subcategory
    if (filters.subcategory) {
      result = result.filter((p) => (p as ExtendedProduct).subcategory === filters.subcategory);
    }

    // Filter by brand
    if (filters.brand) {
      result = result.filter((p) => (p as ExtendedProduct).brand === filters.brand);
    }

    // Filter by material
    if (filters.material) {
      result = result.filter((p) => (p as ExtendedProduct).material?.includes(filters.material as string));
    }

    // Sort
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case 'newest':
          result.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case 'name':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }
    }

    return result;
  }, [products, filters]);

  return filtered;
}

// Helper to get unique values for filters
export function getFilterOptions(products: Product[]) {
  const brands = Array.from(
    new Set(products.map((p) => (p as ExtendedProduct).brand).filter(Boolean))
  );
  const materials = Array.from(
    new Set(products.map((p) => (p as ExtendedProduct).material).filter(Boolean).flat())
  );
  const categories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean))
  );
  const subcategories = Array.from(
    new Set(products.map((p) => (p as ExtendedProduct).subcategory).filter(Boolean))
  );
  const prices = products.map((p) => p.price).sort((a, b) => a - b);

  return {
    brands: brands as string[],
    materials: materials as string[],
    categories: categories as string[],
    subcategories: subcategories as string[],
    minPrice: prices[0] || 0,
    maxPrice: prices[prices.length - 1] || 0,
  };
}
