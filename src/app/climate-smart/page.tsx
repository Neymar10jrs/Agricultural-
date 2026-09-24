'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Droplets,
  TrendingUp,
  AlertTriangle,
  Layers,
  Sparkles,
  Info,
  ArrowRight,
  CheckCircle2,
  Calendar,
  DollarSign,
  HelpCircle,
} from 'lucide-react';
import { climateScenariosData } from '@/data/scenarios';
import { formatCurrency } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import { SectionHero } from '@/components/ui/SectionHero';


export default function ClimateSmartPage() {
  const { language } = useApp();
  const isHi = language === 'hi';
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [selectedSeason, setSelectedSeason] = useState('Rabi');
  const [selectedWaterAccess, setSelectedWaterAccess] = useState('Tubewell Borewell');
  const [farmAcres, setFarmAcres] = useState(2.4);

  return (
    <div className="space-y-0">
      <SectionHero
        imageSrc="/assets/weather/weather-radar.svg"
        theme="weather"
        label={isHi ? 'जलवायु लचीलापन व परिदृश्य मॉडलिंग' : 'CLIMATE RESILIENCE & SCENARIO MODELING'}
        heading={
          <span className="text-gradient-satellite">
            {isHi ? 'जलवायु-स्मार्ट कृषि परिदृश्य' : 'Climate Smart Farming Scenarios'}
          </span>
        }
        description={
          isHi
            ? 'जल उपलब्धता, मृदा प्रभाव, आर्थिक लागत और जलवायु संवेदनशीलता के विरुद्ध वैकल्पिक कृषि पद्धतियों की तुलना करें।'
            : 'Compare alternative agronomic practices against water availability, soil impact, economic cost, and climate vulnerability.'
        }
        showDemoBadge={true}
        stats={[
          { value: selectedCrop, label: isHi ? 'फसल' : 'Crop' },
          { value: `${farmAcres} Ac`, label: isHi ? 'खेत क्षेत्र' : 'Area' },
          { value: '3', label: isHi ? 'परिदृश्य मॉडल' : 'Models' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">


      {/* Farm Input Parameters Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
          Simulation Input Parameters
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Target Crop</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
            >
              <option value="Wheat">Wheat (Rabi Season)</option>
              <option value="Rice">Rice / Paddy (Kharif)</option>
              <option value="Cotton">Cotton</option>
              <option value="Mustard">Mustard</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Cropping Season</label>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
            >
              <option value="Rabi">Rabi (Winter - Current)</option>
              <option value="Kharif">Kharif (Monsoon)</option>
              <option value="Zaid">Zaid (Summer)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Water Source / Availability</label>
            <select
              value={selectedWaterAccess}
              onChange={(e) => setSelectedWaterAccess(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
            >
              <option value="Tubewell Borewell">Deep Tubewell / Groundwater</option>
              <option value="Canal">Canal Irrigation Rotational</option>
              <option value="Micro-irrigation">Drip / Micro-sprinkler</option>
              <option value="Rainfed">Rainfed / Water Scarcity</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Farm Area (Acres)</label>
            <input
              type="number"
              step="0.1"
              value={farmAcres}
              onChange={(e) => setFarmAcres(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
            />
          </div>
        </div>
      </div>

      {/* Mandatory Neutral Comparison Guidance Notice (Section 20) */}
      <div className="bg-slate-100/90 rounded-xl p-4 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed text-[11px]">
          <strong>Transparent Comparison Philosophy:</strong> BKIN does not label scenarios as &apos;Best&apos;, &apos;Worst&apos;, or &apos;Guaranteed Profit&apos;. Every farming approach carries distinct operational trade-offs between water efficiency, machinery requirements, soil biology, and market stability. Farmers retain full decision-making sovereignty.
        </p>
      </div>

      {/* Multi-Scenario Comparative Side-by-Side Cards (Section 20) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {climateScenariosData.map((sc) => (
          <div
            key={sc.scenarioId}
            className="telemetry-card bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Scenario Header */}
              <div className="p-5 border-b border-slate-100 bg-slate-50/60">
                <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                  Scenario Option
                </span>
                <h3 className="font-extrabold text-base text-slate-900 mt-1 leading-snug">
                  {sc.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  {sc.description}
                </p>
              </div>

              {/* Metric Matrix */}
              <div className="p-5 space-y-3.5 border-b border-slate-100 text-xs">
                {/* Water Demand */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-blue-600" />
                    Water Demand:
                  </span>
                  <span className="font-bold text-slate-900">
                    {sc.waterDemandM3PerAcre} m³/acre
                    {sc.waterSavingsPercentVsBaseline > 0 && (
                      <span className="text-[10px] text-emerald-700 ml-1 font-semibold">
                        (-{sc.waterSavingsPercentVsBaseline}%)
                      </span>
                    )}
                  </span>
                </div>

                {/* Climate Risk */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    Climate Risk Score:
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${sc.climateRiskScore > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                        style={{ width: `${sc.climateRiskScore}%` }}
                      />
                    </div>
                    <span className="font-bold text-slate-800">{sc.climateRiskScore}/100</span>
                  </div>
                </div>

                {/* Soil Health Impact */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-600" />
                    Soil Impact Score:
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full"
                        style={{ width: `${sc.soilImpactScore}%` }}
                      />
                    </div>
                    <span className="font-bold text-slate-800">{sc.soilImpactScore}/100</span>
                  </div>
                </div>

                {/* Crop Duration */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    Field Duration:
                  </span>
                  <span className="font-bold text-slate-900">{sc.cropDurationDays} Days</span>
                </div>

                {/* Input Cost */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-slate-500" />
                    Est. Input Cost:
                  </span>
                  <span className="font-bold text-slate-900">
                    {formatCurrency(sc.inputCostPerAcreInr)} / acre
                  </span>
                </div>
              </div>

              {/* Resilience Benefits */}
              <div className="p-5 space-y-3 text-xs">
                <div>
                  <span className="font-bold text-emerald-800 text-[11px] uppercase tracking-wider block mb-1.5">
                    Potential Resilience Benefits:
                  </span>
                  <ul className="space-y-1.5 text-slate-700 pl-2">
                    {sc.resilienceBenefits.map((ben, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Operational Considerations */}
                <div className="pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider block mb-1.5">
                    Input & Machinery Considerations:
                  </span>
                  <ul className="space-y-1.5 text-slate-600 pl-2">
                    {sc.considerations.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => alert(`Scenario parameters logged for farm ${farmAcres} acres.`)}
                className="w-full py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
              >
                Model this Option for My Acreage
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

