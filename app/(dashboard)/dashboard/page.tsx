import Link from 'next/link';
import { Badge } from '@/components/common';
import { MiniBarChart, StatCard } from '@/components/dashboard';
import { MOCK_ORDERS, MOCK_PRODUCTS, MOCK_USERS } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

const revenue = MOCK_ORDERS.reduce((total, order) => total + order.totalPrice, 0);
const pendingOrders = MOCK_ORDERS.filter((order) => order.status !== 'delivered').length;

const salesData = [
  { label: 'Mon', value: 5 },
  { label: 'Tue', value: 8 },
  { label: 'Wed', value: 6 },
  { label: 'Thu', value: 10 },
  { label: 'Fri', value: 12 },
  { label: 'Sat', value: 9 },
  { label: 'Sun', value: 7 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Sprint 5</p>
          <h2 className="text-4xl font-black tracking-tight text-slate-950">Dashboard overview</h2>
          <p className="mt-2 text-slate-600">Tổng quan doanh thu, đơn hàng và người dùng từ dữ liệu mock.</p>
        </div>
        <Badge variant="success">SSR-ready</Badge>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Doanh thu" value={formatCurrency(revenue)} description="Tổng doanh thu mock" tone="green" icon={<span>₫</span>} />
        <StatCard title="Đơn hàng" value={String(MOCK_ORDERS.length)} description="Tổng số đơn hàng" tone="blue" icon={<span>📦</span>} />
        <StatCard title="Người dùng" value={String(MOCK_USERS.length)} description="Tài khoản hệ thống" tone="amber" icon={<span>👥</span>} />
        <StatCard title="Đang xử lý" value={String(pendingOrders)} description="Đơn cần theo dõi" tone="rose" icon={<span>⏳</span>} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <MiniBarChart title="Doanh thu theo ngày" data={salesData} maxValue={12} />

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Quick actions</h3>
            <Badge variant="primary">MVP</Badge>
          </div>
          <div className="grid gap-3">
            <Link href="/dashboard/products" className="rounded-2xl border border-slate-200 px-4 py-3 hover:border-blue-200 hover:bg-blue-50">Quản lý Products</Link>
            <Link href="/dashboard/orders" className="rounded-2xl border border-slate-200 px-4 py-3 hover:border-blue-200 hover:bg-blue-50">Xem Orders</Link>
            <Link href="/dashboard/users" className="rounded-2xl border border-slate-200 px-4 py-3 hover:border-blue-200 hover:bg-blue-50">Xem Users</Link>
            <Link href="/dashboard/reports" className="rounded-2xl border border-slate-200 px-4 py-3 hover:border-blue-200 hover:bg-blue-50">Mở Reports</Link>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Sản phẩm nổi bật</h3>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {MOCK_PRODUCTS.slice(0, 3).map((product) => (
            <div key={product.id} className="rounded-2xl border border-slate-200 p-4">
              <div className="text-sm text-slate-500">{product.category}</div>
              <div className="mt-2 font-semibold text-slate-950">{product.name}</div>
              <div className="mt-1 text-sm text-slate-600">{product.description}</div>
              <div className="mt-3 text-sm font-medium text-blue-600">{formatCurrency(product.price)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
