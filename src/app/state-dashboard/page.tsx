'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  Layers,
  Activity,
  Users,
  Eye,
  Radio,
  Download,
  AlertTriangle,
  CheckCircle2,
  Filter,
  ArrowRight,
} from 'lucide-react';
import { indianStatesData } from '@/data/states';
import { useApp } from '@/context/AppContext';
import { FederatedStateNodeInspector } from '@/components/network/FederatedStateNodeInspector';
import { SectionHero } from '@/components/ui/SectionHero';


export default function StateDashboardPage() {
  const { language } = useApp();
  const isHi = language === 'hi';
  const [selectedStateCode, setSelectedStateCode] = useState('PB');
  const currentState = indianStatesData.find((s) => s.stateCode === selectedStateCode) || indianStatesData[0];

  return (
    <div className="space-y-0">
      <SectionHero
        imageSrc="/assets/national-grid/india-grid.svg"
        theme="satellite"
        label={isHi ? 'विभागीय विश्लेषिकी पोर्टल' : 'DEPARTMENTAL ANALYTICS PORTAL'}
        heading={
          <span className="text-gradient-satellite">
            {isHi ? 'राज्य कृषि आसूचना डैशबोर्ड' : 'State Agriculture Intelligence Dashboard'}
          </span>
        }
        description={
          isHi
            ? 'राज्य कृषि सचिवालयों के लिए क्षेत्रीय फसल निगरानी, परामर्श प्रसार एवं रोग निगरानी ग्रिड।'
            : 'Regional crop monitoring, advisory reach, and disease surveillance for state agriculture secretariats.'
        }
        showDemoBadge={true}
        stats={[
          { value: currentState.name, label: isHi ? 'चयनित राज्य' : 'Selected State' },
          { value: `${currentState.connectedFarmersCount.toLocaleString()}`, label: isHi ? 'निगरानी में किसान' : 'Farmers Connected' },
          { value: `${currentState.satelliteCoveragePercent}%`, label: isHi ? 'सैटेलाइट कवरेज' : 'Satellite Coverage' },
        ]}

      >
        {/* State Selector Dropdown inside Hero */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs font-semibold text-emerald-200">
            {isHi ? 'राज्य नोड बदलें:' : 'Switch State Node:'}
          </span>
          <select
            value={selectedStateCode}
            onChange={(e) => setSelectedStateCode(e.target.value)}
            className="bg-emerald-950/80 border border-emerald-500/50 rounded-xl px-3 py-1.5 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 backdrop-blur"
          >
            {indianStatesData.map((st) => (
              <option key={st.stateCode} value={st.stateCode} className="bg-slate-900 text-white">
                {st.name} ({st.stateCode})
              </option>
            ))}
          </select>
        </div>
      </SectionHero>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">


      {/* State Metric KPIs Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-2xl border border-white/10 p-5 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Registered Farmers</span>
          <div className="text-2xl font-black text-slate-900">
            {currentState.connectedFarmersCount.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-emerald-700 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>94.2% Aadhaar Verified</span>
          </div>
        </div>

        <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-2xl border border-white/10 p-5 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Active Block Advisories</span>
          <div className="text-2xl font-black text-slate-900">
            {currentState.activeAdvisoriesCount.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-slate-500">Issued across all agro-climatic zones</div>
        </div>

        <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-2xl border border-white/10 p-5 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Satellite Coverage</span>
          <div className="text-2xl font-black text-emerald-800">
            {currentState.satelliteCoveragePercent}%
          </div>
          <div className="text-xs text-slate-500">Sentinel-2 10m cloud-free coverage</div>
        </div>

        <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-2xl border border-white/10 p-5 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Node Sync Status</span>
          <div className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span>{currentState.nodesStatus}</span>
          </div>
          <div className="text-xs text-slate-500">Latency: 18ms to National Gateway</div>
        </div>
      </div>

      {/* State Agro-Climatic Profile & Major Crops */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-2xl border border-white/10 p-6 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-base text-slate-900">
              {currentState.name} Agro-Ecological Profile
            </h3>
            <span className="text-xs text-slate-400 font-mono">Node ID: {currentState.stateCode}-NODE-01</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="font-bold text-slate-700 block mb-1">Agro-Climatic Zones:</span>
              <div className="flex flex-wrap gap-2">
                {currentState.agroClimaticZones.map((z) => (
                  <span
                    key={z}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-medium"
                  >
                    {z}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-700 block mb-1">Dominant Soil Associations:</span>
              <div className="flex flex-wrap gap-2">
                {currentState.soilTypes.map((st) => (
                  <span
                    key={st}
                    className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 font-medium"
                  >
                    {st}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-bold text-slate-700 block mb-1">Major Sown Commodities:</span>
              <div className="flex flex-wrap gap-2">
                {currentState.majorCrops.map((c) => (
                  <span
                    key={c}
                    className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 font-medium"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Active Outbreak Surveillance Flags */}
        <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-2xl border border-white/10 p-6 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-600" />
              Active Surveillance
            </h3>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800">
              Live Feed
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {currentState.activeDiseaseRisks.map((risk, idx) => (
              <div key={idx} className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
                <span className="font-bold text-amber-950 block">{risk}</span>
                <p className="text-amber-800 text-[11px]">
                  Scout reports received from 4 district monitoring stations. Automated advisory broadcast active.
                </p>
              </div>
            ))}

            <Link
              href="/officer-dashboard"
              className="mt-2 text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
            >
              <span>{isHi ? 'जिला अधिकारी कार्यक्षेत्र पर जाएं' : 'Go to District Officer Workspace'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Federated State Node Deep Inspector */}
      <FederatedStateNodeInspector />
      </div>
    </div>
  );
}

