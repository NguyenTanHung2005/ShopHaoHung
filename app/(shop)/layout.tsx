import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Cửa hàng',
  description: 'Khám phá bộ sưu tập sản phẩm thể thao',
};

export default function ShopLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
