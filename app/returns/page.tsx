import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/common';

export const metadata: Metadata = {
  title: 'Chính sách trả hàng',
  description: 'Chính sách đổi trả và hoàn tiền của Badminton Shop.',
};

const returnPolicies = [
  'Sản phẩm còn nguyên tem, chưa qua sử dụng và giữ đầy đủ phụ kiện.',
  'Yêu cầu đổi trả trong vòng 7 ngày kể từ khi nhận hàng.',
  'Áp dụng hoàn tiền hoặc đổi sang sản phẩm tương đương tùy tình trạng kho.',
  'Không áp dụng cho hàng đặt riêng hoặc sản phẩm đã giảm giá sâu.',
];

export default function ReturnsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-slate-950 px-8 py-10 text-white shadow-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">Hỗ trợ</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">Chính sách trả hàng</h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          Trang này mô tả quy trình đổi trả mẫu để khách hàng tham khảo khi mua sắm tại Badminton Shop.
        </p>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold tracking-tight text-slate-950">Điều kiện áp dụng</h2>
        <ul className="mt-5 space-y-4 text-slate-600">
          {returnPolicies.map((policy) => (
            <li key={policy} className="flex gap-3">
              <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400" />
              <span>{policy}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-[2rem] bg-slate-100 p-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-950">Bạn muốn xem tiếp?</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/shop">
            <Button variant="primary">Về cửa hàng</Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline">Liên hệ hỗ trợ</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}