'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, ShieldCheck, ShieldAlert, AlertTriangle, XCircle, Info } from 'lucide-react';
import DataSourceBadge from './DataSourceBadge';
import type { DataQualityReport } from '@/types';

interface DataQualityPanelProps {
  report: DataQualityReport;
  className?: string;
}

const qualityConfig: Record<
  DataQualityReport['overallLabel'],
  { color: string; bg: string; border: string; Icon: React.ElementType }
> = {
  Excellent: { color: 'text-green-700',  bg: 'bg-green-50',  border: 'border-green-200', Icon: ShieldCheck  },
  Good:      { color: 'text-blue-700',   bg: 'bg-blue-50',   border: 'border-blue-200',  Icon: ShieldCheck  },
  Limited:   { color: 'text-amber-700',  bg: 'bg-amber-50',  border: 'border-amber-200', Icon: ShieldAlert  },
  Poor:      { color: 'text-red-700',    bg: 'bg-red-50',    border: 'border-red-200',   Icon: XCircle      },
};

const scoreColor = (score: number) => {
  if (score >= 80) return 'bg-green-500';
  if (score >= 55) return 'bg-blue-500';
  if (score >= 35) return 'bg-amber-500';
  return 'bg-red-500';
};

export default function DataQualityPanel({ report, className = '' }: DataQualityPanelProps) {
  const [open, setOpen] = useState(true);

  const qc = qualityConfig[report.overallLabel];

  return (
    <div className={`bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      {/* Collapsible header */}
      <button
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(prev => !prev)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <div className={`p-1.5 rounded-lg ${qc.bg} ${qc.border} border`}>
            <qc.Icon size={15} className={qc.color} />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-800">Data Quality</p>
            <p className={`text-xs font-medium ${qc.color}`}>{report.overallLabel}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Score ring */}
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${scoreColor(report.overallScore)}`}
                style={{ width: `${report.overallScore}%` }}
              />
            </div>
            <span className="text-xs font-bold text-gray-700 tabular-nums w-8 text-right">
              {report.overallScore}
            </span>
          </div>
          {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </div>
      </button>

      {open && (
        <div className="border-t border-gray-100">
          {/* Data sources */}
          <div className="px-5 py-4">
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Data Sources
            </p>
            <div className="space-y-2.5">
              {report.sources.map(src => (
                <div key={src.id} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <DataSourceBadge
                      source={src.label}
                      category={src.category}
                      freshness={src.freshness}
                      lastUpdated={src.lastUpdated}
                    />
                  </div>
                  {/* Quality score mini bar */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${scoreColor(src.qualityScore)}`}
                        style={{ width: `${src.qualityScore}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-gray-500 w-6 text-right tabular-nums">
                      {src.qualityScore}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Limitations */}
          {report.limitations.length > 0 && (
            <div className="px-5 pb-4">
              <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Limitations
              </p>
              <div className="space-y-1.5">
                {report.limitations.map((lim, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 border border-amber-100">
                    <AlertTriangle size={12} className="text-amber-500 mt-0.5 shrink-0" />
                    <span>{lim}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Impact notice */}
          {report.recommendationImpact && (
            <div className="mx-5 mb-4 flex items-start gap-2 text-[11px] text-gray-500 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
              <Info size={11} className="mt-0.5 shrink-0 text-gray-400" />
              <span>{report.recommendationImpact}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
