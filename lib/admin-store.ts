import { MOCK_ORDERS, MOCK_PRODUCTS, MOCK_USERS } from '@/lib/mock-data';
import type { Order, Product, User } from '@/types';

type ProductInput = Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>;
type OrderInput = Partial<Omit<Order, 'id' | 'createdAt' | 'updatedAt'>>;
type UserInput = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;

const cloneProduct = (product: Product): Product => ({ ...product });

const cloneOrder = (order: Order): Order => ({
  ...order,
  items: order.items.map((item) => ({ ...item })),
});

const cloneUser = (user: User): User => ({ ...user });

let products = MOCK_PRODUCTS.map(cloneProduct);
let orders = MOCK_ORDERS.map(cloneOrder);
let users = MOCK_USERS.map(cloneUser);

export function listProducts() {
  return products.map(cloneProduct);
}

export function getProduct(id: string) {
  return products.find((product) => product.id === id) ?? null;
}

export function createProduct(input: ProductInput) {
  const now = new Date().toISOString();
  const product: Product = {
    id: `product-${Date.now()}`,
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

  products = [product, ...products];
  return cloneProduct(product);
}

export function updateProduct(id: string, input: ProductInput) {
  const index = products.findIndex((product) => product.id === id);

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
  return cloneProduct(updated);
}

export function deleteProduct(id: string) {
  const before = products.length;
  products = products.filter((product) => product.id !== id);
  return products.length !== before;
}

export function listOrders() {
  return orders.map(cloneOrder);
}

export function getOrder(id: string) {
  return orders.find((order) => order.id === id) ?? null;
}

export function createOrder(input: OrderInput) {
  const now = new Date().toISOString();
  const order: Order = {
    id: `ORD-${Date.now()}`,
    userId: input.userId ?? '1',
    items: input.items ? input.items.map((item) => ({ ...item })) : [],
    totalPrice: Number(input.totalPrice ?? 0),
    status: input.status ?? 'pending',
    createdAt: now,
    updatedAt: now,
  };

  orders = [order, ...orders];
  return cloneOrder(order);
}

export function updateOrder(id: string, input: OrderInput) {
  const index = orders.findIndex((order) => order.id === id);

  if (index === -1) {
    return null;
  }

  const current = orders[index];
  const updated: Order = {
    ...current,
    ...input,
    items: input.items ? input.items.map((item) => ({ ...item })) : current.items.map((item) => ({ ...item })),
    totalPrice: input.totalPrice === undefined ? current.totalPrice : Number(input.totalPrice),
    updatedAt: new Date().toISOString(),
  };

  orders[index] = updated;
  return cloneOrder(updated);
}

export function deleteOrder(id: string) {
  const before = orders.length;
  orders = orders.filter((order) => order.id !== id);
  return orders.length !== before;
}

export function listUsers() {
  return users.map(cloneUser);
}

export function getUser(id: string) {
  return users.find((user) => user.id === id) ?? null;
}

export function createUser(input: UserInput) {
  const now = new Date().toISOString();
  const user: User = {
    id: `user-${Date.now()}`,
    email: input.email ?? 'new-user@example.com',
    name: input.name ?? 'New User',
    role: input.role ?? 'user',
    avatar: input.avatar ?? '/assets/avatar-user.svg',
    createdAt: now,
    updatedAt: now,
  };

  users = [user, ...users];
  return cloneUser(user);
}

export function updateUser(id: string, input: UserInput) {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return null;
  }

  const current = users[index];
  const updated: User = {
    ...current,
    ...input,
    role: input.role ?? current.role,
    updatedAt: new Date().toISOString(),
  };

  users[index] = updated;
  return cloneUser(updated);
}

export function deleteUser(id: string) {
  const before = users.length;
  users = users.filter((user) => user.id !== id);
  return users.length !== before;
}