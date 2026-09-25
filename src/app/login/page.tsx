'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import {
  Phone,
  ArrowRight,
  ShieldCheck,
  Sprout,
  CheckCircle2,
  Sparkles,
  Info,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[85vh] bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirectTo') || '/dashboard';


  const { user, sendOtp, isDevMode } = useAuth();
  const { dict: t } = useApp();

  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already logged in, redirect
  useEffect(() => {
    if (user) {
      router.push(redirectTo);
    }
  }, [user, router, redirectTo]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(raw);
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length !== 10) {
      setError(t.auth?.phonePlaceholder || 'Please enter a valid 10-digit mobile number');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await sendOtp(phone);
      if (res.success) {
        // Forward to verify page with phone and redirect URL
        router.push(
          `/auth/verify?phone=${encodeURIComponent(phone)}&redirectTo=${encodeURIComponent(redirectTo)}`
        );
      } else {
        setError(res.message);
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to dispatch verification code');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto space-y-8">
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 shadow-lg shadow-emerald-950/50 mb-2">
            <Sprout className="w-9 h-9" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            {t.auth?.signInTitle || 'Welcome to Bharat Krishi'}
          </h1>
          <p className="text-sm text-slate-300 max-w-sm mx-auto">
            {t.auth?.signInSubtitle ||
              'Enter your 10-digit mobile number to access your personalized farming network and field analytics.'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="mobile-number"
                className="block text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2"
              >
                {t.auth?.phoneLabel || 'Mobile Phone Number'}
              </label>
              <div className="relative rounded-2xl shadow-inner bg-slate-950 border border-slate-700/80 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/30 transition-all flex items-center overflow-hidden">
                {/* Indian Flag & Code Badge */}
                <div className="flex items-center gap-1.5 px-4 py-3.5 bg-slate-800/80 border-r border-slate-700 text-slate-200 font-medium text-sm select-none">
                  <span className="text-base" role="img" aria-label="India flag">
                    🇮🇳
                  </span>
                  <span>+91</span>
                </div>

                <input
                  id="mobile-number"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="98765 43210"
                  className="w-full bg-transparent py-3.5 px-4 text-white text-lg font-medium tracking-wider placeholder:text-slate-500 focus:outline-none"
                  autoFocus
                />

                {phone.length === 10 && (
                  <div className="pr-4 text-emerald-400 animate-in fade-in">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                )}
              </div>

              {error && (
                <p className="mt-2 text-xs font-medium text-rose-400 flex items-center gap-1.5 animate-in fade-in">
                  <Info className="w-3.5 h-3.5 flex-shrink-0" />
                  {error}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || phone.length !== 10}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-lg ${
                phone.length === 10 && !isSubmitting
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 shadow-emerald-500/25 active:scale-[0.98]'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{t.auth?.sendingOtp || 'Sending OTP...'}</span>
                </>
              ) : (
                <>
                  <span>{t.auth?.sendOtp || 'Send Verification Code'}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Privacy & No-Password Notice */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <p>
              {t.auth?.noPasswordNotice ||
                'Secure passwordless login with one-time verification code. Valid for all Indian mobile operators.'}
            </p>
          </div>

          {/* Dev Mode Banner */}
          {isDevMode && (
            <div className="mt-4 p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>
                {t.auth?.devNotice ||
                  'Development Mode: Enter any 6-digit code (e.g. 123456) on the next step.'}
              </span>
            </div>
          )}
        </div>

        {/* Benefits list */}
        <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Permanent Farmer ID</span>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Multi-Farm Satellite Twin</span>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>AI Crop Doctor Scans</span>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Localized Soil Advisories</span>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
          >
            ← {t.common?.back || 'Back'} to Bharat Krishi Home
          </Link>
        </div>
      </div>
    </div>
  );
}
