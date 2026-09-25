'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Satellite,
  Layers,
  Thermometer,
  Droplets,
  Eye,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Calendar,
  ExternalLink,
  MapPin,
  Sparkles,
  Info,
  Cpu,
  RefreshCw,
  ArrowRight,
  Filter,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from 'recharts';
import { useApp } from '@/context/AppContext';
import { ZoomEarthSatelliteMap } from '@/components/maps/ZoomEarthSatelliteMap';

// Regional Satellite Datasets (Simulated Demo Data)
interface RegionSatelliteProfile {
  id: string;
  name: string;
  state: string;
  crop: string;
  lastCapture: string;
  cloudCover: string;
  resolution: string;
  indices: {
    ndvi: { value: number; label: string; status: 'good' | 'moderate' | 'stress'; benchmark: number };
    ndwi: { value: number; label: string; status: 'good' | 'moderate' | 'stress'; benchmark: number };
    ndmi: { value: number; label: string; status: 'good' | 'moderate' | 'stress'; benchmark: number };
    lst: { value: number; label: string; status: 'optimal' | 'moderate' | 'heat_stress'; benchmark: number };
  };
  anomaly: {
    title: string;
    severity: 'low' | 'moderate' | 'high';
    dipValue: string;
    area: string;
    cause: string;
    action: string;
  };
  trendData: { date: string; value: number; benchmark: number }[];
}

