'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  Radio,
  MapPin,
  Calendar,
  CheckCircle2,
  ShieldAlert,
  CloudRain,
  Flame,
  Bug,
  Activity,
  Filter,
  ArrowRight,
  Info,
} from 'lucide-react';
import { earlyWarningsData } from '@/data/warnings';
import { ObservationType, RiskLevel } from '@/types';
import { AlertBadge } from '@/components/ui/AlertBadge';
import { useApp } from '@/context/AppContext';
import { NationalRiskObservatory } from '@/components/observatory/NationalRiskObservatory';
import { SectionHero } from '@/components/ui/SectionHero';

export default function EarlyWarningsPage() {
  const { language } = useApp();
  const isHi = language === 'hi';
  const [filterType, setFilterType] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const filteredWarnings = earlyWarningsData.filter((w) => {
    const matchesType = filterType === 'all' || w.type === filterType;
    const matchesSeverity = filterSeverity === 'all' || w.severity === filterSeverity;
    return matchesType && matchesSeverity;
  });

  return (
    <div>
      <SectionHero
        imageSrc="/assets/risk/drought-risk.svg"
        theme="risk"
        label={isHi ? 'बहु-आपदा निगरानी' : 'MULTI-HAZARD SURVEILLANCE'}

        heading={<>{isHi ? <span className='text-gradient-agri'>प्रारंभिक चेतावनी एवं आपदा केंद्र</span> : <span className='text-gradient-agri'>Early Warning & Hazard Center</span>}</>}
        description={isHi ? 'विनाशकारी फसल नुकसान से पूर्व सुरक्षा हेतु मौसम और जैविक प्रकोप की पूर्व-निवारक चेतावनियाँ।' : 'Pre-emptive meteorological and biological outbreak warnings designed to protect crops before catastrophic losses occur.'}
        showDemoBadge={true}
        stats={[
          { value: '12', label: isHi ? 'सक्रिय चेतावनियाँ' : 'Active Warnings' },
          { value: '3', label: isHi ? 'उच्च जोखिम क्षेत्र' : 'High-Risk Zones' },
          { value: 'IMD', label: isHi ? 'डेटा स्रोत' : 'Data Source' },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

      {/* National Agricultural Risk Observatory (Phase 5) */}
      <NationalRiskObservatory />

      {/* Mandatory Distinction Banner: Forecast vs Confirmed Observation (Section 22) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
          {isHi ? 'सूचना: पूर्वानुमान बनाम पुष्ट अवलोकन का अंतर' : 'Notice: Distinction Between Forecasts & Ground Observations'}
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1">
            <strong className="text-amber-900 font-bold flex items-center gap-1.5">
              <span>⚠️ Forecast:</span>
            </strong>
            <p className="text-amber-950 leading-relaxed text-[11px]">
              Indicates simulated or projected future conditions based on atmospheric circulation, satellite thermal radars, and epidemiological curves (e.g. elevated pest risk expected during the coming week).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-50/80 border border-rose-200 space-y-1">
            <strong className="text-rose-900 font-bold flex items-center gap-1.5">
              <span>🔴 Confirmed Observation:</span>
            </strong>
            <p className="text-rose-950 leading-relaxed text-[11px]">
              Indicates physical ground-truth reports validated by university field scouts, pheromone trap thresholds, or multi-farmer community reports in that specific block.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100/70 p-2.5 rounded-2xl border border-slate-200 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition ${
              filterType === 'all'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Warnings ({earlyWarningsData.length})
          </button>
          <button
            onClick={() => setFilterType('forecast')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition flex items-center gap-1 ${
              filterType === 'forecast'
                ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>⚠️ Forecasts</span>
          </button>
          <button
            onClick={() => setFilterType('confirmed_observation')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition flex items-center gap-1 ${
              filterType === 'confirmed_observation'
                ? 'bg-rose-100 text-rose-900 border border-rose-300 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🔴 Confirmed Observations</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium text-[11px]">Severity:</span>
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs"
          >
            <option value="all">All Severities</option>
            <option value="high">🔴 High Severity</option>
            <option value="moderate">🟡 Moderate Severity</option>
            <option value="low">🟢 Low Severity</option>
          </select>
        </div>
      </div>

      {/* Warnings Feed */}
      <div className="space-y-4">
        {filteredWarnings.map((warn) => (
          <div
            key={warn.id}
            className={`telemetry-card bg-white rounded-2xl border p-5 sm:p-6 space-y-4 ${
              warn.type === 'confirmed_observation'
                ? 'border-rose-300/80 shadow-rose-50'
                : 'border-amber-300/80 shadow-amber-50'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                    warn.type === 'confirmed_observation'
                      ? 'bg-rose-100 text-rose-900 border-rose-300'
                      : 'bg-amber-100 text-amber-900 border-amber-300'
                  }`}
                >
                  {warn.type === 'confirmed_observation' ? 'Confirmed Ground Report' : 'Atmospheric Forecast'}
                </span>
                <span className="text-xs text-slate-500 font-semibold">{warn.hazard}</span>
              </div>

              <div className="flex items-center gap-2">
                <AlertBadge level={warn.severity} />
                <span className="text-[10px] text-slate-400">
                  Valid: {warn.validFrom} to {warn.validUntil}
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-snug">
                {warn.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  <strong>{warn.state}:</strong> Districts affected: {warn.districtsAffected.join(', ')}
                </span>
                {warn.verifiedSourcesCount && (
                  <span className="text-emerald-700 font-semibold ml-2">
                    ({warn.verifiedSourcesCount} verified ground sentinel traps)
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/70">
              {warn.description}
            </p>

            {/* Farmer Recommended Pre-emptive Actions */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-bold uppercase text-slate-700 tracking-wider block">
                Recommended Actions for Farmers in Affected Zones:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                {warn.farmerActions.map((act, idx) => (
                  <div key={idx} className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/80 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span className="text-emerald-950 font-medium leading-snug">{act}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
