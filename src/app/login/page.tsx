'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from 'firebase/auth';
import { auth } from '@/firebase-config';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import {
  Phone,
  ArrowRight,
  ShieldCheck,
  Sprout,
  CheckCircle2,
  Info,
  Loader2,
  RotateCcw,
  Edit2,
  KeyRound,
} from 'lucide-react';
import Link from 'next/link';

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: ConfirmationResult;
  }
}

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

  const { user, loginWithFirebaseSession } = useAuth();
  const { dict: t } = useApp();

  // Step state: 'phone' or 'otp'
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  // Status states
  const [error, setError] = useState<string | null>(null);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [cooldown, setCooldown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // OTP input refs
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // If already logged in, redirect
  useEffect(() => {
    if (user) {
      router.push(redirectTo);
    }
  }, [user, router, redirectTo]);

  // Cooldown timer for resending OTP
  useEffect(() => {
    if (step !== 'otp') return;
    if (cooldown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown, step]);

  // Clean up reCAPTCHA verifier helper
  const resetRecaptcha = () => {
    if (typeof window !== 'undefined' && window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (_) {}
      window.recaptchaVerifier = undefined;
    }
  };

  // Initialize invisible reCAPTCHA verifier
  const getRecaptchaVerifier = () => {
    if (typeof window === 'undefined') return null;
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved
        },
        'expired-callback': () => {
          resetRecaptcha();
        },
      });
    }
    return window.recaptchaVerifier;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(raw);
    if (error) setError(null);
  };

  // Step 1: Send OTP via Firebase Phone Auth
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (phone.length !== 10) {
      setError(t.auth?.phonePlaceholder || 'Please enter a valid 10-digit mobile number');
      return;
    }

    setIsSendingOtp(true);
    setError(null);

    try {
      const appVerifier = getRecaptchaVerifier();
      if (!appVerifier) {
        throw new Error('reCAPTCHA initialization failed. Please reload the page.');
      }

      const formattedPhone = `+91${phone}`;
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);

      setConfirmationResult(confirmation);
      window.confirmationResult = confirmation;
      setStep('otp');
      setCooldown(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);

      // Focus first OTP field after transition
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    } catch (err: any) {
      console.error('Error sending OTP via Firebase:', err);
      resetRecaptcha();

      if (err.code === 'auth/invalid-phone-number') {
        setError('Invalid phone number. Please enter a valid 10-digit Indian mobile number.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many requests. Please wait a few moments before trying again.');
      } else if (err.code === 'auth/quota-exceeded') {
        setError('SMS quota exceeded for today. Please try again later.');
      } else {
        setError(err.message || 'Failed to dispatch verification code via SMS.');
      }
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (!canResend || isResending) return;
    setIsResending(true);
    setError(null);

    try {
      resetRecaptcha();
      const appVerifier = getRecaptchaVerifier();
      if (!appVerifier) throw new Error('reCAPTCHA initialization failed.');

      const formattedPhone = `+91${phone}`;
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);

      setConfirmationResult(confirmation);
      window.confirmationResult = confirmation;
      setCooldown(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      console.error('Error resending OTP:', err);
      resetRecaptcha();
      setError(err.message || 'Failed to resend verification code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  // Handle OTP digit changes
  const handleOtpChange = (index: number, val: string) => {
    const numeric = val.replace(/\D/g, '');
    if (!numeric && val !== '') return;

    if (error) setError(null);

    const newOtp = [...otp];

    if (numeric.length > 1) {
      // Pasted full or partial code
      const digits = numeric.slice(0, 6).split('');
      for (let i = 0; i < 6; i++) {
        newOtp[i] = digits[i] || '';
      }
      setOtp(newOtp);
      const nextFocus = Math.min(digits.length, 5);
      inputRefs.current[nextFocus]?.focus();
    } else {
      newOtp[index] = numeric;
      setOtp(newOtp);
      if (numeric && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Step 2: Verify OTP with Firebase and server verify-session
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      setError('Please enter the full 6-digit verification code');
      return;
    }

    const confirmation = confirmationResult || window.confirmationResult;
    if (!confirmation) {
      setError('Verification session expired. Please request a new OTP.');
      setStep('phone');
      return;
    }

    setIsVerifyingOtp(true);
    setError(null);

    try {
      // 1. Confirm OTP with Firebase
      const userCredential = await confirmation.confirm(otpCode);
      const firebaseUser = userCredential.user;

      // 2. Get Firebase ID token
      const idToken = await firebaseUser.getIdToken();

      // 3. Send ID token to Node.js backend endpoint /api/auth/verify-session
      const res = await fetch('/api/auth/verify-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Server session verification failed');
      }

      // 4. Update application AuthContext
      await loginWithFirebaseSession(firebaseUser.uid, phone);

      // 5. Navigate to authenticated destination
      router.push(redirectTo);
    } catch (err: any) {
      console.error('Error verifying OTP with Firebase:', err);
      if (err.code === 'auth/invalid-verification-code') {
        setError('Invalid verification code. Please check the SMS and try again.');
      } else if (err.code === 'auth/code-expired') {
        setError('The verification code has expired. Please tap Resend Code.');
      } else {
        setError(err.message || 'Verification failed. Please check the code and try again.');
      }
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-transparent py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center relative z-10">
      {/* Invisible reCAPTCHA container required by Firebase Phone Auth */}
      <div id="recaptcha-container"></div>

      <div className="max-w-md w-full mx-auto space-y-8">
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 shadow-lg shadow-emerald-950/50 mb-2">
            <Sprout className="w-9 h-9" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            {step === 'phone'
              ? t.auth?.signInTitle || 'Welcome to Bharat Krishi'
              : t.auth?.enterOtpTitle || 'Verify Mobile Number'}
          </h1>
          <p className="text-sm text-slate-300 max-w-sm mx-auto">
            {step === 'phone'
              ? t.auth?.signInSubtitle ||
                'Enter your 10-digit mobile number to access your personalized farming network and field analytics.'
              : `${t.auth?.enterOtpSubtitle || 'We sent a 6-digit OTP code to'} +91 ${phone}`}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {step === 'phone' ? (
            /* STEP 1: Phone Number Input */
            <form onSubmit={handleSendOtp} className="space-y-6">
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
                disabled={isSendingOtp || phone.length !== 10}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-lg ${
                  phone.length === 10 && !isSendingOtp
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 shadow-emerald-500/25 active:scale-[0.98]'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                {isSendingOtp ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{t.auth?.sendingOtp || 'Sending OTP via SMS...'}</span>
                  </>
                ) : (
                  <>
                    <span>{t.auth?.sendOtp || 'Send Verification Code'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* STEP 2: OTP Code Verification */
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    {t.auth?.otpLabel || '6-Digit Verification Code'}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('phone');
                      setError(null);
                    }}
                    className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>{t.auth?.changePhone || 'Change Number'}</span>
                  </button>
                </div>

                {/* 6 Digit Inputs */}
                <div className="grid grid-cols-6 gap-2 sm:gap-3">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        inputRefs.current[idx] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={6}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      className={`w-full aspect-square text-center text-xl sm:text-2xl font-bold rounded-2xl bg-slate-950 border transition-all text-white focus:outline-none ${
                        digit
                          ? 'border-emerald-500 bg-emerald-950/20 text-emerald-300'
                          : 'border-slate-700/80 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30'
                      }`}
                    />
                  ))}
                </div>

                {error && (
                  <p className="mt-3 text-xs font-medium text-rose-400 flex items-center gap-1.5 animate-in fade-in">
                    <Info className="w-3.5 h-3.5 flex-shrink-0" />
                    {error}
                  </p>
                )}
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                disabled={isVerifyingOtp || otp.join('').length !== 6}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-lg ${
                  otp.join('').length === 6 && !isVerifyingOtp
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 shadow-emerald-500/25 active:scale-[0.98]'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                {isVerifyingOtp ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{t.auth?.verifying || 'Verifying Code...'}</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-5 h-5" />
                    <span>{t.auth?.verifyBtn || 'Verify & Sign In'}</span>
                  </>
                )}
              </button>

              {/* Resend OTP Section */}
              <div className="pt-2 text-center text-xs">
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isResending}
                    className="inline-flex items-center gap-1.5 font-semibold text-emerald-400 hover:text-emerald-300 transition-colors disabled:opacity-50"
                  >
                    {isResending ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <RotateCcw className="w-3.5 h-3.5" />
                    )}
                    <span>{t.auth?.resendOtp || 'Resend Verification Code'}</span>
                  </button>
                ) : (
                  <p className="text-slate-400 flex items-center justify-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                    <span>
                      {t.auth?.resendCooldown || 'Resend code in'}{' '}
                      <span className="font-semibold text-emerald-400">{cooldown}s</span>
                    </span>
                  </p>
                )}
              </div>
            </form>
          )}

          {/* Security Notice */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <p>
              {t.auth?.noPasswordNotice ||
                'Secure passwordless login with one-time verification code via Firebase Phone Authentication.'}
            </p>
          </div>
        </div>

        {/* Benefits list */}
        <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Permanent Farmer ID</span>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Multi-Farm Satellite Intelligence</span>
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