const REGION_DATASETS: RegionSatelliteProfile[] = [
  {
    id: 'punjab-ludhiana',
    name: 'Punjab (Ludhiana Central Plain)',
    state: 'Punjab',
    crop: 'Wheat (HD-2967)',
    lastCapture: '16 Sept 2026, 10:42 AM IST',
    cloudCover: '2.1%',
    resolution: '10 Meters (Bands 4, 8, 11)',
    indices: {
      ndvi: { value: 0.68, label: 'Vegetation Health', status: 'good', benchmark: 0.70 },
      ndwi: { value: 0.42, label: 'Canopy Water Content', status: 'good', benchmark: 0.40 },
      ndmi: { value: 0.38, label: 'Moisture Index', status: 'moderate', benchmark: 0.42 },
      lst: { value: 24.2, label: 'Surface Temperature (°C)', status: 'optimal', benchmark: 25.0 },
    },
    anomaly: {
      title: 'North-Eastern Parcel Vegetative Dip',
      severity: 'moderate',
      dipValue: '0.51 NDVI vs 0.68 average (-25%)',
      area: '0.35 Acres',
      cause: 'Micro-elevation compaction and delayed root nodulation in furrow.',
      action: 'Inspect parcel during field walk before second split urea application.',
    },
    trendData: [
      { date: '18 Aug', value: 0.22, benchmark: 0.20 },
      { date: '25 Aug', value: 0.34, benchmark: 0.32 },
      { date: '01 Sep', value: 0.48, benchmark: 0.46 },
      { date: '08 Sep', value: 0.61, benchmark: 0.59 },
      { date: '16 Sep', value: 0.68, benchmark: 0.70 },
    ],
  },
  {
    id: 'haryana-karnal',
    name: 'Haryana (Karnal Basin)',
    state: 'Haryana',
    crop: 'Wheat / Mustard Mix',
    lastCapture: '17 Sept 2026, 10:48 AM IST',
    cloudCover: '1.4%',
    resolution: '10 Meters (Sentinel-2A)',
    indices: {
      ndvi: { value: 0.73, label: 'Vegetation Health', status: 'good', benchmark: 0.71 },
      ndwi: { value: 0.46, label: 'Canopy Water Content', status: 'good', benchmark: 0.42 },
      ndmi: { value: 0.43, label: 'Moisture Index', status: 'good', benchmark: 0.40 },
      lst: { value: 23.8, label: 'Surface Temperature (°C)', status: 'optimal', benchmark: 24.5 },
    },
    anomaly: {
      title: 'Uniform Vigorous Canopy Formation',
      severity: 'low',
      dipValue: 'Nominal variance (<3%)',
      area: 'Entire Holding (3.1 Acres)',
      cause: 'Optimal tillering conditions and timely basal fertilizer incorporation.',
      action: 'Maintain standard moisture regime; prepare for jointing stage scouting.',
    },
    trendData: [
      { date: '18 Aug', value: 0.25, benchmark: 0.22 },
      { date: '25 Aug', value: 0.38, benchmark: 0.35 },
      { date: '01 Sep', value: 0.52, benchmark: 0.50 },
      { date: '08 Sep', value: 0.65, benchmark: 0.62 },
      { date: '17 Sep', value: 0.73, benchmark: 0.71 },
    ],
  },
  {
    id: 'up-agra',
    name: 'Uttar Pradesh (Agra / Yamuna Plain)',
    state: 'Uttar Pradesh',
    crop: 'Potato (Kufri Pukhraj)',
    lastCapture: '15 Sept 2026, 11:05 AM IST',
    cloudCover: '4.8%',
    resolution: '10 Meters (Landsat-9 / Sentinel-2)',
    indices: {
      ndvi: { value: 0.57, label: 'Vegetation Health', status: 'moderate', benchmark: 0.65 },
      ndwi: { value: 0.33, label: 'Canopy Water Content', status: 'stress', benchmark: 0.42 },
      ndmi: { value: 0.29, label: 'Moisture Index', status: 'stress', benchmark: 0.38 },
      lst: { value: 27.6, label: 'Surface Temperature (°C)', status: 'moderate', benchmark: 25.0 },
    },
    anomaly: {
      title: 'South-Western Parcel Moisture Deficit',
      severity: 'high',
      dipValue: '0.44 NDVI & 0.28 NDWI',
      area: '0.80 Acres',
      cause: 'Sandy loam pocket with elevated percolation and surface moisture depletion.',
      action: 'Trigger supplementary furrow irrigation within 36 hours to safeguard tuber bulking.',
    },
    trendData: [
      { date: '18 Aug', value: 0.20, benchmark: 0.24 },
      { date: '25 Aug', value: 0.31, benchmark: 0.36 },
      { date: '01 Sep', value: 0.44, benchmark: 0.50 },
      { date: '08 Sep', value: 0.52, benchmark: 0.60 },
      { date: '15 Sep', value: 0.57, benchmark: 0.65 },
    ],
  },
  {
    id: 'maharashtra-akola',
    name: 'Maharashtra (Vidarbha Black Soil)',
    state: 'Maharashtra',
    crop: 'Cotton (Bt Hybrid)',
    lastCapture: '16 Sept 2026, 10:15 AM IST',
    cloudCover: '3.2%',
    resolution: '10 Meters (Sentinel-2B)',
    indices: {
      ndvi: { value: 0.52, label: 'Vegetation Health', status: 'moderate', benchmark: 0.62 },
      ndwi: { value: 0.30, label: 'Canopy Water Content', status: 'stress', benchmark: 0.38 },
      ndmi: { value: 0.26, label: 'Moisture Index', status: 'stress', benchmark: 0.35 },
      lst: { value: 31.8, label: 'Surface Temperature (°C)', status: 'heat_stress', benchmark: 28.0 },
    },
    anomaly: {
      title: 'Canopy Thermal Stress & Aphid Vectoring',
      severity: 'high',
      dipValue: 'LST +3.8°C above regional threshold',
      area: '1.20 Acres',
      cause: 'Extended dry spell interacting with high solar insolation in flowering phase.',
      action: 'Apply anti-transpirant spray and scout for sucking pests on lower leaf surfaces.',
    },
    trendData: [
      { date: '18 Aug', value: 0.30, benchmark: 0.32 },
      { date: '25 Aug', value: 0.41, benchmark: 0.44 },
      { date: '01 Sep', value: 0.49, benchmark: 0.54 },
      { date: '08 Sep', value: 0.51, benchmark: 0.59 },
      { date: '16 Sep', value: 0.52, benchmark: 0.62 },
    ],
  },
];

