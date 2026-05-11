import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/common';

export const metadata: Metadata = {
  title: 'Điều khoản sử dụng',
  description: 'Điều khoản sử dụng mẫu cho Badminton Shop.',
};

const terms = [
  'Thông tin sản phẩm, giá và khuyến mãi có thể thay đổi theo thời điểm.',
  'Khách hàng chịu trách nhiệm kiểm tra sản phẩm trước khi thanh toán.',
  'Tài khoản cá nhân cần được bảo mật để tránh truy cập trái phép.',
  'Mọi hành vi sử dụng website cho mục đích gian lận đều bị từ chối phục vụ.',
];

export default function TermsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-slate-950 px-8 py-10 text-white shadow-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">Pháp lý</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">Điều khoản sử dụng</h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          Đây là bộ điều khoản mẫu để làm rõ quyền và trách nhiệm khi bạn sử dụng Badminton Shop.
        </p>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold tracking-tight text-slate-950">Các điều khoản chính</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {terms.map((term) => (
            <div key={term} className="rounded-2xl bg-slate-50 p-4 text-slate-600">
              {term}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] bg-slate-100 p-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-950">Cần hỗ trợ thêm?</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/contact">
            <Button variant="primary">Liên hệ</Button>
          </Link>
          <Link href="/account">
            <Button variant="outline">Tài khoản</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}