'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Layers,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Droplets,
  Calculator,
} from 'lucide-react';
import { demoSoilProfile } from '@/data/demoFarm';
import { useApp } from '@/context/AppContext';
import { SectionHero } from '@/components/ui/SectionHero';

export default function SoilHealthPage() {
  const { dict, language } = useApp();
  const isHi = language === 'hi';
  const [soil] = useState(demoSoilProfile);

  return (
    <div>
      <SectionHero
        imageSrc="/assets/soil/soil-strata.svg"
        theme="soil"
        label={isHi ? 'मृदा स्वास्थ्य विश्लेषण' : 'SOIL HEALTH ANALYSIS'}

        heading={<><span className='text-gradient-gold'>{isHi ? 'मृदा स्वास्थ्य डैशबोर्ड' : 'Soil Health Dashboard'}</span></>}
        description={isHi ? 'आपके खेत की मिट्टी का गहन विश्लेषण — pH, नाइट्रोजन, फास्फोरस, पोटैशियम और जैव विविधता' : 'Deep soil profile analysis for your farm — pH, NPK levels, organic carbon, microbial activity and texture'}
        showDemoBadge={true}
        stats={[
          { value: '6.8', label: isHi ? 'pH स्तर' : 'pH Level' },
          { value: '1.8%', label: isHi ? 'जैविक कार्बन' : 'Organic Carbon' },
          { value: 'Good', label: isHi ? 'मृदा स्वास्थ्य' : 'Soil Health' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Primary Parameters Grid (Section 16: pH, N, P, K, OC, EC, Moisture, Type, Texture) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* pH */}
        <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-2xl border border-white/10 p-4 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-2">
          <div className="text-[10px] uppercase font-bold text-slate-400">Soil Reaction (pH)</div>
          <div className="text-2xl font-extrabold text-slate-900">{soil.ph}</div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-emerald-700 font-semibold">🟢 Neutral (Optimal)</span>
            <span className="text-slate-400">Ideal: 6.5–7.5</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-600 h-full w-[72%]" />
          </div>
        </div>

        {/* Nitrogen */}
        <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-2xl border border-white/10 p-4 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-2">
          <div className="text-[10px] uppercase font-bold text-slate-400">Available Nitrogen (N)</div>
          <div className="text-2xl font-extrabold text-slate-900">
            {soil.nitrogenKgPerHa} <span className="text-xs font-normal text-slate-500">kg/ha</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-rose-700 font-semibold">🔴 Deficient</span>
            <span className="text-slate-400">Target: 280+</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-rose-500 h-full w-[45%]" />
          </div>
        </div>

        {/* Phosphorus */}
        <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-2xl border border-white/10 p-4 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-2">
          <div className="text-[10px] uppercase font-bold text-slate-400">Available Phosphorus (P)</div>
          <div className="text-2xl font-extrabold text-slate-900">
            {soil.phosphorusKgPerHa} <span className="text-xs font-normal text-slate-500">kg/ha</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-amber-700 font-semibold">🟡 Medium Status</span>
            <span className="text-slate-400">Target: 20–30</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full w-[65%]" />
          </div>
        </div>

        {/* Potassium */}
        <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-2xl border border-white/10 p-4 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-2">
          <div className="text-[10px] uppercase font-bold text-slate-400">Available Potassium (K)</div>
          <div className="text-2xl font-extrabold text-slate-900">
            {soil.potassiumKgPerHa} <span className="text-xs font-normal text-slate-500">kg/ha</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-emerald-700 font-semibold">🟢 Sufficient</span>
            <span className="text-slate-400">Target: 250+</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-600 h-full w-[85%]" />
          </div>
        </div>

        {/* Organic Carbon */}
        <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-2xl border border-white/10 p-4 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-2 col-span-2 sm:col-span-1">
          <div className="text-[10px] uppercase font-bold text-slate-400">Organic Carbon (OC)</div>
          <div className="text-2xl font-extrabold text-slate-900">{soil.organicCarbonPercent}%</div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-rose-700 font-semibold">🔴 Low Organic Matter</span>
            <span className="text-slate-400">Target: &gt;0.75%</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-rose-500 h-full w-[40%]" />
          </div>
        </div>
      </div>

      {/* Secondary Soil Properties Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] p-4 rounded-2xl border border-white/10 text-xs shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
        <div>
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Soil Classification</span>
          <span className="font-bold text-slate-800 text-sm mt-0.5 block">{soil.soilType}</span>
          <span className="text-[10px] text-slate-400">Indo-Gangetic Alluvium</span>
        </div>

        <div>
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Physical Texture</span>
          <span className="font-bold text-slate-800 text-sm mt-0.5 block">{soil.texture} Loam</span>
          <span className="text-[10px] text-slate-400">Balanced Sand/Silt/Clay</span>
        </div>

        <div>
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Electrical Conductivity (EC)</span>
          <span className="font-bold text-slate-800 text-sm mt-0.5 block">{soil.electricalConductivityDsm} dS/m</span>
          <span className="text-[10px] text-emerald-700 font-semibold">Non-saline (&lt;1.0)</span>
        </div>

        <div>
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Volumetric Soil Moisture</span>
          <span className="font-bold text-slate-800 text-sm mt-0.5 block">{soil.soilMoisturePercent}%</span>
          <span className="text-[10px] text-emerald-700 font-semibold">Adequate Water Holding</span>
        </div>
      </div>

      {/* Explainable Nutrient Recommendations (Section 16: "Why this recommendation?") */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Nutrient Action Recommendations & Rationales
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Based on Ludhiana Agricultural University Package of Practices
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {soil.recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="telemetry-card p-5 space-y-3 bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] border border-white/10 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.10)]"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-sm text-slate-900">{rec.nutrient}</span>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    rec.status === 'Deficient'
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {rec.status}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider block mb-0.5">
                  Action to Take:
                </span>
                <p className="text-xs font-semibold text-slate-800 leading-snug">
                  {rec.action}
                </p>
              </div>

              {/* Mandatory "Why this recommendation?" block */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1">
                  <HelpCircle className="w-3 h-3 text-emerald-600" />
                  Why this recommendation?
                </span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {rec.why}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-Link to Regenerative Agriculture */}
      <div className="bg-emerald-900 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="font-bold text-base">Long-Term Soil Carbon Regeneration</h4>
          <p className="text-xs text-emerald-200 max-w-xl">
            Improving Organic Carbon from 0.46% to 0.75% requires systematic residue retention, green manuring, and bio-fertilizer integration.
          </p>
        </div>
        <Link
          href="/regenerative-ag"
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs shrink-0 transition flex items-center gap-1.5"
        >
          <span>Explore Regenerative Practices</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      </div>
    </div>
  );
}
