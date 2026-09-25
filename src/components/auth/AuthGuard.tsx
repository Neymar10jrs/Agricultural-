'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2, ShieldCheck, Sprout } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  fallbackUrl?: string;
}

export function AuthGuard({ children, fallbackUrl = '/login' }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      const destination = `${fallbackUrl}?redirectTo=${encodeURIComponent(pathname || '/dashboard')}`;
      router.push(destination);
    }
  }, [user, isLoading, router, pathname, fallbackUrl]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="relative mb-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 animate-pulse">
            <Sprout className="w-8 h-8" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
            <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
          </div>
        </div>
        <h2 className="text-lg font-bold text-slate-800 mb-1 flex items-center justify-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          Verifying Farmer Credentials
        </h2>
        <p className="text-sm text-slate-500 max-w-sm">
          Securing connection with Bharat Krishi Intelligence Network...
        </p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
