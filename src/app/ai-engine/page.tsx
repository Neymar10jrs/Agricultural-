'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Cpu,
  Satellite,
  CloudSun,
  Layers,
  Sprout,
  Activity,
  Bot,
  UserCheck,
  ArrowRight,
  GitBranch,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SectionHero } from '@/components/ui/SectionHero';

export default function AIEnginePage() {
  const { language } = useApp();
  const isHi = language === 'hi';
  const [activeStage, setActiveStage] = useState<string>('ai-core');

  const knowledgeGraphNodes = [
    { id: 'crop', title: '1. Crop Entity', subtitle: 'Wheat (HD-2967)', icon: Sprout, color: 'border-emerald-400 bg-emerald-50 text-emerald-800' },
    { id: 'stage', title: '2. Growth Stage', subtitle: 'Crown Root (Day 38)', icon: Layers, color: 'border-blue-400 bg-blue-50 text-blue-800' },
    { id: 'pest', title: '3. Pathogen Threat', subtitle: 'Stripe Rust / Aphids', icon: Activity, color: 'border-rose-400 bg-rose-50 text-rose-800' },
    { id: 'sym', title: '4. Observed Symptoms', subtitle: 'Linear yellow leaf pustules', icon: EyeIcon, color: 'border-amber-400 bg-amber-50 text-amber-800' },
    { id: 'env', title: '5. Micro-Climate Triggers', subtitle: 'Overcast, 10-18°C, >85% RH', icon: CloudSun, color: 'border-indigo-400 bg-indigo-50 text-indigo-800' },
    { id: 'risk', title: '6. Epidemiological Risk', subtitle: 'High Incubation Index', icon: ShieldCheck, color: 'border-purple-400 bg-purple-50 text-purple-800' },
    { id: 'mgmt', title: '7. Actionable IPM Advisory', subtitle: 'Delay Irrigation; Spray Propiconazole', icon: UserCheck, color: 'border-emerald-500 bg-emerald-100 text-emerald-900' },
  ];

  function EyeIcon(props: any) {
    return <Sparkles {...props} />;
  }

  return (
    <div className="space-y-0">
      <SectionHero
        imageSrc="/assets/satellite/satellite-telemetry.svg"
        theme="satellite"
        label={isHi ? 'कृषि अनुमान एवं एआई वास्तुकला' : 'AGRONOMIC INFERENCE ARCHITECTURE'}
        heading={
          <span className="text-gradient-satellite">
            {isHi ? 'बीकेआईएन एआई कृषि इंजन पाइपलाइन' : 'AI Agriculture Engine Pipeline'}
          </span>
        }
        description={
          isHi
            ? 'बीकेआईएन कैसे उपग्रह पिक्सेल, संख्यात्मक मौसम ग्रिड, मृदा सेंसर डेटा और फसल वृद्धि मॉडल को व्याख्यात्मक निर्णयों में परिवर्तित करता है।'
            : 'How BKIN fuses raw satellite pixels, numerical weather grids, soil sensor telemetry, and crop growth models into explainable agronomic decisions.'
        }
        showDemoBadge={true}
        stats={[
          { value: '7 Stages', label: isHi ? 'पाइपलाइन चरण' : 'Pipeline Nodes' },
          { value: 'XGB + LLM', label: isHi ? 'मॉडल स्टैक' : 'Model Stack' },
          { value: '100% Explainable', label: isHi ? 'व्याख्यात्मक' : 'Transparency' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">


      {/* Pipeline Diagram (Section 30) */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">
            End-to-End Intelligence Pipeline
          </span>
          <h3 className="text-xl sm:text-2xl font-black">
            From Fragmented Raw Inputs to Actionable Guidance
          </h3>
        </div>

        {/* Layer 1: Inputs Grid */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
            Layer 1: Multi-Source Heterogeneous Ingestion
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-xs">
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center space-y-1">
              <Satellite className="w-5 h-5 text-emerald-400 mx-auto" />
              <div className="font-semibold text-[11px]">Satellite Imagery</div>
              <div className="text-[9px] text-slate-400">Sentinel-2 & Landsat</div>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center space-y-1">
              <CloudSun className="w-5 h-5 text-blue-400 mx-auto" />
              <div className="font-semibold text-[11px]">Weather Data</div>
              <div className="text-[9px] text-slate-400">IMD Radar 7-Day</div>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center space-y-1">
              <Layers className="w-5 h-5 text-amber-400 mx-auto" />
              <div className="font-semibold text-[11px]">Soil Profiles</div>
              <div className="text-[9px] text-slate-400">NPK, pH & Carbon</div>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center space-y-1">
              <Sprout className="w-5 h-5 text-emerald-300 mx-auto" />
              <div className="font-semibold text-[11px]">Crop Stage</div>
              <div className="text-[9px] text-slate-400">GDD Thermal Units</div>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center space-y-1">
              <Activity className="w-5 h-5 text-rose-400 mx-auto" />
              <div className="font-semibold text-[11px]">Pest Traps</div>
              <div className="text-[9px] text-slate-400">State Sentinel Hubs</div>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center space-y-1">
              <Cpu className="w-5 h-5 text-purple-400 mx-auto" />
              <div className="font-semibold text-[11px]">Farmer Reports</div>
              <div className="text-[9px] text-slate-400">App Crowdsource</div>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-center space-y-1">
              <ShieldCheck className="w-5 h-5 text-teal-400 mx-auto" />
              <div className="font-semibold text-[11px]">KVK Packages</div>
              <div className="text-[9px] text-slate-400">University Norms</div>
            </div>
          </div>
        </div>

        {/* Connecting Pipe */}
        <div className="text-center font-mono text-emerald-400 text-sm">
          ↓↓↓ Transformed through Agronomic Graph & Neural Vision Models ↓↓↓
        </div>

        {/* Layer 2: The Core AI Processing Engine */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-950 border-2 border-emerald-500/70 p-6 rounded-2xl text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/40">
            <Cpu className="w-4 h-4 text-emerald-400 animate-spin" />
            BKIN AI Agriculture Engine Core
          </div>
          <h4 className="text-lg font-bold text-white max-w-xl mx-auto">
            Neuro-Symbolic Reasoning + Spatial Anomaly Detection + Multi-Risk Correlation
          </h4>
          <p className="text-xs text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Combines deep learning computer vision on foliage imagery with deterministic agronomic rule engines validated by Indian Council of Agricultural Research (ICAR).
          </p>
        </div>

        {/* Connecting Pipe */}
        <div className="text-center font-mono text-emerald-400 text-sm">
          ↓↓↓ Actionable Intelligence Synthesis ↓↓↓
        </div>

        {/* Layer 3: Outcomes Grid */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
            Layer 3: Localized Decision Outputs
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl space-y-1">
              <strong className="text-emerald-300 block">🌱 Crop Health Index</strong>
              <p className="text-[11px] text-slate-300">Vegetation status & spatial stress demarcation.</p>
            </div>
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl space-y-1">
              <strong className="text-emerald-300 block">🌧️ Irrigation Timing</strong>
              <p className="text-[11px] text-slate-300">Preventive delay or scheduled replenishment.</p>
            </div>
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl space-y-1">
              <strong className="text-emerald-300 block">🐛 Pest & Disease Risk</strong>
              <p className="text-[11px] text-slate-300">Pre-outbreak warnings & IPM countermeasures.</p>
            </div>
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl space-y-1">
              <strong className="text-emerald-300 block">🧪 Nutrient Adjustment</strong>
              <p className="text-[11px] text-slate-300">Split-dose urea and micronutrient calculation.</p>
            </div>
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl space-y-1">
              <strong className="text-emerald-300 block">🌿 Regenerative Advice</strong>
              <p className="text-[11px] text-slate-300">Residue retention & soil carbon building.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Crop + Disease Knowledge Graph Explorer (Section 19) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-base text-slate-900">
              Crop + Disease Agronomic Knowledge Graph
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Hierarchical semantic graph linking: <code className="text-slate-700 font-semibold">Crop → Stage → Pest/Disease → Symptoms → Environmental Triggers → Risk → IPM Management</code>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {knowledgeGraphNodes.map((node, idx) => {
            const Icon = node.icon;
            return (
              <div
                key={node.id}
                className={`rounded-xl border p-3.5 space-y-1.5 transition-all text-xs relative ${node.color}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[10px] uppercase opacity-75">{node.title}</span>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="font-extrabold text-xs text-slate-900 leading-tight">
                  {node.subtitle}
                </div>
                {idx < 6 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-400 font-bold">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
}

