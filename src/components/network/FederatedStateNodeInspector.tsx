'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  Server,
  Radio,
  Layers,
  Database,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Cpu,
  ArrowRight,
  ExternalLink,
  Users,
  Wheat,
  Activity,
  Satellite,
  CloudSun,
} from 'lucide-react';
import { indianStatesData } from '@/data/states';
import { StateNode } from '@/types';
import { useApp } from '@/context/AppContext';

interface FederatedStateNodeDetails {
  code: string;
  nodeEndpoint: string;
  latencyMs: number;
  dataFreshness: {
    satellite: { status: 'operational' | 'syncing' | 'degraded'; lastSync: string; detail: string };
    weather: { status: 'operational' | 'syncing' | 'degraded'; lastSync: string; detail: string };
    soil: { status: 'operational' | 'syncing' | 'degraded'; lastSync: string; detail: string };
    cropData: { status: 'operational' | 'syncing' | 'degraded'; lastSync: string; detail: string };
    aiEngine: { status: 'operational' | 'syncing' | 'degraded'; lastSync: string; detail: string };
  };
  sovereigntyNotice: string;
}

const FEDERATED_NODE_METADATA: Record<string, FederatedStateNodeDetails> = {
  PB: {
    code: 'PB',
    nodeEndpoint: 'grpc://edge-node.agri.punjab.gov.in:443',
    latencyMs: 38,
    dataFreshness: {
      satellite: { status: 'operational', lastSync: '16 Sept, 10:42 AM', detail: 'Sentinel-2 BOA 10m bands 4, 8, 11' },
      weather: { status: 'operational', lastSync: '15 mins ago', detail: 'IMD Agro-met Station Ludhiana live feed' },
      soil: { status: 'operational', lastSync: '22 Sept', detail: 'PAU Soil Science Lab synchronized registry' },
      cropData: { status: 'operational', lastSync: '1 hour ago', detail: 'Rabi wheat sowing acreage declarations' },
      aiEngine: { status: 'operational', lastSync: '30 mins ago', detail: 'Yellow rust epidemiological vector model' },
    },
    sovereigntyNotice: 'Punjab State Agronomy Data Center retains full ownership of farmer PII and land records.',
  },
  HR: {
    code: 'HR',
    nodeEndpoint: 'grpc://edge-node.agri.haryana.gov.in:443',
    latencyMs: 42,
    dataFreshness: {
      satellite: { status: 'operational', lastSync: '17 Sept, 10:48 AM', detail: 'Sentinel-2A full state coverage 98.7%' },
      weather: { status: 'operational', lastSync: '10 mins ago', detail: 'HAU Hisar meteorological radar' },
      soil: { status: 'degraded', lastSync: '18 hours ago', detail: 'Saline patch survey batch upload in progress' },
      cropData: { status: 'operational', lastSync: '2 hours ago', detail: 'Meri Fasal Mera Byora API sync' },
      aiEngine: { status: 'operational', lastSync: '45 mins ago', detail: 'Mustard aphid threshold inference model' },
    },
    sovereigntyNotice: 'Haryana Kisan Portal maintains exclusive data encryption keys for all farmer registries.',
  },
  UP: {
    code: 'UP',
    nodeEndpoint: 'grpc://edge-node.upagriportal.gov.in:443',
    latencyMs: 51,
    dataFreshness: {
      satellite: { status: 'operational', lastSync: '15 Sept, 11:05 AM', detail: 'Landsat-9 / Sentinel-2 hybrid fusion' },
      weather: { status: 'operational', lastSync: '25 mins ago', detail: 'State Agro-met network Lucknow' },
      soil: { status: 'syncing', lastSync: '2 hours ago', detail: 'Soil Health Card Portal batch replication' },
      cropData: { status: 'operational', lastSync: '3 hours ago', detail: 'Potato & sugarcane cultivation tracking' },
      aiEngine: { status: 'operational', lastSync: '1 hour ago', detail: 'Late blight potato surveillance model' },
    },
    sovereigntyNotice: 'UP Agriculture Secretariat operates autonomous sovereign edge instances in Lucknow.',
  },
  MH: {
    code: 'MH',
    nodeEndpoint: 'grpc://edge-node.krishi.maharashtra.gov.in:443',
    latencyMs: 64,
    dataFreshness: {
      satellite: { status: 'operational', lastSync: '16 Sept, 10:15 AM', detail: 'Sentinel-2B drought & thermal bands' },
      weather: { status: 'operational', lastSync: '20 mins ago', detail: 'Mahavedh automatic weather stations' },
      soil: { status: 'operational', lastSync: '21 Sept', detail: 'Black cotton soil moisture calibrations' },
      cropData: { status: 'operational', lastSync: '4 hours ago', detail: 'Kharif cotton & soybean harvest estimates' },
      aiEngine: { status: 'operational', lastSync: '30 mins ago', detail: 'Pink bollworm pheromone trap correlation' },
    },
    sovereigntyNotice: 'Maharashtra Remote Sensing Application Centre (MRSAC) validates all spatial assets.',
  },
  MP: {
    code: 'MP',
    nodeEndpoint: 'grpc://edge-node.mpkrishi.gov.in:443',
    latencyMs: 58,
    dataFreshness: {
      satellite: { status: 'operational', lastSync: '17 Sept, 11:12 AM', detail: 'Malwa plateau NDVI index fusion' },
      weather: { status: 'operational', lastSync: '35 mins ago', detail: 'Bhopal Agro-met radar telemetry' },
      soil: { status: 'operational', lastSync: '22 Sept', detail: 'Organic carbon digitized soil profiles' },
      cropData: { status: 'operational', lastSync: '1 hour ago', detail: 'Soybean mandi arrival registrations' },
      aiEngine: { status: 'operational', lastSync: '2 hours ago', detail: 'Pulse wilt & pod borer prediction models' },
    },
    sovereigntyNotice: 'MP State Cyber Security Framework governs all inter-nodal message queues.',
  },
  GJ: {
    code: 'GJ',
    nodeEndpoint: 'grpc://edge-node.agri.gujarat.gov.in:443',
    latencyMs: 46,
    dataFreshness: {
      satellite: { status: 'operational', lastSync: '16 Sept, 11:20 AM', detail: 'Saurashtra ground water & vegetative monitoring' },
      weather: { status: 'operational', lastSync: '12 mins ago', detail: 'Ahmedabad IMD coastal weather radar' },
      soil: { status: 'operational', lastSync: '20 Sept', detail: 'Salinity and micro-nutrient diagnostics' },
      cropData: { status: 'operational', lastSync: '2 hours ago', detail: 'Groundnut & castor cultivation reporting' },
      aiEngine: { status: 'operational', lastSync: '40 mins ago', detail: 'Whitefly & thrips micro-climate risk engine' },
    },
    sovereigntyNotice: 'Gujarat Informatics Limited enforces zero-trust role-based access for state agronomy APIs.',
  },
};

