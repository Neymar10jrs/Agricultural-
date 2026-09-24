'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  ArrowRight,
  Droplets,
  Layers,
  Activity,
  UserCheck,
} from 'lucide-react';
import { initialAdvisories } from '@/data/advisories';
import { ExplainableAICard } from '@/components/ai/ExplainableAICard';
import ConfidenceAdvisoryCard from '@/components/ui/ConfidenceAdvisoryCard';
import { useApp } from '@/context/AppContext';

export default function TodaysAdvisoryPage() {
  const { farm, openAskKrishi, dict, language } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'structured' | 'compact'>('structured');
  const isHi = language === 'hi';

  const categories = isHi
    ? ['सभी', 'सिंचाई प्रबंधन', 'खेत संचालन', 'कीट व रोग प्रबंधन', 'पोषक तत्व व खाद']
    : ['All', 'Irrigation', 'Field Operation', 'Pest & Disease', 'Nutrient'];

  const filteredAdvisories = initialAdvisories.filter((a) => {
    if (selectedCategory === 'All' || selectedCategory === 'सभी') return true;
    if (selectedCategory === 'Irrigation' || selectedCategory === 'सिंचाई प्रबंधन') return a.category === 'Irrigation';
    if (selectedCategory === 'Field Operation' || selectedCategory === 'खेत संचालन') return a.category === 'Field Operation';
    if (selectedCategory === 'Pest & Disease' || selectedCategory === 'कीट व रोग प्रबंधन') return a.category === 'Pest & Disease';
    if (selectedCategory === 'Nutrient' || selectedCategory === 'पोषक तत्व व खाद') return a.category === 'Nutrient';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-400/30">
              {dict.advisories.actionCenter}
            </span>
            <span className="text-xs text-emerald-200">
              {isHi ? 'खेत:' : 'Personalized for:'} {farm.name} ({farm.crop})
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {dict.advisories.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            {dict.advisories.subtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button
            onClick={() => openAskKrishi(isHi ? 'आज खेत में क्या करना जरूरी है?' : 'What are my priority tasks on the farm today?')}
            className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs transition flex items-center justify-center gap-2 shadow-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>{dict.advisories.hearVoice}</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-500 font-semibold text-xs shrink-0 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" />
          Filter Action Area:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition shrink-0 ${
              selectedCategory === cat
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* View Format Selector (Phase 9) */}
      <div className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200">
        <span className="font-semibold text-slate-600">
          {isHi ? 'परामर्श प्रस्तुति प्रारूप:' : 'Advisory Explanation Format:'}
        </span>
        <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setViewMode('structured')}
            className={`px-3 py-1 rounded-md font-bold transition text-xs ${
              viewMode === 'structured'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isHi ? '5-भाग विस्तृत साक्ष्य' : '5-Part Explainable Dossier'}
          </button>
          <button
            onClick={() => setViewMode('compact')}
            className={`px-3 py-1 rounded-md font-bold transition text-xs ${
              viewMode === 'compact'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isHi ? 'त्वरित दृश्य' : 'Compact Field View'}
          </button>
        </div>
      </div>

      {/* Priority Advisories Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredAdvisories.map((advisory) =>
          viewMode === 'structured' ? (
            <ConfidenceAdvisoryCard key={advisory.id} advisory={advisory} />
          ) : (
            <ExplainableAICard key={advisory.id} advisory={advisory} />
          )
        )}
      </div>

      {/* Help Banner */}
      <div className="bg-slate-100/80 rounded-2xl p-5 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="space-y-0.5 text-center sm:text-left">
          <span className="font-bold text-slate-800">Need help implementing these recommendations?</span>
          <p className="text-slate-500 text-[11px]">
            Call the Kisan Call Centre at toll-free <strong className="text-emerald-700">1800-180-1551</strong> or consult your local block agriculture officer.
          </p>
        </div>
        <Link
          href="/officer-dashboard"
          className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs shrink-0 transition"
        >
          View Block Officer Coverage
        </Link>
      </div>
    </div>
  );
}
