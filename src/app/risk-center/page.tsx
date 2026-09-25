'use client';

import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from 'recharts';
import {
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  ThumbsDown,
  Satellite,
  CloudRain,
  FlaskConical,
  Brain,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Clock,
  Activity,
  Info,
  Sliders,
  Calculator,
  RotateCcw,
} from 'lucide-react';
import { demoRiskBreakdown } from '@/data/riskEngine';
import { initialAdvisories } from '@/data/advisories';
import { initialDemoFarm } from '@/data/demoFarm';
import { diseaseProbabilityTimeSeries } from '@/data/timeSeries';
import { RiskFactor, AdvisoryItem } from '@/types';
import { useApp } from '@/context/AppContext';
import { SectionHero } from '@/components/ui/SectionHero';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function scoreColor(score: number): string {
  if (score > 65) return 'rose';
  if (score >= 35) return 'amber';
  return 'emerald';
}

function scoreBarBg(score: number): string {
  if (score > 65) return 'bg-rose-500';
  if (score >= 35) return 'bg-amber-400';
  return 'bg-emerald-500';
}

function scoreBadgeClass(score: number): string {
  if (score > 65) return 'bg-rose-100 text-rose-800 border-rose-300';
  if (score >= 35) return 'bg-amber-100 text-amber-800 border-amber-300';
  return 'bg-emerald-100 text-emerald-800 border-emerald-300';
}

function levelLabel(score: number): string {
  if (score > 65) return 'HIGH';
  if (score >= 35) return 'MODERATE';
  return 'LOW';
}

function urgencyClass(u: AdvisoryItem['urgency']): string {
  if (u === 'Immediate') return 'bg-rose-100 text-rose-700 border-rose-300';
  if (u === 'Within 48h') return 'bg-amber-100 text-amber-700 border-amber-300';
  return 'bg-slate-100 text-slate-600 border-slate-300';
}

function categoryClass(c: AdvisoryItem['category']): string {
  if (c === 'Irrigation') return 'bg-sky-100 text-sky-700 border-sky-300';
  if (c === 'Nutrient') return 'bg-lime-100 text-lime-700 border-lime-300';
  if (c === 'Pest & Disease') return 'bg-rose-100 text-rose-700 border-rose-300';
  if (c === 'Weather Action') return 'bg-blue-100 text-blue-700 border-blue-300';
  return 'bg-slate-100 text-slate-600 border-slate-300';
}

// ─── Gauge Component (CSS-based semi-arc) ────────────────────────────────────