export function FederatedStateNodeInspector() {
  const { dict, language } = useApp();
  const isHi = language === 'hi';

  const [selectedCode, setSelectedCode] = useState<string>('PB');

  const state = indianStatesData.find((s) => s.stateCode === selectedCode) || indianStatesData[0];
  const meta = FEDERATED_NODE_METADATA[selectedCode] || FEDERATED_NODE_METADATA.PB;

  const renderStatusDot = (status: 'operational' | 'syncing' | 'degraded') => {
    switch (status) {
      case 'operational':
        return <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold text-xs"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />🟢 {isHi ? 'सक्रिय (Live)' : 'Operational'}</span>;
      case 'syncing':
        return <span className="inline-flex items-center gap-1.5 text-blue-700 font-bold text-xs"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />🔵 {isHi ? 'सिंक हो रहा है' : 'Syncing'}</span>;
      case 'degraded':
      default:
        return <span className="inline-flex items-center gap-1.5 text-amber-700 font-bold text-xs"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" />🟡 {isHi ? 'आंशिक (Degraded)' : 'Degraded'}</span>;
    }
  };

  return (
    <div className="space-y-8">
      {/* ── Demo Notice & State Selector ── */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6 border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-400/30 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                {isHi ? 'फेडरेटेड राज्य नोड नेटवर्क' : 'Federated State Node Network'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-300/30">
                Demo Network Status
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {isHi ? 'राज्य-स्तरीय स्वायत्त नोड आर्किटेक्चर' : 'Federated State Nodes & Interoperability Hub'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {isHi
                ? 'प्रत्येक राज्य अपने कच्चे डेटा और किसान पहचान पर पूर्ण नियंत्रण रखता है, जबकि मानकीकृत मॉडल राष्ट्रीय ग्रिड पर इंटरऑपरेट करते हैं।'
                : 'States retain complete sovereign ownership of raw farmer records, while standardized schemas and model weights interoperate over the national grid.'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-right shrink-0">
            <span className="text-[10px] font-mono text-emerald-400 block uppercase">
              {isHi ? 'नेटवर्क विलंबता (Latency)' : 'Mesh Latency'}
            </span>
            <span className="text-2xl font-mono font-bold text-white">{meta.latencyMs} ms</span>
            <span className="text-[10px] text-slate-400 block">gRPC v2.4 TLS 1.3</span>
          </div>
        </div>

        {/* State Selector Tabs */}
        <div className="pt-2 border-t border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">
              {isHi ? 'राज्य नोड चुनें (Acceptance Test):' : 'Select State Node to Inspect (Acceptance Test):'}
            </span>
            <span className="text-[10px] text-slate-400">6 Connected State Secretariats</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {indianStatesData.map((st) => {
              const isSelected = selectedCode === st.stateCode;
              return (
                <button
                  key={st.stateCode}
                  onClick={() => setSelectedCode(st.stateCode)}
                  className={`p-3 rounded-2xl text-left border transition ${
                    isSelected
                      ? 'bg-emerald-800 text-white border-emerald-400 shadow-md ring-2 ring-emerald-500/30 scale-[1.02]'
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-emerald-300">{st.stateCode}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <span className="font-bold text-xs block text-white truncate">{st.name}</span>
                  <span className="text-[10px] text-slate-400 block truncate">{st.hindiName}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Active Node Telemetry & Freshness Matrix ── */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                Node ID: BKIN-NODE-{state.stateCode}
              </span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {state.nodesStatus}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              {state.name} ({state.hindiName}) {isHi ? 'कृषि डेटा नोड' : 'Agriculture Data Node'}
            </h3>
            <p className="text-xs text-slate-500">
              Endpoint: <code className="font-mono bg-slate-50 px-1 py-0.5 rounded text-slate-600">{meta.nodeEndpoint}</code>
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/india-network"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <span>{isHi ? 'राष्ट्रीय ग्रिड में देखें' : 'View in National Grid'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Telemetry Availability & Freshness Breakdown (Example in Prompt) */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            {isHi ? 'उपलब्ध डेटासेट व लाइव टेलीमेट्री स्थिति' : 'Available Datasets & Data Freshness Indicators'}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {/* Satellite */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-slate-500">Satellite</span>
                <Satellite className="w-4 h-4 text-emerald-600" />
              </div>
              <div>{renderStatusDot(meta.dataFreshness.satellite.status)}</div>
              <p className="text-[11px] text-slate-600 leading-tight">{meta.dataFreshness.satellite.detail}</p>
              <span className="text-[10px] text-slate-400 block pt-1 border-t border-slate-200">
                Sync: {meta.dataFreshness.satellite.lastSync}
              </span>
            </div>

            {/* Weather */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-slate-500">Weather</span>
                <CloudSun className="w-4 h-4 text-sky-600" />
              </div>
              <div>{renderStatusDot(meta.dataFreshness.weather.status)}</div>
              <p className="text-[11px] text-slate-600 leading-tight">{meta.dataFreshness.weather.detail}</p>
              <span className="text-[10px] text-slate-400 block pt-1 border-t border-slate-200">
                Sync: {meta.dataFreshness.weather.lastSync}
              </span>
            </div>

            {/* Soil */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-slate-500">Soil Registry</span>
                <Layers className="w-4 h-4 text-amber-600" />
              </div>
              <div>{renderStatusDot(meta.dataFreshness.soil.status)}</div>
              <p className="text-[11px] text-slate-600 leading-tight">{meta.dataFreshness.soil.detail}</p>
              <span className="text-[10px] text-slate-400 block pt-1 border-t border-slate-200">
                Sync: {meta.dataFreshness.soil.lastSync}
              </span>
            </div>

            {/* Crop Data */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-slate-500">Crop Data</span>
                <Wheat className="w-4 h-4 text-emerald-700" />
              </div>
              <div>{renderStatusDot(meta.dataFreshness.cropData.status)}</div>
              <p className="text-[11px] text-slate-600 leading-tight">{meta.dataFreshness.cropData.detail}</p>
              <span className="text-[10px] text-slate-400 block pt-1 border-t border-slate-200">
                Sync: {meta.dataFreshness.cropData.lastSync}
              </span>
            </div>

            {/* AI Engine */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-slate-500">AI Engine</span>
                <Cpu className="w-4 h-4 text-purple-600" />
              </div>
              <div>{renderStatusDot(meta.dataFreshness.aiEngine.status)}</div>
              <p className="text-[11px] text-slate-600 leading-tight">{meta.dataFreshness.aiEngine.detail}</p>
              <span className="text-[10px] text-slate-400 block pt-1 border-t border-slate-200">
                Sync: {meta.dataFreshness.aiEngine.lastSync}
              </span>
            </div>
          </div>
        </div>

        {/* State Agronomic Context */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Major Crops */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
              <Wheat className="w-4 h-4 text-emerald-600" />
              {isHi ? 'प्रमुख फसलें (Major Crops)' : 'Major Cultivated Crops'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {state.majorCrops.map((c) => (
                <span key={c} className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Agro-Climatic Zones */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-600" />
              {isHi ? 'कृषि-जलवायु क्षेत्र' : 'Agro-Climatic Zones'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {state.agroClimaticZones.map((z) => (
                <span key={z} className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[11px] font-medium text-slate-700">
                  {z}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sovereignty Charter Box */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="font-bold text-xs text-emerald-950">
              {isHi ? 'राज्य डेटा संप्रभुता सुरक्षा गारंटी' : 'State Sovereign Data Guarantee'}
            </h5>
            <p className="text-xs text-emerald-800 leading-relaxed font-normal">
              {meta.sovereigntyNotice} Raw farmer identification numbers (Aadhaar/Kisan ID) never leave the state node infrastructure. Only anonymized risk indices are shared with the national interoperability mesh.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
