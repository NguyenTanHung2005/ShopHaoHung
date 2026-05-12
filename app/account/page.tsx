'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Badge, Button } from '@/components/common';
import { ImageUpload } from '@/components/upload';
import { useAuth } from '@/hooks';

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, refreshSession, isHydrated } = useAuth();

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.replace('/auth/login?redirect=/account');
    }
  }, [isAuthenticated, isHydrated, router]);

  if (!isHydrated || !user) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-10 text-slate-500 shadow-sm">Đang tải thông tin tài khoản...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="rounded-[32px] border border-slate-200 bg-slate-950 px-8 py-8 text-white shadow-xl shadow-slate-950/10">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">Thông tin tài khoản</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">{user.name}</h1>
        <p className="mt-3 max-w-2xl text-slate-300">Quản lý hồ sơ, cập nhật ảnh đại diện và theo dõi trạng thái tài khoản của bạn trong hệ thống Badminton Shop.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="relative mx-auto mb-4 h-40 w-40 overflow-hidden rounded-full bg-slate-100 ring-8 ring-slate-100">
            <Image src={user.avatar || '/assets/avatar-user.svg'} alt={user.name} fill className="object-cover" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-950">{user.name}</h2>
            <p className="mt-1 text-slate-500">{user.email}</p>
            <div className="mt-4 flex justify-center">
              <Badge variant={user.role === 'admin' ? 'primary' : 'success'}>{user.role}</Badge>
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            <Button variant="outline" fullWidth onClick={() => refreshSession()}>
              Làm mới phiên
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
                <div className="text-sm text-slate-500">Tên hiển thị</div>
                <div className="font-medium text-slate-950">{user.name}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Vai trò</div>
                <div className="font-medium text-slate-950">{user.role}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Email</div>
                <div className="font-medium text-slate-950">{user.email}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Trạng thái</div>
                <div className="font-medium text-slate-950">Đang hoạt động</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-950">Cập nhật hồ sơ</h3>
            <p className="mt-2 text-sm leading-7 text-slate-500">Tải ảnh mới lên để đồng bộ avatar với trang web và phần thanh điều hướng.</p>
            <div className="mt-4">
              <ImageUpload label="Cập nhật avatar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
