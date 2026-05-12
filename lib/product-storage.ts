import { MOCK_PRODUCTS } from '@/lib/mock-data';
import type { Product } from '@/types';

const STORAGE_KEY = 'shophaohung.products';
const STORAGE_EVENT = 'shophaohung-products-changed';

const cloneProduct = (product: Product): Product => ({ ...product });

const fallbackProducts = () => MOCK_PRODUCTS.map(cloneProduct);

const canUseStorage = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export function getStoredProducts() {
  if (!canUseStorage()) {
    return fallbackProducts();
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    const seededProducts = fallbackProducts();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seededProducts));
    return seededProducts;
  }

  try {
    const parsed = JSON.parse(raw) as Product[];
    return Array.isArray(parsed) ? parsed.map(cloneProduct) : fallbackProducts();
  } catch {
    const seededProducts = fallbackProducts();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seededProducts));
    return seededProducts;
  }
}

export function getStoredProduct(productId: string) {
  return getStoredProducts().find((product) => product.id === productId) ?? null;
}

function writeStoredProducts(products: Product[]) {
  const nextProducts = products.map(cloneProduct);

  if (canUseStorage()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProducts));
    window.dispatchEvent(new Event(STORAGE_EVENT));
  }

  return nextProducts;
}

export function createStoredProduct(input: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>) {
  const now = new Date().toISOString();
  const product: Product = {
    id: `product-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: input.name ?? 'New product',
    description: input.description ?? '',
    price: Number(input.price ?? 0),
    category: input.category ?? 'general',
    image: input.image ?? '/assets/product-bag.svg',
    brand: input.brand,
    material: input.material,
    segment: input.segment,
    productType: input.productType,
    discount: input.discount,
    weight: input.weight,
    quantity: input.quantity,
    subcategory: input.subcategory,
    stock: Number(input.stock ?? 0),
    rating: Number(input.rating ?? 0),
    reviews: Number(input.reviews ?? 0),
    createdAt: now,
    updatedAt: now,
  };

  writeStoredProducts([product, ...getStoredProducts()]);
  return cloneProduct(product);
}

export function updateStoredProduct(productId: string, input: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>) {
  const products = getStoredProducts();
  const index = products.findIndex((product) => product.id === productId);

  if (index === -1) {
    return null;
  }

  const current = products[index];
  const updated: Product = {
    ...current,
    ...input,
    price: input.price === undefined ? current.price : Number(input.price),
    stock: input.stock === undefined ? current.stock : Number(input.stock),
    rating: input.rating === undefined ? current.rating : Number(input.rating),
    reviews: input.reviews === undefined ? current.reviews : Number(input.reviews),
    updatedAt: new Date().toISOString(),
  };

  products[index] = updated;
  writeStoredProducts(products);
  return cloneProduct(updated);
}

export function deleteStoredProduct(productId: string) {
  const products = getStoredProducts();
  const nextProducts = products.filter((product) => product.id !== productId);

  if (nextProducts.length === products.length) {
    return false;
  }

  writeStoredProducts(nextProducts);
  return true;
}
