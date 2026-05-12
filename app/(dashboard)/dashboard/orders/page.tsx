'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge, Button } from '@/components/common';
import { Input } from '@/components/common';
import { formatCurrency } from '@/lib/utils';
import type { Order, User } from '@/types';

export default function OrdersPage() {
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [createUserId, setCreateUserId] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoading(true);
        setError('');

        const [ordersResponse, usersResponse] = await Promise.all([fetch('/api/orders'), fetch('/api/users')]);
        const [ordersPayload, usersPayload] = await Promise.all([ordersResponse.json(), usersResponse.json()]);

        if (!ordersResponse.ok || !ordersPayload?.success) {
          throw new Error(ordersPayload?.error || 'Không thể tải đơn hàng');
        }

        if (!usersResponse.ok || !usersPayload?.success) {
          throw new Error(usersPayload?.error || 'Không thể tải người dùng');
        }

        setOrders(ordersPayload.data || []);
        setUsers(usersPayload.data || []);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Không thể tải đơn hàng');
      } finally {
        setIsLoading(false);
      }
    };

    void loadOrders();
  }, []);

  const filteredOrders = filterStatus
    ? orders.filter((order) => order.status === filterStatus)
    : orders;

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
    return users.find((u) => u.id === userId)?.name || 'Unknown';
  };

  // Inline order creation and status update have been moved to dedicated pages

  const handleDeleteOrder = async (orderId: string) => {
    if (!window.confirm('Xóa đơn hàng này?')) {
      return;
    }

    const response = await fetch(`/api/orders/${orderId}`, { method: 'DELETE' });
    const payload = await response.json();

    if (!response.ok || !payload?.success) {
      window.alert(payload?.error || 'Xóa đơn hàng thất bại');
      return;
    }

    setOrders((currentOrders) => currentOrders.filter((order) => order.id !== orderId));
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Sprint 3</p>
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📦 Quản lý Orders</h2>
        <p className="mt-2 text-slate-600">Quản lý tất cả đơn hàng và theo dõi trạng thái.</p>
      </div>

      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={filterStatus === null ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus(null)}
          >
            Tất cả ({orders.length})
          </Button>
          {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} (
              {orders.filter((order) => order.status === status).length})
            </Button>
          ))}
        </div>
        <Link href="/dashboard/orders/new">
          <Button variant="primary">+ Tạo đơn hàng mới</Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
        {error ? <div className="border-b border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Order ID</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Customer</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Items</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Total</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Date</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-sm text-slate-500">
                  Đang tải đơn hàng...
                </td>
              </tr>
            ) : filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-sm text-slate-500">
                  Không có đơn hàng phù hợp.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
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
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/dashboard/orders/${order.id}/edit`}>
                        <Button size="sm" variant="outline">
                          Sửa
                        </Button>
                      </Link>
                      <Button size="sm" variant="secondary" onClick={() => void handleDeleteOrder(order.id)}>
                        Xóa
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
