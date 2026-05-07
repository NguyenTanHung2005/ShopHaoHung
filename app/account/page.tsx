'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Badge, Button } from '@/components/common';
import { ImageUpload } from '@/components/upload';
import { useAuth } from '@/hooks';

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, refreshSession } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login?redirect=/account');
    }
  }, [isAuthenticated, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Sprint 2</p>
        <h1 className="text-3xl font-black tracking-tight text-slate-950">Tài khoản</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="relative mx-auto mb-4 h-40 w-40 overflow-hidden rounded-full bg-slate-100">
            <Image src={user.avatar || '/assets/avatar-user.svg'} alt={user.name} fill className="object-cover" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-950">{user.name}</h2>
            <p className="mt-1 text-slate-500">{user.email}</p>
            <div className="mt-4 flex justify-center">
              <Badge variant={user.role === 'admin' ? 'primary' : 'success'}>{user.role}</Badge>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <Button variant="outline" fullWidth onClick={() => refreshSession()}>
              Refresh session
            </Button>
            <Button variant="secondary" fullWidth onClick={logout}>
              Đăng xuất
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-950">Thông tin cá nhân</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Full name</div>
                <div className="font-medium text-slate-950">{user.name}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Role</div>
                <div className="font-medium text-slate-950">{user.role}</div>
              </div>
            </div>
          </div>

          <ImageUpload label="Cập nhật avatar" />
        </div>
      </div>
    </div>
  );
}
