import type { Metadata } from 'next';
import ClientProductDetail from './ClientProductDetail';
import { MOCK_PRODUCTS } from '@/lib/mock-data';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const product = MOCK_PRODUCTS.find((p) => p.id === resolvedParams.id);

  if (!product) {
    return {
      title: 'Chi tiết sản phẩm — ShopHaoHung',
      description: 'Xem thông tin chi tiết của sản phẩm trong cửa hàng.',
    };
  }

  return {
    title: `${product.name} — ShopHaoHung`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  return <ClientProductDetail id={resolvedParams.id} />;
}
