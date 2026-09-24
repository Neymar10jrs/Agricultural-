'use client';

import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import type { RiskLevel } from '@/types';

interface RiskGaugeProps {
  score: number;
  level: RiskLevel;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const levelConfig: Record<RiskLevel, { color: string; bg: string; text: string; badge: string }> = {
  low:      { color: '#22c55e', bg: 'bg-green-100',  text: 'text-green-700',  badge: 'LOW RISK'      },
  moderate: { color: '#f59e0b', bg: 'bg-amber-100',  text: 'text-amber-700',  badge: 'MODERATE RISK' },
  high:     { color: '#ef4444', bg: 'bg-red-100',    text: 'text-red-700',    badge: 'HIGH RISK'     },
};

const sizeConfig = {
  sm: { height: 120, outerRadius: 52, innerRadius: 36, scoreText: 'text-xl', badgeText: 'text-[10px]' },
  md: { height: 160, outerRadius: 70, innerRadius: 50, scoreText: 'text-3xl', badgeText: 'text-xs'    },
  lg: { height: 200, outerRadius: 88, innerRadius: 64, scoreText: 'text-5xl', badgeText: 'text-sm'    },
};

export default function RiskGauge({ score, level, label, size = 'md' }: RiskGaugeProps) {
  const cfg  = levelConfig[level];
  const dims = sizeConfig[size];

  // Clamp score 0-100
  const clampedScore = Math.min(100, Math.max(0, score));

  // We render two bars: the filled portion and the background track.
  // The gauge is a half-circle (startAngle=180, endAngle=0).
  const data = [
    { name: 'score', value: clampedScore, fill: cfg.color },
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      {label && (
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
      )}

      <div className="relative" style={{ width: dims.outerRadius * 2 + 16, height: dims.height / 2 + dims.outerRadius + 8 }}>
        {/* Background track */}
        <svg
          width={dims.outerRadius * 2 + 16}
          height={dims.outerRadius + 8}
          className="absolute top-0 left-0"
          style={{ overflow: 'visible' }}
        >
          <path
            d={describeArc(
              dims.outerRadius + 8,
              dims.outerRadius + 8,
              (dims.outerRadius + dims.innerRadius) / 2,
              180,
              0,
            )}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={dims.outerRadius - dims.innerRadius}
            strokeLinecap="round"
          />
          <path
            d={describeArc(
              dims.outerRadius + 8,
              dims.outerRadius + 8,
              (dims.outerRadius + dims.innerRadius) / 2,
              180,
              180 - clampedScore * 1.8,
            )}
            fill="none"
            stroke={cfg.color}
            strokeWidth={dims.outerRadius - dims.innerRadius}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 0.8s ease' }}
          />
        </svg>

        {/* Center text */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center"
          style={{ bottom: -4 }}
        >
          <span className={`font-extrabold leading-none tabular-nums ${dims.scoreText}`} style={{ color: cfg.color }}>
            {clampedScore}
          </span>
          <span className="text-[10px] text-gray-400 leading-none mt-0.5">/ 100</span>
        </div>
      </div>

      {/* Level Badge */}
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-semibold ${dims.badgeText} ${cfg.bg} ${cfg.text}`}>
        {cfg.badge}
      </span>
    </div>
  );
}

// ── SVG arc helper ────────────────────────────────────────────────────────────

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  // Normalize so we always draw the shorter arc
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end   = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}
