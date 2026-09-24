'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, SendHorizontal, CheckCircle2 } from 'lucide-react';
import type { FeedbackItem } from '@/types';

interface FeedbackWidgetProps {
  advisoryId: string;
  advisoryTitle: string;
  onSubmit?: (feedback: FeedbackItem) => void;
}

type FeedbackRating = 'helpful' | 'not_helpful';

function generateId() {
  return `fb-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function FeedbackWidget({ advisoryId, advisoryTitle, onSubmit }: FeedbackWidgetProps) {
  const [rating, setRating]         = useState<FeedbackRating | null>(null);
  const [notes, setNotes]           = useState('');
  const [submitted, setSubmitted]   = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleRating(r: FeedbackRating) {
    if (submitted) return;
    setRating(r);
  }

  async function handleSubmit() {
    if (!rating || submitting) return;
    setSubmitting(true);

    const feedback: FeedbackItem = {
      id:            generateId(),
      advisoryId,
      advisoryTitle,
      rating,
      notes:         notes.trim() || undefined,
      submittedAt:   new Date().toISOString(),
    };

    // Simulate a brief async operation so UI feels responsive
    await new Promise(res => setTimeout(res, 350));
    onSubmit?.(feedback);
    setSubmitted(true);
    setSubmitting(false);
  }

  // ── Thank-you state ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
        <CheckCircle2 size={18} className="text-green-600 shrink-0" />
        <div>
          <p className="text-xs font-semibold text-green-700">Thank you for your feedback!</p>
          <p className="text-[10px] text-green-600 mt-0.5">
            Your response helps us improve BKIN recommendations.
          </p>
        </div>
      </div>
    );
  }

  // ── Main widget ────────────────────────────────────────────────────────────
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Prompt row */}
      <div className="flex items-center justify-between px-4 py-3 gap-4 flex-wrap">
        <p className="text-xs text-gray-600 font-medium">
          Did this recommendation help?
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleRating('helpful')}
            aria-pressed={rating === 'helpful'}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
              rating === 'helpful'
                ? 'bg-green-600 border-green-600 text-white shadow-sm'
                : 'bg-white border-gray-200 text-gray-700 hover:bg-green-50 hover:border-green-300 hover:text-green-700'
            }`}
          >
            <ThumbsUp size={13} />
            Yes
          </button>

          <button
            onClick={() => handleRating('not_helpful')}
            aria-pressed={rating === 'not_helpful'}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
              rating === 'not_helpful'
                ? 'bg-red-500 border-red-500 text-white shadow-sm'
                : 'bg-white border-gray-200 text-gray-700 hover:bg-red-50 hover:border-red-300 hover:text-red-700'
            }`}
          >
            <ThumbsDown size={13} />
            No
          </button>
        </div>
      </div>

      {/* Expanded: "What happened?" text area (only when rating = not_helpful) */}
      {rating === 'not_helpful' && (
        <div className="px-4 pb-3 border-t border-gray-100 pt-3">
          <label htmlFor={`fb-notes-${advisoryId}`} className="block text-xs font-semibold text-gray-600 mb-1.5">
            What happened? <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            id={`fb-notes-${advisoryId}`}
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
            placeholder="e.g. The recommendation didn't match my field conditions, or the timing was off…"
            maxLength={500}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-300 transition"
          />
          <p className="text-[10px] text-gray-400 mt-1 text-right">{notes.length}/500</p>
        </div>
      )}

      {/* Submit row — shows when any rating selected */}
      {rating && (
        <div className="px-4 pb-3 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting…
              </>
            ) : (
              <>
                <SendHorizontal size={13} />
                Submit Feedback
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
