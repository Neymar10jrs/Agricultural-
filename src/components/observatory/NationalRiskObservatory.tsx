'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Flame,
  CloudRain,
  SunMedium,
  Bug,
  Activity,
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
  Eye,
  MapPin,
  Calendar,
  Layers,
  CheckCircle2,
  TrendingUp,
  Radio,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export type HazardType = 'drought' | 'flood' | 'heatwave' | 'pest' | 'disease';
export type SeverityLevel = 'severe' | 'high' | 'moderate' | 'low';

export interface HotspotRecord {
  id: string;
  stateCode: string;
  stateName: string;
  stateHindi: string;
  hazardType: HazardType;
  severity: SeverityLevel;
  type: 'forecast' | 'confirmed';
  affectedDistricts: string[];
  vulnerableCrops: string[];
  vulnerableCropsHi: string[];
  estimatedHectares: string;
  timeframe: string;
  timeframeHi: string;
  leadTimeHours: number;
  triggerDriver: string;
  triggerDriverHi: string;
  recommendedMitigation: string;
  recommendedMitigationHi: string;
  sourceAuthority: string;
}

export const NATIONAL_HOTSPOTS: HotspotRecord[] = [
  {
    id: 'HS-001',
    stateCode: 'PB',
    stateName: 'Punjab',
    stateHindi: 'पंजाब',
    hazardType: 'disease',
    severity: 'high',
    type: 'forecast',
    affectedDistricts: ['Rupnagar', 'Hoshiarpur', 'SBS Nagar', 'Gurdaspur'],
    vulnerableCrops: ['Wheat (HD-2967, PBW-343)'],
    vulnerableCropsHi: ['गेहूं (HD-2967, PBW-343)'],
    estimatedHectares: '68,400 ha',
    timeframe: 'Next 5-7 Days (72h critical)',
    timeframeHi: 'अगले 5-7 दिन (72 घंटे महत्वपूर्ण)',
    leadTimeHours: 72,
    triggerDriver: 'High canopy humidity (88%) and micro-climate temperatures between 12-19°C in Shivalik foothills.',
    triggerDriverHi: 'शिवालिक की तलहटी में उच्च नमी (88%) तथा 12-19°C का सूक्ष्म-जलवायु तापमान।',
    recommendedMitigation: 'Prophylactic propiconazole spray (0.1%) on northern parcel boundaries; cease flood irrigation.',
    recommendedMitigationHi: 'उत्तरी सीमांत खेतों पर प्रोपिकोनाज़ोल (0.1%) का छिड़काव करें; अधिक सिंचाई रोकें।',
    sourceAuthority: 'ICAR-IIWBR & PAU Ludhiana Agro-met Model',
  },
  {
    id: 'HS-002',
    stateCode: 'MH',
    stateName: 'Maharashtra',
    stateHindi: 'महाराष्ट्र',
    hazardType: 'drought',
    severity: 'severe',
    type: 'confirmed',
    affectedDistricts: ['Beed', 'Osmanabad (Dharashiv)', 'Jalna', 'Latur'],
    vulnerableCrops: ['Soybean', 'Cotton', 'Pigeon Pea (Tur)'],
    vulnerableCropsHi: ['सोयाबीन', 'कपास', 'अरहर (तूर)'],
    estimatedHectares: '240,000 ha',
    timeframe: 'Ongoing Dry Spell (Day 21)',
    timeframeHi: 'जारी शुष्क दौर (21वां दिन)',
    leadTimeHours: 24,
    triggerDriver: 'Root-zone soil moisture dropped below 22% (wilting threshold 19%); consecutive 21 days rain deficit.',
    triggerDriverHi: 'जड़ क्षेत्र की नमी 22% से नीचे गिरी (मुरझाने की सीमा 19%); लगातार 21 दिनों की वर्षा कमी।',
    recommendedMitigation: 'Deploy drip micro-irrigation at 40% deficit scheduling; apply potassium nitrate foliar spray to preserve stomatal turgor.',
    recommendedMitigationHi: 'ड्रिप माइक्रो-सिंचाई लागू करें; पत्तियों पर पोटेशियम नाइट्रेट का छिड़काव करें ताकि नमी बनी रहे।',
    sourceAuthority: 'Mahavedh Automatic Weather Stations & MRSAC',
  },
  {
    id: 'HS-003',
    stateCode: 'UP',
    stateName: 'Uttar Pradesh',
    stateHindi: 'उत्तर प्रदेश',
    hazardType: 'disease',
    severity: 'high',
    type: 'confirmed',
    affectedDistricts: ['Agra', 'Aligarh', 'Mathura', 'Hathras'],
    vulnerableCrops: ['Potato (Kufri Pukhraj, Kufri Bahar)'],
    vulnerableCropsHi: ['आलू (कुफरी पुखराज, कुफरी बहार)'],
    estimatedHectares: '112,000 ha',
    timeframe: 'Critical 48h Window',
    timeframeHi: 'अति-महत्वपूर्ण 48 घंटे',
    leadTimeHours: 48,
    triggerDriver: 'Consecutive heavy dew nights with persistent dense fog (RH >92%) favorable for Phytophthora infestans sporulation.',
    triggerDriverHi: 'लगातार भारी ओस और घना कोहरा (RH >92%) जिससे लेट ब्लाइट के फंगस तेजी से फैल रहे हैं।',
    recommendedMitigation: 'Immediate preventive application of Mancozeb (2.5g/L) or Cymoxanil+Mancozeb combination.',
    recommendedMitigationHi: 'मैनकोजेब (2.5 ग्राम/लीटर) या साइमोक्सानिल+मैनकोजेब का तत्काल छिड़काव करें।',
    sourceAuthority: 'CPRI Shimla Regional Station & UP Dept of Horticulture',
  },
  {
    id: 'HS-004',
    stateCode: 'HR',
    stateName: 'Haryana',
    stateHindi: 'हरियाणा',
    hazardType: 'pest',
    severity: 'moderate',
    type: 'forecast',
    affectedDistricts: ['Hisar', 'Fatehabad', 'Sirsa', 'Bhiwani'],
    vulnerableCrops: ['Mustard (Raya)', 'Wheat'],
    vulnerableCropsHi: ['सरसों (राया)', 'गेहूं'],
    estimatedHectares: '54,000 ha',
    timeframe: 'Next 3-5 Days',
    timeframeHi: 'अगले 3-5 दिन',
    leadTimeHours: 96,
    triggerDriver: 'Sudden temperature rise to 24°C with overcast skies creating optimal breeding conditions for Lipaphis erysimi (Aphids).',
    triggerDriverHi: 'तापमान में 24°C की आकस्मिक वृद्धि व बादलों का जमना, जिससे माहू (एफिड्स) का प्रकोप बढ़ा।',
    recommendedMitigation: 'Install yellow sticky traps (15 traps/ha); spot treat border rows with Thiamethoxam 25 WG if ETL >25 aphids/plant.',
    recommendedMitigationHi: 'पीले चिपचिपे ट्रैप (15 ट्रैप/हेक्टेयर) लगाएं; सीमांत पंक्तियों पर थियामेथोक्सम का छिड़काव करें।',
    sourceAuthority: 'CCS HAU Hisar Agro-Entomology Division',
  },
  {
    id: 'HS-005',
    stateCode: 'GJ',
    stateName: 'Gujarat',
    stateHindi: 'गुजरात',
    hazardType: 'heatwave',
    severity: 'moderate',
    type: 'forecast',
    affectedDistricts: ['Surendranagar', 'Rajkot', 'Banaskantha', 'Kutch'],
    vulnerableCrops: ['Wheat (Terminal Stage)', 'Cumin (Jeera)', 'Mustard'],
    vulnerableCropsHi: ['गेहूं (पकने की अवस्था)', 'जीरा', 'सरसों'],
    estimatedHectares: '89,000 ha',
    timeframe: 'Next 72-96 Hours',
    timeframeHi: 'अगले 72-96 घंटे',
    leadTimeHours: 72,
    triggerDriver: 'Inflow of warm dry desert air from Thar; maximum day temperatures forecasted 4-6°C above seasonal normal.',
    triggerDriverHi: 'थार से गर्म शुष्क हवाओं का आगमन; दिन का तापमान सामान्य से 4-6°C अधिक रहने की संभावना।',
    recommendedMitigation: 'Provide light evening irrigation to reduce soil canopy temperature; spray 0.2% zinc sulphate.',
    recommendedMitigationHi: 'शाम के समय हल्की सिंचाई करें ताकि मिट्टी ठंडी रहे; 0.2% जिंक सल्फेट का छिड़काव करें।',
    sourceAuthority: 'IMD Coastal Agro-met Centre & JAU Junagadh',
  },
  {
    id: 'HS-006',
    stateCode: 'KA',
    stateName: 'Karnataka',
    stateHindi: 'कर्नाटक',
    hazardType: 'flood',
    severity: 'moderate',
    type: 'forecast',
    affectedDistricts: ['Belagavi', 'Uttara Kannada', 'Udupi', 'Shivamogga'],
    vulnerableCrops: ['Paddy', 'Sugarcane', 'Arecanut'],
    vulnerableCropsHi: ['धान', 'गन्ना', 'सुपारी'],
    estimatedHectares: '42,500 ha',
    timeframe: 'Next 48 Hours',
    timeframeHi: 'अगले 48 घंटे',
    leadTimeHours: 48,
    triggerDriver: 'Western Ghats orographic depression with expected localized downpour >120mm in 24 hours.',
    triggerDriverHi: 'पश्चिमी घाट में मौसमी दबाव जिसके कारण 24 घंटों में 120 मिमी से अधिक भारी वर्षा का पूर्वानुमान।',
    recommendedMitigation: 'Clear all field drainage channels immediately; construct temporary bund breeches to avoid root rot.',
    recommendedMitigationHi: 'खेत की जल निकासी नालियों को तुरंत साफ करें; जलभराव व जड़ सड़न से बचने के लिए बंधे खोलें।',
    sourceAuthority: 'Karnataka State Natural Disaster Monitoring Centre (KSNDMC)',
  },
];

