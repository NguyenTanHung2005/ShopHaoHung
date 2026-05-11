'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useAuth } from '@/hooks';
import { APP_NAME } from '@/constants';
import { useCartStore } from '@/store/cartStore';
import { Badge } from '@/components/common';

function UserIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="8" r="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Header() {
  const { isAuthenticated, user, logout, isHydrated } = useAuth();
  const cartItems = useCartStore((state) => state.items);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 text-white shadow-[0_10px_40px_rgba(15,23,42,0.12)] backdrop-blur-xl">
      <nav className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-3 text-2xl font-black tracking-tight text-white">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 text-slate-950 shadow-lg shadow-emerald-400/20">
            B
          </span>
          <span>{APP_NAME}</span>
        </Link>

        <ul className="flex flex-wrap items-center gap-2 sm:gap-4">
          <li>
            <Link href="/shop" className="rounded-full px-4 py-2 text-white/80 transition hover:bg-white/10 hover:text-white">
              Cửa hàng
            </Link>
          </li>
          <li>
            <Link href="/search" className="rounded-full px-4 py-2 text-white/80 transition hover:bg-white/10 hover:text-white">
              Tìm kiếm
            </Link>
          </li>
          <li>
            <Link href="/demo" className="rounded-full px-4 py-2 text-white/80 transition hover:bg-white/10 hover:text-white">
              📊 Demo
            </Link>
          </li>
          <li>
            <Link href="/cart" className="flex items-center gap-2 rounded-full px-4 py-2 text-white/80 transition hover:bg-white/10 hover:text-white">
              <span>Giỏ hàng</span>
              <Badge variant="primary">{cartCount}</Badge>
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="rounded-full px-4 py-2 text-white/80 transition hover:bg-white/10 hover:text-white">
              Dashboard
            </Link>
          </li>

          {isHydrated && isAuthenticated ? (
            <>
              <li>
                <Link
                  href="/account"
                  className="flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-white transition hover:bg-white/20"
                  aria-label="Trang tài khoản"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-orange-400 text-sm font-black text-slate-950">
                    {(user?.name || 'A').slice(0, 1).toUpperCase()}
                  </span>
                  <span className="hidden sm:inline">Tài khoản</span>
                  <UserIcon />
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/auth/login" className="rounded-full px-4 py-2 text-white/80 transition hover:bg-white/10 hover:text-white">
                  Đăng nhập
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="rounded-full bg-white px-4 py-2 font-semibold text-slate-950 transition hover:bg-emerald-200">
                  Đăng ký
                </Link>
              </li>
            </>
          )}
          {isHydrated && isAuthenticated && (
            <li>
              <button onClick={logout} className="rounded-full px-4 py-2 text-white/70 transition hover:bg-white/10 hover:text-rose-200">
                Đăng xuất
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
