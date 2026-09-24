'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Send,
  Eye,
  Calendar,
  Layers,
  FileCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { AdvisoryItem, ConfidenceLevel } from '@/types';

interface ExplainableAICardProps {
  advisory: AdvisoryItem;
  onFieldVerify?: () => void;
}

export function ExplainableAICard({ advisory, onFieldVerify }: ExplainableAICardProps) {
  const [expanded, setExpanded] = useState(true);
  const [expertRequested, setExpertRequested] = useState(false);
  const [farmerVerified, setFarmerVerified] = useState(false);

  const getConfidenceBadge = (confidence: ConfidenceLevel, score: number) => {
    switch (confidence) {
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            High Confidence ({score}%)
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold border border-amber-300">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Medium Confidence ({score}%) • Verify in Field
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold border border-rose-300">
            <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
            Low Confidence ({score}%) • Expert Review Advised
          </span>
        );
    }
  };

  return (
    <div className="telemetry-card overflow-hidden bg-white">
      {/* Card Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                advisory.urgency === 'Immediate'
                  ? 'bg-rose-100 text-rose-800 border border-rose-200'
                  : advisory.urgency === 'Within 48h'
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : 'bg-blue-100 text-blue-800 border border-blue-200'
              }`}
            >
              {advisory.urgency}
            </span>
            <span className="text-xs text-slate-500 font-medium">{advisory.category}</span>
          </div>

          <div className="flex items-center gap-2">
            {getConfidenceBadge(advisory.confidence, advisory.confidenceScore)}
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-slate-400 hover:text-slate-700 p-1"
              aria-label="Toggle details"
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <h3 className="text-base font-bold text-slate-900 mt-2.5 leading-snug">
          {advisory.title}
        </h3>
      </div>

      {/* Core Action Highlight */}
      <div className="bg-emerald-50/70 p-4 sm:px-5 border-b border-emerald-100/60">
        <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 mb-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          Recommended Action
        </div>
        <p className="text-sm font-semibold text-emerald-950 leading-relaxed">
          {advisory.recommendation}
        </p>
      </div>

      {/* Explainable AI Details Breakdown */}
      {expanded && (
        <div className="p-4 sm:p-5 space-y-3.5 bg-white text-xs">
          {/* Why? */}
          <div>
            <span className="font-bold text-slate-700 block mb-1">
              Why is the system recommending this?
            </span>
            <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
              {advisory.why}
            </p>
          </div>

          {/* Evidence */}
          <div>
            <span className="font-bold text-slate-700 block mb-1">
              Ground-Truth Evidence & Telemetry:
            </span>
            <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
              {advisory.evidence}
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-100 text-[11px]">
            <div className="flex items-center gap-2 text-slate-500">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>
                <strong className="text-slate-700">Crop Stage:</strong> {advisory.relevantCropStage}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <Layers className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="flex items-center gap-1 flex-wrap">
                <strong className="text-slate-700">Data Used:</strong>
                {advisory.dataSources.map((ds) => (
                  <span
                    key={ds}
                    className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium border border-slate-200 text-[10px]"
                  >
                    {ds}
                  </span>
                ))}
              </span>
            </div>
          </div>

          {/* Action / Verification Footer */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFarmerVerified(!farmerVerified)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition flex items-center gap-1.5 ${
                  farmerVerified
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{farmerVerified ? 'Verified on Field' : 'Mark as Field Verified'}</span>
              </button>

              {advisory.confidence !== 'high' && (
                <button
                  onClick={() => setExpertRequested(true)}
                  disabled={expertRequested}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 transition flex items-center gap-1.5 disabled:opacity-60"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>{expertRequested ? 'Request Sent to KVK Expert' : 'Request KVK Expert Review'}</span>
                </button>
              )}
            </div>

            <span className="text-[10px] text-slate-400">{advisory.createdAt}</span>
          </div>
        </div>
      )}
    </div>
  );
}
