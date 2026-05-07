import { Badge } from '@/components/common';
import { MOCK_ORDERS } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Sprint 3</p>
        <h2 className="text-3xl font-black tracking-tight text-slate-950">Orders CRUD</h2>
      </div>

      <div className="grid gap-4">
        {MOCK_ORDERS.map((order) => (
          <div key={order.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="font-semibold text-slate-950">{order.id}</div>
                <div className="text-sm text-slate-500">{formatDate(order.createdAt)}</div>
              </div>
              <Badge variant={order.status === 'delivered' ? 'success' : 'warning'}>{order.status}</Badge>
            </div>
            <div className="mt-4 grid gap-2 text-sm text-slate-600 md:grid-cols-3">
              <div>Items: {order.items.length}</div>
              <div>User: {order.userId}</div>
              <div>Total: {formatCurrency(order.totalPrice)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
