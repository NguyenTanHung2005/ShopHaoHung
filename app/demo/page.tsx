'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common';

export default function DemoPage() {
  const router = useRouter();

  const handleQuickLogin = (email: string) => {
    localStorage.setItem(
      'shop-haohung-auth',
      JSON.stringify({
        user: {
          id: email === 'admin@example.com' ? '1' : email === 'user@example.com' ? '2' : '3',
          email,
          name: email === 'admin@example.com' ? 'Admin User' : email === 'user@example.com' ? 'John Doe' : 'Jane Smith',
          role: email === 'admin@example.com' ? 'admin' : 'user',
          avatar: '/assets/avatar-' + (email === 'admin@example.com' ? 'admin' : 'user') + '.svg',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
        },
        token: `token-demo-${Date.now()}`,
        isHydrated: true,
        isLoading: false,
      })
    );

    setTimeout(() => {
      router.push(email === 'admin@example.com' ? '/dashboard' : '/account');
      router.refresh();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">🎯 ShopHaoHung Demo</h1>
          <p className="text-lg text-slate-600 mb-6">Khám phá nền tảng với hai loại tài khoản khác nhau</p>
          <Link href="/">
            <Button variant="outline">← Quay lại trang chủ</Button>
          </Link>
        </div>

        {/* Two Account Types */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Admin Account */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-8">
              <h2 className="text-3xl font-bold text-white mb-2">👨‍💼 Admin Account</h2>
              <p className="text-blue-100">Toàn quyền quản lý hệ thống</p>
            </div>

            <div className="p-8 space-y-6">
              {/* Credentials */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
                <h3 className="font-semibold text-blue-900 mb-3">📋 Thông tin đăng nhập:</h3>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700">Email:</span>
                    <code className="bg-white px-3 py-1 rounded border border-blue-200 text-blue-600 font-semibold">
                      admin@example.com
                    </code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700">Mật khẩu:</span>
                    <code className="bg-white px-3 py-1 rounded border border-blue-200 text-blue-600 font-semibold">
                      123456
                    </code>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">✨ Tính năng:</h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Dashboard quản lý toàn bộ hệ thống</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Quản lý sản phẩm (thêm/sửa/xóa)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Theo dõi đơn hàng</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Quản lý người dùng</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Xem báo cáo & phân tích</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Tải lên file & quản lý tài nguyên</span>
                  </li>
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 pt-4">
                <button
                  onClick={() => handleQuickLogin('admin@example.com')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors"
                >
                  Đăng nhập ngay ⚡
                </button>
                <Link href="/auth/login?redirect=/dashboard" className="block">
                  <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-3 px-4 rounded-xl transition-colors">
                    Hoặc đăng nhập qua form
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* User Account */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-slate-500 to-slate-600 px-8 py-8">
              <h2 className="text-3xl font-bold text-white mb-2">👤 User Account</h2>
              <p className="text-slate-100">Tài khoản mua sắm thông thường</p>
            </div>

            <div className="p-8 space-y-6">
              {/* Credentials */}
              <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6">
                <h3 className="font-semibold text-slate-900 mb-3">📋 Thông tin đăng nhập:</h3>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Email:</span>
                    <code className="bg-white px-3 py-1 rounded border border-slate-200 text-slate-600 font-semibold">
                      user@example.com
                    </code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Mật khẩu:</span>
                    <code className="bg-white px-3 py-1 rounded border border-slate-200 text-slate-600 font-semibold">
                      123456
                    </code>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-200">
                  Hoặc dùng: jane@example.com (cùng mật khẩu)
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">✨ Tính năng:</h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start">
                    <span className="text-slate-600 mr-2">✓</span>
                    <span>Duyệt sản phẩm và tìm kiếm</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-slate-600 mr-2">✓</span>
                    <span>Thêm vào giỏ hàng</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-slate-600 mr-2">✓</span>
                    <span>Thanh toán đơn hàng</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-slate-600 mr-2">✓</span>
                    <span>Xem lịch sử đơn hàng</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-slate-600 mr-2">✓</span>
                    <span>Quản lý hồ sơ cá nhân</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-slate-600 mr-2">✓</span>
                    <span>Liên hệ hỗ trợ khách hàng</span>
                  </li>
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 pt-4">
                <button
                  onClick={() => handleQuickLogin('user@example.com')}
                  className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-xl transition-colors"
                >
                  Đăng nhập ngay ⚡
                </button>
                <Link href="/auth/login" className="block">
                  <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl transition-colors">
                    Hoặc đăng nhập qua form
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Access Comparison */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">📊 So sánh quyền truy cập</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-4 px-4 font-semibold text-slate-900">Tính năng</th>
                  <th className="text-center py-4 px-4 font-semibold text-blue-600">Admin</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-600">User</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-4 text-slate-700">Dashboard & Thống kê</td>
                  <td className="text-center py-4">
                    <span className="text-2xl">✅</span>
                  </td>
                  <td className="text-center py-4">
                    <span className="text-2xl text-slate-300">❌</span>
                  </td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-4 text-slate-700">Quản lý sản phẩm</td>
                  <td className="text-center py-4">
                    <span className="text-2xl">✅</span>
                  </td>
                  <td className="text-center py-4">
                    <span className="text-2xl text-slate-300">❌</span>
                  </td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-4 text-slate-700">Quản lý đơn hàng</td>
                  <td className="text-center py-4">
                    <span className="text-2xl">✅</span>
                  </td>
                  <td className="text-center py-4">
                    <span className="text-2xl text-slate-300">❌</span>
                  </td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-4 text-slate-700">Duyệt & mua sản phẩm</td>
                  <td className="text-center py-4">
                    <span className="text-2xl">✅</span>
                  </td>
                  <td className="text-center py-4">
                    <span className="text-2xl">✅</span>
                  </td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-4 text-slate-700">Giỏ hàng & Thanh toán</td>
                  <td className="text-center py-4">
                    <span className="text-2xl">✅</span>
                  </td>
                  <td className="text-center py-4">
                    <span className="text-2xl">✅</span>
                  </td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-4 text-slate-700">Hồ sơ cá nhân</td>
                  <td className="text-center py-4">
                    <span className="text-2xl">✅</span>
                  </td>
                  <td className="text-center py-4">
                    <span className="text-2xl">✅</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-4 px-4 text-slate-700">Quản lý người dùng</td>
                  <td className="text-center py-4">
                    <span className="text-2xl">✅</span>
                  </td>
                  <td className="text-center py-4">
                    <span className="text-2xl text-slate-300">❌</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-3xl p-8 text-center">
          <h3 className="text-xl font-bold text-emerald-900 mb-3">💡 Lưu ý</h3>
          <p className="text-emerald-800 mb-4">
            Đây là tài khoản demo dành để thử nghiệm. Bạn có thể đăng nhập nhanh bằng nút &quot;Đăng nhập ngay&quot; hoặc sử dụng form đăng nhập thường.
          </p>
          <p className="text-sm text-emerald-700">
            💾 Dữ liệu được lưu trong trình duyệt (localStorage), sẽ bị xóa khi làm sạch bộ nhớ cache.
          </p>
        </div>
      </div>
    </div>
  );
}
