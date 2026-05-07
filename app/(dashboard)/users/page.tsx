import { Badge } from '@/components/common';
import { MOCK_USERS } from '@/lib/mock-data';

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Sprint 3</p>
        <h2 className="text-3xl font-black tracking-tight text-slate-950">Users CRUD</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {MOCK_USERS.map((user) => (
          <div key={user.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="font-semibold text-slate-950">{user.name}</div>
                <div className="text-sm text-slate-500">{user.email}</div>
              </div>
              <Badge variant={user.role === 'admin' ? 'primary' : 'neutral'}>{user.role}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