function RiskGaugeDisplay({ score, label }: { score: number; label: string }) {
  // Semi-circle gauge using CSS conic-gradient trick
  const rotation = Math.round((score / 100) * 180);
  const isHigh = score > 65;
  const isMod = score >= 35;

  const needleColor = isHigh ? '#ef4444' : isMod ? '#f59e0b' : '#10b981';
  const arcColor = isHigh ? '#fecaca' : isMod ? '#fde68a' : '#d1fae5';
  const arcFill = isHigh ? '#ef4444' : isMod ? '#f59e0b' : '#10b981';

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Gauge arc using SVG */}
      <div className="relative w-52 h-28 overflow-hidden">
        <svg viewBox="0 0 200 110" className="w-full h-full" fill="none">
          {/* Background arc */}
          <path
            d="M 10 100 A 90 90 0 0 1 190 100"
            stroke="#e2e8f0"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
          />
          {/* Colored fill arc */}
          <path
            d="M 10 100 A 90 90 0 0 1 190 100"
            stroke={arcColor}
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="283"
            strokeDashoffset="0"
          />
          {/* Progress arc */}
          <path
            d="M 10 100 A 90 90 0 0 1 190 100"
            stroke={arcFill}
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="283"
            strokeDashoffset={String(Math.round(283 - (score / 100) * 283))}
            style={{ transition: 'stroke-dashoffset 0.8s ease' }}
          />
          {/* Zone markers */}
          <line x1="10" y1="100" x2="34" y2="68" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />
          <line x1="100" y1="10" x2="100" y2="26" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />
          <line x1="190" y1="100" x2="166" y2="68" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />
          {/* Needle */}
          <g transform={`rotate(${rotation - 90}, 100, 100)`}>
            <line x1="100" y1="100" x2="100" y2="22" stroke={needleColor} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="100" cy="100" r="5" fill={needleColor} />
          </g>
          {/* Zone text */}
          <text x="14" y="116" fontSize="9" fill="#10b981" fontWeight="700">LOW</text>
          <text x="87" y="10" fontSize="9" fill="#f59e0b" fontWeight="700">MOD</text>
          <text x="163" y="116" fontSize="9" fill="#ef4444" fontWeight="700">HIGH</text>
        </svg>
      </div>
      {/* Score display */}
      <div className="text-center">
        <div className={`text-6xl font-black ${isHigh ? 'text-rose-600' : isMod ? 'text-amber-500' : 'text-emerald-600'}`}>
          {score}
        </div>
        <div className="text-xs text-slate-500 font-medium">out of 100</div>
        <div
          className={`mt-2 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full font-bold text-sm border ${
            isHigh
              ? 'bg-rose-100 text-rose-800 border-rose-300'
              : isMod
              ? 'bg-amber-100 text-amber-800 border-amber-300'
              : 'bg-emerald-100 text-emerald-800 border-emerald-300'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          {label}
        </div>
      </div>
    </div>
  );
}

// ─── Risk Factor Row ──────────────────────────────────────────────────────────

function RiskFactorRow({ factor }: { factor: RiskFactor }) {
  const color = scoreColor(factor.score);
  const barBg = scoreBarBg(factor.score);
  const badge = scoreBadgeClass(factor.score);
  const lbl = levelLabel(factor.score);

  return (
    <div className="space-y-2 py-3 border-b border-slate-100 last:border-0">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-semibold text-sm text-slate-900 truncate">{factor.label}</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${badge} shrink-0`}
          >
            {lbl}
          </span>
        </div>
        <span
          className={`text-xl font-black shrink-0 ${
            color === 'rose' ? 'text-rose-600' : color === 'amber' ? 'text-amber-500' : 'text-emerald-600'
          }`}
        >
          {factor.score}
        </span>
      </div>
      {/* Bar */}
      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-2.5 rounded-full transition-all duration-700 ${barBg}`}
          style={{ width: `${factor.score}%` }}
        />
      </div>
      <p className="text-[11px] text-slate-500 leading-relaxed">{factor.explanation}</p>
      <div className="flex items-center gap-1 text-[10px] text-slate-400">
        <Clock className="w-3 h-3" />
        <span>{factor.dataSource} · {factor.lastUpdated}</span>
      </div>
    </div>
  );
}

// ─── Advisory Card ────────────────────────────────────────────────────────────

function AdvisoryCard({ advisory }: { advisory: AdvisoryItem }) {
  const [expanded, setExpanded] = useState(false);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  return (
    <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-xl border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.10)] overflow-hidden">
      <button
        onClick={() => setExpanded((p) => !p)}
        className="w-full text-left p-4 flex items-start justify-between gap-3 hover:bg-slate-50/70 transition"
      >
        <div className="space-y-1.5 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${categoryClass(advisory.category)}`}
            >
              {advisory.category}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${urgencyClass(advisory.urgency)}`}
            >
              {advisory.urgency}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              Confidence: {advisory.confidenceScore}%
            </span>
          </div>
          <p className="font-bold text-sm text-slate-900">{advisory.title}</p>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
        )}
      </button>

      {expanded && (
        <div className="border-t border-slate-100 p-4 space-y-4">
          {/* Recommendation */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Recommendation
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">{advisory.recommendation}</p>
          </div>
          {/* Evidence */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Evidence Base
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">{advisory.evidence}</p>
          </div>
          {/* Why */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Why This Matters
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">{advisory.why}</p>
          </div>
          {/* Data Sources */}
          <div className="flex flex-wrap gap-1.5">
            {advisory.dataSources.map((ds) => (
              <span
                key={ds}
                className="px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded-full text-[10px] font-semibold"
              >
                {ds}
              </span>
            ))}
          </div>
          {/* Confidence score bar */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-semibold shrink-0">
              AI Confidence: {advisory.confidenceScore}%
            </span>
            <div className="flex-1 bg-slate-100 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full bg-emerald-500"
                style={{ width: `${advisory.confidenceScore}%` }}
              />
            </div>
          </div>
          {/* Feedback */}
          <div className="flex items-center gap-3 pt-1 border-t border-slate-100">
            <span className="text-xs text-slate-500">Was this advisory helpful?</span>
            <button
              onClick={() => setFeedback('up')}
              className={`p-1.5 rounded-lg transition ${
                feedback === 'up'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'hover:bg-slate-100 text-slate-400'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => setFeedback('down')}
              className={`p-1.5 rounded-lg transition ${
                feedback === 'down'
                  ? 'bg-rose-100 text-rose-700'
                  : 'hover:bg-slate-100 text-slate-400'
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
            </button>
            {feedback && (
              <span className="text-[11px] text-slate-500">
                {feedback === 'up' ? '✓ Thanks for your feedback!' : '✓ Noted — we\'ll improve.'}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function RiskCenterPage() {
  const { language } = useApp();
  const isHi = language === 'hi';
  const rb = demoRiskBreakdown;
  const farm = initialDemoFarm;

  const defaultWeights: Record<string, number> = {
    weather: 25,
    disease: 20,
    soil: 18,
    water: 18,
    vegetation: 12,
    pest: 7,
  };

  const [customWeights, setCustomWeights] = useState<Record<string, number>>(defaultWeights);
  const [driversExpanded, setDriversExpanded] = useState(false);
  const [showFormulaModal, setShowFormulaModal] = useState(false);
  const [period, setPeriod] = useState<'7' | '30' | 'all'>('all');

  const totalWeight = Object.values(customWeights).reduce((a, b) => a + b, 0);
  const simulatedScore = Math.round(
    rb.factors.reduce((sum, f) => {
      const w = customWeights[f.key] ?? Math.round(f.weight * 100);
      return sum + f.score * w;
    }, 0) / (totalWeight || 1)
  );

  const chartData = useMemo(() => {
    const pts = diseaseProbabilityTimeSeries.dataPoints;
    if (period === '7') return pts.slice(-3);
    if (period === '30') return pts.slice(-8);
    return pts;
  }, [period]);

  return (
    <div>
      <SectionHero
        imageSrc="/assets/risk/drought-risk.svg"
        theme="risk"
        label={isHi ? 'खेत स्तरीय जोखिम इंजन' : 'FARM-LEVEL RISK ENGINE'}

        heading={<><span className='text-gradient-agri'>{isHi ? 'जोखिम केंद्र' : 'Risk Intelligence Center'}</span></>}
        description={isHi ? 'BKIN जोखिम मॉडल: 6 कारक जो आपके खेत के खतरे का स्तर निर्धारित करते हैं' : 'BKIN Risk Model: 6 weighted factors that determine your farm threat level — configurable for your crop and region'}
        showDemoBadge={true}
        stats={[
          { value: '6', label: isHi ? 'जोखिम कारक' : 'Risk Factors' },
          { value: 'AI', label: isHi ? 'चालित' : 'Powered' },
          { value: 'Live', label: isHi ? 'अपडेट' : 'Updates' },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* ── Overall Risk Gauge + Summary ───────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gauge */}
        <div id="guide-risk-gauge" className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-2xl border border-rose-500/30 p-6 shadow-[0_4px_16px_rgba(0,0,0,0.10)] flex flex-col items-center gap-4">
          <h2 className="font-bold text-base text-slate-800 self-start flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
            Overall Farm Risk Score
          </h2>
          <RiskGaugeDisplay score={rb.overallScore} label={rb.overallLabel} />
          <p className="text-xs text-slate-500 text-center max-w-xs leading-relaxed">
            Weighted composite from {rb.factors.length} risk factors. AI Confidence:{' '}
            <strong>{rb.confidenceScore}%</strong> ({rb.confidence.toUpperCase()})
          </p>
        </div>

        {/* Quick Stats */}
        <div className="space-y-3">
          <h2 className="font-bold text-base text-slate-800 flex items-center gap-2">
            <Activity className="w-5 h-5 text-slate-500" />
            Risk Factor Snapshot
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {rb.factors.map((f) => {
              const color = scoreColor(f.score);
              return (
                <div
                  key={f.key}
                  className={`rounded-xl border p-3 text-center ${
                    color === 'rose'
                      ? 'bg-rose-50/80 border-rose-200'
                      : color === 'amber'
                      ? 'bg-amber-50/80 border-amber-200'
                      : 'bg-emerald-50/80 border-emerald-200'
                  }`}
                >
                  <div
                    className={`text-2xl font-black ${
                      color === 'rose'
                        ? 'text-rose-600'
                        : color === 'amber'
                        ? 'text-amber-500'
                        : 'text-emerald-600'
                    }`}
                  >
                    {f.score}
                  </div>
                  <div className="text-[10px] text-slate-600 font-semibold mt-0.5">{f.label}</div>
                  <div
                    className={`text-[9px] font-bold mt-1 ${
                      color === 'rose'
                        ? 'text-rose-700'
                        : color === 'amber'
                        ? 'text-amber-600'
                        : 'text-emerald-700'
                    }`}
                  >
                    {levelLabel(f.score)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 6 Risk Factor Bars ────────────────────────────────────────────── */}
      <div id="guide-risk-factors" className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-2xl border border-white/10 p-5 sm:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
        <h2 className="font-bold text-base text-slate-900 mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-slate-500" />
          Risk Factor Breakdown
        </h2>
        <div>
          {rb.factors.map((f) => (
            <RiskFactorRow key={f.key} factor={f} />
          ))}
        </div>
      </div>

      {/* ── Why is my farm at risk? ───────────────────────────────────────── */}
      <div id="guide-risk-drivers" className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-2xl border border-rose-500/30 overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
        <button
          onClick={() => setDriversExpanded((p) => !p)}
          className="w-full flex items-center justify-between p-5 hover:bg-rose-500/10 transition"
        >
          <h2 className="font-bold text-base text-rose-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            Why is my farm at risk? — Primary Drivers
          </h2>
          {driversExpanded ? (
            <ChevronUp className="w-5 h-5 text-rose-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-rose-400" />
          )}
        </button>
        {driversExpanded && (
          <div className="px-5 pb-5 space-y-3">
            {rb.primaryDrivers.map((driver, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-xl p-3.5 border border-white/10 shadow-sm">
                <span className="w-6 h-6 rounded-full bg-rose-500 text-white text-xs font-black flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <p className="text-sm text-slate-700 leading-relaxed">{driver}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Transparent Mathematical Formulation & Calibration (Phase 8) ──────── */}
      <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-2xl border border-white/10 p-6 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Calculator className="w-3 h-3 text-emerald-400" />
                <span>Phase 8 Calibrated Risk Engine</span>
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {isHi ? 'पारदर्शी भारित कलन विधि' : 'Fully Transparent Weighted Formulation'}
              </span>
            </div>
            <h2 className="text-xl font-black text-slate-900">
              {isHi ? 'जोखिम गणना सूत्र व संवेदनशीलता सिम्युलेटर' : 'Risk Calculation Formula & Weight Sensitivity Simulator'}
            </h2>
            <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
              {isHi
                ? 'बीकेआईएन कोई ब्लैक-बॉक्स एआई नहीं है। समग्र स्कोर की गणना 6 स्वतंत्र कारकों के पारदर्शी भारित योग से की जाती है। नीचे दिए गए स्लाइडर्स से भार बदलकर सिमुलेशन देखें।'
                : 'BKIN does not use opaque black-box scoring. The composite risk is deterministically computed from 6 agronomic factors. Adjust factor weights below to simulate sensitivity.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-right shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">
              {isHi ? 'सिम्युलेटेड समग्र स्कोर' : 'Simulated Composite Score'}
            </span>
            <div className="flex items-baseline justify-end gap-1.5 mt-0.5">
              <span className={`text-3xl font-black ${simulatedScore > 65 ? 'text-rose-600' : simulatedScore >= 35 ? 'text-amber-500' : 'text-emerald-600'}`}>
                {simulatedScore}
              </span>
              <span className="text-xs text-slate-400 font-bold">/100</span>
            </div>
            <button
              onClick={() => setCustomWeights(defaultWeights)}
              className="mt-2 text-[10px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 ml-auto"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{isHi ? 'डिफ़ॉल्ट भार रीसेट करें' : 'Reset to Default Weights'}</span>
            </button>
          </div>
        </div>

        {/* Formula Representation Box */}
        <div className="bg-slate-900 rounded-xl p-4 text-white font-mono text-xs overflow-x-auto border border-slate-800 space-y-1.5">
          <div className="text-[10px] uppercase text-emerald-400 font-bold tracking-wider">
            Deterministic Formula (निर्धारक सूत्र):
          </div>
          <div className="text-slate-200 font-bold text-sm tracking-wide">
            Composite_Risk = ∑(Score_i × Weight_i) / ∑(Weight_i)
          </div>
          <div className="text-[11px] text-slate-400">
            = ({rb.factors.map(f => `${f.score}×${customWeights[f.key] ?? Math.round(f.weight * 100)}%`).join(' + ')}) / {totalWeight}%
          </div>
        </div>

        {/* Interactive Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rb.factors.map((f) => {
            const currentW = customWeights[f.key] ?? Math.round(f.weight * 100);
            const contribution = ((f.score * currentW) / (totalWeight || 1)).toFixed(1);
            return (
              <div key={f.key} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800">{f.label}</span>
                  <span className="text-xs font-mono font-bold text-slate-900">Score: {f.score}</span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Weight: <strong className="text-slate-800 font-mono">{currentW}%</strong></span>
                  <span>Impact: <strong className="text-emerald-700 font-mono">+{contribution} pts</strong></span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="50"
                  value={currentW}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    setCustomWeights((prev) => ({ ...prev, [f.key]: val }));
                  }}
                  className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                />

                <span className="text-[10px] text-slate-400 block truncate">
                  Source: {f.dataSource}
                </span>
              </div>
            );
          })}
        </div>

        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>{isHi ? 'कृषि-वैज्ञानिक औचित्य:' : 'Agronomic Calibration Rationale:'}</strong>{' '}
            {isHi
              ? 'गेहूं की कल्ले फूटने की अवस्था में मौसम (25%) और रोग (20%) को सर्वाधिक भार दिया गया है क्योंकि भारी वर्षा और पीला रतुआ सीधे कल्ले बनने की संख्या घटा सकते हैं।'
              : 'During tillering stage, Weather (25%) and Disease (20%) carry maximum weights because unseasonal cloudbursts and stripe rust cause irreversible tiller mortality.'}
          </p>
        </div>
      </div>

      {/* ── AI Confidence Routing ─────────────────────────────────────────── */}
      <div id="guide-risk-confidence" className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-2xl border border-white/10 p-5 sm:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
        <h2 className="font-bold text-base text-slate-900 mb-5 flex items-center gap-2">
          <Brain className="w-5 h-5 text-violet-500" />
          AI Confidence Routing — How BKIN Uses Confidence
        </h2>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 text-xs overflow-x-auto">
          {/* Step 1 */}
          <div className="flex-1 min-w-[140px] bg-slate-50/80 border border-slate-200/80 rounded-xl p-3.5 text-center space-y-1.5">
            <div className="w-9 h-9 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center mx-auto">
              <Brain className="w-5 h-5" />
            </div>
            <p className="font-bold text-slate-800">AI Prediction</p>
            <p className="text-[10px] text-slate-500">Risk score + evidence compiled from multi-source telemetry</p>
          </div>

          <ArrowRight className="w-5 h-5 text-slate-400 mx-auto sm:mx-0 shrink-0 rotate-90 sm:rotate-0" />

          {/* Step 2 */}
          <div className="flex-1 min-w-[140px] bg-slate-50/80 border border-slate-200/80 rounded-xl p-3.5 text-center space-y-1.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <Activity className="w-5 h-5" />
            </div>
            <p className="font-bold text-slate-800">Confidence Check</p>
            <p className="text-[10px] text-slate-500">Data freshness, source count, and model certainty assessed</p>
          </div>

          <ArrowRight className="w-5 h-5 text-slate-400 mx-auto sm:mx-0 shrink-0 rotate-90 sm:rotate-0" />

          {/* Routing outcome */}
          <div className="flex-1 min-w-[180px] space-y-2">
            {/* HIGH */}
            <div className="flex items-center gap-2 bg-emerald-50/80 border border-emerald-200 rounded-xl p-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-emerald-800 text-[11px]">HIGH (&gt;80%)</p>
                <p className="text-[10px] text-emerald-700">Advisory Provided Directly</p>
              </div>
            </div>
            {/* MEDIUM */}
            <div className="flex items-center gap-2 bg-amber-50/80 border border-amber-200 rounded-xl p-2.5">
              <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <p className="font-bold text-amber-800 text-[11px]">MEDIUM (50–80%)</p>
                <p className="text-[10px] text-amber-700">Verify + Advisory Provided</p>
              </div>
            </div>
            {/* LOW */}
            <div className="flex items-center gap-2 bg-rose-50/80 border border-rose-200 rounded-xl p-2.5">
              <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
              <div>
                <p className="font-bold text-rose-800 text-[11px]">LOW (&lt;50%)</p>
                <p className="text-[10px] text-rose-700">Expert Assistance Recommended</p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 mt-4">
          Current overall confidence for this farm: <strong>{rb.confidenceScore}%</strong> (
          {rb.confidence.toUpperCase()}) — Advisory provided directly.
        </p>
      </div>

      {/* ── Disease Risk Time Series ─────────────────────────────────────── */}
      <div id="guide-risk-chart" className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-2xl border border-white/10 p-5 sm:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-rose-500" />
            Disease Risk Probability Trend
          </h2>
          <div className="flex items-center gap-1.5">
            {(['7', '30', 'all'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                  period === p
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                }`}
              >
                {p === '7' ? '7 Days' : p === '30' ? '30 Days' : 'All'}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} />
            <YAxis
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              domain={[0, 50]}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              formatter={(value: any, name: any) => [`${value}%`, name === 'value' ? 'Disease Probability' : 'Benchmark']}
              contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e2e8f0' }}
            />
            <Legend
              formatter={(v) => (v === 'value' ? 'Disease Probability' : 'Season Benchmark')}
              wrapperStyle={{ fontSize: 11 }}
            />
            <ReferenceLine y={25} stroke="#fca5a5" strokeDasharray="4 3" label={{ value: 'Alert Zone', fontSize: 9, fill: '#f87171' }} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#ef4444"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#ef4444' }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="benchmark"
              stroke="#fca5a5"
              strokeWidth={1.5}
              strokeDasharray="4 3"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-3 space-y-1">
          {diseaseProbabilityTimeSeries.insights.map((ins, i) => (
            <div
              key={i}
              className={`text-[11px] p-2.5 rounded-lg border ${
                ins.trend === 'alert'
                  ? 'bg-rose-50 border-rose-100 text-rose-700'
                  : ins.trend === 'declining'
                  ? 'bg-amber-50 border-amber-100 text-amber-700'
                  : 'bg-slate-50 border-slate-100 text-slate-600'
              }`}
            >
              <strong>{ins.period}:</strong> {ins.message}
            </div>
          ))}
        </div>
      </div>

      {/* ── AI Advisories ─────────────────────────────────────────────────── */}
      <div>
        <h2 className="font-bold text-base text-slate-900 mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          AI-Generated Advisories ({initialAdvisories.length})
          <span className="text-xs font-normal text-slate-500">· Click to expand each advisory</span>
        </h2>
        <div className="space-y-3">
          {initialAdvisories.map((adv) => (
            <AdvisoryCard key={adv.id} advisory={adv} />
          ))}
        </div>
      </div>

      {/* ── Data Freshness ────────────────────────────────────────────────── */}
      <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-2xl border border-white/10 p-5 shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
        <h2 className="font-bold text-sm text-slate-800 mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-500" />
          Data Freshness — Last Updated
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-xl border border-white/10 p-3.5 flex items-start gap-3 shadow-sm">
            <Satellite className="w-5 h-5 text-violet-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-xs text-slate-800">Satellite (NDVI)</p>
              <p className="text-[11px] text-amber-600 font-semibold">16 Sept 2026 (7 days ago)</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Sentinel-2 · Next pass in 3–4 days</p>
            </div>
          </div>
          <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-xl border border-white/10 p-3.5 flex items-start gap-3 shadow-sm">
            <CloudRain className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-xs text-slate-800">Weather Data</p>
              <p className="text-[11px] text-emerald-600 font-semibold">Today, 06:00 AM IST</p>
              <p className="text-[10px] text-slate-400 mt-0.5">IMD Agro-met Station Ludhiana · Live</p>
            </div>
          </div>
          <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-xl border border-white/10 p-3.5 flex items-start gap-3 shadow-sm">
            <FlaskConical className="w-5 h-5 text-lime-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-xs text-slate-800">Soil Health Data</p>
              <p className="text-[11px] text-emerald-600 font-semibold">22 Sept 2026</p>
              <p className="text-[10px] text-slate-400 mt-0.5">State Soil Testing Lab · Valid for 6 months</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Disclaimer ───────────────────────────────────────────────────── */}
      <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-xl border border-amber-500/30 p-4 flex items-start gap-3 shadow-sm">
        <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-xs font-bold text-amber-900">Prototype Disclaimer</p>
          <p className="text-[11px] text-amber-800 leading-relaxed">{rb.disclaimer}</p>
        </div>
      </div>
      </div>
    </div>
  );
}
