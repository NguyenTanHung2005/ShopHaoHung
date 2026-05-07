import { create } from 'zustand';
import { Product } from '@/types';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setCart: (items: CartItem[]) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  total: 0,

  addItem: (product, quantity) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.product.id === product.id);
      let newItems;

      if (existingItem) {
        newItems = state.items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...state.items, { product, quantity }];
      }

      const total = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      return { items: newItems, total };
    }),

  removeItem: (productId) =>
    set((state) => {
      const newItems = state.items.filter((item) => item.product.id !== productId);
      const total = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      return { items: newItems, total };
    }),

  updateQuantity: (productId, quantity) =>
    set((state) => {
      const newItems = state.items
        .filter((item) => (item.product.id === productId ? quantity > 0 : true))
        .map((item) => (item.product.id === productId ? { ...item, quantity } : item));
      const total = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      return { items: newItems, total };
    }),

  setCart: (items) => {
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    set({ items, total });
  },

  clearCart: () => set({ items: [], total: 0 }),
}));
