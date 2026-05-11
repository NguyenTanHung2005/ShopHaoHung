'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isHydrated } = useAuth();

  useEffect(() => {
    if (isHydrated && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, isHydrated, router]);

  if (!isHydrated) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return <>{children}</>;
}
