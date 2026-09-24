'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend,
} from 'recharts';
import {
  Leaf, Droplets, Thermometer, CloudRain, Bug, AlertTriangle,
  Satellite, Database, ChevronDown, ChevronUp, MapPin, Calendar,
  User, Wheat, TrendingUp, TrendingDown, Minus, Info, CheckCircle2,
  Activity, Layers, Eye,
} from 'lucide-react';

import { initialDemoFarm, demoSoilProfile, demoWeatherObservation, demoSatelliteObservation } from '@/data/demoFarm';
import { demoRiskBreakdown } from '@/data/riskEngine';
import { ndviTimeSeries } from '@/data/timeSeries';
import { demoDataQuality } from '@/data/impact';
import { StatCard } from '@/components/ui/StatCard';
import { AlertBadge } from '@/components/ui/AlertBadge';
import { SectionHero } from '@/components/ui/SectionHero';
import { RiskLevel } from '@/types';

import { useApp } from '@/context/AppContext';

// ─── Helpers ────────────────────────────────────────────────────────────────

function riskColor(level: RiskLevel) {
  if (level === 'high') return { bar: 'bg-rose-500', text: 'text-rose-700', badge: 'bg-rose-50 border-rose-200 text-rose-800', track: 'bg-rose-100' };
  if (level === 'moderate') return { bar: 'bg-amber-400', text: 'text-amber-700', badge: 'bg-amber-50 border-amber-200 text-amber-800', track: 'bg-amber-100' };
  return { bar: 'bg-emerald-500', text: 'text-emerald-700', badge: 'bg-emerald-50 border-emerald-200 text-emerald-800', track: 'bg-emerald-100' };
}

function scoreColor(score: number) {
  if (score >= 65) return '#f43f5e';
  if (score >= 35) return '#f59e0b';
  return '#10b981';
}

function freshnessColor(f: string) {
  if (f === 'live') return 'bg-emerald-100 text-emerald-800 border-emerald-200';
  if (f === 'recent') return 'bg-sky-100 text-sky-800 border-sky-200';
  if (f === 'aging') return 'bg-amber-100 text-amber-800 border-amber-200';
  return 'bg-rose-100 text-rose-800 border-rose-200';
}

function trendIcon(trend: string) {
  if (trend === 'improving') return <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />;
  if (trend === 'declining') return <TrendingDown className="w-3.5 h-3.5 text-rose-600" />;
  if (trend === 'alert') return <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />;
  return <Minus className="w-3.5 h-3.5 text-slate-400" />;
}

// ─── Crop Stage Config ───────────────────────────────────────────────────────

const CROP_STAGES = [
  { label: 'Germination', days: '0–10' },
  { label: 'Crown Root', days: '10–21' },
  { label: 'Tillering', days: '21–55' },
  { label: 'Jointing', days: '55–75' },
  { label: 'Heading', days: '75–90' },
  { label: 'Grain Fill', days: '90–110' },
  { label: 'Harvest', days: '110–120' },
];
const TOTAL_DAYS = 120;
const CURRENT_DAY = initialDemoFarm.daysAfterSowing; // 38
const CURRENT_STAGE_IDX = 2; // Tillering

// ─── Health Score Circle ─────────────────────────────────────────────────────

function HealthScoreCircle({ score }: { score: number }) {
  const radius = 52;
  const circ = 2 * Math.PI * radius;
  const pct = score / 100;
  const fill = pct * circ;
  const color = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#f43f5e';
  const label = score >= 75 ? 'Good' : score >= 50 ? 'Moderate' : 'At Risk';

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={128} height={128} viewBox="0 0 128 128">
        <circle cx={64} cy={64} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={10} />
        <circle
          cx={64} cy={64} r={radius}
          fill="none"
          stroke={color}
          strokeWidth={10}
          strokeDasharray={`${fill} ${circ - fill}`}
          strokeLinecap="round"
          transform="rotate(-90 64 64)"
          style={{ transition: 'stroke-dasharray 1s ease' }}
        />
        <text x={64} y={60} textAnchor="middle" fontSize={26} fontWeight={700} fill="#0f172a">{score}</text>
        <text x={64} y={76} textAnchor="middle" fontSize={10} fill="#64748b">/100</text>
      </svg>
      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full" style={{ background: color + '20', color }}>{label}</span>
    </div>
  );
}

