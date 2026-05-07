'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useAuth } from '@/hooks';
import { APP_NAME } from '@/constants';
import { useCartStore } from '@/store/cartStore';
import { Badge } from '@/components/common';

export function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const cartItems = useCartStore((state) => state.items);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-black tracking-tight text-slate-950">
          {APP_NAME}
        </Link>

        <ul className="flex items-center gap-6">
          <li>
            <Link href="/shop" className="text-slate-600 transition hover:text-slate-950">
              Cửa hàng
            </Link>
          </li>
          <li>
            <Link href="/cart" className="flex items-center gap-2 text-slate-600 transition hover:text-slate-950">
              <span>Giỏ hàng</span>
              <Badge variant="primary">{cartCount}</Badge>
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="text-slate-600 transition hover:text-slate-950">
              Dashboard
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              <li className="text-sm font-medium text-slate-700">{user?.name}</li>
              <li>
                <Link href="/account" className="text-slate-600 transition hover:text-slate-950">
                  Tài khoản
                </Link>
              </li>
              <li>
                <button onClick={logout} className="text-slate-600 transition hover:text-rose-600">
                  Đăng xuất
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/auth/login" className="text-slate-600 transition hover:text-slate-950">
                  Đăng nhập
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="text-slate-600 transition hover:text-slate-950">
                  Đăng ký
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
