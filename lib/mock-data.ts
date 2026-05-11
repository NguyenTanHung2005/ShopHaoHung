import { Product, User, Order } from '@/types';
import BADMINTON_PRODUCTS from './badminton-products.json';

// Mock Products - Badminton Rackets & Shuttlecocks
export const MOCK_PRODUCTS: Product[] = BADMINTON_PRODUCTS as Product[];

// Mock Users
export const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    avatar: '/assets/avatar-admin.svg',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'John Doe',
    role: 'user',
    avatar: '/assets/avatar-user.svg',
    createdAt: '2024-01-02',
    updatedAt: '2024-01-02',
  },
  {
    id: '3',
    email: 'jane@example.com',
    name: 'Jane Smith',
    role: 'user',
    avatar: '/assets/avatar-user.svg',
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03',
  },
];

// Mock Orders
export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    userId: '2',
    items: [
      { productId: '1', quantity: 1, price: 3500000 },
      { productId: '2', quantity: 2, price: 1200000 },
    ],
    totalPrice: 5900000,
    status: 'delivered',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
  },
  {
    id: 'ORD-002',
    userId: '3',
    items: [{ productId: '4', quantity: 1, price: 1500000 }],
    totalPrice: 1500000,
    status: 'shipped',
    createdAt: '2024-01-18',
    updatedAt: '2024-01-20',
  },
];
