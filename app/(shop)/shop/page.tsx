'use client';

import { useCallback, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ProductCard } from '@/components/product';
import { Button, Input } from '@/components/common';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { PRODUCT_CATEGORIES, SORT_OPTIONS } from '@/constants';
import { useAuth, useDebounce, useFetch } from '@/hooks';
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
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const { isAuthenticated, isHydrated } = useAuth();
  const debouncedSearch = useDebounce(searchTerm, 300);
  const { data: fetchedProducts, loading, error } = useFetch<Product[]>(fetchProducts, []);
  const products = useMemo(() => fetchedProducts ?? [], [fetchedProducts]);
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

  const PAGE_SIZE = 12; // Tăng số lượng hiển thị mỗi trang
  const totalPages = Math.max(Math.ceil(filteredProducts.length / PAGE_SIZE), 1);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(startIndex, startIndex + PAGE_SIZE);
  }, [currentPage, filteredProducts]);

  const handleAddToCart = useCallback(
    (product: Product) => {
      if (!isHydrated || !isAuthenticated) {
        addToast({
          message: 'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng',
          type: 'warning',
          duration: 2500,
        });
        router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      addItem(product, 1);
      addToast({
        message: `Đã thêm "${product.name}" vào giỏ hàng`,
        type: 'success',
        duration: 2000,
      });
    },
    [addItem, addToast, isAuthenticated, isHydrated, pathname, router]
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
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-10 text-center md:text-left md:flex md:items-end md:justify-between border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Cửa hàng</h1>
          <p className="text-lg text-slate-500">Khám phá bộ sưu tập sản phẩm thể thao cao cấp của chúng tôi.</p>
        </div>
        <div className="mt-4 md:mt-0 text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm inline-block">
          Hiển thị <span className="text-slate-900 font-bold">{paginatedProducts.length}</span> / {filteredProducts.length} sản phẩm
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* SIDEBAR BỘ LỌC */}
        <aside className="lg:w-1/4 shrink-0">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 sticky top-24 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Bộ lọc</h2>
              <button 
                onClick={handleResetFilters}
                className="text-sm font-medium text-rose-500 hover:text-rose-600 hover:underline"
              >
                Xóa lọc
              </button>
            </div>

            {/* Tìm kiếm */}
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-3">Tìm kiếm</h3>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Nhập tên sản phẩm..."
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
            </div>

            {/* Danh mục */}
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-3">Danh mục</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => handleCategoryChange(null)} 
                  className={`w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center justify-between ${selectedCategory === null ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                >
                  <span className="font-medium">Tất cả sản phẩm</span>
                  {selectedCategory === null && <span className="text-white">✓</span>}
                </button>
                {PRODUCT_CATEGORIES.map((cat) => (
                  <button 
                    key={cat.id} 
                    onClick={() => handleCategoryChange(cat.id)} 
                    className={`w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center justify-between ${selectedCategory === cat.id ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                  >
                    <span className="font-medium">{cat.name}</span>
                    {selectedCategory === cat.id && <span className="text-white">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Sắp xếp */}
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-3">Sắp xếp theo</h3>
              <select 
                value={sortBy} 
                onChange={(e) => handleSortChange(e.target.value)} 
                className="block w-full pl-3 pr-10 py-2.5 text-base border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-xl cursor-pointer"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        {/* LƯỚI SẢN PHẨM */}
        <main className="lg:w-3/4">
          {loading ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center shadow-sm">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600 text-lg">Đang tải sản phẩm...</p>
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-rose-200 bg-rose-50 p-10 text-center text-rose-600 shadow-sm">
              <p className="text-lg font-medium">{error}</p>
            </div>
          ) : !paginatedProducts.length ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-sm">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Không tìm thấy sản phẩm!</h3>
              <p className="text-slate-500 text-lg mb-8 max-w-md mx-auto">Chúng tôi không tìm thấy sản phẩm nào khớp với tiêu chí tìm kiếm của bạn. Hãy thử thay đổi bộ lọc.</p>
              <Button onClick={handleResetFilters} size="lg" className="rounded-full px-8">Xóa tất cả bộ lọc</Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
              </div>

              {/* Phân trang */}
              {totalPages > 1 && (
                <div className="mt-16 flex items-center justify-center gap-2">
                  <button 
                    disabled={currentPage === 1} 
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  
                  <div className="flex gap-1.5">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button 
                        key={p} 
                        onClick={() => setCurrentPage(p)}
                        className={`w-10 h-10 rounded-full font-medium transition-all ${
                          p === currentPage 
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' 
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  <button 
                    disabled={currentPage === totalPages} 
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
