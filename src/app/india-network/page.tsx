'use client';

import React from 'react';
import { NationalIntelligenceGrid } from '@/components/network/NationalIntelligenceGrid';
import { IndiaFarmDrillDown } from '@/components/network/IndiaFarmDrillDown';
import { useApp } from '@/context/AppContext';

export default function IndiaNetworkPage() {
  const { dict, language } = useApp();
  const isHi = language === 'hi';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider border border-emerald-300">
            {isHi ? 'डिजिटल सार्वजनिक कृषि अवसंरचना' : 'Digital Public Good Architecture'}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            {isHi ? 'फेडरेटेड इंटरऑपरेबिलिटी प्रोटोकॉल v2.4' : 'Federated Interoperability Protocol v2.4'}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {dict.nav.indiaNetwork}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          {isHi
            ? 'बीकेआईएन को एक खुले फेडरेटेड नेटवर्क के रूप में विकसित किया गया है जो भारतीय राज्यों, आईसीएआर संस्थानों और कृषि विश्वविद्यालयों को अपने स्थानीय डेटा और एआई मॉडल जोड़ने की अनुमति देता है, जबकि राज्यों का अपने डेटा पर पूर्ण संप्रभु नियंत्रण बना रहता है।'
            : 'BKIN is architected as an open federated network allowing Indian states, ICAR institutes, and agricultural universities to plug in their localized datasets and AI models while maintaining sovereign state data ownership.'}
        </p>
      </div>

      {/* National Intelligence Grid Core */}
      <NationalIntelligenceGrid />

      {/* Multi-Scale Continuous Drill-Down (Phase 6) */}
      <IndiaFarmDrillDown />
    </div>
  );
}
