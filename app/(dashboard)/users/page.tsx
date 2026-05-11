'use client';

import { Badge } from '@/components/common';
import { MOCK_USERS } from '@/lib/mock-data';

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Sprint 3</p>
        <h2 className="text-3xl font-black tracking-tight text-slate-950">👥 Quản lý Users</h2>
        <p className="mt-2 text-slate-600">Danh sách người dùng hệ thống với role và thông tin.</p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-3xl font-black text-blue-600">{MOCK_USERS.length}</div>
          <div className="text-sm text-slate-600">Tổng Users</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-3xl font-black text-blue-600">{MOCK_USERS.filter((u) => u.role === 'admin').length}</div>
          <div className="text-sm text-slate-600">Admin</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-3xl font-black text-green-600">{MOCK_USERS.filter((u) => u.role === 'user').length}</div>
          <div className="text-sm text-slate-600">Regular Users</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-3xl font-black text-amber-600">100%</div>
          <div className="text-sm text-slate-600">Active Rate</div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Name</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Email</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Role</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Join Date</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {MOCK_USERS.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50">
                <td className="px-4 py-4 font-medium text-slate-950">{user.name}</td>
                <td className="px-4 py-4 text-slate-600">{user.email}</td>
                <td className="px-4 py-4">
                  <Badge variant={user.role === 'admin' ? 'primary' : 'neutral'}>
                    {user.role === 'admin' ? '🔐 Admin' : 'User'}
                  </Badge>
                </td>
                <td className="px-4 py-4 text-sm text-slate-500">{new Date(user.createdAt).toLocaleDateString('vi-VN')}</td>
                <td className="px-4 py-4">
                  <Badge variant="success">Active</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
