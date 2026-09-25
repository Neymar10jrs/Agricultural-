'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import {
  User,
  ShieldCheck,
  MapPin,
  Globe,
  Save,
  CheckCircle2,
  Copy,
  Check,
  Loader2,
  Sparkles,
  Phone,
  Landmark,
} from 'lucide-react';

const INDIAN_STATES = [
  'Punjab',
  'Haryana',
  'Uttar Pradesh',
  'Madhya Pradesh',
  'Rajasthan',
  'Maharashtra',
  'Gujarat',
  'Bihar',
  'West Bengal',
  'Karnataka',
  'Telangana',
  'Andhra Pradesh',
  'Tamil Nadu',
  'Odisha',
  'Assam',
  'Other',
];

import { Suspense } from 'react';

export default function ProfilePage() {
  return (
    <AuthGuard>
      <Suspense
        fallback={
          <div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
          </div>
        }
      >
        <ProfileContent />
      </Suspense>
    </AuthGuard>
  );
}


function ProfileContent() {
  const { profile, user, updateProfile } = useAuth();
  const { dict: t, setLanguage } = useApp();
  const searchParams = useSearchParams();
  const isOnboarding = searchParams?.get('onboarding') === 'true';

  const [fullName, setFullName] = useState(profile?.fullName || '');
  const [state, setState] = useState(profile?.state || 'Punjab');
  const [district, setDistrict] = useState(profile?.district || 'Ludhiana');
  const [village, setVillage] = useState(profile?.village || 'Gill Kalan');
  const [language, setProfileLanguage] = useState<'en' | 'hi'>(profile?.language || 'en');

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName || '');
      setState(profile.state || 'Punjab');
      setDistrict(profile.district || 'Ludhiana');
      setVillage(profile.village || 'Gill Kalan');
      setProfileLanguage(profile.language || 'en');
    }
  }, [profile]);

  const handleCopyId = () => {
    if (profile?.farmerId) {
      navigator.clipboard.writeText(profile.farmerId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await updateProfile({
        fullName,
        state,
        district,
        village,
        language,
      });
      // Also sync AppContext language
      setLanguage(language);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const farmerId = profile?.farmerId || 'FARM-IND-PENDING';

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Onboarding Welcome Banner */}
        {isOnboarding && (
          <div className="bg-gradient-to-r from-emerald-950 to-teal-950 border border-emerald-500/40 rounded-3xl p-6 shadow-xl flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white mb-1">
                Welcome to Bharat Krishi Intelligence Network!
              </h2>
              <p className="text-sm text-slate-300">
                Your permanent Farmer ID has been generated. Please complete your name and agricultural location details to tailor real-time satellite telemetry and advisory models.
              </p>
            </div>
          </div>
        )}

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <User className="w-8 h-8 text-emerald-400" />
              <span>{t.farmerProfile?.title || 'Farmer Profile & Credentials'}</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              {t.farmerProfile?.subtitle ||
                'Manage your verified farmer identity, registered region, and farming preferences.'}
            </p>
          </div>

          {/* Farmer ID Card */}
          <div className="bg-slate-950/80 border border-emerald-500/40 rounded-2xl p-4 flex items-center gap-3 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                {t.farmerProfile?.farmerId || 'Unique Farmer ID'}
              </div>
              <div className="text-base font-mono font-extrabold text-emerald-400 tracking-wide flex items-center gap-2">
                <span>{farmerId}</span>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="text-slate-400 hover:text-white transition-colors"
                  title="Copy Farmer ID"
                >
                  {copiedId ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Personal Details */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <h2 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-700">
              <User className="w-5 h-5 text-emerald-400" />
              <span>{t.farmerProfile?.personalDetails || 'Personal Information'}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  {t.farmerProfile?.fullName || 'Full Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t.farmerProfile?.fullNamePlaceholder || 'Enter your full name'}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* Registered Phone (Read Only) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  {t.farmerProfile?.phone || 'Registered Mobile Number'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    disabled
                    value={user?.phone ? `+91 ${user.phone}` : ''}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-400 font-mono font-medium cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Regional Location */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <h2 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-700">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <span>{t.farmerProfile?.locationDetails || 'Farm Region & Location'}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* State */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  {t.farmerProfile?.state || 'State'} *
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  {t.farmerProfile?.district || 'District'} *
                </label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Village */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  {t.farmerProfile?.village || 'Village / Gram Panchayat'} *
                </label>
                <input
                  type="text"
                  required
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Platform Preferences */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <h2 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-700">
              <Globe className="w-5 h-5 text-emerald-400" />
              <span>{t.farmerProfile?.language || 'Preferred Platform Language'}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setProfileLanguage('en')}
                className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  language === 'en'
                    ? 'bg-emerald-950/60 border-emerald-500 text-white ring-1 ring-emerald-500'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                <div>
                  <div className="font-bold text-base">English</div>
                  <div className="text-xs text-slate-400">English (India)</div>
                </div>
                {language === 'en' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              </button>

              <button
                type="button"
                onClick={() => setProfileLanguage('hi')}
                className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  language === 'hi'
                    ? 'bg-emerald-950/60 border-emerald-500 text-white ring-1 ring-emerald-500'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                <div>
                  <div className="font-bold text-base">हिंदी (Hindi)</div>
                  <div className="text-xs text-slate-400">भारतीय मानक भाषा</div>
                </div>
                {language === 'hi' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              </button>
            </div>
          </div>

          {/* Save Button & Feedback */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            {saveSuccess ? (
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm animate-in fade-in">
                <CheckCircle2 className="w-5 h-5" />
                <span>{t.farmerProfile?.savedSuccess || 'Farmer profile updated successfully.'}</span>
              </div>
            ) : (
              <div className="text-xs text-slate-500">
                All changes sync immediately to your personalized farm satellite dashboard.
              </div>
            )}

            <button
              type="submit"
              disabled={isSaving}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-400 transition-all active:scale-[0.98]"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t.farmerProfile?.saving || 'Updating Profile...'}</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{t.farmerProfile?.saveProfile || 'Save Profile Changes'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
