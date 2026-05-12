import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/common';
import { APP_NAME } from '@/constants';

export const metadata: Metadata = {
  title: 'Liên hệ',
  description: 'Thông tin liên hệ và hỗ trợ khách hàng của Badminton Shop.',
};

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-slate-950 px-8 py-10 text-white shadow-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">Hỗ trợ</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">Liên hệ {APP_NAME}</h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          Gửi yêu cầu, góp ý hoặc cần tư vấn chọn vợt cầu lông, ống cầu lông và phụ kiện phù hợp.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Email</h2>
          <p className="mt-2 text-slate-600">support@badmintonshop.local</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Điện thoại</h2>
          <p className="mt-2 text-slate-600">0900 123 456</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Thời gian làm việc</h2>
          <p className="mt-2 text-slate-600">08:00 - 21:00 mỗi ngày</p>
        </div>
      </div>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold tracking-tight text-slate-950">Cần hỗ trợ nhanh?</h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          Bạn có thể quay lại trang mua sắm để tiếp tục xem sản phẩm, hoặc vào trang tài khoản để kiểm tra thông tin cá nhân.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/shop">
            <Button variant="primary">Xem sản phẩm</Button>
          </Link>
          <Link href="/account">
            <Button variant="outline">Tài khoản</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}