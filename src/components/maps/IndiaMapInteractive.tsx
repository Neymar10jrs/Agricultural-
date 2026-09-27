'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import * as Tabs from '@radix-ui/react-tabs';
import { motion, AnimatePresence } from 'framer-motion';
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
import { IndiaRealMap } from '@/components/maps/IndiaRealMap';

interface IndiaMapInteractiveProps {
  onSelectState?: (state: StateNode) => void;
  selectedCode?: string;
}

function ZoomEarthWithSkeleton() {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <AnimatePresence>
        {isInitializing && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-30 bg-slate-950/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-8 min-h-[460px]"
          >
            <div className="relative flex items-center justify-center mb-5">
              <div
                className="w-20 h-20 rounded-full border-2 border-emerald-500/30 border-dashed animate-spin"
                style={{ animationDuration: '10s' }}
              />
              <div className="absolute w-14 h-14 rounded-full border border-emerald-400/60 animate-ping" />
              <div className="absolute w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              </div>
            </div>

            <div className="text-center space-y-2 max-w-sm">
              <div className="text-sm font-bold text-white tracking-wide flex items-center justify-center gap-2">
                <span>Connecting to Zoom.Earth Satellite Telemetry</span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Synchronizing geostationary orbit feed (INSAT-3DR, Meteosat-9 & Sentinel-2)
              </p>

              {/* Skeleton telemetry lines */}
              <div className="pt-4 flex flex-col items-center gap-2">
                <div className="h-3 w-48 bg-slate-800 rounded-full animate-pulse" />
                <div className="h-2.5 w-32 bg-slate-800/60 rounded-full animate-pulse" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ZoomEarthSatelliteMap initialLat={12.7} initialLon={82.8} initialZoom={4} />
    </div>
  );
}

function IndiaMapInteractiveContent({ onSelectState, selectedCode = 'PB' }: IndiaMapInteractiveProps) {
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('networkView') === 'live' ? 'live' : 'topology';
  const [mapMode, setMapMode] = useState<'topology' | 'live'>(initialMode);
  const [activeCode, setActiveCode] = useState<string>(selectedCode);
  const selectedState = indianStatesData.find((s) => s.stateCode === activeCode) || indianStatesData[0];

  useEffect(() => {
    const view = searchParams.get('networkView');
    if (view === 'live' || view === 'topology') {
      setMapMode(view);
    }
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    const nextMode = value === 'live' ? 'live' : 'topology';
    setMapMode(nextMode);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('networkView', nextMode);
      window.history.replaceState(null, '', url.toString());
    }
  };

  const handleStateClick = (state: StateNode) => {
    setActiveCode(state.stateCode);
    if (onSelectState) {
      onSelectState(state);
    }
  };

  return (
    <Tabs.Root
      value={mapMode}
      onValueChange={handleTabChange}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
    >
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
          {/* Radix UI Tabs.List with ARIA roles and keyboard navigation */}
          <Tabs.List
            aria-label="Federated Network and Satellite Views"
            className="bg-black/40 p-1 rounded-xl flex items-center border border-white/10 text-xs backdrop-blur-sm"
          >
            <Tabs.Trigger
              value="topology"
              className={`relative px-3.5 py-1.5 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                mapMode === 'topology'
                  ? 'bg-[#0F5132] text-white shadow-sm border border-emerald-500/40'
                  : 'text-slate-300 opacity-60 hover:opacity-100 hover:text-white'
              }`}
            >
              <span>🌐 Nodes Topology</span>
              {mapMode === 'topology' && (
                <motion.div
                  layoutId="indiaTabUnderline"
                  className="absolute -bottom-1 left-2 right-2 h-0.5 bg-emerald-400 rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </Tabs.Trigger>

            <Tabs.Trigger
              value="live"
              className={`relative px-3.5 py-1.5 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                mapMode === 'live'
                  ? 'bg-[#0F5132] text-white shadow-sm border border-emerald-500/40'
                  : 'text-slate-300 opacity-60 hover:opacity-100 hover:text-white'
              }`}
            >
              <span>🛰️ Zoom.Earth Live</span>
              {mapMode === 'live' && (
                <motion.div
                  layoutId="indiaTabUnderline"
                  className="absolute -bottom-1 left-2 right-2 h-0.5 bg-emerald-400 rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </Tabs.Trigger>
          </Tabs.List>

          <Link
            href="/india-network"
            className="text-xs font-semibold text-emerald-300 hover:text-white flex items-center gap-1 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition"
          >
            <span>Full Network</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Panel with 150-200ms Framer Motion Cross-fade */}
      <AnimatePresence mode="wait">
        {mapMode === 'live' ? (
          <motion.div
            key="live"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
          >
            <Tabs.Content value="live" forceMount className="outline-none">
              <div className="p-4 sm:p-6 bg-slate-950">
                <ZoomEarthWithSkeleton />
              </div>
            </Tabs.Content>
          </motion.div>
        ) : (
          <motion.div
            key="topology"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
          >
            <Tabs.Content value="topology" forceMount className="outline-none">
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

                  {/* Real India Map (actual state/UT boundaries) with mesh connections */}
                  <div className="relative w-full max-w-[440px] flex items-center justify-center">
                    <IndiaRealMap activeCode={activeCode} onSelectState={handleStateClick} />
                  </div>

                  <div className="mt-3 text-[11px] text-slate-400 text-center flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Click any active state to inspect regional agro-climatic data & live models</span>
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
            </Tabs.Content>
          </motion.div>
        )}
      </AnimatePresence>
    </Tabs.Root>
  );
}

export function IndiaMapInteractive(props: IndiaMapInteractiveProps) {
  return (
    <Suspense
      fallback={
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex items-center justify-center min-h-[420px]">
          <div className="flex flex-col items-center gap-3 text-slate-400">
            <Radio className="w-8 h-8 text-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold">Loading Federated Network & Satellite Hub...</span>
          </div>
        </div>
      }
    >
      <IndiaMapInteractiveContent {...props} />
    </Suspense>
  );
}
