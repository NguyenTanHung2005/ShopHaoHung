'use client';

import { useReducer, useRef, type ChangeEvent, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
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

export default function NewUserPage() {
  const router = useRouter();
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const [state, dispatch] = useReducer(formReducer, initialState);

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
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          role: state.role,
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.error || 'Tạo người dùng thất bại');
      }

      alert('Tạo người dùng thành công!');
      dispatch({ type: 'SUBMIT_SUCCESS' });
      router.push('/dashboard/users');
    } catch {
      dispatch({ type: 'SUBMIT_FAIL' });
      alert('Tạo người dùng thất bại, vui lòng thử lại');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Sprint 3</p>
        <h1 className="text-3xl font-black tracking-tight text-slate-950">Thêm người dùng mới</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <Input
            ref={nameInputRef}
            label="Họ và tên"
            value={state.name}
            onChange={handleChange('name')}
            error={state.errors.name}
            placeholder="Ví dụ: Nguyễn Văn A"
          />
          <Input
            label="Email"
            type="email"
            value={state.email}
            onChange={handleChange('email')}
            error={state.errors.email}
            placeholder="nguyenvana@example.com"
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
              {state.isSubmitting ? 'Đang tạo...' : 'Tạo người dùng'}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Hủy
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600 shadow-sm">
            <p className="font-semibold text-slate-900 mb-4">Mẹo quản trị</p>
            <p className="mt-2">Vai trò <strong>Admin</strong> sẽ cấp quyền truy cập toàn bộ trang Dashboard này.</p>
            <p className="mt-2">Mật khẩu mặc định có thể được thiết lập ngẫu nhiên cho tính năng mock API này, người dùng nên đổi lại sau khi đăng nhập.</p>
          </div>
        </div>
      </form>
    </div>
  );
}
