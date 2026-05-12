'use client';

import { useEffect, useReducer, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Input } from '@/components/common';
import type { User } from '@/types';

type UserFormState = {
  name: string;
  email: string;
  role: 'user' | 'admin';
  errors: Partial<Record<'name' | 'email', string>>;
  isSubmitting: boolean;
};

type UserFormAction =
  | { type: 'CHANGE_FIELD'; field: keyof Omit<UserFormState, 'errors' | 'isSubmitting'>; value: string }
  | { type: 'SET_FIELD_VALUES'; values: Partial<Omit<UserFormState, 'errors' | 'isSubmitting'>> }
  | { type: 'SET_ERRORS'; errors: UserFormState['errors'] }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_FAIL' };

const initialState: UserFormState = {
  name: '',
  email: '',
  role: 'user',
  errors: {},
  isSubmitting: false,
};

function formReducer(state: UserFormState, action: UserFormAction): UserFormState {
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

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      if (!userId) return;
      
      try {
        setIsLoading(true);
        setLoadError('');

        const response = await fetch(`/api/users/${userId}`);
        const payload = await response.json();

        if (!response.ok || !payload?.success || !payload?.data) {
          throw new Error(payload?.error || 'Không thể tải thông tin người dùng');
        }

        dispatch({
          type: 'SET_FIELD_VALUES',
          values: {
            name: payload.data.name || '',
            email: payload.data.email || '',
            role: payload.data.role || 'user',
          }
        });

      } catch (error) {
        setLoadError(error instanceof Error ? error.message : 'Không thể tải dữ liệu');
      } finally {
        setIsLoading(false);
      }
    };

    void loadData();
  }, [userId]);

  const handleChange =
    (field: keyof Omit<UserFormState, 'errors' | 'isSubmitting'>) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      dispatch({ type: 'CHANGE_FIELD', field, value: event.target.value });
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors: UserFormState['errors'] = {};

    if (!state.name.trim()) {
      errors.name = 'Tên không được để trống';
    }
    if (!state.email.trim()) {
      errors.email = 'Email không được để trống';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
      errors.email = 'Email không hợp lệ';
    }

    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors });
      dispatch({ type: 'SUBMIT_FAIL' });
      nameInputRef.current?.focus();
      return;
    }

    dispatch({ type: 'SET_ERRORS', errors: {} });
    dispatch({ type: 'SUBMIT_START' });

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          role: state.role,
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.error || 'Cập nhật người dùng thất bại');
      }

      alert('Cập nhật người dùng thành công!');
      dispatch({ type: 'SUBMIT_SUCCESS' });
      router.push('/dashboard/users');
    } catch {
      dispatch({ type: 'SUBMIT_FAIL' });
      alert('Cập nhật người dùng thất bại, vui lòng thử lại');
    }
  };

  if (isLoading) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">Đang tải dữ liệu người dùng...</div>;
  }

  if (loadError) {
    return <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700 shadow-sm">{loadError}</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Sprint 3</p>
        <h1 className="text-3xl font-black tracking-tight text-slate-950">Chỉnh sửa thông tin người dùng</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <Input
            ref={nameInputRef}
            label="Họ và tên"
            value={state.name}
            onChange={handleChange('name')}
            error={state.errors.name}
          />
          <Input
            label="Email"
            type="email"
            value={state.email}
            onChange={handleChange('email')}
            error={state.errors.email}
            disabled={true}
          />
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Vai trò (Role)</label>
            <select
              value={state.role}
              onChange={handleChange('role')}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="user">User (Khách hàng)</option>
              <option value="admin">Admin (Quản trị viên)</option>
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
            <p className="font-semibold text-slate-900 mb-4">Mẹo quản trị</p>
            <p className="mt-2">Email được dùng làm định danh (identifier) chính cho đăng nhập nên không thể sửa ở màn hình này. Hãy tạo người dùng mới nếu muốn thay đổi email.</p>
          </div>
        </div>
      </form>
    </div>
  );
}
