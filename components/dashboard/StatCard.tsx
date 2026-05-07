import type { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon?: ReactNode;
  tone?: 'blue' | 'green' | 'amber' | 'rose';
}

const toneStyles = {
  blue: 'from-blue-500 to-blue-600',
  green: 'from-emerald-500 to-emerald-600',
  amber: 'from-amber-500 to-orange-500',
  rose: 'from-rose-500 to-pink-600',
};

export function StatCard({ title, value, description, icon, tone = 'blue' }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
          {description ? <p className="mt-2 text-sm text-slate-500">{description}</p> : null}
        </div>
        {icon ? (
          <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg ${toneStyles[tone]}`}>
            {icon}
          </div>
        ) : null}
      </div>
    </div>
  );
}
