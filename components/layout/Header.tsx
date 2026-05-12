'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useAuth } from '@/hooks';
import { APP_NAME } from '@/constants';
import { useCartStore } from '@/store/cartStore';
import { Badge } from '@/components/common';

function UserIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-none stroke-current stroke-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 21a8 8 0 0 0-16 0"
      />
      <circle
        cx="12"
        cy="8"
        r="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-none stroke-current stroke-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1 5h12M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
      />
    </svg>
  );
}

export function Header() {
  const { isAuthenticated, user, logout, isHydrated } = useAuth();

  const cartItems = useCartStore((state) => state.items);
  const isAdmin = user?.role === 'admin';

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">

        {/* LEFT */}
        <div className="flex items-center gap-10">

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 text-lg sm:text-2xl font-black tracking-tight text-white"
          >
            <span className="grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 text-slate-950 shadow-lg shadow-emerald-400/20 text-sm sm:text-base">
              B
            </span>

            <span className="whitespace-nowrap">{APP_NAME}</span>
          </Link>

          {/* NAVIGATION */}
          <ul className="hidden items-center gap-2 lg:flex">
            {/* Nav Links */}
            <li>
              <Link
                href="/shop"
                className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                Cửa hàng
              </Link>
            </li>

            <li>
              <Link
                href="/about"
                className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                Giới thiệu
              </Link>
            </li>

            <li>
              <Link
                href="/guides"
                className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                Hướng dẫn
              </Link>
            </li>

            <li>
              <Link
                href="/search"
                className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                Tìm kiếm
              </Link>
            </li>

            <li>
              <Link
                href="/demo"
                className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                📊 Demo
              </Link>
            </li>

            {isHydrated && isAuthenticated && isAdmin ? (
              <li>
                <Link
                  href="/dashboard"
                  className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  Dashboard
                </Link>
              </li>
            ) : null}

          </ul>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-1 sm:gap-3">

          {/* CART */}
          <Link
            href={isAuthenticated ? '/cart' : '/auth/login'}
            className="relative flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white shrink-0"
            aria-label="Giỏ hàng"
          >
            <CartIcon />

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1">
                <Badge variant="primary">{cartCount}</Badge>
              </span>
            )}
          </Link>

          {isHydrated && isAuthenticated ? (
            <>
              {/* ACCOUNT */}
              <Link
                href="/account"
                className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white transition hover:bg-white/10"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-orange-400 text-sm font-black text-slate-950">
                  {(user?.name || 'A').slice(0, 1).toUpperCase()}
                </span>

                <div className="hidden sm:block">
                  <p className="text-xs text-white/50">
                    Xin chào
                  </p>

                  <p className="text-sm font-semibold">
                    {user?.name || 'Tài khoản'}
                  </p>
                </div>

                <UserIcon />
              </Link>

              {/* LOGOUT */}
              <button
                onClick={logout}
                className="rounded-full border border-rose-400/20 px-4 py-2 text-sm font-medium text-rose-200 transition hover:bg-rose-400/10"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              {/* LOGIN */}
              <Link
                href="/auth/login"
                className="whitespace-nowrap rounded-full px-3 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                Đăng nhập
              </Link>

              {/* SIGNUP */}
              <Link
                href="/auth/signup"
                className="whitespace-nowrap rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-3 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:scale-[1.03]"
              >
                Đăng ký
              </Link>
            </>
          )}

        </div>
      </nav>
    </header>
  );
}