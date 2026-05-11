'use client';

import { useState } from 'react';
import { Badge, Button } from '@/components/common';
import { MOCK_ORDERS, MOCK_USERS } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

export default function OrdersPage() {
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const filteredOrders = filterStatus
    ? MOCK_ORDERS.filter((order) => order.status === filterStatus)
    : MOCK_ORDERS;

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'error' | 'neutral' | 'primary'> = {
      delivered: 'success',
      shipped: 'primary',
      processing: 'warning',
      pending: 'warning',
      cancelled: 'error',
    };
    return variants[status] || 'neutral';
  };

  const getUserName = (userId: string) => {
    return MOCK_USERS.find((u) => u.id === userId)?.name || 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Sprint 3</p>
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📦 Quản lý Orders</h2>
        <p className="mt-2 text-slate-600">Quản lý tất cả đơn hàng và theo dõi trạng thái.</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          variant={filterStatus === null ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilterStatus(null)}
        >
          Tất cả ({MOCK_ORDERS.length})
        </Button>
        {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
          <Button
            key={status}
            variant={filterStatus === status ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} (
            {MOCK_ORDERS.filter((o) => o.status === status).length})
          </Button>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Order ID</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Customer</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Items</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Total</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50">
                <td className="px-4 py-4 font-medium text-slate-950">{order.id}</td>
                <td className="px-4 py-4 text-slate-600">{getUserName(order.userId)}</td>
                <td className="px-4 py-4 text-slate-600">{order.items.length} item(s)</td>
                <td className="px-4 py-4 font-medium text-blue-600">{formatCurrency(order.totalPrice)}</td>
                <td className="px-4 py-4">
                  <Badge variant={getStatusBadge(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </td>
                <td className="px-4 py-4 text-sm text-slate-500">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
