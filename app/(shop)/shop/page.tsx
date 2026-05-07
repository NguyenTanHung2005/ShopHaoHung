'use client';

import { useCallback, useMemo, useState } from 'react';
import { ProductCard } from '@/components/product';
import { Button, Input } from '@/components/common';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { DEFAULT_PAGE_SIZE, PRODUCT_CATEGORIES, SORT_OPTIONS } from '@/constants';
import { useDebounce, useFetch } from '@/hooks';
import type { Product } from '@/types';

async function fetchProducts() {
  const response = await fetch('/api/products?limit=100');
  const payload = await response.json();

  if (!response.ok || !payload?.success) {
    throw new Error(payload?.error || 'Không tải được danh sách sản phẩm');
  }

  return { data: payload.data as Product[] };
}

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(searchTerm, 300);
  const { data: fetchedProducts, loading, error } = useFetch<Product[]>(fetchProducts, []);
  const products = fetchedProducts ?? [];
  const addItem = useCartStore((state) => state.addItem);
  const addToast = useUIStore((state) => state.addToast);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (debouncedSearch) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          product.description.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter((product) => product.category === selectedCategory);
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [products, debouncedSearch, selectedCategory, sortBy]);

  const totalPages = Math.max(Math.ceil(filteredProducts.length / DEFAULT_PAGE_SIZE), 1);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * DEFAULT_PAGE_SIZE;
    return filteredProducts.slice(startIndex, startIndex + DEFAULT_PAGE_SIZE);
  }, [currentPage, filteredProducts]);

  const handleAddToCart = useCallback(
    (product: Product) => {
      addItem(product, 1);
      addToast({
        message: `Đã thêm "${product.name}" vào giỏ hàng`,
        type: 'success',
        duration: 2000,
      });
    },
    [addItem, addToast]
  );

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setSortBy('newest');
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Cửa hàng</h1>
      <p className="text-slate-500">Tìm kiếm, lọc và phân trang sản phẩm thể thao.</p>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Search */}
        <div>
          <h3 className="font-semibold mb-3">Tìm kiếm</h3>
          <Input
            type="text"
            placeholder="Tìm sản phẩm..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-3">Danh mục</h3>
          <div className="space-y-2">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`block w-full text-left px-3 py-2 rounded transition ${
                selectedCategory === null ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
              }`}
            >
              Tất cả
            </button>
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`block w-full text-left px-3 py-2 rounded transition ${
                  selectedCategory === cat.id ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div>
          <h3 className="font-semibold mb-3">Sắp xếp</h3>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Results count */}
        <div>
          <h3 className="font-semibold mb-3">Kết quả</h3>
          <p className="px-3 py-2 bg-gray-50 rounded">{filteredProducts.length} sản phẩm</p>
        </div>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">
          Đang tải sản phẩm...
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-10 text-center text-rose-600 shadow-sm">
          {error}
        </div>
      ) : null}

      {/* Products Grid */}
      {!loading && !error && paginatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      ) : !loading && !error ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Không tìm thấy sản phẩm phù hợp</p>
          <Button onClick={handleResetFilters} className="mt-4">
            Xóa bộ lọc
          </Button>
        </div>
      ) : null}

      {totalPages > 1 ? (
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}>
            Trước
          </Button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}>
            Sau
          </Button>
        </div>
      ) : null}
    </div>
  );
}