export function NationalRiskObservatory() {
  const { language } = useApp();
  const isHi = language === 'hi';

  const [activeHazard, setActiveHazard] = useState<HazardType | 'all'>('all');
  const [activeType, setActiveType] = useState<'all' | 'forecast' | 'confirmed'>('all');
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotRecord | null>(NATIONAL_HOTSPOTS[0]);

  const filteredHotspots = NATIONAL_HOTSPOTS.filter((h) => {
    const matchHazard = activeHazard === 'all' || h.hazardType === activeHazard;
    const matchType = activeType === 'all' || h.type === activeType;
    return matchHazard && matchType;
  });

  const getHazardBadge = (type: HazardType) => {
    switch (type) {
      case 'drought':
        return {
          icon: <SunMedium className="w-3.5 h-3.5 text-amber-600" />,
          label: isHi ? 'सूखा जोखिम' : 'Drought Risk',
          bg: 'bg-amber-100 text-amber-800 border-amber-200',
        };
      case 'flood':
        return {
          icon: <CloudRain className="w-3.5 h-3.5 text-blue-600" />,
          label: isHi ? 'बाढ़ / जलभराव' : 'Flood / Inundation',
          bg: 'bg-blue-100 text-blue-800 border-blue-200',
        };
      case 'heatwave':
        return {
          icon: <Flame className="w-3.5 h-3.5 text-rose-600" />,
          label: isHi ? 'लू / ऊष्मा तनाव' : 'Heatwave Stress',
          bg: 'bg-rose-100 text-rose-800 border-rose-200',
        };
      case 'pest':
        return {
          icon: <Bug className="w-3.5 h-3.5 text-emerald-600" />,
          label: isHi ? 'कीट प्रकोप' : 'Pest Outbreak',
          bg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        };
      case 'disease':
        return {
          icon: <Activity className="w-3.5 h-3.5 text-purple-600" />,
          label: isHi ? 'फसल रोग प्रसार' : 'Disease Spread',
          bg: 'bg-purple-100 text-purple-800 border-purple-200',
        };
    }
  };

  const getSeverityStyle = (s: SeverityLevel) => {
    switch (s) {
      case 'severe':
        return 'bg-red-500 text-white';
      case 'high':
        return 'bg-amber-500 text-white';
      case 'moderate':
        return 'bg-yellow-400 text-slate-900';
      case 'low':
      default:
        return 'bg-emerald-500 text-white';
    }
  };

  return (
    <div className="space-y-8">
      {/* ── Observatory Header — 80% Translucent Surface ── */}
      <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-3xl p-6 sm:p-8 text-white border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold uppercase tracking-wider border border-rose-500/30 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                {isHi ? 'राष्ट्रीय कृषि जोखिम वेधशाला' : 'National Agricultural Risk Observatory'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold uppercase tracking-wider border border-slate-700">
                Phase 5 Active Hotspot Grid
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {isHi
                ? 'बहु-आपदा कृषि जोखिम निगरानी व पूर्वानुमान मानचित्र'
                : 'Multi-Hazard Agricultural Hotspot Intelligence'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              {isHi
                ? 'उपग्रह टेलीमेट्री, आईएमडी रडार और जमीनी कीट जाल के आधार पर पूरे भारत में सूखा, बाढ़, लू, कीट और रोग के सक्रिय हॉटस्पॉट की पहचान।'
                : 'Real-time spatial hotspot detection fusing Sentinel-2 indices, IMD agro-met radar, and university scouting reports across key agricultural zones.'}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {isHi ? 'सक्रिय हॉटस्पॉट' : 'Active Hotspots'}
              </span>
              <span className="text-2xl font-black text-rose-400">{NATIONAL_HOTSPOTS.length}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {isHi ? 'निगरानी अधीन क्षेत्र' : 'Monitored Area'}
              </span>
              <span className="text-2xl font-black text-emerald-400">605K ha</span>
            </div>
          </div>
        </div>

        {/* ── Filter Controls ── */}
        <div className="pt-4 border-t border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          {/* Hazard Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveHazard('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                activeHazard === 'all'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {isHi ? 'सभी खतरे' : 'All Hazards'}
            </button>
            <button
              onClick={() => setActiveHazard('drought')}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition ${
                activeHazard === 'drought'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <SunMedium className="w-3.5 h-3.5" />
              <span>{isHi ? 'सूखा' : 'Drought'}</span>
            </button>
            <button
              onClick={() => setActiveHazard('flood')}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition ${
                activeHazard === 'flood'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5" />
              <span>{isHi ? 'बाढ़' : 'Flood'}</span>
            </button>
            <button
              onClick={() => setActiveHazard('heatwave')}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition ${
                activeHazard === 'heatwave'
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>{isHi ? 'लू / ऊष्मा' : 'Heatwave'}</span>
            </button>
            <button
              onClick={() => setActiveHazard('pest')}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition ${
                activeHazard === 'pest'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Bug className="w-3.5 h-3.5" />
              <span>{isHi ? 'कीट' : 'Pests'}</span>
            </button>
            <button
              onClick={() => setActiveHazard('disease')}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition ${
                activeHazard === 'disease'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{isHi ? 'रोग प्रसार' : 'Disease'}</span>
            </button>
          </div>

          {/* Model Status Toggle: Forecast vs Confirmed */}
          <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setActiveType('all')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                activeType === 'all' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isHi ? 'सभी स्थिति' : 'All Types'}
            </button>
            <button
              onClick={() => setActiveType('forecast')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 ${
                activeType === 'forecast'
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>⚠️ {isHi ? 'पूर्वानुमान' : 'Forecast'}</span>
            </button>
            <button
              onClick={() => setActiveType('confirmed')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 ${
                activeType === 'confirmed'
                  ? 'bg-rose-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🔴 {isHi ? 'पुष्ट रिपोर्ट' : 'Confirmed'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Hotspot Explorer & Detailed Action Card ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Hotspot Cards List (Left / 7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300 px-1">
            <span>
              {isHi ? 'पहचाने गए सक्रिय हॉटस्पॉट' : 'Identified Active Regional Hotspots'} (
              {filteredHotspots.length})
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">
              Sorted by Priority
            </span>
          </div>

          {filteredHotspots.length === 0 ? (
            <div className="p-8 text-center bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-2xl border border-white/10 text-slate-400 text-xs shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
              {isHi ? 'कोई मेल खाता हॉटस्पॉट नहीं मिला।' : 'No matching hotspots for current filters.'}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredHotspots.map((h) => {
                const isSelected = selectedHotspot?.id === h.id;
                const hazardBadge = getHazardBadge(h.hazardType);
                return (
                  <div
                    key={h.id}
                    onClick={() => setSelectedHotspot(h)}
                    className={`p-4 rounded-2xl border cursor-pointer transition text-left space-y-3 backdrop-blur-[6px] ${
                      isSelected
                        ? 'bg-emerald-950/40 border-emerald-500 shadow-md ring-2 ring-emerald-500/30'
                        : 'bg-[rgba(10,20,15,0.20)] hover:bg-[rgba(10,20,15,0.30)] border-white/10 hover:border-emerald-500/40 shadow-[0_4px_16px_rgba(0,0,0,0.10)]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${hazardBadge.bg}`}>
                            {hazardBadge.icon}
                            <span>{hazardBadge.label}</span>
                          </span>

                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${getSeverityStyle(
                              h.severity
                            )}`}
                          >
                            {h.severity}
                          </span>

                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              h.type === 'forecast'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            }`}
                          >
                            {h.type === 'forecast'
                              ? `⚠️ ${isHi ? 'पूर्वानुमान' : 'Forecast'}`
                              : `🔴 ${isHi ? 'पुष्ट' : 'Confirmed'}`}
                          </span>
                        </div>

                        <h4 className="text-base font-extrabold text-white">
                          {isHi ? h.stateHindi : h.stateName}: {h.affectedDistricts.slice(0, 3).join(', ')}
                          {h.affectedDistricts.length > 3 ? ` +${h.affectedDistricts.length - 3}` : ''}
                        </h4>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono font-bold text-slate-200 block">
                          {h.estimatedHectares}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          {isHi ? h.timeframeHi : h.timeframe}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {isHi ? h.triggerDriverHi : h.triggerDriver}
                    </p>

                    <div className="flex items-center justify-between text-[11px] pt-2 border-t border-white/10 text-slate-400">
                      <span className="truncate max-w-[280px]">
                        <strong>{isHi ? 'फसल:' : 'Crops:'}</strong>{' '}
                        {isHi ? h.vulnerableCropsHi.join(', ') : h.vulnerableCrops.join(', ')}
                      </span>
                      <span className="text-emerald-400 font-bold hover:underline flex items-center gap-1 shrink-0">
                        <span>{isHi ? 'विस्तार देखें' : 'View Action'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected Hotspot Action Dossier (Right / 5 cols) */}
        <div className="lg:col-span-5">
          {selectedHotspot ? (
            <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-3xl border border-white/10 p-6 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-6 sticky top-24 text-white">
              <div className="space-y-2 border-b border-white/10 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase bg-white/10 text-emerald-300 px-2 py-0.5 rounded border border-white/10">
                    HOTSPOT {selectedHotspot.id}
                  </span>
                  <span className="text-xs text-slate-300 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{isHi ? selectedHotspot.timeframeHi : selectedHotspot.timeframe}</span>
                  </span>
                </div>

                <h3 className="text-xl font-black text-white">
                  {isHi ? selectedHotspot.stateHindi : selectedHotspot.stateName} — {getHazardBadge(selectedHotspot.hazardType).label}
                </h3>

                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>
                    <strong>{isHi ? 'प्रभावित जिले:' : 'Districts:'}</strong> {selectedHotspot.affectedDistricts.join(', ')}
                  </span>
                </div>
              </div>

              {/* Action Lead Time Pill */}
              <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-300 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    <span>{isHi ? 'कार्रवाई की अवधि (Intervention Window)' : 'Optimal Mitigation Window'}</span>
                  </span>
                  <span className="font-mono font-extrabold text-amber-200">
                    {selectedHotspot.leadTimeHours} Hours
                  </span>
                </div>
                <p className="text-[11px] text-amber-100 leading-relaxed">
                  {isHi
                    ? 'अपरिवर्तनीय फसल हानि से बचने के लिए किसान सलाह और कीटनाशक/सिंचाई नियंत्रण अगले 72 घंटों में पूर्ण करें।'
                    : 'Prevent irreversible yield and canopy degradation by executing targeted mitigation before outbreak peak.'}
                </p>
              </div>

              {/* Underlying Trigger Driver */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                  {isHi ? 'जोखिम का मुख्य कारण (Driver)' : 'Underlying Agro-Climatic Driver'}
                </span>
                <p className="text-xs text-slate-200 leading-relaxed bg-[rgba(10,20,15,0.30)] p-3.5 rounded-xl border border-white/10">
                  {isHi ? selectedHotspot.triggerDriverHi : selectedHotspot.triggerDriver}
                </p>
              </div>

              {/* Recommended Action */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{isHi ? 'अनुशंसित रोकथाम उपाय' : 'Recommended Field Advisory'}</span>
                </span>
                <p className="text-xs text-emerald-100 font-medium leading-relaxed bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-500/30">
                  {isHi ? selectedHotspot.recommendedMitigationHi : selectedHotspot.recommendedMitigation}
                </p>
              </div>

              {/* Source Provenance & Drill-Down Links */}
              <div className="pt-2 border-t border-white/10 space-y-3">
                <div className="text-[10px] text-slate-400">
                  <strong>{isHi ? 'डेटा स्रोत:' : 'Source:'}</strong> {selectedHotspot.sourceAuthority}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={`/state-dashboard`}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold text-center transition flex items-center justify-center gap-1 border border-white/10"
                  >
                    <span>{isHi ? 'राज्य डैशबोर्ड' : 'State Dashboard'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/farm-digital-twin`}
                    className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold text-center transition flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span>{isHi ? 'खेत स्तर पर देखें' : 'View Farm Twin'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-3xl border border-white/10 text-slate-400 text-xs shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
              {isHi ? 'विस्तार देखने के लिए किसी हॉटस्पॉट पर क्लिक करें।' : 'Select a hotspot card to view action details.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
