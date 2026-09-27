'use client';

import React, { useState } from 'react';
import { indianStatesData } from '@/data/states';
import { StateNode } from '@/types';
import { INDIA_STATE_SHAPES, INDIA_MAP_VIEWBOX } from '@/data/geo/indiaStateShapes.generated';

// Maps the GeoJSON source's state names to BKIN's internal state codes.
// Only states present here can be "Active" nodes; every other shape still
// renders with its real boundary but is shown as Not Yet Onboarded.
const GEO_NAME_TO_CODE: Record<string, string> = {
  'Andhra Pradesh': 'AP',
  Assam: 'AS',
  Bihar: 'BR',
  Chhattisgarh: 'CG',
  Gujarat: 'GJ',
  Haryana: 'HR',
  Jharkhand: 'JH',
  Karnataka: 'KA',
  Kerala: 'KL',
  'Madhya Pradesh': 'MP',
  Maharashtra: 'MH',
  Odisha: 'OD',
  Punjab: 'PB',
  Rajasthan: 'RJ',
  'Tamil Nadu': 'TN',
  Telangana: 'TG',
  'Uttar Pradesh': 'UP',
  'West Bengal': 'WB',
};

// Approximate hub position (Delhi/NCR), taken from its real projected centroid.
const HUB_POSITION: [number, number] = [223.4, 222.19];

interface IndiaRealMapProps {
  activeCode: string;
  onSelectState: (state: StateNode) => void;
}

export function IndiaRealMap({ activeCode, onSelectState }: IndiaRealMapProps) {
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full max-w-[440px]">
        <svg
          viewBox={INDIA_MAP_VIEWBOX}
          className="w-full h-auto drop-shadow-2xl overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Telemetry lines from the national hub to every active state's centroid */}
          {INDIA_STATE_SHAPES.map((shape) => {
            const code = GEO_NAME_TO_CODE[shape.name];
            if (!code) return null;
            const isSelected = code === activeCode;
            return (
              <line
                key={`line-${shape.name}`}
                x1={HUB_POSITION[0]}
                y1={HUB_POSITION[1]}
                x2={shape.centroid[0]}
                y2={shape.centroid[1]}
                stroke={isSelected ? '#34d399' : '#047857'}
                strokeWidth={isSelected ? 1.6 : 0.6}
                strokeDasharray={isSelected ? 'none' : '3 3'}
                className={isSelected ? 'animate-pulse' : ''}
                opacity={isSelected ? 0.9 : 0.45}
              />
            );
          })}

          {/* Real state/UT boundaries */}
          {INDIA_STATE_SHAPES.map((shape) => {
            const code = GEO_NAME_TO_CODE[shape.name];
            const stateRecord = code ? indianStatesData.find((s) => s.stateCode === code) : undefined;
            const isActive = Boolean(stateRecord);
            const isSelected = isActive && code === activeCode;
            const isHovered = hoveredName === shape.name;

            return (
              <path
                key={shape.name}
                d={shape.d}
                fill={
                  isSelected
                    ? '#34d399'
                    : isActive
                    ? isHovered
                      ? '#0d9668'
                      : '#065f46'
                    : isHovered
                    ? '#334155'
                    : '#1e293b'
                }
                stroke={isSelected ? '#a7f3d0' : isActive ? '#10b981' : '#475569'}
                strokeWidth={isSelected ? 1.4 : 0.6}
                className={isActive ? 'cursor-pointer transition-colors duration-150' : 'transition-colors duration-150'}
                onMouseEnter={() => setHoveredName(shape.name)}
                onMouseLeave={() => setHoveredName((n) => (n === shape.name ? null : n))}
                onClick={() => stateRecord && onSelectState(stateRecord)}
              >
                <title>
                  {shape.name}
                  {isActive ? ' — Active State Node (click to inspect)' : ' — Not Yet Onboarded'}
                </title>
              </path>
            );
          })}

          {/* National Hub (BKIN Central Interoperability Gateway) */}
          <circle cx={HUB_POSITION[0]} cy={HUB_POSITION[1]} r="6" fill="#10b981" />
          <circle cx={HUB_POSITION[0]} cy={HUB_POSITION[1]} r="12" fill="#10b981" fillOpacity="0.3" className="animate-ping" />
          <text x={HUB_POSITION[0] + 10} y={HUB_POSITION[1] + 4} fill="#a7f3d0" fontSize="13" fontWeight="bold">
            BKIN Gateway
          </text>

          {/* Selected/hovered active-state marker + label */}
          {INDIA_STATE_SHAPES.filter((s) => GEO_NAME_TO_CODE[s.name] === activeCode).map((shape) => (
            <g key={`marker-${shape.name}`} className="pointer-events-none">
              <circle cx={shape.centroid[0]} cy={shape.centroid[1]} r="9" fill="#34d399" fillOpacity="0.3" className="animate-ping" />
              <circle cx={shape.centroid[0]} cy={shape.centroid[1]} r="4.5" fill="#ffffff" stroke="#059669" strokeWidth="1.5" />
            </g>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-sm bg-emerald-800 border border-emerald-500" />
          Active State Node
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-sm bg-slate-800 border border-slate-500" />
          Not Yet Onboarded
        </span>
        {hoveredName && (
          <span className="text-emerald-300 font-semibold">{hoveredName}</span>
        )}
      </div>
    </div>
  );
}
