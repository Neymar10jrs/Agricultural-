'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  ChevronRight,
  Sprout,
  Building2,
  Server,
  Layers,
  Home,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Satellite,
  Activity,
  Compass,
  FileText,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface DistrictOption {
  code: string;
  name: string;
  hindiName: string;
  activeAdvisories: number;
  ndviAverage: number;
  primaryCrops: string[];
}

interface BlockOption {
  code: string;
  name: string;
  hindiName: string;
  villagesCount: number;
  canalsActive: boolean;
  alertLevel: 'low' | 'moderate' | 'high';
}

interface VillageOption {
  code: string;
  name: string;
  hindiName: string;
  farmerCount: number;
  totalAcres: number;
  dominantSoil: string;
}

interface FarmOption {
  id: string;
  plotNo: string;
  ownerName: string;
  crop: string;
  cropHi: string;
  stage: string;
  stageHi: string;
  areaAcres: number;
  ndvi: number;
  riskScore: number;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
  advisoryNote: string;
  advisoryNoteHi: string;
}

const DRILLDOWN_DATA = {
  states: [
    {
      code: 'PB',
      name: 'Punjab',
      hindiName: 'पंजाब',
      districts: [
        {
          code: 'LDH',
          name: 'Ludhiana',
          hindiName: 'लुधियाना',
          activeAdvisories: 14,
          ndviAverage: 0.69,
          primaryCrops: ['Wheat', 'Paddy'],
          blocks: [
            {
              code: 'SMR',
              name: 'Samrala',
              hindiName: 'समराला',
              villagesCount: 64,
              canalsActive: true,
              alertLevel: 'low' as const,
              villages: [
                {
                  code: 'RNK',
                  name: 'Rohno Kalan',
                  hindiName: 'रोहणो कलां',
                  farmerCount: 284,
                  totalAcres: 840,
                  dominantSoil: 'Silty Clay Loam',
                  farms: [
                    {
                      id: 'BKIN-PB-LDH-042',
                      plotNo: 'Plot 3B',
                      ownerName: 'Jaswant Singh',
                      crop: 'Wheat (HD-2967)',
                      cropHi: 'गेहूं (HD-2967)',
                      stage: 'Tillering (Day 38)',
                      stageHi: 'कल्ले फूटने की अवस्था (38वां दिन)',
                      areaAcres: 2.4,
                      ndvi: 0.68,
                      riskScore: 67,
                      riskLevel: 'HIGH' as const,
                      advisoryNote: 'Weather Risk (Heavy Rain expected in 36h). Defer scheduled urea application.',
                      advisoryNoteHi: 'मौसम जोखिम (36 घंटे में भारी वर्षा की संभावना)। यूरिया का छिड़काव स्थगित करें।',
                    },
                    {
                      id: 'BKIN-PB-LDH-043',
                      plotNo: 'Plot 4A',
                      ownerName: 'Gurpreet Singh Dhillon',
                      crop: 'Wheat (PBW-550)',
                      cropHi: 'गेहूं (PBW-550)',
                      stage: 'Crown Root Initiation (Day 24)',
                      stageHi: 'मुकुट जड़ निर्माण (24वां दिन)',
                      areaAcres: 4.1,
                      ndvi: 0.62,
                      riskScore: 28,
                      riskLevel: 'LOW' as const,
                      advisoryNote: 'Canopy vigor normal. Soil moisture 34%. No immediate hazard detected.',
                      advisoryNoteHi: 'फसल की बढ़वार सामान्य। मिट्टी की नमी 34%। कोई तात्कालिक खतरा नहीं।',
                    },
                    {
                      id: 'BKIN-PB-LDH-044',
                      plotNo: 'Plot 1C',
                      ownerName: 'Balwinder Kaur',
                      crop: 'Mustard (RH-749)',
                      cropHi: 'सरसों (RH-749)',
                      stage: 'Pod Formation (Day 62)',
                      stageHi: 'फली बनने की अवस्था (62वां दिन)',
                      areaAcres: 1.8,
                      ndvi: 0.74,
                      riskScore: 42,
                      riskLevel: 'MODERATE' as const,
                      advisoryNote: 'Aphid scouting required on border rows; humidity elevated above 80%.',
                      advisoryNoteHi: 'सीमांत पंक्तियों पर माहू (चेपा) की निगरानी आवश्यक; आर्द्रता 80% से अधिक।',
                    },
                  ],
                },
                {
                  code: 'SEH',
                  name: 'Seh Village',
                  hindiName: 'सेह ग्राम',
                  farmerCount: 195,
                  totalAcres: 610,
                  dominantSoil: 'Alluvial Loam',
                  farms: [
                    {
                      id: 'BKIN-PB-LDH-088',
                      plotNo: 'Plot 2A',
                      ownerName: 'Harbhajan Singh',
                      crop: 'Wheat (DBW-187)',
                      cropHi: 'गेहूं (DBW-187)',
                      stage: 'Tillering (Day 35)',
                      stageHi: 'कल्ले फूटने की अवस्था (35वां दिन)',
                      areaAcres: 3.5,
                      ndvi: 0.71,
                      riskScore: 31,
                      riskLevel: 'LOW' as const,
                      advisoryNote: 'High biomass accumulation. Next irrigation cycle in 8 days.',
                      advisoryNoteHi: 'उत्कृष्ट बायोमास वृद्धि। अगला सिंचाई चक्र 8 दिन बाद।',
                    },
                  ],
                },
              ],
            },
            {
              code: 'KHN',
              name: 'Khanna',
              hindiName: 'खन्ना',
              villagesCount: 78,
              canalsActive: true,
              alertLevel: 'moderate' as const,
              villages: [],
            },
          ],
        },
        {
          code: 'HSP',
          name: 'Hoshiarpur',
          hindiName: 'होशियारपुर',
          activeAdvisories: 19,
          ndviAverage: 0.72,
          primaryCrops: ['Wheat', 'Kinnow Citrus'],
          blocks: [],
        },
      ],
    },
    {
      code: 'HR',
      name: 'Haryana',
      hindiName: 'हरियाणा',
      districts: [
        {
          code: 'HSR',
          name: 'Hisar',
          hindiName: 'हिसार',
          activeAdvisories: 11,
          ndviAverage: 0.64,
          primaryCrops: ['Mustard', 'Wheat', 'Cotton'],
          blocks: [],
        },
        {
          code: 'KRN',
          name: 'Karnal',
          hindiName: 'करनाल',
          activeAdvisories: 16,
          ndviAverage: 0.73,
          primaryCrops: ['Basmati Rice', 'Wheat'],
          blocks: [],
        },
      ],
    },
    {
      code: 'UP',
      name: 'Uttar Pradesh',
      hindiName: 'उत्तर प्रदेश',
      districts: [
        {
          code: 'AGR',
          name: 'Agra',
          hindiName: 'आगरा',
          activeAdvisories: 24,
          ndviAverage: 0.66,
          primaryCrops: ['Potato', 'Mustard', 'Wheat'],
          blocks: [],
        },
      ],
    },
  ],
};

