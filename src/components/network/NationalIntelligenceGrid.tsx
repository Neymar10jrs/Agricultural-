'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Network,
  Radio,
  Server,
  Layers,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  Database,
  Cpu,
  Share2,
  ChevronRight,
  MapPin,
  Sprout,
  Activity,
  CloudSun,
  Eye,
  Satellite,
  Building2,
  Home,
  Check,
  Sparkles,
  Zap,
} from 'lucide-react';
import { indianStatesData } from '@/data/states';
import { StateNode } from '@/types';
import { useApp } from '@/context/AppContext';
import { IndiaMapInteractive } from '@/components/maps/IndiaMapInteractive';

export function NationalIntelligenceGrid() {
  const { dict, language } = useApp();
  const isHi = language === 'hi';

  const [activeTier, setActiveTier] = useState<number>(0);
  const [selectedStateCode, setSelectedStateCode] = useState<string>('PB');

  const selectedState = indianStatesData.find((s) => s.stateCode === selectedStateCode) || indianStatesData[0];

  // 6-level architecture definition
  const hierarchyTiers = [
    {
      id: 'nation',
      tier: 1,
      title: isHi ? 'राष्ट्रीय स्तर' : 'National Tier',
      name: isHi ? 'भारत राष्ट्रीय कृषि गेटवे' : 'India National Gateway',
      code: 'BKIN-NAT-01',
      icon: Network,
      color: 'from-emerald-700 to-teal-900',
      badge: isHi ? 'अखिल भारतीय प्रोटोकॉल' : 'Pan-India Protocol',
      metrics: [
        { label: isHi ? 'निगरानी रकबा' : 'Monitored Acreage', val: '14.8M Ha' },
        { label: isHi ? 'सक्रिय राज्य' : 'Active States', val: '6 Connected' },
        { label: isHi ? 'दैनिक उपग्रह पास' : 'Daily Passes', val: 'Sentinel-2 / 10m' },
      ],
      desc: isHi
        ? 'राष्ट्रीय स्तर पर बहु-स्पेक्ट्रल उपग्रह निगरानी, राष्ट्रीय सूखा वेधशाला और 15 कृषि-जलवायु क्षेत्रों में अंतर-संचालनीयता प्रोटोकॉल।'
        : 'Pan-India multi-spectral satellite telemetry, national drought & weather radar, and open interoperability protocol across 15 agro-climatic zones.',
    },
    {
      id: 'state',
      tier: 2,
      title: isHi ? 'राज्य स्तर' : 'State Tier',
      name: isHi ? `${selectedState.hindiName} राज्य नोड` : `${selectedState.name} State Node`,
      code: `BKIN-ST-${selectedState.stateCode}`,
      icon: Building2,
      color: 'from-slate-800 to-emerald-950',
      badge: isHi ? 'स्वायत्त राज्य रजिस्ट्री' : 'Sovereign State Registry',
      metrics: [
        { label: isHi ? 'जिले' : 'Districts Covered', val: '23 Districts' },
        { label: isHi ? 'संबद्ध किसान' : 'Connected Farmers', val: selectedState.connectedFarmersCount.toLocaleString() },
        { label: isHi ? 'उपग्रह कवरेज' : 'Satellite Coverage', val: `${selectedState.satelliteCoveragePercent}%` },
      ],
      desc: isHi
        ? `राज्य कृषि विभाग और कृषि विश्वविद्यालय (PAU) का स्थानीय नोड। राज्य के स्वयं के मृदा व कीट डेटा पर संप्रभु नियंत्रण।`
        : `State Department of Agriculture & State Agricultural University localized edge node. Full state sovereignty over soil and pest telemetry.`,
    },
    {
      id: 'district',
      tier: 3,
      title: isHi ? 'जिला स्तर' : 'District Tier',
      name: isHi ? 'लुधियाना जिला केवीके हब' : 'Ludhiana District KVK Hub',
      code: 'BKIN-DIS-LDH',
      icon: Server,
      color: 'from-blue-900 to-slate-900',
      badge: isHi ? 'कृषि विज्ञान केंद्र' : 'KVK Agronomy Unit',
      metrics: [
        { label: isHi ? 'तहसील/ब्लॉक' : 'Blocks', val: '14 Blocks' },
        { label: isHi ? 'मौसम स्टेशन' : 'Agro-Met Stations', val: '8 Active' },
        { label: isHi ? 'रोग चेतावनी' : 'Active Alerts', val: '1 Yellow Rust Warning' },
      ],
      desc: isHi
        ? 'जिला कृषि विज्ञान केंद्र (KVK) और जिला कृषि मौसम इकाई (DAMU) द्वारा दैनिक स्थानीय फसल परामर्श जारी करना।'
        : 'District Krishi Vigyan Kendra (KVK) and District Agro-Meteorological Unit (DAMU) generating localized micro-advisories.',
    },
    {
      id: 'block',
      tier: 4,
      title: isHi ? 'ब्लॉक / तहसील' : 'Block Tier',
      name: isHi ? 'समराला ब्लॉक कृषि मंडल' : 'Samrala Block Agriculture Circle',
      code: 'BKIN-BLK-SMR',
      icon: Layers,
      color: 'from-teal-900 to-slate-900',
      badge: isHi ? 'नहरी व भूजल क्लस्टर' : 'Canal & Water Cluster',
      metrics: [
        { label: isHi ? 'शामिल गांव' : 'Villages', val: '64 Villages' },
        { label: isHi ? 'सिंचाई नेटवर्क' : 'Canal Network', val: 'Sirhind Branch' },
        { label: isHi ? 'मृदा स्वास्थ्य' : 'Soil Testing Labs', val: '2 Mini Labs' },
      ],
      desc: isHi
        ? 'नहरी जल वितरण और ब्लॉक स्तरीय कीटनाशक स्काउटिंग नेटवर्क का वास्तविक समय टेलीमेट्री समन्वय।'
        : 'Canal water distribution schedule and block-level extension scout telemetry coordination.',
    },
    {
      id: 'village',
      tier: 5,
      title: isHi ? 'ग्राम पंचायत' : 'Village Tier',
      name: isHi ? 'रोहणो कलां ग्राम क्लस्टर' : 'Rohno Kalan Village Cluster',
      code: 'BKIN-VIL-RNK',
      icon: Home,
      color: 'from-amber-900 to-slate-900',
      badge: isHi ? 'किसान मित्र समूह' : 'Farmer WhatsApp Circle',
      metrics: [
        { label: isHi ? 'खेत जोतें' : 'Farm Holdings', val: '284 Plots' },
        { label: isHi ? 'प्रमुख फसल' : 'Primary Crop', val: 'Wheat HD-2967' },
        { label: isHi ? 'सामुदायिक ट्यूबवेल' : 'Tubewell Points', val: '42 Active' },
      ],
      desc: isHi
        ? 'ग्राम पंचायत स्तर पर सामुदायिक मौसम चेतावनी और साझा कृषि यंत्र (CHC) का उपयोग।'
        : 'Gram Panchayat hyper-localized advisory broadcast and shared Custom Hiring Center (CHC) equipment alerts.',
    },
    {
      id: 'farm',
      tier: 6,
      title: isHi ? 'खेत स्तर (डिजिटल ट्विन)' : 'Farm Plot (Digital Twin)',
      name: isHi ? 'जसवंत सिंह का खेत (2.4 एकड़)' : 'Jaswant Singh Farm (2.4 Acres)',
      code: 'BKIN-PB-LDH-042',
      icon: Sprout,
      color: 'from-emerald-800 to-slate-900',
      badge: isHi ? 'कार्रवाई योग्य डिजिटल ट्विन' : 'Actionable Digital Twin',
      metrics: [
        { label: isHi ? 'एनडीवीआई औसत' : 'NDVI Average', val: '0.68 (Good)' },
        { label: isHi ? 'फसल अवस्था' : 'Crop Stage', val: 'Tillering (Day 38)' },
        { label: isHi ? 'आज की कार्रवाई' : 'Action Trigger', val: 'Delay Irrigation 24h' },
      ],
      desc: isHi
        ? 'उपग्रह, सेंसर और मौसम डेटा से युक्त वास्तविक खेत डिजिटल ट्विन। सटीक उर्वरक व सिंचाई निर्णय।'
        : 'Individual farm plot digital twin integrating sub-canopy NDVI anomalies, moisture sensors, and precision IPM guidance.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* ── Grid Header & National Telemetry Summary ── */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-500/20">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-400/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                {isHi ? 'राष्ट्रीय कृषि इंटेलिजेंस ग्रिड' : 'National Agriculture Intelligence Grid'}
              </span>
              <span className="text-xs text-slate-400">
                {isHi ? 'प्रोटोकॉल स्तर: v2.4 सक्रिय' : 'Protocol Layer: v2.4 Active'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              🇮🇳 {isHi ? 'भारत राष्ट्रीय कृषि इंटेलिजेंस ग्रिड' : 'BKIN National Agriculture Intelligence Grid'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isHi
                ? 'अंतरिक्ष के उपग्रहों से लेकर खेत के एक-एक पौधे तक — भारत की 6-स्तरीय एकीकृत कृषि डेटा अवसंरचना जो राष्ट्रीय अवलोकन को व्यक्तिगत किसान कार्रवाई में बदलती है।'
                : 'From orbital remote sensing to individual crop furrows — an interoperable 6-level architecture connecting national observations directly to farm-level field actions.'}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] text-emerald-400 font-bold uppercase block">
                {isHi ? 'संबद्ध राज्य' : 'Federated States'}
              </span>
              <span className="text-xl font-black text-white">6 Active</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] text-teal-400 font-bold uppercase block">
                {isHi ? 'निगरानी जिले' : 'Districts Grid'}
              </span>
              <span className="text-xl font-black text-white">184</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center col-span-2 sm:col-span-1">
              <span className="text-[10px] text-amber-400 font-bold uppercase block">
                {isHi ? 'टेलीमेट्री पास' : 'Satellite Passes'}
              </span>
              <span className="text-xl font-black text-white">Sentinel-2</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 6-Level Architecture Pipeline Stepper (Interactive) ── */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
              {isHi ? 'पदानुक्रमित नेविगेटर' : 'Hierarchical Telemetry Navigator'}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {isHi ? 'भारत → राज्य → जिला → ब्लॉक → गांव → खेत' : 'India → State → District → Block → Village → Farm'}
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            {isHi ? 'किसी भी स्तर पर क्लिक करके उसका विवरण देखें' : 'Click any tier to inspect telemetry flow'}
          </span>
        </div>

        {/* Stepper Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {hierarchyTiers.map((t, idx) => {
            const Icon = t.icon;
            const isSelected = activeTier === idx;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTier(idx)}
                className={`p-3.5 rounded-2xl text-left border transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-900 text-white border-emerald-700 shadow-md ring-2 ring-emerald-500/30 scale-[1.02]'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-emerald-800 text-emerald-200' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    L{t.tier}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-300' : 'text-slate-400'}`} />
                </div>
                <div>
                  <span className={`text-[10px] uppercase font-bold block ${isSelected ? 'text-emerald-300' : 'text-slate-400'}`}>
                    {t.title}
                  </span>
                  <span className={`text-xs font-bold block truncate mt-0.5 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {t.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Tier Inspector Card */}
        {(() => {
          const active = hierarchyTiers[activeTier];
          const Icon = active.icon;
          return (
            <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-5 animate-in fade-in duration-300 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-400/30 shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase bg-emerald-950 text-emerald-300 border border-emerald-700/60 px-2 py-0.5 rounded font-bold">
                        Level {active.tier} • {active.code}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{active.badge}</span>
                    </div>
                    <h4 className="text-xl font-bold text-white mt-1">{active.name}</h4>
                  </div>
                </div>

                {activeTier === 5 ? (
                  <Link
                    href="/farm-digital-twin"
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition flex items-center gap-1.5 shadow-md shrink-0"
                  >
                    <span>{isHi ? 'पूरा डिजिटल ट्विन खोलें' : 'Open Farm Digital Twin'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <button
                    onClick={() => setActiveTier((prev) => Math.min(prev + 1, 5))}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5 border border-slate-700 shrink-0"
                  >
                    <span>{isHi ? 'अगले स्तर पर जाएं' : 'Drill Down to Next Level'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                {active.desc}
              </p>

              {/* Tier Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {active.metrics.map((m) => (
                  <div key={m.label} className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">{m.label}</span>
                    <span className="text-base font-bold text-white">{m.val}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      {/* ── Animated Data Flow Visualization ── */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6 border border-slate-800">
        <div className="space-y-1 text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
            {isHi ? 'द्वि-दिशात्मक टेलीमेट्री प्रवाह' : 'Two-Way Intelligence Flow'}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold">
            {isHi ? 'ऊपर से नीचे (Top-Down) और नीचे से ऊपर (Bottom-Up) डेटा पाइपलाइन' : 'National Observation to Farm Action & Learning Pipeline'}
          </h3>
          <p className="text-xs text-slate-400">
            {isHi
              ? 'उपग्रह, मौसम रडार और मृदा डेटा नीचे किसान तक पहुंचते हैं; किसान की जमीनी रिपोर्ट और पुष्टि पुनः राष्ट्रीय मॉडलों को प्रशिक्षित करती है।'
              : 'Satellites & radars deliver early warnings downward; farmer ratings and ground truth calibrate national models upward.'}
          </p>
        </div>

        {/* Pipeline Architecture Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* 1. Observation Layer */}
          <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-400 uppercase">01 • Ingestion</span>
              <Satellite className="w-4 h-4 text-emerald-400" />
            </div>
            <h4 className="font-bold text-sm text-white">
              {isHi ? 'ऑर्बिटल व ग्राउंड सेंसिंग' : 'Orbital & Ground Sensing'}
            </h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Sentinel-2 (10m NDVI), IMD Doppler Radar, ICAR Digital Soil Registry, and state pest surveillance feeds continuously ingested every 24 hours.
            </p>
            <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-emerald-300">
              <span>Sync Frequency: Continuous</span>
              <span>100% Automated</span>
            </div>
          </div>

          {/* 2. Reasoning Layer */}
          <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-teal-400 uppercase">02 • Edge Processing</span>
              <Cpu className="w-4 h-4 text-teal-400" />
            </div>
            <h4 className="font-bold text-sm text-white">
              {isHi ? 'फेडरेटेड स्टेट एज एआई' : 'Federated State Edge AI'}
            </h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              State agricultural nodes execute localized risk weights, correlating weather spikes with crop degree-days and historical outbreak thresholds.
            </p>
            <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-teal-300">
              <span>Model: Localized v0.3</span>
              <span>Explainable AI</span>
            </div>
          </div>

          {/* 3. Action Layer */}
          <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-amber-400 uppercase">03 • Field Execution</span>
              <Sprout className="w-4 h-4 text-amber-400" />
            </div>
            <h4 className="font-bold text-sm text-white">
              {isHi ? 'किसान एक्शन व फीडबैक' : 'Farmer Action & Feedback'}
            </h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Delivered via PWA, SMS, WhatsApp, and Outbound IVR. Farmer executes targeted tubewell stoppage or scouting, submitting closed-loop ratings.
            </p>
            <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-amber-300">
              <span>Omnichannel Delivery</span>
              <span>Learning Loop</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Interactive India Map Integration ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {isHi ? 'राष्ट्रीय मानचित्र व उपग्रह हब' : 'National Geospatial Map & Satellite Hub'}
            </h3>
            <p className="text-xs text-slate-500">
              {isHi ? 'मानचित्र पर किसी भी राज्य नोड पर क्लिक करके उसका लाइव डेटासेट देखें' : 'Click on any state node to inspect its live datasets and satellite coverage'}
            </p>
          </div>
          <span className="text-xs text-emerald-800 font-bold bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            {selectedState.name} ({selectedState.stateCode}) Selected
          </span>
        </div>

        <IndiaMapInteractive
          selectedCode={selectedStateCode}
          onSelectState={(st) => {
            setSelectedStateCode(st.stateCode);
            setActiveTier(1); // Jump to State Tier view
          }}
        />
      </div>

      {/* ── Federated State Nodes Status Matrix ── */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {isHi ? 'फेडरेटेड राज्य नोड स्थिति मैट्रिक्स' : 'Federated State Nodes Telemetry Matrix'}
            </h3>
            <p className="text-xs text-slate-500">
              {isHi ? 'राज्यों के लाइव डेटा फीड और अंतर-संचालनीयता स्थिति' : 'Active state data feeds, satellite coverage, and telemetry freshness'}
            </p>
          </div>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-bold border border-slate-200">
            6 Active State Nodes
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                <th className="py-3 px-3">State / Node</th>
                <th className="py-3 px-3">Connection</th>
                <th className="py-3 px-3">Satellite</th>
                <th className="py-3 px-3">Weather</th>
                <th className="py-3 px-3">Soil Registry</th>
                <th className="py-3 px-3">Pest Radar</th>
                <th className="py-3 px-3">Farmers</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {indianStatesData.map((st) => (
                <tr
                  key={st.stateCode}
                  className={`hover:bg-slate-50 transition cursor-pointer ${
                    selectedStateCode === st.stateCode ? 'bg-emerald-50/70 font-semibold' : ''
                  }`}
                  onClick={() => {
                    setSelectedStateCode(st.stateCode);
                    setActiveTier(1);
                  }}
                >
                  <td className="py-3 px-3">
                    <span className="font-bold text-slate-900 block">{st.name}</span>
                    <span className="text-[10px] text-slate-400">{st.stateCode} • {st.capital}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      Active
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-700">
                    🟢 {st.satelliteCoveragePercent}%
                  </td>
                  <td className="py-3 px-3 text-slate-700">
                    🟢 Live IMD
                  </td>
                  <td className="py-3 px-3 text-slate-700">
                    {st.dataAvailability.soilRegistry ? '🟢 Synced' : '🟡 Partial'}
                  </td>
                  <td className="py-3 px-3 text-slate-700">
                    {st.dataAvailability.pestSurveillance ? '🟢 Active' : '🟡 Offline'}
                  </td>
                  <td className="py-3 px-3 font-mono font-medium text-slate-800">
                    {st.connectedFarmersCount.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button className="text-xs text-emerald-700 font-bold hover:underline">
                      {isHi ? 'चुनें' : 'Select'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
