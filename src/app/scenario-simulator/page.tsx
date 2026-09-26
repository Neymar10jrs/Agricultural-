'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sliders,
  Sparkles,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Droplets,
  Thermometer,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  Info,
  Layers,
  Leaf,
  Wind,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SectionHero } from '@/components/ui/SectionHero';


interface PresetScenario {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  tempOffset: number;
  rainOffset: number;
  soilMoisture: number;
  nitrogenKg: number;
}

const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'drought',
    name: 'Severe Dry Spell / Drought Shock',
    nameHi: 'तीव्र शुष्क दौर / सूखा झटका',
    description: '3 weeks rain deficit, 2.5°C above seasonal normal, soil moisture falls to 20%.',
    descriptionHi: 'लगातार 3 सप्ताह वर्षा की कमी, तापमान 2.5°C अधिक, मिट्टी की नमी 20% तक गिरना।',
    tempOffset: 2.5,
    rainOffset: -50,
    soilMoisture: 20,
    nitrogenKg: 195,
  },
  {
    id: 'downpour',
    name: 'Unseasonal Cloudburst / Flooding',
    nameHi: 'असामयिक भारी वर्षा / जलभराव',
    description: '75mm intense rain in 24 hours causing root zone waterlogging.',
    descriptionHi: '24 घंटों में 75 मिमी मूसलाधार वर्षा जिससे जड़ क्षेत्र में जलभराव की स्थिति।',
    tempOffset: -1.0,
    rainOffset: 80,
    soilMoisture: 42,
    nitrogenKg: 160,
  },
  {
    id: 'terminal-heat',
    name: 'Terminal Heat Stress at Grain Fill',
    nameHi: 'दाना भरने के समय लू / उच्च तापमान तनाव',
    description: 'March heatwave with daytime peaks exceeding 35°C during grain filling.',
    descriptionHi: 'मार्च में दाना भरने के समय अचानक लू चलना व तापमान 35°C के पार जाना।',
    tempOffset: 4.5,
    rainOffset: -20,
    soilMoisture: 26,
    nitrogenKg: 195,
  },
  {
    id: 'regenerative',
    name: 'Climate-Resilient Regenerative Package',
    nameHi: 'जलवायु-सहिष्णु प्राकृतिक / पुनर्योजी पैकेज',
    description: 'Zero-tillage with paddy straw mulch, biochar amendment, and light deficit irrigation.',
    descriptionHi: 'हैप्पी सीडर से शून्य-जुताई, पराली मल्चिंग और जैव-चार से नमी संरक्षण।',
    tempOffset: 0,
    rainOffset: 0,
    soilMoisture: 35,
    nitrogenKg: 240,
  },
];

