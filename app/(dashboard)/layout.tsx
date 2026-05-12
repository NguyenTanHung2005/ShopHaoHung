import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { AdminGuard } from '@/components/dashboard/AdminGuard';

export const metadata: Metadata = {
  title: 'Dashboard Admin',
  description: 'Khu quản trị cho ShopHaoHung',
};

const adminDashboardLinks = [
  { href: '/dashboard', label: 'Tổng quan' },
  { href: '/dashboard/products', label: 'Products' },
  { href: '/dashboard/orders', label: 'Orders' },
  { href: '/dashboard/users', label: 'Users' },
  { href: '/dashboard/reports', label: 'Reports' },
  { href: '/dashboard/upload', label: 'Upload' },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AdminGuard>
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm h-fit lg:sticky lg:top-6">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">🔐 Admin Area</p>
            <h1 className="mt-2 text-2xl font-black text-slate-950">Dashboard</h1>
          </div>
          <nav className="space-y-2">
            {adminDashboardLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-2xl px-4 py-3 text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <section className="space-y-6">{children}</section>
      </div>
    </AdminGuard>
  );
}
