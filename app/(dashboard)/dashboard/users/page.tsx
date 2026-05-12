'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/common';
import { Button, Input } from '@/components/common';
import type { User } from '@/types';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [createName, setCreateName] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetch('/api/users');
        const payload = await response.json();

        if (!response.ok || !payload?.success) {
          throw new Error(payload?.error || 'Không thể tải danh sách người dùng');
        }

        setUsers(payload.data || []);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Không thể tải danh sách người dùng');
      } finally {
        setIsLoading(false);
      }
    };

    void loadUsers();
  }, []);

  // Inline user creation and role update have been moved to dedicated pages

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Xóa người dùng này?')) {
      return;
    }

    const response = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
    const payload = await response.json();

    if (!response.ok || !payload?.success) {
      window.alert(payload?.error || 'Xóa người dùng thất bại');
      return;
    }

    setUsers((currentUsers) => currentUsers.filter((user) => user.id !== userId));
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Sprint 3</p>
        <h2 className="text-3xl font-black tracking-tight text-slate-950">👥 Quản lý Users</h2>
        <p className="mt-2 text-slate-600">Danh sách người dùng hệ thống với role và thông tin.</p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-3xl font-black text-blue-600">{users.length}</div>
          <div className="text-sm text-slate-600">Tổng Users</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-3xl font-black text-blue-600">{users.filter((u) => u.role === 'admin').length}</div>
          <div className="text-sm text-slate-600">Admin</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-3xl font-black text-green-600">{users.filter((u) => u.role === 'user').length}</div>
          <div className="text-sm text-slate-600">Regular Users</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-3xl font-black text-amber-600">{users.length ? '100%' : '0%'}</div>
          <div className="text-sm text-slate-600">Active Rate</div>
        </div>
      </div>

      <div className="flex justify-end">
        <Link href="/dashboard/users/new">
          <Button variant="primary">+ Tạo user mới</Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-x-auto">
        {error ? <div className="border-b border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Name</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Email</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Role</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Join Date</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
              <th className="px-4 py-3 text-sm font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-500">
                  Đang tải người dùng...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-500">
                  Chưa có người dùng nào.
                </td>
              </tr>
            ) : (
              users.map((user) => (
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
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/dashboard/users/${user.id}/edit`}>
                        <Button size="sm" variant="outline">
                          Sửa
                        </Button>
                      </Link>
                      <Button size="sm" variant="secondary" onClick={() => void handleDeleteUser(user.id)}>
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
