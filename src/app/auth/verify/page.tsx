'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import {
  ShieldCheck,
  ArrowRight,
  RotateCcw,
  Info,
  CheckCircle2,
  Sparkles,
  Loader2,
  Edit2,
} from 'lucide-react';
import Link from 'next/link';

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[85vh] bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
        </div>
      }
    >
      <VerifyOtpContent />
    </Suspense>
  );
}

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams?.get('phone') || '';
  const redirectTo = searchParams?.get('redirectTo') || '/dashboard';


  const { user, verifyOtp, sendOtp, isDevMode } = useAuth();
  const { dict: t } = useApp();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [cooldown, setCooldown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [resending, setResending] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // If no phone provided, redirect back to login
  useEffect(() => {
    if (!phone) {
      router.push('/login');
    }
  }, [phone, router]);

  // If already logged in, redirect
  useEffect(() => {
    if (user) {
      router.push(redirectTo);
    }
  }, [user, router, redirectTo]);

  // Timer countdown
  useEffect(() => {
    if (cooldown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Auto-focus first input on load
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleOtpChange = (index: number, val: string) => {
    // Only accept numeric characters
    const numeric = val.replace(/\D/g, '');
    if (!numeric && val !== '') return;

    if (error) setError(null);

    const newOtp = [...otp];

    if (numeric.length > 1) {
      // Pasted string
      const digits = numeric.slice(0, 6).split('');
      for (let i = 0; i < 6; i++) {
        newOtp[i] = digits[i] || '';
      }
      setOtp(newOtp);
      const nextFocus = Math.min(digits.length, 5);
      inputRefs.current[nextFocus]?.focus();

      if (digits.length === 6) {
        handleVerification(digits.join(''));
      }
      return;
    }

    newOtp[index] = numeric;
    setOtp(newOtp);

    // Auto-advance
    if (numeric && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto submit if all 6 filled
    if (index === 5 && numeric && newOtp.every((d) => d !== '')) {
      handleVerification(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerification = async (code: string) => {
    if (code.length !== 6) {
      setError(t.auth?.otpLabel || 'Please enter all 6 digits');
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      const res = await verifyOtp(phone, code);
      if (res.success) {
        if (res.isNewUser) {
          router.push('/profile?onboarding=true');
        } else {
          router.push(redirectTo);
        }
      } else {
        setError(res.error || 'Invalid or expired verification code');
      }
    } catch (err: any) {
      setError(err?.message || 'Verification failed. Please retry.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!canResend || resending) return;
    setResending(true);
    setError(null);
    try {
      const res = await sendOtp(phone);
      if (res.success) {
        setCooldown(60);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      } else {
        setError(res.message);
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to resend code');
    } finally {
      setResending(false);
    }
  };

  const fullCode = otp.join('');

  return (
    <div className="min-h-[85vh] bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 shadow-lg shadow-emerald-950/50 mb-2">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.auth?.enterOtpTitle || 'Enter Verification Code'}
          </h1>
          <p className="text-sm text-slate-300">
            {t.auth?.enterOtpSubtitle || 'We sent a 6-digit OTP code to'}
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-sm font-semibold text-emerald-400">
            <span>+91 {phone}</span>
            <Link
              href="/login"
              className="text-xs text-slate-400 hover:text-white flex items-center gap-0.5 ml-1 transition-colors"
              title={t.auth?.changePhone || 'Change phone number'}
            >
              <Edit2 className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Verification Card */}
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleVerification(fullCode);
            }}
            className="space-y-6"
          >
            {/* 6 Digit Inputs */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3 text-center">
                {t.auth?.otpLabel || '6-Digit Verification Code'}
              </label>

              <div className="flex justify-between gap-2 sm:gap-3">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      inputRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-2xl bg-slate-950 border transition-all focus:outline-none ${
                      digit
                        ? 'border-emerald-500 text-emerald-400 shadow-inner ring-1 ring-emerald-500/40'
                        : 'border-slate-700 text-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30'
                    }`}
                  />
                ))}
              </div>

              {error && (
                <p className="mt-3 text-xs font-medium text-rose-400 flex items-center justify-center gap-1.5 animate-in fade-in">
                  <Info className="w-3.5 h-3.5 flex-shrink-0" />
                  {error}
                </p>
              )}
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isVerifying || fullCode.length !== 6}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-lg ${
                fullCode.length === 6 && !isVerifying
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 shadow-emerald-500/25 active:scale-[0.98]'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{t.auth?.verifying || 'Verifying Code...'}</span>
                </>
              ) : (
                <>
                  <span>{t.auth?.verifyBtn || 'Verify & Sign In'}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Resend Cooldown Section */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1.5"
              >
                {resending ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <RotateCcw className="w-3.5 h-3.5" />
                )}
                <span>{t.auth?.resendOtp || 'Resend Verification Code'}</span>
              </button>
            ) : (
              <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
                <span>{t.auth?.resendCooldown || 'Resend code in'}</span>
                <span className="font-mono text-emerald-400 font-bold">{cooldown}</span>
                <span>{t.auth?.seconds || 'seconds'}</span>
              </p>
            )}
          </div>

          {/* Dev Mode Helper */}
          {isDevMode && (
            <div className="mt-4 p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center justify-center gap-2 text-center">
              <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>
                Dev Mode: Enter code <strong className="font-mono text-white underline">123456</strong>
              </span>
            </div>
          )}
        </div>

        {/* Security badges */}
        <div className="flex items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Encrypted Session</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Anti-Abuse Protected</span>
          </div>
        </div>
      </div>
    </div>
  );
}
