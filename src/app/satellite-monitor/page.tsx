'use client';

import React from 'react';
import { SatelliteIntelligenceHub } from '@/components/satellite/SatelliteIntelligenceHub';
import { SatelliteFieldMap } from '@/components/maps/SatelliteFieldMap';
import { useApp } from '@/context/AppContext';

export default function SatelliteMonitorPage() {
  const { dict, language } = useApp();
  const isHi = language === 'hi';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* ── Main Satellite Intelligence Hub Component ── */}
      <SatelliteIntelligenceHub />

      {/* ── High-Resolution Farm Parcel Field Map ── */}
      <div className="space-y-3 pt-6 border-t border-slate-200">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            {isHi ? 'खेत पार्सल बहु-स्पेक्ट्रल कैनवास' : 'High-Resolution Farm Parcel Multi-Spectral Canvas'}
          </h3>
          <p className="text-xs text-slate-500">
            {isHi ? 'खेत स्तर पर पार्सल सीमाएं और एनडीवीआई दृश्य' : 'Field-level parcel boundaries with true-color and false-color NIR overlays'}
          </p>
        </div>
        <SatelliteFieldMap />
      </div>
    </div>
  );
}
