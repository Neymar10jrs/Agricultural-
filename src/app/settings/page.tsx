'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import {
  Settings,
  Phone,
  ShieldCheck,
  Globe,
  Bell,
  Download,
  Trash2,
  LogOut,
  CheckCircle2,
  Copy,
  Check,
  AlertTriangle,
  Loader2,
} from 'lucide-react';

export default function SettingsPage() {
  return (
    <AuthGuard>
      <SettingsContent />
    </AuthGuard>
  );
}

function SettingsContent() {
  const router = useRouter();
  const { profile, user, signOut, exportAccountData, deleteAccount, updateProfile } = useAuth();
  const { dict: t, language, setLanguage } = useApp();

  const [copiedId, setCopiedId] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCopyId = () => {
    if (profile?.farmerId) {
      navigator.clipboard.writeText(profile.farmerId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handleLanguageChange = async (lang: 'en' | 'hi') => {
    setLanguage(lang);
    if (profile) {
      await updateProfile({ language: lang });
    }
  };

  const handleExport = () => {
    setIsExporting(true);
    try {
      const dataStr = exportAccountData();
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `bkin_farmer_data_${profile?.farmerId || 'export'}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to export data:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await deleteAccount();
      router.push('/');
    } catch (err) {
      console.error('Failed to delete account:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSignOut = async () => {
    if (window.confirm(t.auth?.signOutConfirm || 'Are you sure you want to sign out?')) {
      await signOut();
      router.push('/');
    }
  };

  const farmerId = profile?.farmerId || 'FARM-IND-PENDING';

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Settings className="w-8 h-8 text-emerald-400" />
              <span>{t.settings?.title || 'Account & Platform Settings'}</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              {t.settings?.subtitle ||
                'Manage your authentication credentials, notification channels, data privacy, and platform preferences.'}
            </p>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-rose-950/50 border border-slate-700 hover:border-rose-500/50 text-slate-300 hover:text-rose-300 text-xs font-semibold transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>{t.auth?.signOut || 'Sign Out'}</span>
          </button>
        </div>

        {/* Section 1: Account Information */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-700">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>{t.settings?.accountInfo || 'Account Information'}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <span className="text-xs text-slate-400 block mb-1">
                {t.settings?.phoneRegistered || 'Registered Phone Number'}
              </span>
              <div className="flex items-center gap-2 text-white font-mono text-base font-semibold">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+91 {user?.phone}</span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <span className="text-xs text-slate-400 block mb-1">
                {t.settings?.permanentId || 'Permanent Farmer ID'}
              </span>
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-emerald-400 text-base">{farmerId}</span>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="text-slate-400 hover:text-white p-1"
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

        {/* Section 2: Language Preference */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-700">
            <Globe className="w-5 h-5 text-emerald-400" />
            <span>{t.settings?.preferencesTitle || 'Language & Accessibility'}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleLanguageChange('en')}
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
              onClick={() => handleLanguageChange('hi')}
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

        {/* Section 3: Notification Channels */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-700">
            <Bell className="w-5 h-5 text-emerald-400" />
            <span>{t.settings?.notificationTitle || 'Notification Channels'}</span>
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <div>
                <div className="text-sm font-semibold text-white">
                  {t.settings?.smsAlerts || 'SMS Operational Alerts'}
                </div>
                <div className="text-xs text-slate-400">
                  {t.settings?.smsDesc ||
                    'Receive critical weather warnings and pest risk alerts via SMS'}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSmsEnabled(!smsEnabled)}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${
                  smsEnabled ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    smsEnabled ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <div>
                <div className="text-sm font-semibold text-white">
                  {t.settings?.whatsappAlerts || 'WhatsApp Daily Advisory'}
                </div>
                <div className="text-xs text-slate-400">
                  {t.settings?.whatsappDesc ||
                    'Get morning action plans and spray condition alerts on WhatsApp'}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setWhatsappEnabled(!whatsappEnabled)}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${
                  whatsappEnabled ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    whatsappEnabled ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Section 4: Data Management & Privacy */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-700">
            <Download className="w-5 h-5 text-emerald-400" />
            <span>{t.settings?.dataPrivacyTitle || 'Data Management & Privacy'}</span>
          </h2>

          <div className="space-y-4">
            {/* Export data */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <div>
                <div className="text-sm font-semibold text-white">
                  {t.settings?.exportTitle || 'Export Farm Intelligence Archive'}
                </div>
                <div className="text-xs text-slate-400">
                  {t.settings?.exportDesc ||
                    'Download a complete JSON record of all your farm parcels, soil tests, crop cycles, and diagnoses.'}
                </div>
              </div>
              <button
                type="button"
                onClick={handleExport}
                disabled={isExporting}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-400 text-xs font-semibold whitespace-nowrap transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{t.settings?.exportBtn || 'Download Farm Data (JSON)'}</span>
              </button>
            </div>

            {/* Delete Account */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-rose-950/20 border border-rose-500/20 rounded-2xl">
              <div>
                <div className="text-sm font-semibold text-rose-300">
                  {t.settings?.deleteTitle || 'Delete Account & Purge Records'}
                </div>
                <div className="text-xs text-slate-400">
                  {t.settings?.deleteDesc ||
                    'Permanently remove your farmer account, farm parcels, and historical records from BKIN servers.'}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-950 hover:bg-rose-900 border border-rose-500/40 text-rose-300 text-xs font-semibold whitespace-nowrap transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>{t.settings?.deleteBtn || 'Delete My Account'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-rose-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">Delete Farmer Account?</h3>
              <p className="text-xs text-slate-400">
                {t.settings?.confirmDeleteDialog ||
                  'Are you absolutely sure? This action is permanent and cannot be undone. All your registered parcels, soil tests, crop cycles, and diagnoses will be permanently purged.'}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                {t.common?.cancel || 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-rose-600/30"
              >
                {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>Confirm Purge & Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
