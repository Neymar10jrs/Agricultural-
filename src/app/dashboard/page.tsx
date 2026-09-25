'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import {
  Sprout,
  ShieldCheck,
  MapPin,
  Calendar,
  CloudSun,
  Droplets,
  Thermometer,
  Wind,
  AlertTriangle,
  ArrowRight,
  Activity,
  ChevronRight,
  Layers,
  Sparkles,
  Copy,
  Check,
  PlusCircle,
  Stethoscope,
  Compass,
  FileText,
  Clock,
  ExternalLink,
} from 'lucide-react';

export default function FarmerDashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}

function DashboardContent() {
  const { profile, farms, activeFarm, setActiveFarmId, activityLogs, user, isDevMode } = useAuth();
  const { dict: t, openAskKrishi } = useApp();

  const [copiedId, setCopiedId] = useState(false);

  const handleCopyId = () => {
    if (profile?.farmerId) {
      navigator.clipboard.writeText(profile.farmerId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const displayName = profile?.fullName || `Farmer ${user?.phone?.slice(-4) || 'Partner'}`;
  const farmerId = profile?.farmerId || 'FARM-IND-PENDING';

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-16">
      {/* Top Welcome Banner */}
      <section className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950/80 border-b border-emerald-500/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {t.farmerProfile?.farmerIdBadge || 'BKIN Certified Farmer'}
              </span>

              {isDevMode && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-medium">
                  Offline / Dev Mode
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {t.dashboard?.welcomeBack || 'Welcome back,'}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                {displayName}
              </span>
            </h1>

            {/* Permanent Farmer ID with Copy */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-2 bg-slate-950/70 border border-slate-700/80 rounded-xl px-3 py-1.5 font-mono text-sm text-slate-300">
                <span className="text-slate-500 text-xs uppercase tracking-wider font-sans font-semibold">
                  {t.dashboard?.farmerId || 'Farmer ID'}:
                </span>
                <span className="font-bold text-emerald-400">{farmerId}</span>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="text-slate-400 hover:text-white transition-colors p-1"
                  title="Copy Farmer ID"
                >
                  {copiedId ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                <span>
                  {profile?.village || 'Field'}, {profile?.district || 'District'},{' '}
                  {profile?.state || 'State'}
                </span>
              </div>
            </div>
          </div>

          {/* Active Farm Parcel Selector */}
          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-4 min-w-[280px] shadow-lg">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                {t.dashboard?.activeFarmLabel || 'Active Monitoring Parcel'}
              </span>
              <Link
                href="/my-farm"
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-0.5"
              >
                <span>Manage</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            {farms.length > 0 ? (
              <select
                value={activeFarm?.id || ''}
                onChange={(e) => setActiveFarmId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-medium focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                {farms.map((farm) => (
                  <option key={farm.id} value={farm.id}>
                    {farm.name} ({farm.totalAreaAcres} Ac)
                  </option>
                ))}
              </select>
            ) : (
              <Link
                href="/my-farm"
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 rounded-xl px-3 py-2 w-full justify-center hover:bg-emerald-900/60 transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{t.farmManagement?.addFarmBtn || 'Register First Farm Parcel'}</span>
              </Link>
            )}

            {activeFarm && (
              <div className="mt-2 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span>Crop: {activeFarm.primaryCrop}</span>
                <span>{activeFarm.totalAreaAcres} Acres</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Telemetry Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Active Crop & Stage */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-2">
              <span>{t.dashboard?.cropStageTitle || 'Crop Growth Stage'}</span>
              <Sprout className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold text-white mb-1">
              {activeFarm?.primaryCrop || 'Wheat HD-2967'}
            </div>
            <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Tillering Stage (Day 38 / 120)
            </div>
            <div className="mt-3 w-full bg-slate-700/60 rounded-full h-1.5 overflow-hidden">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '32%' }} />
            </div>
          </div>

          {/* Card 2: Field Weather */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-2">
              <span>{t.dashboard?.weatherCardTitle || 'Field Weather'}</span>
              <CloudSun className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-white">22.4°C</span>
              <span className="text-xs text-slate-400">Clear Skies</span>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Droplets className="w-3 h-3 text-cyan-400" /> 68%
              </span>
              <span className="flex items-center gap-1">
                <Wind className="w-3 h-3 text-slate-400" /> 11 km/h
              </span>
            </div>
            <div className="mt-3 text-xs text-emerald-400 font-medium flex items-center gap-1">
              <span>Optimal Spray Window Today</span>
            </div>
          </div>

          {/* Card 3: Soil Health Index */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-2">
              <span>{t.dashboard?.soilCardTitle || 'Soil Condition'}</span>
              <Layers className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">7.2 pH</div>
            <div className="text-xs text-emerald-400 font-semibold">
              Balanced Alluvial Loam
            </div>
            <div className="mt-3 text-xs text-slate-400 flex items-center justify-between">
              <span>N: Sufficient</span>
              <span>P: Medium</span>
              <span>K: High</span>
            </div>
          </div>

          {/* Card 4: Field Alert Status */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-2">
              <span>{t.dashboard?.activeAlertsTitle || 'Field Alerts'}</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">1 Advisory</div>
            <div className="text-xs text-amber-400 font-medium">
              Yellow rust risk: low to moderate
            </div>
            <div className="mt-3 text-xs text-emerald-400 font-semibold hover:underline">
              <Link href="/alert-center" className="flex items-center gap-1">
                <span>Open Alert Center</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Action Matrix */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span>{t.dashboard?.quickActionsTitle || 'Instant Field Actions'}</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Action 1: Manage Farms */}
            <Link
              href="/my-farm"
              className="bg-slate-800/90 border border-slate-700/80 hover:border-emerald-500/60 rounded-2xl p-4 flex flex-col items-center text-center gap-2 hover:bg-slate-800 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-200">
                {t.dashboard?.actions?.myFarm || 'Manage Parcels'}
              </span>
            </Link>

            {/* Action 2: Crop Doctor */}
            <Link
              href="/crop-doctor"
              className="bg-slate-800/90 border border-slate-700/80 hover:border-emerald-500/60 rounded-2xl p-4 flex flex-col items-center text-center gap-2 hover:bg-slate-800 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Stethoscope className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-200">
                {t.dashboard?.actions?.cropDoctor || 'Crop Doctor'}
              </span>
            </Link>

            {/* Action 3: Farm Digital Twin */}
            <Link
              href="/farm-digital-twin"
              className="bg-slate-800/90 border border-slate-700/80 hover:border-emerald-500/60 rounded-2xl p-4 flex flex-col items-center text-center gap-2 hover:bg-slate-800 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-200">
                {t.dashboard?.actions?.satelliteTwin || 'Farm Twin'}
              </span>
            </Link>

            {/* Action 4: Today's Advisory */}
            <Link
              href="/todays-advisory"
              className="bg-slate-800/90 border border-slate-700/80 hover:border-emerald-500/60 rounded-2xl p-4 flex flex-col items-center text-center gap-2 hover:bg-slate-800 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-200">
                {t.dashboard?.actions?.advisory || "Today's Advisory"}
              </span>
            </Link>

            {/* Action 5: Ask Krishi AI */}
            <button
              type="button"
              onClick={() => openAskKrishi()}
              className="bg-slate-800/90 border border-slate-700/80 hover:border-emerald-500/60 rounded-2xl p-4 flex flex-col items-center text-center gap-2 hover:bg-slate-800 transition-all group"
            >

              <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-200">
                {t.dashboard?.actions?.askKrishi || 'Ask Krishi AI'}
              </span>
            </button>

            {/* Action 6: History & Records */}
            <Link
              href="/history"
              className="bg-slate-800/90 border border-slate-700/80 hover:border-emerald-500/60 rounded-2xl p-4 flex flex-col items-center text-center gap-2 hover:bg-slate-800 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-200">
                {t.dashboard?.actions?.viewHistory || 'Field History'}
              </span>
            </Link>
          </div>
        </div>

        {/* Dual Section: Activity Log & Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity Timeline (2 cols) */}
          <div className="lg:col-span-2 bg-slate-800/70 border border-slate-700/80 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>{t.dashboard?.recentActivityTitle || 'Recent Activity Timeline'}</span>
              </h3>
              <Link
                href="/history"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                View Full Audit
              </Link>
            </div>

            {activityLogs.length > 0 ? (
              <div className="divide-y divide-slate-700/60">
                {activityLogs.slice(0, 5).map((log) => (
                  <div key={log.id} className="py-3 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white">{log.title}</div>
                      <div className="text-xs text-slate-400 truncate">{log.description}</div>
                    </div>
                    <div className="text-[10px] text-slate-500 whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-slate-500 text-sm">
                {t.dashboard?.noActivity || 'No recent field activity recorded yet.'}
              </div>
            )}
          </div>

          {/* Quick Profile Summary Card (1 col) */}
          <div className="bg-slate-800/70 border border-slate-700/80 rounded-3xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <h3 className="font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Account</span>
              </h3>
              <Link
                href="/profile"
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                Edit Profile
              </Link>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Farmer Name</span>
                <span className="text-white font-semibold text-sm">{displayName}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Registered Phone</span>
                <span className="text-white font-semibold text-sm">+91 {user?.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Permanent Farmer ID</span>
                <span className="text-emerald-400 font-mono font-bold">{farmerId}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Assigned District</span>
                <span className="text-white font-medium">
                  {profile?.district || 'Ludhiana'}, {profile?.state || 'Punjab'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Registered Parcels</span>
                <span className="text-white font-medium">{farms.length} Agricultural Holdings</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/settings"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Platform Settings & Data</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
