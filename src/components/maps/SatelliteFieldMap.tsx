'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Calendar,
  AlertTriangle,
  Info,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Crosshair,
  Sparkles,
  ShieldAlert,
  Play,
  Pause,
} from 'lucide-react';
import { demoSatelliteObservation } from '@/data/demoFarm';
import { ZoomEarthSatelliteMap } from '@/components/maps/ZoomEarthSatelliteMap';

type LayerKey = 'true_color' | 'ndvi' | 'ndwi' | 'crop_health' | 'moisture';
type ViewMode = 'field_indices' | 'zoom_earth';

export function SatelliteFieldMap() {
  const [viewMode, setViewMode] = useState<ViewMode>('field_indices');
  const [activeLayer, setActiveLayer] = useState<LayerKey>('ndvi');
  const [timelineIndex, setTimelineIndex] = useState<number>(6); // latest day
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showAnomalyDetail, setShowAnomalyDetail] = useState<boolean>(true);

  const timelineDates = [
    { label: 'Day 10', date: 'Nov 22', ndvi: 0.24, desc: 'Early Germination' },
    { label: 'Day 15', date: 'Nov 27', ndvi: 0.32, desc: 'Two Leaf Emergence' },
    { label: 'Day 20', date: 'Dec 02', ndvi: 0.44, desc: 'CRI Initiation' },
    { label: 'Day 25', date: 'Dec 07', ndvi: 0.54, desc: 'Early Tillering' },
    { label: 'Day 30', date: 'Dec 12', ndvi: 0.61, desc: 'Active Tillering' },
    { label: 'Day 35', date: 'Dec 17', ndvi: 0.67, desc: 'Canopy Expansion' },
    { label: 'Day 38 (Now)', date: 'Dec 20', ndvi: 0.68, desc: 'Current Observation' },
  ];

  const currentTimeline = timelineDates[timelineIndex];

  const layersInfo = {
    true_color: {
      name: 'True Color (RGB)',
      tagline: 'Visible Light Natural Surface Imagery',
      legend: 'Natural green vegetation, brown cultivated soil, canal water',
      bgClass: 'from-amber-900/20 via-emerald-800/60 to-emerald-900/40',
    },
    ndvi: {
      name: 'NDVI (Normalized Difference Vegetation Index)',
      tagline: 'Chlorophyll absorption & near-infrared canopy density',
      legend: '0.0 (Bare Soil) → 0.4 (Sparse) → 0.7+ (Vigorous Canopy)',
      bgClass: 'from-amber-500/30 via-lime-500/50 to-emerald-700/80',
    },
    ndwi: {
      name: 'NDWI (Normalized Difference Water Index)',
      tagline: 'Leaf water content & surface moisture availability',
      legend: '-0.3 (Dry) → 0.0 (Moderate) → +0.4 (High Hydration)',
      bgClass: 'from-amber-600/30 via-cyan-500/50 to-blue-700/80',
    },
    crop_health: {
      name: 'Biomass & Photosynthetic Health',
      tagline: 'Synthesized chlorophyll vigor & anomaly index',
      legend: 'Red (High Stress) → Yellow (Mild Stress) → Deep Green (Healthy)',
      bgClass: 'from-rose-500/30 via-yellow-500/40 to-emerald-600/75',
    },
    moisture: {
      name: 'Soil Moisture Indication',
      tagline: 'Derived top-soil moisture saturation layer',
      legend: 'Light Blue (20%) → Medium Blue (32%) → Dark Blue (45%)',
      bgClass: 'from-sky-300/30 via-blue-500/50 to-indigo-800/80',
    },
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      {/* Primary Mode Switcher Banner */}
      <div className="bg-slate-900 px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-slate-300 font-semibold">Active Satellite Observation Mode:</span>
        </div>

        {/* Functioning Segmented Pill Switch with Sliding Highlight */}
        <div
          role="tablist"
          aria-label="Active Satellite Observation Mode"
          className="relative inline-flex items-center bg-slate-950/80 p-1 rounded-full border border-slate-700/80 shadow-inner"
        >
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'field_indices'}
            onClick={() => setViewMode('field_indices')}
            className={`relative z-10 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              viewMode === 'field_indices' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {viewMode === 'field_indices' && (
              <motion.div
                layoutId="activeSatelliteObservationPill"
                className="absolute inset-0 bg-[#0F5132] rounded-full border border-emerald-500/50 shadow-sm"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              🌾 Field Telemetry
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'zoom_earth'}
            onClick={() => setViewMode('zoom_earth')}
            className={`relative z-10 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              viewMode === 'zoom_earth' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {viewMode === 'zoom_earth' && (
              <motion.div
                layoutId="activeSatelliteObservationPill"
                className="absolute inset-0 bg-[#0F5132] rounded-full border border-emerald-500/50 shadow-sm"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>Live Satellite</span>
            </span>
          </button>
        </div>
      </div>

      {/* 200ms Fade Transition between Views */}
      <AnimatePresence mode="wait">
        {viewMode === 'zoom_earth' ? (
          <motion.div
            key="zoom_earth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="p-4 sm:p-5"
          >
            <ZoomEarthSatelliteMap initialLat={12.7} initialLon={82.8} initialZoom={4} />
          </motion.div>
        ) : (
          <motion.div
            key="field_indices"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col"
          >
            {/* Top Controls & Layer Switcher */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider border border-emerald-200">
                    {demoSatelliteObservation.satelliteName} Multi-spectral
                  </span>
                  <span className="text-xs text-slate-500">
                    Cloud Cover: {demoSatelliteObservation.cloudCoverPercent}% • Resolution: 10m Ground Sample
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900 mt-1">
                  Interactive Satellite Multi-Spectral Field Viewer
                </h3>
              </div>

              {/* Layer Selector Chips */}
              <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
                {(['ndvi', 'ndwi', 'crop_health', 'moisture', 'true_color'] as LayerKey[]).map((layer) => (
                  <button
                    key={layer}
                    onClick={() => setActiveLayer(layer)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      activeLayer === layer
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {layer.toUpperCase().replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Map Viewer Canvas */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[380px] bg-slate-950 flex items-center justify-center overflow-hidden">
              {/* Simulated Satellite Tile Surface */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${layersInfo[activeLayer].bgClass} opacity-80 transition-all duration-700`}
              />

              {/* Telemetry Grid overlay */}
              <div
                className="absolute inset-0 opacity-25 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Simulated Farm Boundary Polygon */}
              <div className="relative z-10 w-[78%] h-[75%] border-2 border-emerald-400 bg-emerald-950/40 rounded-3xl shadow-2xl backdrop-blur-[1px] p-4 flex flex-col justify-between overflow-hidden">
                {/* Boundary coordinate pins */}
                <div className="flex justify-between items-start text-[10px] text-emerald-300/80 font-mono">
                  <span>30.9012° N, 75.8572° E</span>
                  <span>30.9025° N, 75.8598° E</span>
                </div>

                {/* Center Field Badge */}
                <div className="self-center text-center space-y-1 bg-black/60 px-4 py-2 rounded-xl border border-emerald-500/40 backdrop-blur-md">
                  <div className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
                    Field 3B • 2.4 Acres
                  </div>
                  <div className="text-xl font-extrabold text-white flex items-center justify-center gap-2">
                    <span>{activeLayer === 'ndvi' ? `NDVI: ${currentTimeline.ndvi}` : layersInfo[activeLayer].name}</span>
                  </div>
                  <div className="text-[11px] text-emerald-200">
                    {currentTimeline.desc} ({currentTimeline.date})
                  </div>
                </div>

                {/* North-Eastern Anomaly Stress Zone Highlight */}
                <div
                  onClick={() => setShowAnomalyDetail(true)}
                  className="absolute top-3 right-3 w-32 h-24 border-2 border-dashed border-amber-400 bg-amber-500/30 rounded-2xl flex flex-col items-center justify-center text-center p-2 cursor-pointer hover:bg-amber-500/50 transition-colors animate-pulse"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-300 mb-0.5" />
                  <span className="text-[9px] font-bold text-white uppercase">Stress Zone</span>
                  <span className="text-[8px] text-amber-200">0.35 Acres • Low NDVI</span>
                </div>

                <div className="flex justify-between items-end text-[10px] text-emerald-300/80 font-mono">
                  <span>30.8993° N, 75.8586° E</span>
                  <span>30.9008° N, 75.8615° E</span>
                </div>
              </div>

              {/* Map On-Screen Controls */}
              <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5">
                <button className="w-8 h-8 rounded-lg bg-black/60 text-white flex items-center justify-center border border-white/20 hover:bg-black/80 transition" aria-label="Zoom in">
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-lg bg-black/60 text-white flex items-center justify-center border border-white/20 hover:bg-black/80 transition" aria-label="Zoom out">
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-lg bg-black/60 text-white flex items-center justify-center border border-white/20 hover:bg-black/80 transition" aria-label="Center field">
                  <Crosshair className="w-4 h-4" />
                </button>
              </div>

              {/* Legend Scale Ribbon */}
              <div className="absolute bottom-4 left-4 right-4 z-20 bg-black/75 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15 text-white flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-emerald-300 text-[11px] uppercase tracking-wider">
                    {layersInfo[activeLayer].name}:
                  </span>
                  <span className="text-[11px] text-slate-300">{layersInfo[activeLayer].legend}</span>
                </div>
                <div className="w-48 h-2.5 rounded-full overflow-hidden border border-white/30 ndvi-gradient shrink-0" />
              </div>
            </div>

            {/* 90-Day Historical Timeline Scrubber */}
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-white space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-slate-800">Historical Crop Progression (Past 38 Days)</span>
                </div>
                <span className="text-slate-500 font-medium">
                  Timeline Step: <strong className="text-emerald-700">{currentTimeline.label}</strong> ({currentTimeline.date})
                </span>
              </div>

              {/* Timeline Slider with Steps */}
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="6"
                  value={timelineIndex}
                  onChange={(e) => setTimelineIndex(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  {timelineDates.map((td, idx) => (
                    <button
                      key={idx}
                      onClick={() => setTimelineIndex(idx)}
                      className={`hover:text-emerald-700 transition ${
                        idx === timelineIndex ? 'font-bold text-emerald-800' : ''
                      }`}
                    >
                      {td.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mandatory Satellite Limitation Agronomic Disclaimer (Section 14) */}
            <div className="p-4 bg-amber-50/70 border-t border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="font-bold block text-amber-950">
                  Important Agronomic Guidance on Satellite Observations:
                </strong>
                <p className="leading-relaxed text-[11px] text-amber-900/90">
                  Satellite data can indicate vegetation stress, which may have multiple possible causes including moisture variation, soil compaction, nutrition deficit, weather anomalies, pests, disease, or other field conditions. It does not replace physical on-ground scouting.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
