'use client';

import { useReducer, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components/common';
import { ImageUpload } from '@/components/upload';

type ProductFormState = {
  title: string;
  category: string;
  price: string;
  stock: string;
  description: string;
  image: string;
  errors: Partial<Record<'title' | 'category' | 'price' | 'stock' | 'description' | 'image', string>>;
  isSubmitting: boolean;
};

type ProductFormAction =
  | { type: 'CHANGE_FIELD'; field: keyof Omit<ProductFormState, 'errors' | 'isSubmitting'>; value: string }
  | { type: 'SET_ERRORS'; errors: ProductFormState['errors'] }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_FAIL' };

const initialState: ProductFormState = {
  title: '',
  category: '',
  price: '',
  stock: '',
  description: '',
  image: '',
  errors: {},
  isSubmitting: false,
};

function formReducer(state: ProductFormState, action: ProductFormAction): ProductFormState {
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

export default function NewProductPage() {
  const router = useRouter();
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [selectedImage, setSelectedImage] = useState('');

  const handleChange =
    (field: keyof Omit<ProductFormState, 'errors' | 'isSubmitting'>) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch({ type: 'CHANGE_FIELD', field, value: event.target.value });
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors: ProductFormState['errors'] = {};

    if (!state.title.trim()) {
      errors.title = 'Tên sản phẩm không được để trống';
    }
    if (!state.category.trim()) {
      errors.category = 'Danh mục không được để trống';
    }
    if (Number(state.price) <= 0) {
      errors.price = 'Giá phải lớn hơn 0';
    }
    if (Number(state.stock) < 0) {
      errors.stock = 'Tồn kho không hợp lệ';
    }
    if (!state.description.trim()) {
      errors.description = 'Mô tả không được để trống';
    }

    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors });
      dispatch({ type: 'SUBMIT_FAIL' });
      titleInputRef.current?.focus();
      return;
    }

    dispatch({ type: 'SET_ERRORS', errors: {} });
    dispatch({ type: 'SUBMIT_START' });

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: state.title,
          category: state.category,
          price: Number(state.price),
          stock: Number(state.stock),
          description: state.description,
          image: selectedImage || state.image || '/assets/product-bag.svg',
          rating: 0,
          reviews: 0,
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.error || 'Tạo sản phẩm thất bại');
      }

      alert('Tạo sản phẩm thành công!');
      dispatch({ type: 'SUBMIT_SUCCESS' });
      router.push('/dashboard/products');
    } catch {
      dispatch({ type: 'SUBMIT_FAIL' });
      alert('Tạo sản phẩm thất bại, vui lòng thử lại');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Sprint 3</p>
        <h1 className="text-3xl font-black tracking-tight text-slate-950">Thêm sản phẩm mới</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <Input
            ref={titleInputRef}
            label="Tên sản phẩm"
            value={state.title}
            onChange={handleChange('title')}
            error={state.errors.title}
            placeholder="Ví dụ: Giày chạy bộ Pro"
          />
          <Input
            label="Danh mục"
            value={state.category}
            onChange={handleChange('category')}
            error={state.errors.category}
            placeholder="shoes | apparel | accessories | equipment"
          />
          <Input
            label="Giá"
            type="number"
            value={state.price}
            onChange={handleChange('price')}
            error={state.errors.price}
            placeholder="3500000"
          />
          <Input
            label="Tồn kho"
            type="number"
            value={state.stock}
            onChange={handleChange('stock')}
            error={state.errors.stock}
            placeholder="50"
          />
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Mô tả</label>
            <textarea
              value={state.description}
              onChange={handleChange('description')}
              rows={5}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Mô tả ngắn về sản phẩm"
            />
            {state.errors.description ? <p className="mt-2 text-sm text-rose-600">{state.errors.description}</p> : null}
          </div>
          <Input
            label="URL ảnh"
            value={state.image}
            onChange={handleChange('image')}
            error={state.errors.image}
            placeholder="/assets/product-shoe.svg"
          />
          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={state.isSubmitting}>
              {state.isSubmitting ? 'Đang lưu...' : 'Tạo sản phẩm'}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Hủy
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <ImageUpload label="Ảnh sản phẩm" onFileSelected={(file) => setSelectedImage(file ? URL.createObjectURL(file) : '')} />
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600 shadow-sm">
            <p className="font-semibold text-slate-900">Gợi ý nhanh</p>
            <p className="mt-2">Có thể dùng lại luồng này cho các form CRUD khác trong dự án: validate, focus field lỗi, submit API, rồi điều hướng về danh sách.</p>
          </div>
        </div>
      </form>
    </div>
  );
}