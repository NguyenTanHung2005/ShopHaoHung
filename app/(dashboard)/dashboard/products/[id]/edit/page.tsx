'use client';

import { useEffect, useReducer, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Input } from '@/components/common';
import { ImageUpload } from '@/components/upload';
import { getStoredProduct, updateStoredProduct } from '@/lib/product-storage';

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
  | { type: 'SET_FIELD_VALUES'; values: Partial<Omit<ProductFormState, 'errors' | 'isSubmitting'>> }
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
    case 'SET_FIELD_VALUES':
      return {
        ...state,
        ...action.values,
      };
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

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [selectedImage, setSelectedImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    try {
      setIsLoading(true);
      setLoadError('');

      const product = productId ? getStoredProduct(productId) : null;

      if (!product) {
        throw new Error('Không thể tải sản phẩm');
      }

      dispatch({
        type: 'SET_FIELD_VALUES',
        values: {
          title: product.name || '',
          category: product.category || '',
          price: String(product.price ?? ''),
          stock: String(product.stock ?? ''),
          description: product.description || '',
          image: product.image || '',
        },
      });
    } catch (fetchError) {
      setLoadError(fetchError instanceof Error ? fetchError.message : 'Không thể tải sản phẩm');
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

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
      const updated = productId
        ? updateStoredProduct(productId, {
            name: state.title,
            category: state.category,
            price: Number(state.price),
            stock: Number(state.stock),
            description: state.description,
            image: selectedImage || state.image || '/assets/product-bag.svg',
          })
        : null;

      if (!updated) {
        throw new Error('Cập nhật sản phẩm thất bại');
      }

      alert('Cập nhật sản phẩm thành công!');
      dispatch({ type: 'SUBMIT_SUCCESS' });
      router.push('/dashboard/products');
    } catch {
      dispatch({ type: 'SUBMIT_FAIL' });
      alert('Cập nhật sản phẩm thất bại, vui lòng thử lại');
    }
  };

  if (isLoading) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">Đang tải sản phẩm...</div>;
  }

  if (loadError) {
    return <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700 shadow-sm">{loadError}</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Sprint 3</p>
        <h1 className="text-3xl font-black tracking-tight text-slate-950">Chỉnh sửa sản phẩm</h1>
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
              {state.isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Hủy
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <ImageUpload
            label="Ảnh sản phẩm"
            onFileSelected={(file) => {
              if (!file) {
                setSelectedImage('');
                return;
              }

              const reader = new FileReader();
              reader.onload = () => setSelectedImage(String(reader.result ?? ''));
              reader.readAsDataURL(file);
            }}
          />
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600 shadow-sm">
            <p className="font-semibold text-slate-900">Mẹo chỉnh sửa</p>
            <p className="mt-2">Chỉ cần đổi các trường cần thiết rồi lưu lại. Ảnh mới sẽ ghi đè URL hiện tại nếu bạn chọn file mới.</p>
          </div>
        </div>
      </form>
    </div>
  );
}