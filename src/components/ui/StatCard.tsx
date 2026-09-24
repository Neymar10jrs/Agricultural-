import React from 'react';
import { LucideIcon } from 'lucide-react';
import { AlertBadge } from './AlertBadge';
import { RiskLevel } from '@/types';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  source?: string;          // Data provenance label
  lastUpdated?: string;     // When data was last fetched
  icon: LucideIcon;
  riskLevel?: RiskLevel;
  riskLabel?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({
  title,
  value,
  unit,
  subtitle,
  source,
  lastUpdated,
  icon: Icon,
  riskLevel,
  riskLabel,
  trend,
  className = '',
}: StatCardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 tracking-tight">{title}</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-slate-900">{value}</span>
            {unit && <span className="text-xs font-medium text-slate-500">{unit}</span>}
          </div>
        </div>
        <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
        {riskLevel ? (
          <AlertBadge level={riskLevel} customLabel={riskLabel} size="sm" />
        ) : subtitle ? (
          <span className="text-[11px] text-slate-500">{subtitle}</span>
        ) : null}

        {trend && (
          <span
            className={`text-[10px] font-semibold ${
              trend.isPositive ? 'text-emerald-700' : 'text-amber-700'
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>

      {(source || lastUpdated) && (
        <div className="mt-2 flex items-center gap-1.5 flex-wrap">
          {source && (
            <span className="text-[9px] text-slate-400 font-medium bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
              📡 {source}
            </span>
          )}
          {lastUpdated && (
            <span className="text-[9px] text-slate-400">
              {lastUpdated}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
