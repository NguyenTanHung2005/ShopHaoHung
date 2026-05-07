'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        router.push('/');
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
          <Link href="/auth/signup" className="text-blue-600 hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>

      {/* Demo credentials */}
      <div className="bg-blue-50 border border-blue-200 p-3 rounded text-sm">
        <p className="font-semibold text-blue-900">Demo:</p>
        <p className="text-blue-700">Email: demo@example.com</p>
        <p className="text-blue-700">Pass: 123456</p>
      </div>
    </div>
  );
}
