import { create } from 'zustand';
import { Product } from '@/types';
import type { User } from '@/types';

interface CartItem {
  product: Product;
  quantity: number;
}

const GUEST_STORAGE_KEY = 'shop-haohung-cart:guest';

function getCartStorageKey(user: User | null) {
  return user ? `shop-haohung-cart:${user.id}` : GUEST_STORAGE_KEY;
}

function calculateTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

function readStoredCart(storageKey: string) {
  if (typeof window === 'undefined') {
    return [] as CartItem[];
  }

  const rawValue = window.localStorage.getItem(storageKey);
  if (!rawValue) {
    return [] as CartItem[];
  }

  try {
    const parsed = JSON.parse(rawValue) as CartItem[];
    return Array.isArray(parsed) ? parsed : ([] as CartItem[]);
  } catch {
    window.localStorage.removeItem(storageKey);
    return [] as CartItem[];
  }
}

function persistStoredCart(storageKey: string, items: CartItem[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(items));
}

interface CartStore {
  items: CartItem[];
  total: number;
  storageKey: string;
  loadCartForUser: (user: User | null) => void;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setCart: (items: CartItem[]) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  total: 0,
  storageKey: GUEST_STORAGE_KEY,

  loadCartForUser: (user) => {
    const storageKey = getCartStorageKey(user);
    const items = readStoredCart(storageKey);
    set({ items, total: calculateTotal(items), storageKey });
  },

  addItem: (product, quantity) =>
    set((state) => {
      const normalizedQuantity = Math.max(1, quantity);
      const existingItem = state.items.find((item) => item.product.id === product.id);
      let newItems;

      if (existingItem) {
        newItems = state.items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + normalizedQuantity }
            : item
        );
      } else {
        newItems = [...state.items, { product, quantity: normalizedQuantity }];
      }

      const total = calculateTotal(newItems);
      persistStoredCart(state.storageKey, newItems);

      return { items: newItems, total };
    }),

  removeItem: (productId) =>
    set((state) => {
      const newItems = state.items.filter((item) => item.product.id !== productId);
      const total = calculateTotal(newItems);
      persistStoredCart(state.storageKey, newItems);
      return { items: newItems, total };
    }),

  updateQuantity: (productId, quantity) =>
    set((state) => {
      const newItems = state.items
        .filter((item) => (item.product.id === productId ? quantity > 0 : true))
        .map((item) => (item.product.id === productId ? { ...item, quantity } : item));
      const total = calculateTotal(newItems);
      persistStoredCart(state.storageKey, newItems);
      return { items: newItems, total };
    }),

  setCart: (items) => {
    const total = calculateTotal(items);
    persistStoredCart(get().storageKey, items);
    set({ items, total });
  },

  clearCart: () => {
    const { storageKey } = get();
    persistStoredCart(storageKey, []);
    set({ items: [], total: 0 });
  },
}));
