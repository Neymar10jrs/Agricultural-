'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sprout,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  TreePine,
  Droplets,
} from 'lucide-react';
import { regenerativePracticesData } from '@/data/scenarios';
import { useApp } from '@/context/AppContext';
import { SectionHero } from '@/components/ui/SectionHero';



export default function RegenerativeAgPage() {
  const { language } = useApp();
  const isHi = language === 'hi';

  return (
    <div className="space-y-0">
      <SectionHero
        imageSrc="/assets/soil/soil-strata.svg"
        theme="soil"
        label={isHi ? 'प्राकृतिक एवं पुनर्योजी कृषि परिवर्तन' : 'NATURAL & REGENERATIVE FARMING TRANSITION'}
        heading={
          <span className="text-gradient-gold">
            {isHi ? 'पुनर्योजी कृषि रूपरेखा' : 'Regenerative Agriculture Framework'}
          </span>
        }
        description={
          isHi
            ? 'रासायनिक निर्भरता कम करने, मृदा जैविक कार्बन पुनर्जीवित करने और सूक्ष्मजीव विविधता बढ़ाने हेतु व्यावहारिक चरणबद्ध मार्ग।'
            : 'Step-by-step pathways to transition from high-chemical conventional cycles to resilient, soil-regenerative systems that restore microbial vitality and sequester atmospheric carbon.'
        }
        showDemoBadge={true}
        stats={[
          { value: '1.2 - 1.8 T/Ac', label: isHi ? 'कार्बन संचयन' : 'Carbon Storage' },
          { value: '25% - 30%', label: isHi ? 'जल संरक्षण' : 'Water Saved' },
          { value: '35 kg/Ac', label: isHi ? 'यूरिया बचत' : 'Urea Reduced' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">


      {/* Overview Stats Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-1">
          <div className="text-[10px] uppercase font-bold text-slate-400">Carbon Sequestration Potential</div>
          <div className="text-2xl font-black text-emerald-800">1.2 – 1.8 Tons / Acre</div>
          <div className="text-xs text-slate-500">In-situ residue retention & green manuring</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-1">
          <div className="text-[10px] uppercase font-bold text-slate-400">Groundwater Conservation</div>
          <div className="text-2xl font-black text-blue-800">25% – 30% Saved</div>
          <div className="text-xs text-slate-500">Alternate wetting & drying + surface mulch</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-1">
          <div className="text-[10px] uppercase font-bold text-slate-400">Synthetic Input Reduction</div>
          <div className="text-2xl font-black text-amber-800">25 – 35 kg Urea / Acre</div>
          <div className="text-xs text-slate-500">Leguminous bio-fixation & PSB inoculation</div>
        </div>
      </div>

      {/* Core Transition Matrix: Current Practice -> Possible Improvement -> Expected Benefit (Section 21) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Transition Matrix: From Conventional to Regenerative
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Standardized for North-Western and Central Indo-Gangetic Plains
          </span>
        </div>

        <div className="space-y-4">
          {regenerativePracticesData.map((prac) => (
            <div
              key={prac.id}
              className="telemetry-card bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                    <Sprout className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-slate-900">{prac.practiceTitle}</h4>
                    <span className="text-[10px] font-semibold text-emerald-700">{prac.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                    Ease: {prac.implementationEase}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                    {prac.carbonSequestrationEstimate}
                  </span>
                </div>
              </div>

              {/* 3-Step Column Matrix (Section 21 format) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Step 1: Current Practice */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider block">
                    Current Practice (Conventional)
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {prac.currentConventionalPractice}
                  </p>
                </div>

                {/* Step 2: Possible Improvement */}
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider block">
                    Possible Improvement (Regenerative)
                  </span>
                  <p className="text-emerald-950 font-semibold leading-relaxed">
                    {prac.possibleImprovement}
                  </p>
                </div>

                {/* Step 3: Expected Benefit */}
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-blue-800 tracking-wider block">
                    Expected Agricultural Benefit
                  </span>
                  <p className="text-blue-950 leading-relaxed">
                    {prac.expectedBenefit}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}

