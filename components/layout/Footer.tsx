'use client';

import Link from 'next/link';
import { APP_NAME, APP_DESCRIPTION } from '@/constants';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-slate-950 text-slate-200">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 text-lg font-black text-slate-950 shadow-lg shadow-emerald-400/20">
              B
            </div>
            <h3 className="text-xl font-black tracking-tight text-white">{APP_NAME}</h3>
            <p className="mt-3 max-w-xs text-sm leading-7 text-slate-400">{APP_DESCRIPTION}</p>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Cửa hàng</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/shop" className="transition hover:text-white">
                  Tất cả sản phẩm
                </Link>
              </li>
              <li>
                <Link href="/shop?category=rackets" className="transition hover:text-white">
                  Vợt cầu lông
                </Link>
              </li>
              <li>
                <Link href="/shop?category=shuttlecocks" className="transition hover:text-white">
                  Ống cầu lông
                </Link>
              </li>
              <li>
                <Link href="/search" className="transition hover:text-white">
                  Tìm kiếm nâng cao
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Hỗ trợ</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/contact" className="transition hover:text-white">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link href="/returns" className="transition hover:text-white">
                  Chính sách trả hàng
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition hover:text-white">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link href="/account" className="transition hover:text-white">
                  Thông tin tài khoản
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">Theo dõi</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="transition hover:text-white">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="transition hover:text-white">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://x.com" target="_blank" rel="noreferrer" className="transition hover:text-white">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-slate-500">
          <p>&copy; 2024 {APP_NAME}. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
