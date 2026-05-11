import { Badge } from '@/components/common';
import { MiniBarChart, StatCard } from '@/components/dashboard';
import { MOCK_ORDERS, MOCK_PRODUCTS } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

const totalRevenue = MOCK_ORDERS.reduce((total, order) => total + order.totalPrice, 0);
const avgOrder = Math.round(totalRevenue / MOCK_ORDERS.length);
const totalOrders = MOCK_ORDERS.length;
const deliveredOrders = MOCK_ORDERS.filter((o) => o.status === 'delivered').length;

const salesData = [
  { label: 'Mon', value: 5 },
  { label: 'Tue', value: 8 },
  { label: 'Wed', value: 6 },
  { label: 'Thu', value: 10 },
  { label: 'Fri', value: 12 },
  { label: 'Sat', value: 9 },
  { label: 'Sun', value: 7 },
];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Sprint 5</p>
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📊 Reports & Analytics</h2>
        <p className="mt-2 text-slate-600">Phân tích dữ liệu bán hàng và performance overview.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="💰 Total Revenue" value={formatCurrency(totalRevenue)} description="Doanh thu tổng cộng" tone="green" icon={<span>₫</span>} />
        <StatCard title="📦 Total Orders" value={String(totalOrders)} description="Tất cả đơn hàng" tone="blue" icon={<span>📦</span>} />
        <StatCard title="⚙️ Avg Order Value" value={formatCurrency(avgOrder)} description="Giá trị đơn hàng trung bình" tone="amber" icon={<span>⚙️</span>} />
        <StatCard title="✅ Delivered" value={String(deliveredOrders)} description={`${Math.round((deliveredOrders / totalOrders) * 100)}% completion`} tone="green" icon={<span>✅</span>} />
      </div>

      <MiniBarChart title="📈 Daily Sales Trend" data={salesData} maxValue={12} />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">📋 Order Status Distribution</h3>
          <div className="space-y-3">
            {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => {
              const count = MOCK_ORDERS.filter((o) => o.status === status).length;
              const percentage = Math.round((count / totalOrders) * 100);
              return (
                <div key={status} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                      <span className="text-slate-500">{count} ({percentage}%)</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition ${
                          status === 'delivered' ? 'bg-green-500' : status === 'shipped' ? 'bg-blue-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">🏆 Top Products</h3>
          <div className="space-y-2">
            {MOCK_PRODUCTS.slice(0, 5).map((product) => (
              <div key={product.id} className="flex justify-between items-center pb-2 border-b border-slate-100 last:border-0">
                <div>
                  <div className="font-medium text-slate-900">{product.name}</div>
                  <div className="text-xs text-slate-500">Stock: {product.stock}</div>
                </div>
                <Badge variant="primary">{formatCurrency(product.price)}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
