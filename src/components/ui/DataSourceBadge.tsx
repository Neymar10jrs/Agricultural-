import { Satellite, Cloud, Layers, Leaf, FileText, Cpu, BookOpen } from 'lucide-react';
import type { DataSourceCategory, DataFreshness } from '@/types';

interface DataSourceBadgeProps {
  source: string;
  lastUpdated?: string;
  category?: DataSourceCategory;
  freshness?: DataFreshness;
}

const categoryIcon: Record<DataSourceCategory, React.ElementType> = {
  satellite:    Satellite,
  weather:      Cloud,
  soil:         Layers,
  crop_stage:   Leaf,
  field_report: FileText,
  ai_model:     Cpu,
  knowledge_base: BookOpen,
};

const freshnessConfig: Record<
  DataFreshness,
  { dotClass: string; pulse: boolean; label: string; textColor: string }
> = {
  live:   { dotClass: 'bg-green-500', pulse: true,  label: 'Live',   textColor: 'text-green-700' },
  recent: { dotClass: 'bg-green-400', pulse: false, label: 'Recent', textColor: 'text-green-600' },
  aging:  { dotClass: 'bg-amber-400', pulse: false, label: 'Aging',  textColor: 'text-amber-600' },
  stale:  { dotClass: 'bg-red-400',   pulse: false, label: 'Stale',  textColor: 'text-red-600'   },
};

export default function DataSourceBadge({
  source,
  lastUpdated,
  category,
  freshness,
}: DataSourceBadgeProps) {
  const Icon = category ? categoryIcon[category] : null;
  const fc   = freshness ? freshnessConfig[freshness] : null;

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 border border-gray-200 px-2.5 py-0.5 text-[11px] font-medium text-gray-700 select-none">
      {/* Category icon */}
      {Icon && <Icon size={11} className="text-gray-500 shrink-0" />}

      {/* Source name */}
      <span className="truncate max-w-[140px]">{source}</span>

      {/* Separator */}
      {(lastUpdated || fc) && <span className="text-gray-300">·</span>}

      {/* Freshness dot */}
      {fc && (
        <span className="relative flex items-center gap-1">
          <span className="relative flex h-2 w-2 shrink-0">
            {fc.pulse && (
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-70 ${fc.dotClass}`}
              />
            )}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${fc.dotClass}`} />
          </span>
          <span className={`${fc.textColor}`}>{fc.label}</span>
        </span>
      )}

      {/* Updated date */}
      {lastUpdated && (
        <span className="text-gray-400 truncate">{lastUpdated}</span>
      )}
    </span>
  );
}
