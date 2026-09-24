'use client';

import { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { TrendingUp, TrendingDown, Minus, Bell, BarChart2 } from 'lucide-react';
import type { TimeSeriesDataset, TimeSeriesInsight } from '@/types';

type Period = '7d' | '30d' | 'all';

interface TimeSeriesChartProps {
  dataset: TimeSeriesDataset;
  height?: number;
  showBenchmark?: boolean;
  className?: string;
}

const trendConfig: Record<
  TimeSeriesInsight['trend'],
  { bg: string; border: string; text: string; Icon: React.ElementType }
> = {
  improving: { bg: 'bg-green-50',  border: 'border-green-300', text: 'text-green-700', Icon: TrendingUp   },
  declining:  { bg: 'bg-red-50',   border: 'border-red-300',   text: 'text-red-700',   Icon: TrendingDown  },
  stable:     { bg: 'bg-blue-50',  border: 'border-blue-300',  text: 'text-blue-700',  Icon: Minus         },
  alert:      { bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-700', Icon: Bell          },
};

const periodLabel: Record<Period, string> = {
  '7d':  'Last 7 Days',
  '30d': 'Last 30 Days',
  'all': 'All Data',
};

export default function TimeSeriesChart({
  dataset,
  height = 260,
  showBenchmark = true,
  className = '',
}: TimeSeriesChartProps) {
  const [period, setPeriod] = useState<Period>('all');
  const [isLoading]         = useState(false);

  const filteredPoints = useMemo(() => {
    const pts = dataset.dataPoints;
    if (period === 'all') return pts;
    const count = period === '7d' ? 7 : 30;
    return pts.slice(-count);
  }, [dataset.dataPoints, period]);

  const isEmpty = filteredPoints.length === 0;

  return (
    <div className={`bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <BarChart2 size={15} className="text-gray-400" />
          <span className="text-sm font-semibold text-gray-800">{dataset.label}</span>
          {dataset.unit && (
            <span className="text-xs text-gray-400">({dataset.unit})</span>
          )}
        </div>

        {/* Period toggle */}
        <div className="flex rounded-lg border border-gray-200 overflow-hidden text-xs font-medium">
          {(['7d', '30d', 'all'] as Period[]).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 transition-colors ${
                period === p
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {p === '7d' ? '7D' : p === '30d' ? '30D' : 'All'}
            </button>
          ))}
        </div>
      </div>

      {/* Chart area */}
      <div className="px-4 pt-4">
        {isLoading ? (
          <div
            className="flex items-center justify-center bg-gray-50 rounded-xl"
            style={{ height }}
          >
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <div className="w-7 h-7 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs">Loading chart data…</span>
            </div>
          </div>
        ) : isEmpty ? (
          <div
            className="flex items-center justify-center bg-gray-50 rounded-xl"
            style={{ height }}
          >
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <BarChart2 size={28} className="opacity-30" />
              <span className="text-xs">No data for {periodLabel[period]}</span>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={filteredPoints} margin={{ top: 6, right: 8, bottom: 0, left: -8 }}>
              <defs>
                <linearGradient id={`grad-${dataset.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={dataset.color} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={dataset.color} stopOpacity={0.02} />
                </linearGradient>
                {showBenchmark && dataset.benchmarkColor && (
                  <linearGradient id={`grad-bench-${dataset.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={dataset.benchmarkColor} stopOpacity={0.12} />
                    <stop offset="95%" stopColor={dataset.benchmarkColor} stopOpacity={0.01} />
                  </linearGradient>
                )}
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />

              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
                width={36}
              />

              <Tooltip
                contentStyle={{
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: 10,
                  fontSize: 12,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
                labelStyle={{ fontWeight: 600, color: '#374151' }}
                itemStyle={{ color: '#6b7280' }}
                formatter={(value: any) => [`${value} ${dataset.unit}`, dataset.label]}
              />

              {showBenchmark && (
                <Legend
                  wrapperStyle={{ fontSize: 11, paddingTop: 4 }}
                  iconType="circle"
                  iconSize={8}
                />
              )}

              {/* Main area */}
              <Area
                type="monotone"
                dataKey="value"
                name={dataset.label}
                stroke={dataset.color}
                strokeWidth={2}
                fill={`url(#grad-${dataset.id})`}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />

              {/* Benchmark area */}
              {showBenchmark && filteredPoints.some(p => p.benchmark !== undefined) && (
                <Area
                  type="monotone"
                  dataKey="benchmark"
                  name="Benchmark"
                  stroke={dataset.benchmarkColor ?? '#94a3b8'}
                  strokeWidth={1.5}
                  strokeDasharray="5 3"
                  fill={`url(#grad-bench-${dataset.id})`}
                  dot={false}
                  activeDot={{ r: 3, strokeWidth: 0 }}
                />
              )}

              {/* Annotation labels */}
              {filteredPoints
                .filter(p => p.label)
                .map((p, i) => (
                  <ReferenceLine
                    key={i}
                    x={p.date}
                    stroke="#6b7280"
                    strokeDasharray="3 3"
                    label={{ value: p.label, position: 'top', fontSize: 9, fill: '#6b7280' }}
                  />
                ))}
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Insights */}
      {dataset.insights.length > 0 && (
        <div className="px-4 pb-4 pt-3 space-y-2">
          {dataset.insights.map((insight, i) => {
            const tc = trendConfig[insight.trend];
            return (
              <div
                key={i}
                className={`flex items-start gap-2.5 rounded-lg border px-3 py-2 text-xs ${tc.bg} ${tc.border}`}
              >
                <tc.Icon size={13} className={`mt-0.5 shrink-0 ${tc.text}`} />
                <div>
                  <span className={`font-semibold ${tc.text}`}>{insight.period}: </span>
                  <span className="text-gray-700">{insight.message}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
