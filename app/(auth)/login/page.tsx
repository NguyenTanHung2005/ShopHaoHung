'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks';
import { Button, Input } from '@/components/common';

const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

type LoginForm = z.infer<typeof loginSchema>;

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const redirectTo = searchParams.get('redirect') || '/account';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await login(data.email, data.password);
      if (result.success) {
        router.push(redirectTo);
      } else {
        setError(result.error || 'Đăng nhập thất bại');
      }
    } catch {
      setError('Lỗi kết nối, vui lòng thử lại');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center">Đăng nhập</h1>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded">{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="your@email.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Mật khẩu"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password')}
        />

        <Button type="submit" fullWidth disabled={isLoading}>
          {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
        </Button>
      </form>

      <div className="text-center text-sm">
        <p>
          Chưa có tài khoản?{' '}
          <Link href={`/auth/signup?redirect=${encodeURIComponent(redirectTo)}`} className="text-blue-600 hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>

      {/* Demo credentials */}
      <div className="space-y-3">
        <div className="bg-blue-50 border border-blue-200 p-4 rounded text-sm">
          <p className="font-semibold text-blue-900 mb-2">👨‍💼 Admin Account:</p>
          <p className="text-blue-700 text-xs">
            <span className="font-mono bg-blue-100 px-2 py-1 rounded">admin@example.com</span>
          </p>
          <p className="text-blue-700 text-xs mt-1">
            Pass: <span className="font-mono bg-blue-100 px-2 py-1 rounded">123456</span>
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-4 rounded text-sm">
          <p className="font-semibold text-slate-900 mb-2">👤 User Account:</p>
          <p className="text-slate-700 text-xs">
            <span className="font-mono bg-slate-100 px-2 py-1 rounded">user@example.com</span>
          </p>
          <p className="text-slate-700 text-xs mt-1">
            Pass: <span className="font-mono bg-slate-100 px-2 py-1 rounded">123456</span>
          </p>
        </div>

        <Link href="/demo" className="block text-center">
          <p className="text-blue-600 hover:text-blue-700 text-xs font-semibold">
            📊 Xem trang Demo chi tiết →
          </p>
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center p-4">Đang tải...</div>}>
      <LoginContent />
    </Suspense>
  );
}
