'use client';

import { useEffect, useReducer, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Input } from '@/components/common';
import type { User, Product } from '@/types';

type OrderFormState = {
  userId: string;
  productId: string;
  quantity: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  errors: Partial<Record<'userId' | 'productId' | 'quantity', string>>;
  isSubmitting: boolean;
};

type OrderFormAction =
  | { type: 'CHANGE_FIELD'; field: keyof Omit<OrderFormState, 'errors' | 'isSubmitting'>; value: string }
  | { type: 'SET_FIELD_VALUES'; values: Partial<Omit<OrderFormState, 'errors' | 'isSubmitting'>> }
  | { type: 'SET_ERRORS'; errors: OrderFormState['errors'] }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_FAIL' };

const initialState: OrderFormState = {
  userId: '',
  productId: '',
  quantity: '1',
  status: 'pending',
  errors: {},
  isSubmitting: false,
};

function formReducer(state: OrderFormState, action: OrderFormAction): OrderFormState {
  switch (action.type) {
    case 'CHANGE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: {
          ...state.errors,
          [action.field]: undefined,
        },
      };
    case 'SET_FIELD_VALUES':
      return { ...state, ...action.values };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'SUBMIT_START':
      return { ...state, isSubmitting: true };
    case 'SUBMIT_SUCCESS':
      return { ...initialState, isSubmitting: false };
    case 'SUBMIT_FAIL':
      return { ...state, isSubmitting: false };
    default:
      return state;
  }
}

export default function EditOrderPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const orderId = Array.isArray(params.id) ? params.id[0] : params.id;
  const formRef = useRef<HTMLFormElement | null>(null);
  
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  // Skill applied: 1.3 Dependency-Based Parallelization / 1.5 Promise.all()
  // Fetch order, users, and products in parallel to eliminate waterfall
  useEffect(() => {
    const loadData = async () => {
      if (!orderId) return;
      
      try {
        setIsLoading(true);
        setLoadError('');

        const [orderRes, usersRes, productsRes] = await Promise.all([
          fetch(`/api/orders/${orderId}`),
          fetch('/api/users'),
          fetch('/api/products?limit=100')
        ]);

        const [orderPayload, usersPayload, productsPayload] = await Promise.all([
          orderRes.json(),
          usersRes.json(),
          productsRes.json()
        ]);

        if (!orderRes.ok || !orderPayload?.success) {
          throw new Error(orderPayload?.error || 'Không thể tải thông tin đơn hàng');
        }

        if (usersPayload?.success && Array.isArray(usersPayload.data)) {
          setUsers(usersPayload.data);
        }
        
        if (productsPayload?.success && Array.isArray(productsPayload.data)) {
          setProducts(productsPayload.data);
        }

        const orderData = orderPayload.data;
        const firstItem = orderData.items?.[0] || { productId: '', quantity: 1 };
        
        dispatch({
          type: 'SET_FIELD_VALUES',
          values: {
            userId: orderData.userId || '',
            productId: firstItem.productId || '',
            quantity: String(firstItem.quantity || 1),
            status: orderData.status || 'pending',
          }
        });

      } catch (error) {
        setLoadError(error instanceof Error ? error.message : 'Không thể tải dữ liệu');
      } finally {
        setIsLoading(false);
      }
    };

    void loadData();
  }, [orderId]);

  const handleChange =
    (field: keyof Omit<OrderFormState, 'errors' | 'isSubmitting'>) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      dispatch({ type: 'CHANGE_FIELD', field, value: event.target.value });
    };

  const selectedProduct = products.find(p => p.id === state.productId);
  const currentPrice = selectedProduct ? selectedProduct.price : 0;
  const calculatedTotal = currentPrice * Math.max(1, Number(state.quantity) || 0);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors: OrderFormState['errors'] = {};

    if (!state.userId) errors.userId = 'Vui lòng chọn khách hàng';
    if (!state.productId) errors.productId = 'Vui lòng chọn sản phẩm';
    if (Number(state.quantity) <= 0) errors.quantity = 'Số lượng phải lớn hơn 0';

    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors });
      dispatch({ type: 'SUBMIT_FAIL' });
      return;
    }

    dispatch({ type: 'SET_ERRORS', errors: {} });
    dispatch({ type: 'SUBMIT_START' });

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: state.userId,
          totalPrice: calculatedTotal,
          status: state.status,
          items: [
            { 
              productId: state.productId, 
              quantity: Number(state.quantity), 
              price: currentPrice 
            }
          ],
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.error || 'Cập nhật đơn hàng thất bại');
      }

      alert('Cập nhật đơn hàng thành công!');
      dispatch({ type: 'SUBMIT_SUCCESS' });
      router.push('/dashboard/orders');
    } catch {
      dispatch({ type: 'SUBMIT_FAIL' });
      alert('Cập nhật đơn hàng thất bại, vui lòng thử lại');
    }
  };

  if (isLoading) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">Đang tải dữ liệu đơn hàng...</div>;
  }

  if (loadError) {
    return <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700 shadow-sm">{loadError}</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Sprint 3</p>
        <h1 className="text-3xl font-black tracking-tight text-slate-950">Chỉnh sửa đơn hàng #{orderId}</h1>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Khách hàng</label>
            <select
              value={state.userId}
              onChange={handleChange('userId')}
              className={`w-full rounded-xl border ${state.errors.userId ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-200' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'} px-4 py-3 text-slate-900 outline-none transition focus:ring-2`}
            >
              <option value="" disabled>-- Chọn khách hàng --</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
              ))}
            </select>
            {state.errors.userId ? <p className="mt-2 text-sm text-rose-600">{state.errors.userId}</p> : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Sản phẩm</label>
            <select
              value={state.productId}
              onChange={handleChange('productId')}
              className={`w-full rounded-xl border ${state.errors.productId ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-200' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-200'} px-4 py-3 text-slate-900 outline-none transition focus:ring-2`}
            >
              <option value="" disabled>-- Chọn sản phẩm --</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>{product.name} - {product.price.toLocaleString('vi-VN')} ₫</option>
              ))}
            </select>
            {state.errors.productId ? <p className="mt-2 text-sm text-rose-600">{state.errors.productId}</p> : null}
          </div>

          <Input
            label="Số lượng"
            type="number"
            min="1"
            value={state.quantity}
            onChange={handleChange('quantity')}
            error={state.errors.quantity}
            placeholder="1"
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Trạng thái đơn hàng</label>
            <select
              value={state.status}
              onChange={handleChange('status')}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <Button type="submit" disabled={state.isSubmitting}>
              {state.isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Hủy
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600 shadow-sm">
            <p className="font-semibold text-slate-900 mb-4">Tóm tắt thanh toán</p>
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span>Đơn giá:</span>
              <span className="font-medium text-slate-900">{currentPrice.toLocaleString('vi-VN')} ₫</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-200">
              <span>Số lượng:</span>
              <span className="font-medium text-slate-900">{state.quantity || 0}</span>
            </div>
            <div className="flex justify-between py-4 mt-2 text-base">
              <span className="font-bold text-slate-900">Tổng cộng:</span>
              <span className="font-black text-blue-600">{calculatedTotal.toLocaleString('vi-VN')} ₫</span>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-200">
              <p className="font-semibold text-slate-900 text-xs uppercase tracking-wider">Performance Note</p>
              <p className="mt-2 text-xs">Fetching order details, user list, and product list are done simultaneously via <code>Promise.all()</code> instead of awaiting each one sequentially.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
