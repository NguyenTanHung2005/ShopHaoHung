import { MiniBarChart, StatCard } from '@/components/dashboard';
import { MOCK_ORDERS } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

const revenueSeries = [
  { label: 'Revenue', value: MOCK_ORDERS.reduce((total, order) => total + order.totalPrice, 0) },
  { label: 'Avg order', value: Math.round(MOCK_ORDERS.reduce((total, order) => total + order.totalPrice, 0) / MOCK_ORDERS.length) },
  { label: 'Order count', value: MOCK_ORDERS.length * 1000000 },
];

export default function ReportsPage() {
  const totalRevenue = MOCK_ORDERS.reduce((total, order) => total + order.totalPrice, 0);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Sprint 5</p>
        <h2 className="text-3xl font-black tracking-tight text-slate-950">Reports</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <StatCard title="Revenue" value={formatCurrency(totalRevenue)} tone="green" />
        <StatCard title="Orders" value={String(MOCK_ORDERS.length)} tone="blue" />
        <StatCard title="Average order" value={formatCurrency(Math.round(totalRevenue / MOCK_ORDERS.length))} tone="amber" />
      </div>

      <MiniBarChart title="Revenue snapshot" data={revenueSeries} />
    </div>
  );
}
