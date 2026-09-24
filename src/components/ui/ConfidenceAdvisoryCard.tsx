'use client';

import { useState } from 'react';
import {
  AlertTriangle, Lightbulb, Shield, Database, Clock,
  ChevronDown, ChevronUp, UserCheck, Info,
} from 'lucide-react';
import type { AdvisoryItem } from '@/types';

interface ConfidenceAdvisoryCardProps {
  advisory: AdvisoryItem;
  showFeedback?: boolean;
  onFeedback?: (id: string, rating: 'helpful' | 'not_helpful') => void;
}

const urgencyConfig = {
  Immediate:     { bg: 'bg-red-100',   text: 'text-red-700',   border: 'border-red-200'   },
  'Within 48h':  { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
  Routine:       { bg: 'bg-gray-100',  text: 'text-gray-600',  border: 'border-gray-200'  },
};

const categoryIcon: Record<AdvisoryItem['category'], string> = {
  Irrigation:        '💧',
  Nutrient:          '🌱',
  'Pest & Disease':  '🐛',
  'Weather Action':  '🌦️',
  'Field Operation': '🚜',
};

export default function ConfidenceAdvisoryCard({
  advisory,
  showFeedback = true,
  onFeedback,
}: ConfidenceAdvisoryCardProps) {
  const [expanded, setExpanded]     = useState(false);
  const [feedbackGiven, setFeedback] = useState<'helpful' | 'not_helpful' | null>(null);

  const uc  = urgencyConfig[advisory.urgency];
  const isHigh   = advisory.confidence === 'high';
  const isMedium = advisory.confidence === 'medium';
  const isLow    = advisory.confidence === 'low';

  function handleFeedback(rating: 'helpful' | 'not_helpful') {
    setFeedback(rating);
    onFeedback?.(advisory.id, rating);
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header band */}
      <div className={`flex items-center justify-between px-5 py-3 border-b ${uc.border} ${uc.bg}`}>
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-base" aria-hidden="true">{categoryIcon[advisory.category]}</span>
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{advisory.category}</span>
        </div>
        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${uc.bg} ${uc.border} ${uc.text}`}>
          {advisory.urgency}
        </span>
      </div>

      {/* Title */}
      <div className="px-5 pt-4 pb-3">
        <h3 className="text-sm font-bold text-gray-900 leading-snug">{advisory.title}</h3>
        <p className="text-[11px] text-gray-400 mt-0.5">
          {advisory.relevantCropStage} · {new Date(advisory.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
        </p>
      </div>

      {/* Body sections */}
      <div className="px-5 pb-3 space-y-3">
        {/* Evidence */}
        <Section icon={<Database size={13} className="text-blue-500" />} label="Evidence">
          <p className="text-xs text-gray-700 leading-relaxed">{advisory.evidence}</p>
        </Section>

        {/* Risk (why) */}
        <Section icon={<AlertTriangle size={13} className="text-amber-500" />} label="Risk">
          <p className="text-xs text-gray-700 leading-relaxed">{advisory.why}</p>
        </Section>

        {/* Recommendation — gated by confidence */}
        <Section icon={<Lightbulb size={13} className="text-green-500" />} label="Recommended Action">
          <p className="text-xs text-gray-800 font-medium leading-relaxed">{advisory.recommendation}</p>

          {/* Confidence routing */}
          {isMedium && (
            <div className="mt-2 flex items-start gap-2 text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              <UserCheck size={12} className="mt-0.5 shrink-0 text-amber-500" />
              <span>Consider expert verification before acting on this recommendation.</span>
            </div>
          )}
          {isLow && (
            <div className="mt-2 flex items-start gap-2 text-[11px] text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              <UserCheck size={12} className="mt-0.5 shrink-0 text-red-500" />
              <span>Expert verification is strongly recommended before taking action.</span>
            </div>
          )}
        </Section>

        {/* Confidence score */}
        <div className="flex items-center gap-2.5">
          <Shield
            size={13}
            className={isHigh ? 'text-green-500' : isMedium ? 'text-amber-500' : 'text-red-500'}
          />
          <span className="text-[11px] font-semibold text-gray-600">Confidence:</span>
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                isHigh ? 'bg-green-500' : isMedium ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${advisory.confidenceScore}%` }}
            />
          </div>
          <span className={`text-[11px] font-bold tabular-nums ${
            isHigh ? 'text-green-600' : isMedium ? 'text-amber-600' : 'text-red-600'
          }`}>
            {advisory.confidenceScore}% {advisory.confidence.toUpperCase()}
          </span>
        </div>

        {/* Data sources (expandable) */}
        <button
          className="w-full flex items-center justify-between text-[11px] text-gray-500 hover:text-gray-700 transition-colors"
          onClick={() => setExpanded(prev => !prev)}
          aria-expanded={expanded}
        >
          <span className="flex items-center gap-1">
            <Info size={11} />
            Data sources &amp; freshness
          </span>
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>

        {expanded && (
          <div className="rounded-lg bg-gray-50 border border-gray-100 px-3 py-2.5 space-y-1">
            {advisory.dataSources.map((ds, i) => (
              <div key={i} className="flex items-center gap-2 text-[11px] text-gray-600">
                <Clock size={10} className="text-gray-400 shrink-0" />
                <span>{ds}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Feedback row */}
      {showFeedback && (
        <div className="px-5 py-3 border-t border-gray-100 flex items-center gap-3">
          <span className="text-[11px] text-gray-500">Was this helpful?</span>
          {feedbackGiven ? (
            <span className="text-[11px] font-semibold text-green-600">
              ✓ Thanks for your feedback!
            </span>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => handleFeedback('helpful')}
                className="flex items-center gap-1 text-[11px] font-medium text-gray-600 px-2.5 py-1 rounded-lg border border-gray-200 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-colors"
              >
                👍 Yes
              </button>
              <button
                onClick={() => handleFeedback('not_helpful')}
                className="flex items-center gap-1 text-[11px] font-medium text-gray-600 px-2.5 py-1 rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-colors"
              >
                👎 No
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Sub-component ─────────────────────────────────────────────────────────────

function Section({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1">
        {icon}
        <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
      </div>
      {children}
    </div>
  );
}
