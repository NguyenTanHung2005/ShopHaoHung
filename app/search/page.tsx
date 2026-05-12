'use client';

import { useState, useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { useProductFilter, getFilterOptions, type FilterOptions } from '@/hooks/useProductFilter';
import { useCartStore } from '@/store/cartStore';
import { ProductCard } from '@/components/product/ProductCard';
import { useUIStore } from '@/store/uiStore';
import { useAuth } from '@/hooks';

export default function SearchPage() {
  const addItem = useCartStore((state) => state.addItem);
  const addToast = useUIStore((state) => state.addToast);
  const { isAuthenticated, isHydrated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: 'newest',
  });
  const [showFilters, setShowFilters] = useState(true);

  const filterOptions = useMemo(() => getFilterOptions(MOCK_PRODUCTS), []);
  const filtered = useProductFilter(MOCK_PRODUCTS, filters);

  const handleFilterChange = useCallback(
    (key: keyof FilterOptions, value: string | number | undefined) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value || undefined,
      }));
    },
    []
  );

  const handleAddToCart = useCallback(
    (product: (typeof MOCK_PRODUCTS)[0]) => {
      if (!isHydrated || !isAuthenticated) {
        addToast({ message: 'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng', type: 'warning', duration: 2500 });
        router.push(`/auth/login?redirect=${encodeURIComponent(pathname ?? '/shop')}`);
        return;
      }

      addItem(product, 1);
      addToast({ message: `Thêm vào giỏ hàng thành công`, type: 'success', duration: 2000 });
      router.push('/cart');
    },
    [addItem, addToast, isAuthenticated, isHydrated, pathname, router]
  );

  const handleReset = useCallback(() => {
    setFilters({ sortBy: 'newest' });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Tìm kiếm sản phẩm</h1>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <aside
            className={`${
              showFilters ? 'block' : 'hidden'
            } lg:block w-full lg:w-64 flex-shrink-0`}
          >
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4 lg:hidden">
                <h2 className="font-semibold text-lg">Bộ lọc</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <label className="block font-medium text-sm mb-2">Tìm kiếm</label>
                  <input
                    type="text"
                    placeholder="Tên sản phẩm..."
                    value={filters.search || ''}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Price Range */}
                <div>
                  <label className="block font-medium text-sm mb-3">Khoảng giá</label>
                  <div className="space-y-2">
                    <input
                      type="number"
                      placeholder="Giá tối thiểu"
                      value={filters.minPrice || ''}
                      onChange={(e) =>
                        handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Giá tối đa"
                      value={filters.maxPrice || ''}
                      onChange={(e) =>
                        handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block font-medium text-sm mb-2">Loại sản phẩm</label>
                  <select
                    value={filters.category || ''}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Tất cả</option>
                    {filterOptions.categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === 'rackets' && 'Vợt'}
                        {cat === 'shuttlecocks' && 'Ống cầu lông'}
                        {cat === 'sets' && 'Bộ sản phẩm'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Brand */}
                <div>
                  <label className="block font-medium text-sm mb-2">Hãng sản xuất</label>
                  <select
                    value={filters.brand || ''}
                    onChange={(e) => handleFilterChange('brand', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Tất cả</option>
                    {filterOptions.brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Material */}
                <div>
                  <label className="block font-medium text-sm mb-2">Chất liệu</label>
                  <select
                    value={filters.material || ''}
                    onChange={(e) => handleFilterChange('material', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Tất cả</option>
                    {filterOptions.materials.map((material) => (
                      <option key={material} value={material}>
                        {material}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label className="block font-medium text-sm mb-2">Sắp xếp</label>
                  <select
                    value={filters.sortBy || 'newest'}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="newest">Mới nhất</option>
                    <option value="price-asc">Giá: Thấp đến Cao</option>
                    <option value="price-desc">Giá: Cao đến Thấp</option>
                    <option value="rating">Đánh giá cao nhất</option>
                    <option value="name">Tên A-Z</option>
                  </select>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium transition"
                >
                  Xóa bộ lọc
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Hiện bộ lọc
            </button>

            {/* Results */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  Tìm thấy <span className="font-bold text-lg">{filtered.length}</span> sản phẩm
                </p>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào phù hợp</p>
                  <button
                    onClick={handleReset}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4 xl:gap-5">
                  {filtered.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={() => handleAddToCart(product)}
                    />
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
