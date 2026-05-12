'use client';

import Link from 'next/link';
import { Badge } from '@/components/common';
import { MiniBarChart, StatCard } from '@/components/dashboard';
import { MOCK_ORDERS, MOCK_PRODUCTS, MOCK_USERS } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

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
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">🔐 Admin Dashboard</p>
          <h2 className="text-4xl font-black tracking-tight text-slate-950">
            Welcome, {user?.name}! 👋
          </h2>
          <p className="mt-2 text-slate-600">Tổng quan doanh thu, đơn hàng, người dùng và sản phẩm.</p>
        </div>
        <Badge variant="success">🟢 Live</Badge>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="💰 Doanh thu" value={formatCurrency(revenue)} description="Tổng doanh thu mock" tone="green" icon={<span>₫</span>} />
        <StatCard title="📦 Đơn hàng" value={String(MOCK_ORDERS.length)} description="Tổng số đơn hàng" tone="blue" icon={<span>📦</span>} />
        <StatCard title="👥 Người dùng" value={String(MOCK_USERS.length)} description="Tài khoản hệ thống" tone="amber" icon={<span>👥</span>} />
        <StatCard title="🛍️ Sản phẩm" value={String(MOCK_PRODUCTS.length)} description="Sản phẩm trong kho" tone="rose" icon={<span>🛍️</span>} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <MiniBarChart title="📊 Doanh thu theo ngày" data={salesData} maxValue={12} />

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">⚡ Quick actions</h3>
            <Badge variant="primary">MVP</Badge>
          </div>
          <div className="grid gap-3">
            <Link href="/dashboard/products" className="rounded-2xl border border-slate-200 px-4 py-3 hover:border-blue-200 hover:bg-blue-50 transition">
              🛍️ Quản lý Products
            </Link>
            <Link href="/dashboard/orders" className="rounded-2xl border border-slate-200 px-4 py-3 hover:border-blue-200 hover:bg-blue-50 transition">
              📦 Xem Orders
            </Link>
            <Link href="/dashboard/users" className="rounded-2xl border border-slate-200 px-4 py-3 hover:border-blue-200 hover:bg-blue-50 transition">
              👥 Xem Users
            </Link>
            <Link href="/dashboard/reports" className="rounded-2xl border border-slate-200 px-4 py-3 hover:border-blue-200 hover:bg-blue-50 transition">
              📊 Mở Reports
            </Link>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">🌟 Sản phẩm nổi bật</h3>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {MOCK_PRODUCTS.slice(0, 3).map((product) => (
            <div key={product.id} className="rounded-2xl border border-slate-200 p-4 hover:border-blue-200 hover:shadow-md transition">
              <div className="text-sm font-medium text-slate-500 uppercase">{product.category}</div>
              <div className="mt-2 font-semibold text-slate-950 line-clamp-2">{product.name}</div>
              <div className="mt-1 text-sm text-slate-600 line-clamp-2">{product.description}</div>
              <div className="mt-3 flex justify-between items-center">
                <div className="text-sm font-bold text-blue-600">{formatCurrency(product.price)}</div>
                <Badge variant={product.stock > 30 ? 'success' : 'warning'}>
                  Stock: {product.stock}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">📋 Recent Orders</h3>
          <div className="space-y-2">
            {MOCK_ORDERS.slice(0, 3).map((order) => (
              <div key={order.id} className="flex justify-between items-center pb-2 border-b border-slate-100 last:border-0">
                <div>
                  <div className="font-medium text-slate-900">{order.id}</div>
                  <div className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</div>
                </div>
                <Badge variant={order.status === 'delivered' ? 'success' : 'warning'}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">👥 Users Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-700">Tổng Users</span>
              <span className="font-bold text-blue-600">{MOCK_USERS.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-700">Admin</span>
              <span className="font-bold text-purple-600">{MOCK_USERS.filter((u) => u.role === 'admin').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-700">Regular Users</span>
              <span className="font-bold text-green-600">{MOCK_USERS.filter((u) => u.role === 'user').length}</span>
            </div>
            <div className="h-px bg-slate-200 my-2" />
            <div className="flex justify-between items-center">
              <span className="text-slate-700">Active Rate</span>
              <span className="font-bold text-green-600">100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
