'use client';

import React from 'react';
import { NationalIntelligenceGrid } from '@/components/network/NationalIntelligenceGrid';
import { IndiaFarmDrillDown } from '@/components/network/IndiaFarmDrillDown';
import { useApp } from '@/context/AppContext';
import { SectionHero } from '@/components/ui/SectionHero';

export default function IndiaNetworkPage() {
  const { dict, language } = useApp();
  const isHi = language === 'hi';

  return (
    <div className="space-y-0">
      <SectionHero
        imageSrc="/assets/national-grid/india-grid.svg"
        theme="satellite"
        label={isHi ? 'डिजिटल सार्वजनिक कृषि अवसंरचना' : 'DIGITAL PUBLIC AGRICULTURE GRID'}

        heading={
          <>
            <span className="text-gradient-satellite">
              {isHi ? 'भारत कृषि नेटवर्क' : 'India Agriculture Network'}
            </span>
          </>
        }
        description={
          isHi
            ? 'बीकेआईएन को एक खुले फेडरेटेड नेटवर्क के रूप में विकसित किया गया है जो भारतीय राज्यों, आईसीएआर संस्थानों और कृषि विश्वविद्यालयों को जोड़ता है।'
            : 'BKIN as an open federated network connecting Indian states, ICAR institutes, and agricultural universities while maintaining sovereign data ownership.'
        }
        showDemoBadge={true}
        stats={[
          { value: '28', label: isHi ? 'राज्य नोड' : 'State Nodes' },
          { value: '142M', label: isHi ? 'खेत रिकॉर्ड' : 'Farm Records' },
          { value: 'v2.4', label: isHi ? 'प्रोटोकॉल' : 'Protocol' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* National Intelligence Grid Core */}
        <NationalIntelligenceGrid />

        {/* Multi-Scale Continuous Drill-Down (Phase 6) */}
        <IndiaFarmDrillDown />
      </div>
    </div>
  );
}
