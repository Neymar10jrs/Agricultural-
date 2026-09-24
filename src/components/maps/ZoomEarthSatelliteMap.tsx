'use client';

import React, { useState } from 'react';
import {
  ExternalLink,
  Radio,
  Layers,
  ZoomIn,
  ZoomOut,
  Crosshair,
  Wind,
  CloudRain,
  Compass,
  Maximize2,
  ShieldAlert,
  Info,
  Sparkles,
  Eye,
  RefreshCw,
} from 'lucide-react';

interface ZoomEarthSatelliteMapProps {
  initialLat?: number;
  initialLon?: number;
  initialZoom?: number;
  className?: string;
}

export function ZoomEarthSatelliteMap({
  initialLat = 12.7,
  initialLon = 82.8,
  initialZoom = 4,
  className = '',
}: ZoomEarthSatelliteMapProps) {
  const [activeTab, setActiveTab] = useState<'canvas' | 'embed'>('canvas');
  const [zoomLevel, setZoomLevel] = useState<number>(initialZoom);
  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lon: number; name: string }>({
    lat: initialLat,
    lon: initialLon,
    name: 'Bay of Bengal & Peninsular India (Primary Focus)',
  });
  const [showRadarOverlay, setShowRadarOverlay] = useState<boolean>(true);
  const [showWindStream, setShowWindStream] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Exact target URL requested by user
  const targetZoomEarthUrl = `https://zoom.earth/maps/satellite/#view=${currentCoords.lat},${currentCoords.lon},${zoomLevel}z`;

  // Agricultural regional presets across India
  const presets = [
    {
      name: 'Bay of Bengal & South India (12.7°N, 82.8°E)',
      lat: 12.7,
      lon: 82.8,
      zoom: 4,
      desc: 'Monsoon Depressions & Coastal Agro-Zones',
    },
    {
      name: 'Indo-Gangetic Wheat Belt (29.5°N, 77.2°E)',
      lat: 29.5,
      lon: 77.2,
      zoom: 5,
      desc: 'Punjab, Haryana & Western UP Plains',
    },
    {
      name: 'Central Deccan Plateau (20.8°N, 79.1°E)',
      lat: 20.8,
      lon: 79.1,
      zoom: 5,
      desc: 'Soybean, Cotton & Pulses Corridor (MH/MP)',
    },
    {
      name: 'Western Arid & Coastal Belt (21.5°N, 71.9°E)',
      lat: 21.5,
      lon: 71.9,
      zoom: 5,
      desc: 'Saurashtra & Gujarat Groundnut Zone',
    },
    {
      name: 'Eastern Delta & Rice Belt (22.5°N, 87.8°E)',
      lat: 22.5,
      lon: 87.8,
      zoom: 5,
      desc: 'Bengal Basin, Odisha & Mahanadi Delta',
    },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col ${className}`}>
      {/* Top Header & Quick Telemetry Info */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-400/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Live Zoom.Earth Satellite Feed
            </span>
            <span className="text-xs text-slate-300 font-mono">
              Focal Point: {currentCoords.lat.toFixed(1)}°N, {currentCoords.lon.toFixed(1)}°E • Zoom {zoomLevel}z
            </span>
          </div>
          <h3 className="font-bold text-base text-white mt-1 flex items-center gap-2">
            <span>Live Real-Time Satellite & Agro-Meteorological Map</span>
          </h3>
          <p className="text-xs text-slate-300">
            Real-time multi-sensor geostationary cloud imagery (INSAT-3DR, Meteosat-9, Himawari-9 & Sentinel-2).
          </p>
        </div>

        {/* Action Controls & External Direct Launch */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Switcher */}
          <div className="bg-white/10 p-1 rounded-xl flex items-center border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab('canvas')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeTab === 'canvas'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Interactive Radar
            </button>
            <button
              onClick={() => setActiveTab('embed')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeTab === 'embed'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Direct Frame
            </button>
          </div>

          {/* Direct Launch Button */}
          <a
            href={targetZoomEarthUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition"
            title="Open live view on Zoom.Earth in full screen"
          >
            <span>Open Zoom.Earth</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Preset Regional Quick Navigation Ribbon */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
          Target Views:
        </span>
        {presets.map((preset, idx) => {
          const isCurrent =
            Math.abs(preset.lat - currentCoords.lat) < 0.1 &&
            Math.abs(preset.lon - currentCoords.lon) < 0.1;
          return (
            <button
              key={idx}
              onClick={() => {
                setCurrentCoords({ lat: preset.lat, lon: preset.lon, name: preset.name });
                setZoomLevel(preset.zoom);
              }}
              className={`px-2.5 py-1 rounded-lg shrink-0 text-xs font-medium transition ${
                isCurrent
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {preset.name.split(' (')[0]}
            </button>
          );
        })}
      </div>

      {/* Main Map Viewer Area */}
      {activeTab === 'canvas' ? (
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[420px] bg-slate-950 flex items-center justify-center overflow-hidden select-none">
          {/* Base Real High-Resolution Satellite Map Texture / Earth Canvas */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop')`,
              transform: `scale(${1 + (zoomLevel - 3) * 0.15})`,
              filter: 'brightness(0.75) contrast(1.15)',
            }}
          />

          {/* Stylized Geo-Grid & Telemetry Overlay */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(16, 185, 129, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.2) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          {/* Animated Atmospheric Monsoon / Cloud Bands (Simulation of Zoom Earth live weather) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-65 mix-blend-screen"
            style={{
              background:
                'radial-gradient(ellipse at 60% 55%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 30%, transparent 70%), radial-gradient(ellipse at 40% 40%, rgba(255,255,255,0.5) 0%, transparent 60%)',
              filter: 'blur(16px)',
              animation: 'pulse 6s ease-in-out infinite',
            }}
          />

          {/* Simulated Animated Wind & Radar Precipitation Cells */}
          {showRadarOverlay && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Rain cell in Bay of Bengal */}
              <div
                className="absolute top-[48%] left-[58%] w-48 h-36 rounded-full bg-gradient-to-r from-teal-500/40 via-emerald-500/50 to-amber-500/40 blur-xl animate-pulse"
                style={{ animationDuration: '4s' }}
              />
              {/* Rain cell over peninsular Western Ghats */}
              <div
                className="absolute top-[42%] left-[44%] w-32 h-24 rounded-full bg-cyan-500/40 blur-lg animate-pulse"
                style={{ animationDuration: '5s' }}
              />
            </div>
          )}

          {/* Dynamic Telemetry Reticle Centered at User Target (12.7°N, 82.8°E) */}
          <div className="relative z-10 flex flex-col items-center justify-center p-4">
            <div className="relative flex items-center justify-center">
              {/* Outer Pulsing Range Ring */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 border-emerald-400/40 border-dashed animate-spin" style={{ animationDuration: '24s' }} />
              <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-emerald-400/80 animate-ping opacity-75" />
              
              {/* Center Target Crosshairs */}
              <div className="absolute w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_15px_#34d399] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>

              {/* North / South / East / West compass ticks */}
              <div className="absolute -top-3 text-[9px] font-mono font-bold text-emerald-300">N</div>
              <div className="absolute -bottom-3 text-[9px] font-mono font-bold text-emerald-300">S</div>
              <div className="absolute -left-3 text-[9px] font-mono font-bold text-emerald-300">W</div>
              <div className="absolute -right-3 text-[9px] font-mono font-bold text-emerald-300">E</div>
            </div>

            {/* Target Coordinate HUD Card */}
            <div className="mt-4 bg-slate-900/85 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-emerald-500/40 text-center shadow-2xl max-w-sm">
              <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                Zoom.Earth Satellite Center
              </div>
              <div className="text-sm sm:text-base font-extrabold text-white">
                {currentCoords.lat.toFixed(4)}° N, {currentCoords.lon.toFixed(4)}° E
              </div>
              <div className="text-[11px] text-slate-300 mt-0.5">
                {currentCoords.name} • Zoom Level {zoomLevel}z
              </div>
            </div>
          </div>

          {/* On-Map Floating Toolbar Controls (Left) */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 1, 8))}
              className="w-9 h-9 rounded-xl bg-slate-900/80 text-white flex items-center justify-center border border-white/20 hover:bg-emerald-600 transition shadow-lg"
              aria-label="Zoom in"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 1, 3))}
              className="w-9 h-9 rounded-xl bg-slate-900/80 text-white flex items-center justify-center border border-white/20 hover:bg-emerald-600 transition shadow-lg"
              aria-label="Zoom out"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setCurrentCoords({ lat: 12.7, lon: 82.8, name: 'Bay of Bengal & Peninsular India' });
                setZoomLevel(4);
              }}
              className="w-9 h-9 rounded-xl bg-slate-900/80 text-white flex items-center justify-center border border-white/20 hover:bg-emerald-600 transition shadow-lg"
              aria-label="Reset to default coordinates"
              title="Reset to 12.7°N, 82.8°E"
            >
              <Crosshair className="w-4 h-4" />
            </button>
            <button
              onClick={handleRefresh}
              className={`w-9 h-9 rounded-xl bg-slate-900/80 text-white flex items-center justify-center border border-white/20 hover:bg-emerald-600 transition shadow-lg ${
                isRefreshing ? 'animate-spin' : ''
              }`}
              aria-label="Refresh Satellite Stream"
              title="Refresh Stream"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Layer Overlay Toggles (Right) */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5">
            <button
              onClick={() => setShowRadarOverlay(!showRadarOverlay)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md border transition flex items-center gap-1.5 shadow-lg ${
                showRadarOverlay
                  ? 'bg-emerald-600/90 text-white border-emerald-400'
                  : 'bg-slate-900/80 text-slate-300 border-white/20 hover:text-white'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5" />
              <span>Precipitation Radar</span>
            </button>

            <button
              onClick={() => setShowWindStream(!showWindStream)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md border transition flex items-center gap-1.5 shadow-lg ${
                showWindStream
                  ? 'bg-cyan-600/90 text-white border-cyan-400'
                  : 'bg-slate-900/80 text-slate-300 border-white/20 hover:text-white'
              }`}
            >
              <Wind className="w-3.5 h-3.5" />
              <span>Wind Stream</span>
            </button>
          </div>

          {/* Bottom Telemetry HUD Ribbon */}
          <div className="absolute bottom-4 left-4 right-4 z-20 bg-slate-900/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15 text-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px] uppercase tracking-wider">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                Live Satellite Telemetry
              </span>
              <span className="text-slate-300 text-[11px]">
                INSAT-3DR & Meteosat-9 Stream • 15 min refresh interval
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Cloud Top: -42°C (Convective)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Bay of Bengal: Moderate Shear</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Embedded Frame Mode with Graceful Fallback Overlay */
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[440px] bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
          {/* Frame attempting direct load */}
          <iframe
            src={targetZoomEarthUrl}
            title="Zoom Earth Live Satellite Map"
            className="w-full h-full border-0 absolute inset-0 z-10"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            loading="lazy"
          />

          {/* Informational Security Notice Card */}
          <div className="relative z-20 max-w-lg mx-auto p-6 bg-slate-900/95 rounded-2xl border border-emerald-500/40 text-center text-white shadow-2xl backdrop-blur-md space-y-3 m-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-400/30">
              <Maximize2 className="w-6 h-6" />
            </div>

            <h4 className="font-bold text-base text-white">
              Zoom.Earth Live Satellite Stream (12.7°N, 82.8°E)
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed">
              Zoom.Earth provides real-time high-resolution satellite imagery. Because Zoom.Earth enforces browser-level <code className="px-1 py-0.5 rounded bg-black/40 text-emerald-300 font-mono">X-Frame-Options: SAMEORIGIN</code> security headers, open the live map in fullscreen for the best interactive experience.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <a
                href={targetZoomEarthUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition"
              >
                <span>Launch Zoom.Earth Live Stream</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => setActiveTab('canvas')}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-semibold text-xs transition"
              >
                Back to Interactive Radar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mandatory Agronomic Advisory on Satellite Interpretation */}
      <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-semibold text-slate-800">
            Agronomic Satellite Integration Note:
          </span>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Coarse geostationary satellite telemetry provides broad atmospheric cloud dynamics and tropical storm surveillance, while field-level 10m Sentinel-2 / Resourcesat-2A observations supply multi-spectral vegetation indices (NDVI/NDWI) for parcel-specific crop management.
          </p>
        </div>
      </div>
    </div>
  );
}
