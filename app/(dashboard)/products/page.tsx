import Link from 'next/link';
import { Badge } from '@/components/common';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Sprint 3</p>
        <h2 className="text-3xl font-black tracking-tight text-slate-950">Products CRUD</h2>
      </div>

      <Link href="/products/new" className="inline-flex">
        <Badge variant="primary">Thêm sản phẩm mới</Badge>
      </Link>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Product</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Category</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Price</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Stock</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {MOCK_PRODUCTS.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-4 font-medium text-slate-950">{product.name}</td>
                  <td className="px-4 py-4 text-slate-600">{product.category}</td>
                  <td className="px-4 py-4 text-slate-600">{formatCurrency(product.price)}</td>
                  <td className="px-4 py-4 text-slate-600">{product.stock}</td>
                  <td className="px-4 py-4"><Badge variant={product.stock > 30 ? 'success' : 'warning'}>{product.stock > 30 ? 'In stock' : 'Low stock'}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
