'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, Info } from 'lucide-react';
import type { RiskBreakdown, RiskLevel } from '@/types';

interface RiskBreakdownCardProps {
  breakdown: RiskBreakdown;
  className?: string;
}

const levelColors: Record<RiskLevel, { bar: string; badge: string; badgeText: string; label: string }> = {
  low:      { bar: 'bg-green-500', badge: 'bg-green-100', badgeText: 'text-green-700', label: 'LOW'      },
  moderate: { bar: 'bg-amber-500', badge: 'bg-amber-100', badgeText: 'text-amber-700', label: 'MOD'      },
  high:     { bar: 'bg-red-500',   badge: 'bg-red-100',   badgeText: 'text-red-700',   label: 'HIGH'     },
};

export default function RiskBreakdownCard({ breakdown, className = '' }: RiskBreakdownCardProps) {
  const [expandedFactor, setExpandedFactor] = useState<string | null>(null);
  const [showDrivers, setShowDrivers]       = useState(false);

  function toggleFactor(key: string) {
    setExpandedFactor(prev => (prev === key ? null : key));
  }

  return (
    <div className={`bg-transparent rounded-2xl border border-slate-200/90 hover:border-emerald-500/40 transition-all overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-800 tracking-tight">Risk Factor Breakdown</h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Calculated at {new Date(breakdown.calculatedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
        </p>
      </div>

      {/* Factors list */}
      <div className="divide-y divide-gray-50">
        {breakdown.factors.map(factor => {
          const lc   = levelColors[factor.level];
          const open = expandedFactor === factor.key;

          return (
            <div key={factor.key} className="px-5 py-3">
              {/* Row */}
              <div
                className="flex items-center gap-3 cursor-pointer select-none"
                onClick={() => toggleFactor(factor.key)}
                role="button"
                aria-expanded={open}
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && toggleFactor(factor.key)}
              >
                {/* Label */}
                <span className="w-28 shrink-0 text-xs font-medium text-gray-700 truncate">{factor.label}</span>

                {/* Progress bar */}
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${lc.bar}`}
                    style={{ width: `${factor.score}%` }}
                  />
                </div>

                {/* Score */}
                <span className="w-8 text-right text-xs font-semibold text-gray-700 tabular-nums shrink-0">
                  {factor.score}
                </span>

                {/* Level badge */}
                <span className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-semibold ${lc.badge} ${lc.badgeText}`}>
                  {lc.label}
                </span>

                {/* Expand icon */}
                <span className="shrink-0 text-gray-400">
                  {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
              </div>

              {/* Expanded explanation */}
              {open && (
                <div className="mt-2 ml-[7.5rem] text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2 leading-relaxed border border-gray-100">
                  <p>{factor.explanation}</p>
                  <p className="mt-1 text-gray-400">
                    Source: {factor.dataSource} · Updated: {factor.lastUpdated}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Primary drivers expandable */}
      <div className="border-t border-gray-100">
        <button
          className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-gray-50 transition-colors"
          onClick={() => setShowDrivers(prev => !prev)}
          aria-expanded={showDrivers}
        >
          <span className="flex items-center gap-2 text-xs font-semibold text-amber-700">
            <AlertTriangle size={13} className="text-amber-500" />
            Why is my farm at risk?
          </span>
          {showDrivers ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
        </button>

        {showDrivers && (
          <div className="px-5 pb-4">
            <ul className="space-y-2">
              {breakdown.primaryDrivers.map((driver, i) => (
                <li key={i} className="flex gap-2 text-xs text-gray-700 leading-relaxed">
                  <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-[10px]">
                    {i + 1}
                  </span>
                  {driver}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-start gap-2">
        <Info size={12} className="text-gray-400 mt-0.5 shrink-0" />
        <p className="text-[10px] text-gray-400 leading-relaxed">{breakdown.disclaimer}</p>
      </div>
    </div>
  );
}