// ─── Risk Factor Bar ─────────────────────────────────────────────────────────

function RiskFactorBar({ factor }: { factor: typeof demoRiskBreakdown.factors[0] }) {
  const c = riskColor(factor.level);
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-slate-100 bg-white p-3 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between gap-2 cursor-pointer" onClick={() => setOpen(v => !v)}>
        <div className="flex items-center gap-2 min-w-0">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${c.badge}`}>{factor.level.toUpperCase()}</span>
          <span className="text-sm font-semibold text-slate-800 truncate">{factor.label}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-sm font-bold ${c.text}`}>{factor.score}</span>
          {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </div>
      <div className={`mt-2 rounded-full h-1.5 ${c.track}`}>
        <div
          className={`h-1.5 rounded-full ${c.bar} transition-all duration-700`}
          style={{ width: `${factor.score}%` }}
        />
      </div>
      {open && (
        <div className="mt-2 space-y-1">
          <p className="text-xs text-slate-600 leading-relaxed">{factor.explanation}</p>
          <div className="flex items-center gap-3 flex-wrap mt-1">
            <span className="text-[10px] text-slate-400 font-medium">📡 {factor.dataSource}</span>
            <span className="text-[10px] text-slate-400">🕐 {factor.lastUpdated}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── NDVI Chart ──────────────────────────────────────────────────────────────

type Period = '7' | '30' | 'all';

function NDVIChart() {
  const [period, setPeriod] = useState<Period>('all');

  const all = ndviTimeSeries.dataPoints;
  const data = period === '7'
    ? all.slice(-4)
    : period === '30'
    ? all.slice(-8)
    : all;

  const activePeriodInsight = period === '7'
    ? ndviTimeSeries.insights[0]
    : ndviTimeSeries.insights[2];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg px-3 py-2 text-xs">
        <p className="font-semibold text-slate-700 mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} style={{ color: p.color }}>
            {p.dataKey === 'value' ? 'NDVI' : 'Benchmark'}: <strong>{p.value}</strong>
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {(['7', '30', 'all'] as Period[]).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                period === p ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {p === '7' ? 'Last 7 days' : p === '30' ? 'Last 30 days' : 'Full Season'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1"><span className="inline-block w-3 h-0.5 bg-emerald-500" /> NDVI</span>
          <span className="flex items-center gap-1"><span className="inline-block w-3 h-0.5 bg-slate-400 border-dashed border-t" /> Benchmark</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="ndviGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} />
          <YAxis domain={[0, 1]} tick={{ fontSize: 10, fill: '#94a3b8' }} tickCount={6} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={0.70} stroke="#94a3b8" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: 'Benchmark', fontSize: 9, fill: '#94a3b8', position: 'right' }} />
          <Area type="monotone" dataKey="benchmark" stroke="#94a3b8" strokeWidth={1.5} fill="none" strokeDasharray="4 3" dot={false} />
          <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fill="url(#ndviGrad)" dot={{ r: 3, fill: '#10b981', strokeWidth: 0 }} activeDot={{ r: 5 }} />
        </AreaChart>
      </ResponsiveContainer>

      <div className="space-y-2">
        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">AI Insights</p>
        {ndviTimeSeries.insights.map((ins, i) => (
          <div key={i} className="flex items-start gap-2 bg-slate-50 rounded-lg px-3 py-2">
            {trendIcon(ins.trend)}
            <div>
              <span className="text-[10px] font-semibold text-slate-500 uppercase">{ins.period}: </span>
              <span className="text-xs text-slate-700">{ins.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Crop Stage Progress ─────────────────────────────────────────────────────

function CropStageProgress() {
  const pct = (CURRENT_DAY / TOTAL_DAYS) * 100;
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-xs text-slate-500 font-medium">
        <span>Day 0 — Sowing</span>
        <span className="font-bold text-emerald-700">Day {CURRENT_DAY}</span>
        <span>Day {TOTAL_DAYS} — Harvest</span>
      </div>
      <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-1000"
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute top-0 h-3 w-3 bg-white border-2 border-emerald-600 rounded-full shadow"
          style={{ left: `calc(${pct}% - 6px)` }}
        />
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {CROP_STAGES.map((stage, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <div className={`w-full h-1 rounded-full ${
              i < CURRENT_STAGE_IDX ? 'bg-emerald-400' : i === CURRENT_STAGE_IDX ? 'bg-emerald-600' : 'bg-slate-200'
            }`} />
            <span className={`text-[9px] font-medium text-center leading-tight ${
              i === CURRENT_STAGE_IDX ? 'text-emerald-700 font-bold' : 'text-slate-400'
            }`}>
              {stage.label}
            </span>
            <span className="text-[8px] text-slate-300">{stage.days}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
        <p className="text-xs text-emerald-800">
          Currently at <strong>Tillering stage (Day 38 / ~120)</strong> — 31.7% through the season. Active tiller formation is the key physiological window.
        </p>
      </div>
    </div>
  );
}

// ─── Why At Risk ─────────────────────────────────────────────────────────────

function WhyAtRisk() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <span className="font-semibold text-amber-900 text-sm">Why is my farm at risk?</span>
          <span className="text-[10px] bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full font-medium">AI Explainer</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-amber-600" /> : <ChevronDown className="w-4 h-4 text-amber-600" />}
      </button>
      {open && (
        <div className="border-t border-amber-200 px-4 py-3 space-y-2">
          <p className="text-xs text-amber-800 font-medium">Top risk drivers by weighted impact:</p>
          {demoRiskBreakdown.primaryDrivers.map((d, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="shrink-0 w-5 h-5 rounded-full bg-amber-200 text-amber-800 text-xs flex items-center justify-center font-bold">{i + 1}</span>
              <p className="text-xs text-slate-700 leading-relaxed">{d}</p>
            </div>
          ))}
          <div className="mt-2 pt-2 border-t border-amber-200">
            <p className="text-[10px] text-amber-700 italic">{demoRiskBreakdown.disclaimer}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Data Quality Panel ──────────────────────────────────────────────────────

function DataQualityPanel() {
  const q = demoDataQuality;
  const scoreColor = q.overallScore >= 80 ? 'text-emerald-700' : q.overallScore >= 60 ? 'text-amber-700' : 'text-rose-700';

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-slate-500" />
          <span className="text-sm font-semibold text-slate-800">Data Quality</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`text-lg font-bold ${scoreColor}`}>{q.overallScore}</span>
          <span className="text-xs text-slate-500">/100 · {q.overallLabel}</span>
        </div>
      </div>
      <div className="space-y-2">
        {q.sources.map(s => (
          <div key={s.id} className="flex items-center gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-xs font-medium text-slate-700 truncate">{s.label}</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full border ${freshnessColor(s.freshness)}`}>
                    {s.freshness.toUpperCase()}
                  </span>
                  <span className="text-xs font-bold text-slate-600">{s.qualityScore}</span>
                </div>
              </div>
              <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-1 rounded-full transition-all duration-700 ${
                    s.qualityScore >= 85 ? 'bg-emerald-500' : s.qualityScore >= 70 ? 'bg-amber-400' : 'bg-rose-400'
                  }`}
                  style={{ width: `${s.qualityScore}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {q.limitations.length > 0 && (
        <div className="pt-2 border-t border-slate-100">
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Known Limitations</p>
          {q.limitations.map((l, i) => (
            <p key={i} className="text-[10px] text-slate-500 leading-relaxed">• {l}</p>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function FarmDigitalTwinPage() {
  const { dict, language } = useApp();
  const isHi = language === 'hi';
  const farm = initialDemoFarm;
  const risk = demoRiskBreakdown;
  const weather = demoWeatherObservation;
  const soil = demoSoilProfile;
  const satellite = demoSatelliteObservation;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Page Header — Premium SectionHero ── */}
      <SectionHero
        imageSrc="/assets/agriculture/fields-pattern.svg"
        theme="forest"
        label={isHi ? 'फार्म डिजिटल ट्विन' : 'FARM DIGITAL TWIN'}

        heading={
          <span className="text-gradient-agri">{farm.name}</span>
        }
        description={isHi
          ? `${farm.ownerName} · ${farm.village}, ${farm.block}, ${farm.district}, ${farm.state} · ${farm.areaAcres} एकड़ · ${farm.crop} — ${farm.variety}`
          : `${farm.ownerName} · ${farm.village}, ${farm.block}, ${farm.district}, ${farm.state} · ${farm.areaAcres} Acres · ${farm.crop} — ${farm.variety}`
        }
        showDemoBadge={true}
        stats={[
          { value: `${farm.overallHealthScore}`, label: isHi ? 'स्वास्थ्य स्कोर' : 'Health Score' },
          { value: farm.crop, label: isHi ? 'फसल' : 'Crop' },
          { value: `Day ${farm.daysAfterSowing}`, label: isHi ? 'बुवाई के बाद' : 'After Sowing' },
          { value: farm.areaAcres + ' Ac', label: isHi ? 'क्षेत्रफल' : 'Area' },
        ]}
        minHeight="min-h-[280px]"
      >
        <div className="flex items-center gap-2 flex-wrap mt-1">
          <span className="text-xs text-emerald-200/80 font-medium">ID: BKIN-PB-LDH-042</span>
          <span className="text-xs text-emerald-300/60">·</span>
          <span className="text-xs text-emerald-200/80">{isHi ? 'बुवाई:' : 'Sown:'} {farm.sowingDate}</span>
          <span className="text-xs text-emerald-300/60">·</span>
          <span className="text-xs text-emerald-200/80">{isHi ? 'कल्ले फूटना' : 'Tillering stage'}</span>
        </div>
      </SectionHero>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">


        {/* ── Breadcrumb to National Grid ── */}
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-3 rounded-xl border border-slate-200">
          <Link href="/india-network" className="text-emerald-700 font-semibold hover:underline">
            {isHi ? 'राष्ट्रीय ग्रिड' : 'National Grid'}
          </Link>
          <span>/</span>
          <Link href="/state-dashboard" className="text-emerald-700 font-semibold hover:underline">
            {isHi ? 'पंजाब नोड' : 'Punjab Node'}
          </Link>
          <span>/</span>
          <span className="text-slate-400">Ludhiana &gt; Samrala &gt; Rohno Kalan</span>
          <span>/</span>
          <span className="font-bold text-slate-800">BKIN-PB-LDH-042</span>
        </div>

        {/* ── Key Metrics Grid ── */}
        <section>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
            {isHi ? 'लाइव खेत मेट्रिक्स व टेलीमेट्री' : 'Live Farm Metrics & Telemetry'}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <StatCard
              title="NDVI"
              value="0.68"
              subtitle="Day 38 benchmark: 0.70"
              icon={Leaf}
              riskLevel="low"
              riskLabel="Good Vegetation"
              source="Sentinel-2"
              lastUpdated="16 Sept"
              trend={{ value: '+11.5% (7d)', isPositive: true }}
            />
            <StatCard
              title="Soil Moisture"
              value="32.5"
              unit="%"
              subtitle="Optimal: 30–38%"
              icon={Droplets}
              riskLevel="low"
              riskLabel="Adequate"
              source="Soil Sensor"
              lastUpdated="Today"
            />
            <StatCard
              title="Temperature"
              value="22.4"
              unit="°C"
              subtitle="Feels like 23.1°C"
              icon={Thermometer}
              riskLevel="low"
              riskLabel="Optimal"
              source="IMD Agro-met"
              lastUpdated="10 min ago"
            />
            <StatCard
              title="Rain Probability"
              value="78"
              unit="%"
              subtitle="12.5mm within 24h"
              icon={CloudRain}
              riskLevel="moderate"
              riskLabel="Rain Likely"
              source="IMD Forecast"
              lastUpdated="Today, 06:00"
              trend={{ value: 'Delay irrigation', isPositive: false }}
            />
            <StatCard
              title="Disease Prob."
              value="23"
              unit="%"
              subtitle="Yellow rust / aphid risk"
              icon={Activity}
              riskLevel="moderate"
              riskLabel="Caution"
              source="Epi-model"
              lastUpdated="Today, 05:30"
            />
            <StatCard
              title="Pest Risk"
              value="Moderate"
              subtitle="Aphid colony risk"
              icon={Bug}
              riskLevel="moderate"
              riskLabel="Scout Now"
              source="Weather + Reports"
              lastUpdated="Yesterday"
            />
          </div>
        </section>

        {/* ── Crop Stage Progress ── */}
        <section>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Wheat className="w-5 h-5 text-amber-500" />
              <h2 className="text-base font-bold text-slate-800">Crop Growth Stage Tracker</h2>
              <span className="text-xs bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full font-medium">HD-2967 · Wheat Rabi</span>
            </div>
            <CropStageProgress />
          </div>
        </section>

        {/* ── Risk Breakdown + Why at Risk ── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Factors */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h2 className="text-base font-bold text-slate-800">6-Factor Risk Breakdown</h2>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-500">Confidence:</span>
                <span className="text-xs font-bold text-emerald-700">{risk.confidenceScore}%</span>
                <span className="text-[10px] text-slate-400 capitalize">({risk.confidence})</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2 text-xs text-slate-600">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              Overall composite risk score: <strong className="text-slate-800 mx-1">{risk.overallScore}/100</strong>
              <AlertBadge level={risk.overallLevel} customLabel={risk.overallLabel} size="sm" />
            </div>
            <div className="space-y-2">
              {risk.factors.map(f => <RiskFactorBar key={f.key} factor={f} />)}
            </div>
          </div>

          {/* NDVI Chart */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-800">NDVI Time Series</h2>
              <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">Sentinel-2</span>
            </div>
            <NDVIChart />
          </div>
        </section>

        {/* ── Satellite Anomaly ── */}
        <section>
          <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
                <Satellite className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-bold text-amber-900">Satellite Anomaly Detected</h3>
                  <AlertBadge level="moderate" customLabel="Moderate Severity" size="sm" />
                </div>
                {satellite.anomalies.map((a, i) => (
                  <div key={i} className="space-y-2">
                    <p className="text-sm font-semibold text-slate-700">📍 {a.zoneName}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div className="bg-white/70 rounded-lg border border-amber-100 p-2.5">
                        <p className="text-slate-500 font-medium mb-0.5">Issue Detected</p>
                        <p className="text-slate-800 font-semibold">{a.detectedIssue}</p>
                      </div>
                      <div className="bg-white/70 rounded-lg border border-amber-100 p-2.5">
                        <p className="text-slate-500 font-medium mb-0.5">Probable Reason</p>
                        <p className="text-slate-800">{a.probableReason}</p>
                      </div>
                      <div className="bg-white/70 rounded-lg border border-amber-100 p-2.5">
                        <p className="text-slate-500 font-medium mb-0.5">Recommended Action</p>
                        <p className="text-slate-800">{a.recommendedAction}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> Field NDVI avg: <strong className="text-slate-700 ml-1">{satellite.ndviMean}</strong></span>
                      <span className="flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-amber-500" /> Anomaly zone NDVI: <strong className="text-amber-700 ml-1">0.51</strong></span>
                      <span className="flex items-center gap-1"><Satellite className="w-3 h-3" /> {satellite.satelliteName} · {satellite.captureDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Why At Risk + Data Quality ── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <WhyAtRisk />
          </div>
          <DataQualityPanel />
        </section>

        {/* ── Disclaimer ── */}
        <section className="bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 flex items-start gap-2">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-500 leading-relaxed">
            <strong className="text-slate-700">Demo Mode:</strong> All data, scores, and risk values are simulated for demonstration purposes only and are based on the BKIN-PB-LDH-042 prototype farm profile. {risk.disclaimer}
          </p>
        </section>
      </main>
    </div>
  );
}