export default function ScenarioSimulatorPage() {
  const { language } = useApp();
  const isHi = language === 'hi';

  const [activePreset, setActivePreset] = useState<string>('drought');
  const [tempOffset, setTempOffset] = useState<number>(2.5);
  const [rainOffset, setRainOffset] = useState<number>(-50);
  const [soilMoisture, setSoilMoisture] = useState<number>(20);
  const [nitrogenKg, setNitrogenKg] = useState<number>(195);
  const [cropAreaAcres, setCropAreaAcres] = useState<number>(2.4);

  const applyPreset = (preset: PresetScenario) => {
    setActivePreset(preset.id);
    setTempOffset(preset.tempOffset);
    setRainOffset(preset.rainOffset);
    setSoilMoisture(preset.soilMoisture);
    setNitrogenKg(preset.nitrogenKg);
  };

  // ── Dynamic Agronomic Simulation Logic ──
  // Base wheat yield: 21.5 quintals / acre
  const baseYieldPerAcre = 21.5;

  // Temperature impact penalty: -4.5% per °C above +1°C
  const tempImpact = tempOffset > 1 ? -((tempOffset - 1) * 4.5) : tempOffset < -1 ? -2.0 : 0;

  // Moisture impact penalty: optimal 30-36%
  let moistureImpact = 0;
  if (soilMoisture < 25) {
    moistureImpact = -((25 - soilMoisture) * 1.8);
  } else if (soilMoisture > 38) {
    moistureImpact = -((soilMoisture - 38) * 1.5); // waterlogging
  } else {
    moistureImpact = +3.0; // optimal moisture bonus
  }

  // Rainfall anomaly impact
  const rainImpact = rainOffset < -30 ? -8.0 : rainOffset > 50 ? -6.0 : +2.0;

  // Nitrogen deficit/excess impact
  const nitrogenImpact = nitrogenKg < 180 ? -6.5 : nitrogenKg > 260 ? -3.0 : +3.5;

  const totalYieldImpactPct = Math.max(-45, Math.min(25, Number((tempImpact + moistureImpact + rainImpact + nitrogenImpact).toFixed(1))));
  const projectedYieldPerAcre = Number((baseYieldPerAcre * (1 + totalYieldImpactPct / 100)).toFixed(1));
  const totalFarmYield = Number((projectedYieldPerAcre * cropAreaAcres).toFixed(1));

  // Economic impact: Wheat MSP ~₹2,275 per quintal
  const mspPerQuintal = 2275;
  const baseRevenue = baseYieldPerAcre * cropAreaAcres * mspPerQuintal;
  const projectedRevenue = totalFarmYield * mspPerQuintal;
  const revenueVariance = Math.round(projectedRevenue - baseRevenue);

  return (
    <div className="space-y-0">
      <SectionHero
        imageSrc="/assets/weather/weather-radar.svg"
        theme="weather"
        label={isHi ? 'जलवायु-स्मार्ट कृषि परिदृश्य सिम्युलेटर' : 'CLIMATE-SMART SCENARIO ENGINE'}
        heading={
          <span className="text-gradient-satellite">
            {isHi ? 'कृषि परिदृश्य व क्या-अगर (What-If) सिमुलेटर' : 'Farm Climate & What-If Scenario Simulator'}
          </span>
        }
        description={
          isHi
            ? 'तापमान वृद्धि, अनियमित वर्षा, सूखा और पोषक तत्वों की कमी के प्रभाव का वास्तविक समय अनुकरण करें और पहले से ही निवारक रणनीति तैयार करें।'
            : 'Simulate climate shocks, terminal heat stress, flash droughts, and soil nutrient deficits to stress-test your farm before weather anomalies occur.'
        }
        showDemoBadge={true}
        stats={[
          { value: 'HD-2967', label: isHi ? 'परीक्षित फसल' : 'Wheat Variety' },
          { value: '2.4 Ac', label: isHi ? 'खेत क्षेत्र' : 'Farm Area' },
          { value: `${totalYieldImpactPct > 0 ? '+' : ''}${totalYieldImpactPct}%`, label: isHi ? 'अनुमानित उपज प्रभाव' : 'Yield Variance' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ── Preset Scenario Toggles ── */}
        <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-md space-y-3">

        <div className="pt-3 border-t border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-slate-300 block">
            {isHi ? 'त्वरित पूर्व-निर्धारित परिदृश्य चुनें:' : 'Select a Pre-Configured Climate Scenario:'}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {PRESET_SCENARIOS.map((p) => {
              const isSelected = activePreset === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => applyPreset(p)}
                  className={`p-3 rounded-2xl text-left border transition ${
                    isSelected
                      ? 'bg-emerald-800 text-white border-emerald-400 shadow-md ring-2 ring-emerald-500/30'
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs">{isHi ? p.nameHi : p.name}</span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
                  </div>
                  <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                    {isHi ? p.descriptionHi : p.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Simulation Dashboard Grid: Sliders (Left) & Real-time Projections (Right) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders Workspace (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-700" />
                {isHi ? 'मौसम व मृदा चर समायोजित करें' : 'Interactive Stress Variables & Farm Inputs'}
              </h2>
              <button
                onClick={() => applyPreset(PRESET_SCENARIOS[0])}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isHi ? 'डिफ़ॉल्ट रीसेट' : 'Reset'}</span>
              </button>
            </div>

            {/* Slider 1: Temperature Offset */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Thermometer className="w-4 h-4 text-rose-500" />
                  <span>{isHi ? 'तापमान विचलन (Temperature Anomaly)' : 'Temperature Deviation'}</span>
                </span>
                <span className="font-mono font-extrabold text-sm text-rose-600">
                  {tempOffset > 0 ? `+${tempOffset}` : tempOffset}°C
                </span>
              </div>
              <input
                type="range"
                min="-2"
                max="6"
                step="0.5"
                value={tempOffset}
                onChange={(e) => {
                  setTempOffset(Number(e.target.value));
                  setActivePreset('custom');
                }}
                className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>-2°C (Cooler/Frost)</span>
                <span>Normal (+0°C)</span>
                <span>+6°C (Extreme Heat)</span>
              </div>
            </div>

            {/* Slider 2: Rain Offset */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span>{isHi ? 'वर्षा असामान्यता (Rainfall Deficit / Surplus)' : 'Rainfall Anomaly'}</span>
                </span>
                <span className="font-mono font-extrabold text-sm text-blue-600">
                  {rainOffset > 0 ? `+${rainOffset}` : rainOffset}%
                </span>
              </div>
              <input
                type="range"
                min="-80"
                max="100"
                step="5"
                value={rainOffset}
                onChange={(e) => {
                  setRainOffset(Number(e.target.value));
                  setActivePreset('custom');
                }}
                className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>-80% (Extreme Drought)</span>
                <span>0% (Seasonal Normal)</span>
                <span>+100% (Flash Flood)</span>
              </div>
            </div>

            {/* Slider 3: Soil Moisture */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-amber-600" />
                  <span>{isHi ? 'मिट्टी की नमी (Soil Moisture %)' : 'Root Zone Soil Moisture'}</span>
                </span>
                <span className="font-mono font-extrabold text-sm text-amber-700">
                  {soilMoisture}%
                </span>
              </div>
              <input
                type="range"
                min="12"
                max="45"
                step="1"
                value={soilMoisture}
                onChange={(e) => {
                  setSoilMoisture(Number(e.target.value));
                  setActivePreset('custom');
                }}
                className="w-full accent-amber-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>12% (Wilting point)</span>
                <span>32% (Optimal)</span>
                <span>45% (Saturated)</span>
              </div>
            </div>

            {/* Slider 4: Nitrogen application */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  <span>{isHi ? 'उपलब्ध नाइट्रोजन (Available Nitrogen)' : 'Nitrogen Dosage (kg/ha)'}</span>
                </span>
                <span className="font-mono font-extrabold text-sm text-emerald-700">
                  {nitrogenKg} kg/ha
                </span>
              </div>
              <input
                type="range"
                min="120"
                max="300"
                step="5"
                value={nitrogenKg}
                onChange={(e) => {
                  setNitrogenKg(Number(e.target.value));
                  setActivePreset('custom');
                }}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>120 kg (Deficient)</span>
                <span>240 kg (Benchmark)</span>
                <span>300 kg (Excess)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-Time Impact Projections (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-6 sticky top-24">
            <div className="space-y-1 border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {isHi ? 'सिम्युलेशन परिणाम' : 'Simulated Real-Time Outcome'}
              </span>
              <h3 className="text-xl font-black text-slate-900">
                {isHi ? 'अनुमानित उपज व आर्थिक प्रभाव' : 'Projected Yield & Economic Variance'}
              </h3>
            </div>

            {/* Big Yield Variance Card */}
            <div
              className={`p-5 rounded-2xl border text-center space-y-1.5 ${
                totalYieldImpactPct < -10
                  ? 'bg-rose-50 border-rose-200 text-rose-900'
                  : totalYieldImpactPct > 5
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}
            >
              <span className="text-[11px] font-bold uppercase tracking-wider block">
                {isHi ? 'अनुमानित उपज विचलन' : 'Projected Yield Variance'}
              </span>
              <div className="text-4xl font-black tracking-tight">
                {totalYieldImpactPct > 0 ? `+${totalYieldImpactPct}` : totalYieldImpactPct}%
              </div>
              <span className="text-xs font-semibold block">
                {projectedYieldPerAcre} quintals/acre (Baseline: 21.5 q/acre)
              </span>
            </div>

            {/* Economic Variance */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Harvest</span>
                <span className="text-xl font-black text-slate-900">{totalFarmYield} q</span>
                <span className="text-[10px] text-slate-500 block">Across 2.4 acres</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Revenue Variance</span>
                <span
                  className={`text-xl font-black ${
                    revenueVariance < 0 ? 'text-rose-600' : 'text-emerald-700'
                  }`}
                >
                  {revenueVariance > 0 ? `+₹${revenueVariance.toLocaleString('en-IN')}` : `-₹${Math.abs(revenueVariance).toLocaleString('en-IN')}`}
                </span>
                <span className="text-[10px] text-slate-500 block">At MSP ₹2,275/q</span>
              </div>
            </div>

            {/* Recommended Pre-emptive Countermeasure */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2 text-xs">
              <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>{isHi ? 'अनुशंसित बचाव रणनीति' : 'Recommended Pre-emptive Playbook'}</span>
              </span>
              <p className="text-[11px] text-emerald-900 leading-relaxed">
                {soilMoisture < 22
                  ? (isHi ? 'तत्काल ड्रिप या शाम की हल्की सिंचाई दें। पत्तियों पर 0.5% पोटेशियम नाइट्रेट का छिड़काव करें।' : 'Deploy deficit micro-irrigation immediately; apply foliar potassium nitrate to preserve leaf turgidity.')
                  : soilMoisture > 40
                  ? (isHi ? 'खेत की मुख्य नालियों को खोलें; जड़ सड़न से बचने के लिए जल निकासी सुनिश्चित करें।' : 'Clear boundary drainage trenches to prevent hypoxic root suffocation.')
                  : (isHi ? 'वर्तमान स्थितियाँ इष्टतम हैं। नियमित खरपतवार नियंत्रण व रोग निगरानी जारी रखें।' : 'Conditions remain resilient. Maintain balanced fertigation and regular stripe rust scouting.')}
              </p>
            </div>

            {/* Links */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <Link
                href="/my-farm"
                className="text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1"
              >
                <span>{isHi ? 'मेरा खेत देखें' : 'View My Farm'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/todays-advisory"
                className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1"
              >
                <span>{isHi ? 'आज की सलाह पर जाएं' : 'Apply to Advisory'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