export function IndiaFarmDrillDown() {
  const { language } = useApp();
  const isHi = language === 'hi';

  const [selectedStateCode, setSelectedStateCode] = useState<string>('PB');
  const [selectedDistrictCode, setSelectedDistrictCode] = useState<string>('LDH');
  const [selectedBlockCode, setSelectedBlockCode] = useState<string>('SMR');
  const [selectedVillageCode, setSelectedVillageCode] = useState<string>('RNK');
  const [selectedFarmId, setSelectedFarmId] = useState<string>('BKIN-PB-LDH-042');

  const currentState = DRILLDOWN_DATA.states.find((s) => s.code === selectedStateCode) || DRILLDOWN_DATA.states[0];
  const currentDistrict = currentState.districts.find((d) => d.code === selectedDistrictCode) || currentState.districts[0];
  const currentBlock = currentDistrict?.blocks?.find((b) => b.code === selectedBlockCode) || currentDistrict?.blocks?.[0];
  const currentVillage = currentBlock?.villages?.find((v) => v.code === selectedVillageCode) || currentBlock?.villages?.[0];
  const currentFarm = currentVillage?.farms?.find((f) => f.id === selectedFarmId) || currentVillage?.farms?.[0];

  return (
    <div className="space-y-6">
      {/* ── Drill-down Banner & Interactive Breadcrumb ── */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                {isHi ? 'चरणबद्ध ड्रिल-डाउन नेविगेटर' : 'Phase 6: Multi-Scale Drill-Down'}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-400/20 text-amber-300 border border-amber-300/30">
                Interactive Hierarchy
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {isHi ? 'भारत से खेत स्तर तक सहज अन्वेषण' : 'National Grid to Farm Plot Drill-Down'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {isHi
                ? 'राष्ट्रीय उपग्रह ग्रिड से सीधे राज्य, जिले, ब्लॉक और गांव होते हुए व्यक्तिगत खेत प्लॉट के डिजिटल ट्विन तक पहुंचें।'
                : 'Traverse continuously through India → State → District → Block → Village → Farm Plot with real-time agronomic telemetry.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/farm-digital-twin"
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
            >
              <span>{isHi ? 'डिजिटल ट्विन खोलें' : 'Open Farm Twin'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ── Breadcrumb Pipeline ── */}
        <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/80 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 px-2">Path:</span>

          <span className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 font-bold border border-emerald-800 flex items-center gap-1">
            <Radio className="w-3 h-3 text-emerald-400" />
            <span>India (भारत)</span>
          </span>

          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />

          <span className="px-2.5 py-1 rounded-lg bg-slate-700 text-slate-200 font-bold flex items-center gap-1">
            <Building2 className="w-3 h-3 text-emerald-400" />
            <span>{isHi ? currentState.hindiName : currentState.name}</span>
          </span>

          {currentDistrict && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="px-2.5 py-1 rounded-lg bg-slate-700 text-slate-200 font-bold flex items-center gap-1">
                <Server className="w-3 h-3 text-blue-400" />
                <span>{isHi ? currentDistrict.hindiName : currentDistrict.name}</span>
              </span>
            </>
          )}

          {currentBlock && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="px-2.5 py-1 rounded-lg bg-slate-700 text-slate-200 font-bold flex items-center gap-1">
                <Layers className="w-3 h-3 text-teal-400" />
                <span>{isHi ? currentBlock.hindiName : currentBlock.name}</span>
              </span>
            </>
          )}

          {currentVillage && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="px-2.5 py-1 rounded-lg bg-slate-700 text-slate-200 font-bold flex items-center gap-1">
                <Home className="w-3 h-3 text-amber-400" />
                <span>{isHi ? currentVillage.hindiName : currentVillage.name}</span>
              </span>
            </>
          )}

          {currentFarm && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-extrabold flex items-center gap-1 shadow-sm">
                <Sprout className="w-3 h-3" />
                <span>{currentFarm.plotNo} ({currentFarm.ownerName})</span>
              </span>
            </>
          )}
        </div>
      </div>

      {/* ── Interactive 5-Tier Selector Columns ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5 text-xs">
        {/* 1. State Selector */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="font-bold uppercase tracking-wider text-slate-500 text-[10px] flex items-center gap-1">
              <Building2 className="w-3 h-3 text-emerald-600" />
              <span>1. {isHi ? 'राज्य चुनें' : 'State'}</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Tier 2</span>
          </div>

          <div className="space-y-1.5">
            {DRILLDOWN_DATA.states.map((st) => (
              <button
                key={st.code}
                onClick={() => {
                  setSelectedStateCode(st.code);
                  setSelectedDistrictCode(st.districts[0]?.code || '');
                  setSelectedBlockCode(st.districts[0]?.blocks?.[0]?.code || '');
                  setSelectedVillageCode(st.districts[0]?.blocks?.[0]?.villages?.[0]?.code || '');
                  setSelectedFarmId(st.districts[0]?.blocks?.[0]?.villages?.[0]?.farms?.[0]?.id || '');
                }}
                className={`w-full p-2.5 rounded-xl text-left font-semibold transition border ${
                  selectedStateCode === st.code
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-400 shadow-sm ring-1 ring-emerald-500/20'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{isHi ? st.hindiName : st.name}</span>
                  <span className="text-[10px] font-mono text-slate-400">{st.code}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 2. District Selector */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="font-bold uppercase tracking-wider text-slate-500 text-[10px] flex items-center gap-1">
              <Server className="w-3 h-3 text-blue-600" />
              <span>2. {isHi ? 'जिला' : 'District'}</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Tier 3</span>
          </div>

          <div className="space-y-1.5">
            {currentState.districts.map((d) => (
              <button
                key={d.code}
                onClick={() => {
                  setSelectedDistrictCode(d.code);
                  setSelectedBlockCode(d.blocks?.[0]?.code || '');
                  setSelectedVillageCode(d.blocks?.[0]?.villages?.[0]?.code || '');
                  setSelectedFarmId(d.blocks?.[0]?.villages?.[0]?.farms?.[0]?.id || '');
                }}
                className={`w-full p-2.5 rounded-xl text-left font-semibold transition border ${
                  selectedDistrictCode === d.code
                    ? 'bg-blue-50 text-blue-900 border-blue-400 shadow-sm ring-1 ring-blue-500/20'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{isHi ? d.hindiName : d.name}</span>
                  <span className="text-[10px] font-mono text-slate-400">NDVI {d.ndviAverage}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Block Selector */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="font-bold uppercase tracking-wider text-slate-500 text-[10px] flex items-center gap-1">
              <Layers className="w-3 h-3 text-teal-600" />
              <span>3. {isHi ? 'ब्लॉक/तहसील' : 'Block'}</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Tier 4</span>
          </div>

          <div className="space-y-1.5">
            {currentDistrict?.blocks?.length ? (
              currentDistrict.blocks.map((b) => (
                <button
                  key={b.code}
                  onClick={() => {
                    setSelectedBlockCode(b.code);
                    setSelectedVillageCode(b.villages?.[0]?.code || '');
                    setSelectedFarmId(b.villages?.[0]?.farms?.[0]?.id || '');
                  }}
                  className={`w-full p-2.5 rounded-xl text-left font-semibold transition border ${
                    selectedBlockCode === b.code
                      ? 'bg-teal-50 text-teal-900 border-teal-400 shadow-sm ring-1 ring-teal-500/20'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{isHi ? b.hindiName : b.name}</span>
                    <span className="text-[10px] text-teal-700">{b.villagesCount} vil</span>
                  </div>
                </button>
              ))
            ) : (
              <span className="text-[11px] text-slate-400 italic block py-4 text-center">
                Demo node in expansion
              </span>
            )}
          </div>
        </div>

        {/* 4. Village Selector */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="font-bold uppercase tracking-wider text-slate-500 text-[10px] flex items-center gap-1">
              <Home className="w-3 h-3 text-amber-600" />
              <span>4. {isHi ? 'ग्राम क्लस्टर' : 'Village'}</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Tier 5</span>
          </div>

          <div className="space-y-1.5">
            {currentBlock?.villages?.length ? (
              currentBlock.villages.map((v) => (
                <button
                  key={v.code}
                  onClick={() => {
                    setSelectedVillageCode(v.code);
                    setSelectedFarmId(v.farms?.[0]?.id || '');
                  }}
                  className={`w-full p-2.5 rounded-xl text-left font-semibold transition border ${
                    selectedVillageCode === v.code
                      ? 'bg-amber-50 text-amber-900 border-amber-400 shadow-sm ring-1 ring-amber-500/20'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{isHi ? v.hindiName : v.name}</span>
                    <span className="text-[10px] text-amber-800">{v.farmerCount} f</span>
                  </div>
                </button>
              ))
            ) : (
              <span className="text-[11px] text-slate-400 italic block py-4 text-center">
                Select Samrala block for demo plots
              </span>
            )}
          </div>
        </div>

        {/* 5. Farm Plot Selector */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="font-bold uppercase tracking-wider text-slate-500 text-[10px] flex items-center gap-1">
              <Sprout className="w-3 h-3 text-emerald-700" />
              <span>5. {isHi ? 'खेत प्लॉट' : 'Farm Plot'}</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Tier 6</span>
          </div>

          <div className="space-y-1.5">
            {currentVillage?.farms?.length ? (
              currentVillage.farms.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFarmId(f.id)}
                  className={`w-full p-2.5 rounded-xl text-left font-semibold transition border ${
                    selectedFarmId === f.id
                      ? 'bg-emerald-800 text-white border-emerald-900 shadow-md ring-2 ring-emerald-500/20'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-xs">{f.plotNo}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-extrabold ${
                        f.riskLevel === 'HIGH'
                          ? selectedFarmId === f.id
                            ? 'bg-rose-400 text-slate-900'
                            : 'bg-rose-100 text-rose-800'
                          : selectedFarmId === f.id
                          ? 'bg-emerald-400 text-slate-900'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {f.riskLevel}
                    </span>
                  </div>
                  <span className={`text-[11px] block truncate ${selectedFarmId === f.id ? 'text-emerald-100' : 'text-slate-500'}`}>
                    {f.ownerName}
                  </span>
                </button>
              ))
            ) : (
              <span className="text-[11px] text-slate-400 italic block py-4 text-center">
                Select Rohno Kalan
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Active Farm Plot Intelligence Snapshot Card ── */}
      {currentFarm && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                  {currentFarm.id}
                </span>
                <span className="text-xs font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                  {currentFarm.plotNo} · {currentFarm.areaAcres} {isHi ? 'एकड़' : 'Acres'}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {currentFarm.ownerName} — {isHi ? currentFarm.cropHi : currentFarm.crop}
              </h3>
              <p className="text-xs text-slate-500">
                {isHi ? currentFarm.stageHi : currentFarm.stage} · {isHi ? currentVillage.hindiName : currentVillage.name},{' '}
                {isHi ? currentDistrict.hindiName : currentDistrict.name}, {isHi ? currentState.hindiName : currentState.name}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/farm-digital-twin"
                className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs transition flex items-center gap-1.5 shadow-md"
              >
                <span>{isHi ? 'डिजिटल ट्विन में पूरी रिपोर्ट देखें' : 'Launch Full Farm Digital Twin'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Metric Quad */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">NDVI Index</span>
              <span className="text-2xl font-black text-emerald-800">{currentFarm.ndvi}</span>
              <span className="text-[10px] text-slate-500 block">Healthy vegetative vigor</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Composite Risk</span>
              <span className={`text-2xl font-black ${currentFarm.riskScore > 60 ? 'text-rose-600' : 'text-emerald-700'}`}>
                {currentFarm.riskScore}%
              </span>
              <span className="text-[10px] text-slate-500 block">{currentFarm.riskLevel} Risk Alert</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Soil Profile</span>
              <span className="text-sm font-bold text-slate-800 block truncate">{currentVillage?.dominantSoil || 'Alluvial'}</span>
              <span className="text-[10px] text-slate-500 block">Moisture 32.5%</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Satellite Pass</span>
              <span className="text-sm font-bold text-slate-800 block">Sentinel-2 (10m)</span>
              <span className="text-[10px] text-emerald-600 font-semibold block">Synchronized 16 Sept</span>
            </div>
          </div>

          {/* Active Farm Advisory Notice */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <strong className="text-amber-950 font-bold block">
                {isHi ? 'खेत स्तर पर तत्काल परामर्श:' : 'Immediate Farm-Level Advisory:'}
              </strong>
              <p className="text-amber-900 leading-relaxed">
                {isHi ? currentFarm.advisoryNoteHi : currentFarm.advisoryNote}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
