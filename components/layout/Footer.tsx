'use client';

import Link from 'next/link';
import { APP_NAME, APP_DESCRIPTION } from '@/constants';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">{APP_NAME}</h3>
            <p className="text-sm">{APP_DESCRIPTION}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Cửa hàng</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="hover:text-white transition">
                  Tất cả sản phẩm
                </Link>
              </li>
              <li>
                <Link href="/shop?category=shoes" className="hover:text-white transition">
                  Giày
                </Link>
              </li>
              <li>
                <Link href="/shop?category=apparel" className="hover:text-white transition">
                  Quần áo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Liên hệ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Chính sách trả hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Điều khoản sử dụng
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Theo dõi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; 2024 {APP_NAME}. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
