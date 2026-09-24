import React from 'react';
import { ShieldCheck, AlertCircle, AlertTriangle } from 'lucide-react';
import { RiskLevel } from '@/types';

interface AlertBadgeProps {
  level: RiskLevel;
  customLabel?: string;
  size?: 'sm' | 'md';
}

export function AlertBadge({ level, customLabel, size = 'md' }: AlertBadgeProps) {
  const isSm = size === 'sm';

  switch (level) {
    case 'low':
      return (
        <span
          className={`inline-flex items-center gap-1 font-semibold rounded-full border bg-emerald-50 text-emerald-800 border-emerald-300/80 ${
            isSm ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
          <ShieldCheck className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
          <span>{customLabel || '🟢 Low Risk / Good'}</span>
        </span>
      );

    case 'moderate':
      return (
        <span
          className={`inline-flex items-center gap-1 font-semibold rounded-full border bg-amber-50 text-amber-800 border-amber-300/80 ${
            isSm ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
          <AlertTriangle className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
          <span>{customLabel || '🟡 Moderate / Caution'}</span>
        </span>
      );

    case 'high':
      return (
        <span
          className={`inline-flex items-center gap-1 font-semibold rounded-full border bg-rose-50 text-rose-800 border-rose-300/80 ${
            isSm ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" />
          <AlertCircle className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
          <span>{customLabel || '🔴 High Risk / Action Required'}</span>
        </span>
      );
  }
}