export function SatelliteIntelligenceHub() {
  const { dict, language } = useApp();
  const isHi = language === 'hi';

  const [selectedRegionId, setSelectedRegionId] = useState<string>('punjab-ludhiana');
  const [activeSpectralIndex, setActiveSpectralIndex] = useState<'ndvi' | 'ndwi' | 'ndmi' | 'lst'>('ndvi');
  const [viewMode, setViewMode] = useState<'telemetry' | 'zoom_earth'>('telemetry');

  const region = REGION_DATASETS.find((r) => r.id === selectedRegionId) || REGION_DATASETS[0];

  const indexExplorations = {
    ndvi: {
      title: 'NDVI — Normalized Difference Vegetation Index',
      formula: '(NIR - Red) / (NIR + Red)',
      bands: 'Sentinel-2 Band 8 (842nm) & Band 4 (665nm)',
      desc: isHi
        ? 'स्वस्थ हरी पत्तियों के क्लोरोफिल घनत्व और जैवभार को मापता है। मान जितना 1.0 के करीब होगा, वनस्पति उतनी ही घनी और स्वस्थ होगी।'
        : 'Measures live green vegetation vigor and chlorophyll absorption. Values above 0.60 indicate healthy, dense vegetative canopy.',
      colorScheme: 'from-emerald-600 to-green-300',
    },
    ndwi: {
      title: 'NDWI — Normalized Difference Water Index',
      formula: '(NIR - SWIR) / (NIR + SWIR)',
      bands: 'Sentinel-2 Band 8 (NIR) & Band 11 (1610nm SWIR)',
      desc: isHi
        ? 'पौधों की पत्तियों के भीतर पानी की मात्रा को मापता है। पत्तियों के पानी का तनाव आंखों से दिखने से पहले ही इसका पता चल जाता है।'
        : 'Monitors liquid water content inside the crop canopy. Detects early plant water stress days before visible wilting occurs.',
      colorScheme: 'from-blue-600 to-sky-300',
    },
    ndmi: {
      title: 'NDMI — Normalized Difference Moisture Index',
      formula: '(NIR - SWIR) / (NIR + SWIR)',
      bands: 'Narrow NIR (Band 8A) & SWIR1 (Band 11)',
      desc: isHi
        ? 'सूखा और खेत स्तर पर नमी की कमी का पता लगाने के लिए सबसे विश्वसनीय सूचकांक। सिंचाई की योजना बनाने में उपयोगी।'
        : 'Reliable indicator for agricultural drought and soil-canopy moisture decoupling, directly driving irrigation timing.',
      colorScheme: 'from-teal-600 to-cyan-300',
    },
    lst: {
      title: 'LST — Land-Surface Temperature',
      formula: 'Thermal Infrared Radiometric Calibration',
      bands: 'Landsat-9 TIRS Band 10 & Modis Downscaled 100m',
      desc: isHi
        ? 'खेत की सतह का वास्तविक तापमान। पौधों के तापमान में वृद्धि सूक्ष्म-सूखा और जड़ तनाव का संकेत देती है।'
        : 'Radiometric canopy skin temperature. Elevated LST indicates stomatal closure and thermal transpiration stress.',
      colorScheme: 'from-amber-600 to-rose-400',
    },
  };

  const activeIndexMeta = indexExplorations[activeSpectralIndex];

  return (
    <div className="space-y-8">
      {/* ── Demo Notice Banner ── */}
      <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-2xl p-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2.5 text-xs text-amber-900">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="font-bold uppercase tracking-wider">
            {isHi ? 'सिमुलेटेड उपग्रह डेटा (DEMO DATA):' : 'DEMO DATA — Simulated Earth Observation Feeds:'}
          </span>
          <span>
            {isHi
              ? 'यह हब सेंटिनल-2 व लैंडसैट-9 के 10-मीटर स्पेक्ट्रल बैंड्स का उपयोग करके क्षेत्रीय उपग्रह टेलीमेट्री को प्रदर्शित करता है।'
              : 'Demonstrates 10m multi-spectral Sentinel-2 and Landsat-9 indices across representative agro-climatic zones.'}
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded bg-amber-100 text-amber-900 border border-amber-300">
          ESA / ISRO Pipeline Simulator
        </span>
      </div>

      {/* ── Hub Main Header & Region Switcher ── */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6 border border-emerald-500/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-400/30 flex items-center gap-1.5">
                <Satellite className="w-3.5 h-3.5 text-emerald-400" />
                {isHi ? 'उपग्रह इंटेलिजेंस हब' : 'Satellite Intelligence Hub'}
              </span>
              <span className="text-xs text-slate-400">
                {region.lastCapture} • Cloud: {region.cloudCover}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              🛰️ {isHi ? 'अंतरिक्ष से खेत तक: मल्टी-स्पेक्ट्रल फसल निगरानी' : 'Orbital Earth Observation & Crop Intelligence'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {isHi
                ? 'सेंटिनल-2 और रिसोर्ससैट द्वारा 10-मीटर रिज़ॉल्यूशन पर एनडीवीआई, जल सूचकांक, नमी और भूमि तापमान का निरंतर संलयन।'
                : 'High-frequency remote sensing tracking vegetation vigor, canopy moisture dynamics, and thermal anomalies across regional agricultural holdings.'}
            </p>
          </div>

          {/* Map View Switcher */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setViewMode('telemetry')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
                viewMode === 'telemetry'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20'
              }`}
            >
              {isHi ? 'स्पेक्ट्रल टेलीमेट्री' : 'Spectral Telemetry'}
            </button>
            <button
              onClick={() => setViewMode('zoom_earth')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                viewMode === 'zoom_earth'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>Live Zoom.Earth</span>
            </button>
          </div>
        </div>

        {/* Region Selector Pills */}
        <div className="pt-2 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              {isHi ? 'क्षेत्र / राज्य चुनें (Acceptance Test: डेटा तुरंत अपडेट होगा):' : 'Select Target Region (Acceptance Test: updates all telemetry):'}
            </span>
            <span className="text-[10px] text-slate-400">4 Monitored Agro-Zones</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {REGION_DATASETS.map((r) => {
              const isSelected = selectedRegionId === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setSelectedRegionId(r.id)}
                  className={`p-3 rounded-2xl text-left border transition ${
                    isSelected
                      ? 'bg-emerald-800/90 text-white border-emerald-400 shadow-md ring-2 ring-emerald-500/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold text-emerald-300">{r.state}</span>
                    <span className="text-[10px] font-mono text-slate-400">{r.indices.ndvi.value} NDVI</span>
                  </div>
                  <span className="font-bold text-xs block truncate text-white">{r.name}</span>
                  <span className="text-[10px] text-slate-300 block truncate">{r.crop}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Conditional View: Zoom Earth or Telemetry Hub ── */}
      {viewMode === 'zoom_earth' ? (
        <ZoomEarthSatelliteMap />
      ) : (
        <>
          {/* ── Key Indices Grid for Selected Region ── */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {isHi ? `स्पेक्ट्रल सूचकांक: ${region.name}` : `Spectral Indices: ${region.name}`}
                </h3>
                <p className="text-xs text-slate-500">
                  {isHi ? 'क्लिक करके किसी भी सूचकांक का गहराई से विश्लेषण देखें' : 'Click any index to inspect its optical formula and historical trend'}
                </p>
              </div>
              <span className="text-xs text-emerald-800 font-bold bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                Crop: {region.crop}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {/* NDVI */}
              <button
                onClick={() => setActiveSpectralIndex('ndvi')}
                className={`p-4 rounded-2xl border text-left transition ${
                  activeSpectralIndex === 'ndvi'
                    ? 'bg-emerald-950 text-white border-emerald-500 shadow-md ring-2 ring-emerald-500/30'
                    : 'bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] hover:bg-[rgba(10,20,15,0.28)] text-slate-800 border-white/10 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">NDVI</span>
                  <Eye className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl font-black">{region.indices.ndvi.value}</div>
                <div className="text-[11px] font-medium text-emerald-600 mt-1">
                  {region.indices.ndvi.label}
                </div>
                <div className="text-[10px] opacity-70 mt-0.5">Benchmark: {region.indices.ndvi.benchmark}</div>
              </button>

              {/* NDWI */}
              <button
                onClick={() => setActiveSpectralIndex('ndwi')}
                className={`p-4 rounded-2xl border text-left transition ${
                  activeSpectralIndex === 'ndwi'
                    ? 'bg-slate-900 text-white border-blue-500 shadow-md ring-2 ring-blue-500/30'
                    : 'bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] hover:bg-[rgba(10,20,15,0.28)] text-slate-800 border-white/10 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500">NDWI</span>
                  <Droplets className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-2xl font-black">{region.indices.ndwi.value}</div>
                <div className="text-[11px] font-medium text-blue-600 mt-1">
                  {region.indices.ndwi.label}
                </div>
                <div className="text-[10px] opacity-70 mt-0.5">Benchmark: {region.indices.ndwi.benchmark}</div>
              </button>

              {/* NDMI */}
              <button
                onClick={() => setActiveSpectralIndex('ndmi')}
                className={`p-4 rounded-2xl border text-left transition ${
                  activeSpectralIndex === 'ndmi'
                    ? 'bg-slate-900 text-white border-teal-500 shadow-md ring-2 ring-teal-500/30'
                    : 'bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] hover:bg-[rgba(10,20,15,0.28)] text-slate-800 border-white/10 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-500">NDMI</span>
                  <Layers className="w-4 h-4 text-teal-500" />
                </div>
                <div className="text-2xl font-black">{region.indices.ndmi.value}</div>
                <div className="text-[11px] font-medium text-teal-600 mt-1">
                  {region.indices.ndmi.label}
                </div>
                <div className="text-[10px] opacity-70 mt-0.5">Benchmark: {region.indices.ndmi.benchmark}</div>
              </button>

              {/* LST */}
              <button
                onClick={() => setActiveSpectralIndex('lst')}
                className={`p-4 rounded-2xl border text-left transition ${
                  activeSpectralIndex === 'lst'
                    ? 'bg-slate-900 text-white border-amber-500 shadow-md ring-2 ring-amber-500/30'
                    : 'bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] hover:bg-[rgba(10,20,15,0.28)] text-slate-800 border-white/10 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">LST</span>
                  <Thermometer className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-black">{region.indices.lst.value}°C</div>
                <div className="text-[11px] font-medium text-amber-600 mt-1">
                  {region.indices.lst.label}
                </div>
                <div className="text-[10px] opacity-70 mt-0.5">Benchmark: {region.indices.lst.benchmark}°C</div>
              </button>
            </div>
          </div>

          {/* ── Active Index Technical Breakdown & Historical Trend ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 5 cols: Formula & Physical Principle */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-3xl border border-white/10 p-6 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                    Spectral Index Mechanics
                  </span>
                  <h4 className="text-lg font-bold text-slate-900">{activeIndexMeta.title}</h4>
                </div>

                <div className="p-3.5 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] block mb-1">Radiometric Band Math:</span>
                  <strong>{activeIndexMeta.formula}</strong>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="font-semibold text-slate-700 block">Sensor Bands:</span>
                  <span className="text-slate-500 text-[11px] block">{activeIndexMeta.bands}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {activeIndexMeta.desc}
                </p>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                  <span>Current Regional Value:</span>
                  <strong className="text-sm font-bold">
                    {activeSpectralIndex === 'lst'
                      ? `${region.indices.lst.value}°C`
                      : region.indices[activeSpectralIndex].value}
                  </strong>
                </div>
              </div>
            </div>

            {/* Right 7 cols: 30-Day Historical Trend Area Chart */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-3xl border border-white/10 p-6 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">
                      {isHi ? '30-दिवसीय ऐतिहासिक उपग्रह प्रवृत्ति' : '30-Day Satellite Growth Trajectory'}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {region.name} • Sentinel-2 Time-Series vs Regional Benchmark
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    +11.5% Vigor Shift
                  </span>
                </div>

                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={region.trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="satGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#64748b' }} />
                    <YAxis domain={[0, 1]} tick={{ fontSize: 10, fill: '#64748b' }} />
                    <Tooltip
                      contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 11 }}
                      formatter={(v: any) => [v, 'NDVI Value']}
                    />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      name="Observed Index"
                      stroke="#10b981"
                      strokeWidth={2.5}
                      fill="url(#satGrad)"
                    />
                    <Area
                      type="monotone"
                      dataKey="benchmark"
                      name="Seasonal Benchmark"
                      stroke="#94a3b8"
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
                      fill="none"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* ── Automated Parcel Anomaly & Stress Investigation Card ── */}
          <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-3xl border border-white/10 p-6 sm:p-7 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                  Automated Sub-Parcel Anomaly Segmentation
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {region.anomaly.title} ({region.anomaly.area})
                </h3>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  region.anomaly.severity === 'high'
                    ? 'bg-rose-100 text-rose-800 border-rose-300'
                    : region.anomaly.severity === 'moderate'
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                }`}
              >
                {region.anomaly.severity.toUpperCase()} PRIORITY ALERT
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-800 block">Telemetry Anomaly Signal:</span>
                <p className="text-slate-600 leading-relaxed">{region.anomaly.dipValue}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-800 block">Probable Agronomic Cause:</span>
                <p className="text-slate-600 leading-relaxed">{region.anomaly.cause}</p>
              </div>

              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-1">
                <span className="font-bold text-emerald-900 block">Recommended Farmer Action:</span>
                <p className="text-emerald-800 leading-relaxed font-medium">{region.anomaly.action}</p>
              </div>
            </div>
          </div>

          {/* ── 6-Stage Remote Sensing Pipeline Architecture ── */}
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-xl border border-slate-800">
            <div className="space-y-1 text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                The BKIN Remote Sensing Pipeline
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">
                How Orbital Imagery Feeds the BKIN Farm Intelligence Engine
              </h3>
              <p className="text-xs text-slate-400">
                End-to-end ingestion and orthorectification pipeline converting raw European Space Agency Level-2A data into smallholder farm actions.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
              {[
                { step: '01', title: 'Satellite', desc: 'Sentinel-2 & Landsat-9 orbit' },
                { step: '02', title: 'Data Ingestion', desc: 'Level-2A BOA reflectance' },
                { step: '03', title: 'Processing', desc: 'Cloud mask & orthorectify' },
                { step: '04', title: 'Remote Sensing', desc: 'NDVI, NDWI, NDMI, LST' },
                { step: '05', title: 'Crop Intelligence', desc: 'Canopy stress segmentation' },
                { step: '06', title: 'Risk Engine', desc: 'Actionable advisory triggers' },
              ].map((s, idx) => (
                <div
                  key={s.step}
                  className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1.5 flex flex-col justify-between"
                >
                  <span className="text-[10px] font-mono font-bold text-emerald-400">{s.step}</span>
                  <div>
                    <h5 className="text-xs font-bold text-white">{s.title}</h5>
                    <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{s.desc}</p>
                  </div>
                  {idx < 5 && <span className="text-emerald-500 font-bold self-end text-xs">→</span>}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
