'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  CheckCircle,
  Radio,
  ExternalLink,
  Layers,
  Database,
  Shield,
  Activity,
  ArrowUpRight,
} from 'lucide-react';
import { indianStatesData } from '@/data/states';
import { StateNode } from '@/types';
import { ZoomEarthSatelliteMap } from '@/components/maps/ZoomEarthSatelliteMap';

interface IndiaMapInteractiveProps {
  onSelectState?: (state: StateNode) => void;
  selectedCode?: string;
}

export function IndiaMapInteractive({ onSelectState, selectedCode = 'PB' }: IndiaMapInteractiveProps) {
  const [mapMode, setMapMode] = useState<'topology' | 'zoom_earth'>('topology');
  const [activeCode, setActiveCode] = useState<string>(selectedCode);
  const selectedState = indianStatesData.find((s) => s.stateCode === activeCode) || indianStatesData[0];

  const handleStateClick = (state: StateNode) => {
    setActiveCode(state.stateCode);
    if (onSelectState) {
      onSelectState(state);
    }
  };

  // State pin coordinates relative to the stylized SVG India canvas
  const stateCoordinates: Record<string, { x: number; y: number }> = {
    PB: { x: 30, y: 22 }, // Punjab
    HR: { x: 34, y: 28 }, // Haryana
    UP: { x: 50, y: 36 }, // Uttar Pradesh
    BR: { x: 68, y: 40 }, // Bihar
    MH: { x: 38, y: 60 }, // Maharashtra
    KA: { x: 36, y: 76 }, // Karnataka
    MP: { x: 44, y: 48 }, // Madhya Pradesh
    GJ: { x: 22, y: 46 }, // Gujarat
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-slate-900 to-emerald-950 text-white">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <h3 className="font-bold text-base tracking-tight">
              India Federated Agriculture Network & Satellite Hub
            </h3>
            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              Live Topology & Satellite
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            Interoperable state nodes sharing standardized models alongside live Zoom.Earth geostationary telemetry.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Toggle */}
          <div className="bg-white/10 p-1 rounded-xl flex items-center border border-white/10 text-xs">
            <button
              onClick={() => setMapMode('topology')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                mapMode === 'topology'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🌐 Nodes Topology
            </button>
            <button
              onClick={() => setMapMode('zoom_earth')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                mapMode === 'zoom_earth'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-emerald-300 hover:text-white'
              }`}
            >
              🛰️ Zoom.Earth Live
            </button>
          </div>

          <Link
            href="/india-network"
            className="text-xs font-semibold text-emerald-300 hover:text-white flex items-center gap-1 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition"
          >
            <span>Full Network</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {mapMode === 'zoom_earth' ? (
        <div className="p-4 sm:p-6 bg-slate-950">
          <ZoomEarthSatelliteMap initialLat={12.7} initialLon={82.8} initialZoom={4} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Visual Map Canvas with Nodes */}
        <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col items-center justify-center bg-slate-950 relative min-h-[420px] overflow-hidden">
          {/* Subtle Grid Background */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Stylized SVG Map of India with Mesh Connections */}
          <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
            <svg
              viewBox="0 0 100 120"
              className="w-full h-full drop-shadow-2xl overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* India Boundary Outline Path (Stylized Geo Polygon) */}
              <path
                d="M32 10 L44 14 L50 20 L58 24 L68 28 L74 34 L88 32 L94 40 L84 48 L76 44 L66 48 L68 56 L62 68 L54 82 L42 108 L36 94 L30 80 L28 66 L20 54 L16 46 L24 36 L28 22 Z"
                fill="#064e3b"
                fillOpacity="0.4"
                stroke="#10b981"
                strokeWidth="1.2"
                strokeDasharray="2 1"
              />

              {/* Inter-node telemetry lines connecting to National Hub in Delhi (x:38, y:28) */}
              {indianStatesData.map((st) => {
                const coord = stateCoordinates[st.stateCode];
                if (!coord) return null;
                const isSelected = st.stateCode === activeCode;
                return (
                  <line
                    key={`line-${st.stateCode}`}
                    x1="38"
                    y1="28"
                    x2={coord.x}
                    y2={coord.y}
                    stroke={isSelected ? '#34d399' : '#047857'}
                    strokeWidth={isSelected ? '1.5' : '0.7'}
                    strokeDasharray={isSelected ? 'none' : '2 2'}
                    className={isSelected ? 'animate-pulse' : ''}
                  />
                );
              })}

              {/* National Hub (BKIN Central Interoperability Gateway) */}
              <circle cx="38" cy="28" r="3.2" fill="#10b981" />
              <circle cx="38" cy="28" r="6" fill="#10b981" fillOpacity="0.3" className="animate-ping" />
              <text x="44" y="29" fill="#a7f3d0" fontSize="3.2" fontWeight="bold">
                BKIN Gateway
              </text>

              {/* State Interactive Nodes */}
              {indianStatesData.map((st) => {
                const coord = stateCoordinates[st.stateCode];
                if (!coord) return null;
                const isSelected = st.stateCode === activeCode;

                return (
                  <g
                    key={st.stateCode}
                    className="cursor-pointer transition-transform hover:scale-110"
                    onClick={() => handleStateClick(st)}
                  >
                    <circle
                      cx={coord.x}
                      cy={coord.y}
                      r={isSelected ? '4' : '2.8'}
                      fill={isSelected ? '#34d399' : '#059669'}
                      stroke="#ffffff"
                      strokeWidth="0.8"
                    />
                    {isSelected && (
                      <circle
                        cx={coord.x}
                        cy={coord.y}
                        r="7"
                        fill="#34d399"
                        fillOpacity="0.25"
                        className="animate-ping"
                      />
                    )}
                    <text
                      x={coord.x + 3.5}
                      y={coord.y + 1.2}
                      fill={isSelected ? '#ffffff' : '#94a3b8'}
                      fontSize="3"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                    >
                      {st.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-3 text-[11px] text-slate-400 text-center flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Click any state node to inspect regional agro-climatic data & live models</span>
          </div>
        </div>

        {/* State Detail Panel */}
        <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between space-y-4 bg-white">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                  Selected State Node
                </span>
                <h4 className="text-xl font-bold text-slate-900 mt-0.5 flex items-center gap-2">
                  {selectedState.name}
                  <span className="text-xs text-slate-500 font-normal">({selectedState.hindiName})</span>
                </h4>
                <div className="text-xs text-slate-500">Capital: {selectedState.capital}</div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300/80 flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                {selectedState.nodesStatus}
              </span>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Farmers Connected</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">
                  {selectedState.connectedFarmersCount.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-emerald-700 font-medium">Verified Aadhar/Kisan ID</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Satellite Coverage</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">
                  {selectedState.satelliteCoveragePercent}%
                </div>
                <div className="text-[10px] text-slate-500">Sentinel-2 & Resourcesat</div>
              </div>
            </div>

            {/* Major Crops */}
            <div className="mt-4">
              <div className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                Major Crops & Commodities
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedState.majorCrops.map((c) => (
                  <span
                    key={c}
                    className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-900 text-xs font-medium border border-emerald-200/60"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Agro-climatic Zones */}
            <div className="mt-4">
              <div className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                Agro-Climatic Zones
              </div>
              <ul className="text-xs text-slate-600 space-y-1 pl-4 list-disc">
                {selectedState.agroClimaticZones.slice(0, 3).map((z) => (
                  <li key={z}>{z}</li>
                ))}
              </ul>
            </div>

            {/* Active Pest/Disease Alert */}
            <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs">
              <div className="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                <Activity className="w-3.5 h-3.5 text-amber-700" />
                Active Surveillance Flag:
              </div>
              <p className="text-amber-800">
                {selectedState.activeDiseaseRisks.join(' • ')}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="text-[11px] text-slate-400">
              Federated node: <code className="text-slate-600 font-semibold">{selectedState.stateCode}.bkin.gov.in</code>
            </div>
            <Link
              href={`/state-dashboard?state=${selectedState.stateCode}`}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
            >
              <span>Explore State Portal</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
