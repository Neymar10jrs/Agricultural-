'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  Bug,
  Activity,
  Layers,
  MapPin,
  Calendar,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Info,
  X,
  BookOpen,
} from 'lucide-react';
import { diseasePestDatabase } from '@/data/diseases';
import { DiseasePestKnowledge } from '@/types';
import { useApp } from '@/context/AppContext';
import { SectionHero } from '@/components/ui/SectionHero';


export default function DiseaseLibraryPage() {
  const { language } = useApp();
  const isHi = language === 'hi';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedSeason, setSelectedSeason] = useState('All');
  const [activeItem, setActiveItem] = useState<DiseasePestKnowledge | null>(null);

  const filteredItems = diseasePestDatabase.filter((item) => {
    const matchesSearch =
      item.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.causalOrganism.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.symptoms.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCrop =
      selectedCrop === 'All' || item.hostCrops.some((c) => c.toLowerCase().includes(selectedCrop.toLowerCase()));

    const matchesType = selectedType === 'All' || item.type === selectedType;

    const matchesSeason =
      selectedSeason === 'All' || item.season.includes(selectedSeason as any);

    return matchesSearch && matchesCrop && matchesType && matchesSeason;
  });

  return (
    <div className="space-y-0">
      <SectionHero
        imageSrc="/assets/crop-health/canopy-ndvi.svg"
        theme="forest"
        label={isHi ? 'आईसीएआर-एनसीआईपीएम मानकीकृत ज्ञान डेटाबेस' : 'ICAR-NCIPM KNOWLEDGE REGISTRY'}
        heading={
          <span className="text-gradient-agri">
            {isHi ? 'रोग व कीट ज्ञान पुस्तकालय' : 'Disease & Pest Knowledge Library'}
          </span>
        }
        description={
          isHi
            ? 'भारतीय फसलों के लिए जैविक व कवक रोगजनकों, कीटों, लक्षणों और एकीकृत कीट प्रबंधन (IPM) प्रोटोकॉल का व्यापक संदर्भ।'
            : 'Comprehensive diagnostic reference of biological pathogens, insect vectors, visible foliar symptoms, and IPM chemical/biological protocols.'
        }
        showDemoBadge={true}
        stats={[
          { value: '250+', label: isHi ? 'दस्तावेजीकृत रोग/कीट' : 'Documented Pests' },
          { value: 'ICAR', label: isHi ? 'वैज्ञानिक सत्यापन' : 'Validation' },
          { value: 'IPM', label: isHi ? 'मानकीकृत प्रोटोकॉल' : 'Protocols' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          Search scientific names, diagnostic symptom keys, favorable thermal-moisture windows, and integrated pest management (IPM) guidelines across Indian agro-climatic zones.
        </p>

      {/* Search & Filter Controls Bar */}

      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3.5">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by common name, scientific name (e.g. Nilaparvata lugens), symptom or causal organism..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Host Crop</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs"
            >
              <option value="All">All Crops</option>
              <option value="Wheat">Wheat (गेहूं)</option>
              <option value="Rice">Rice (धान)</option>
              <option value="Cotton">Cotton (कपास)</option>
              <option value="Maize">Maize (मक्का)</option>
              <option value="Potato">Potato (आलू)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Pest / Pathogen Classification</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs"
            >
              <option value="All">All Pathogens & Insects</option>
              <option value="Fungal Disease">Fungal Disease</option>
              <option value="Insect/Pest">Insect / Pest</option>
              <option value="Bacterial Disease">Bacterial Disease</option>
              <option value="Viral Disease">Viral Disease</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Season</label>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs"
            >
              <option value="All">All Seasons</option>
              <option value="Kharif">Kharif (Monsoon)</option>
              <option value="Rabi">Rabi (Winter)</option>
              <option value="Zaid">Zaid (Summer)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count Strip */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing <strong>{filteredItems.length}</strong> catalogued agricultural records</span>
        <span className="text-[11px]">Click any entry to view full epidemiological profile & IPM guide</span>
      </div>

      {/* Disease Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="telemetry-card bg-white rounded-2xl border border-slate-200 p-5 space-y-3 cursor-pointer hover:border-emerald-400 transition flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    item.type === 'Insect/Pest'
                      ? 'bg-amber-100 text-amber-900 border border-amber-200'
                      : 'bg-rose-100 text-rose-900 border border-rose-200'
                  }`}
                >
                  {item.type}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {item.season.join(' / ')}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-slate-900 leading-snug">
                  {item.commonName}
                </h3>
                <span className="text-xs text-slate-500 italic block font-mono">
                  {item.scientificName}
                </span>
              </div>

              <div className="pt-1">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Host Crops:</span>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {item.hostCrops.map((c) => (
                    <span
                      key={c}
                      className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-medium"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed pt-1">
                {item.damageDescription}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
              <span>View Full IPM Guide</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Detail Slide-Over / Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-6 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-slate-900 to-emerald-950 text-white flex items-start justify-between shrink-0">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">
                  {activeItem.type}
                </span>
                <h3 className="text-xl font-bold">{activeItem.commonName}</h3>
                <span className="text-xs text-emerald-200 font-mono italic block">
                  Scientific Name: {activeItem.scientificName}
                </span>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs">
              {/* Damage & Bio-Classification */}
              <div className="space-y-1.5">
                <span className="font-bold text-slate-800 text-xs uppercase tracking-wider block">
                  Damage Symptoms & Characteristics:
                </span>
                <ul className="space-y-1.5 text-slate-700 pl-4 list-disc">
                  {activeItem.symptoms.map((s, idx) => (
                    <li key={idx} className="leading-relaxed">{s}</li>
                  ))}
                </ul>
              </div>

              {/* Favorable Environmental Conditions */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 text-xs uppercase tracking-wider block">
                  Favorable Meteorological Triggers:
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div><strong>Temperature:</strong> {activeItem.favorableConditions.temperature}</div>
                  <div><strong>Humidity:</strong> {activeItem.favorableConditions.humidity}</div>
                  <div><strong>Rainfall:</strong> {activeItem.favorableConditions.rainfall}</div>
                  <div><strong>Vulnerable Stage:</strong> {activeItem.favorableConditions.cropStage}</div>
                </div>
              </div>

              {/* Economic Threshold Level (ETL) */}
              <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-amber-950">
                <span className="font-bold text-xs uppercase block text-amber-900 mb-1">
                  Economic Threshold Level (ETL):
                </span>
                <p className="text-xs">{activeItem.economicThresholdLevel}</p>
              </div>

              {/* Integrated Pest Management (IPM) 3-Prong Strategy */}
              <div className="space-y-3 pt-2">
                <span className="font-bold text-slate-900 text-xs uppercase tracking-wider block">
                  Integrated Management Guidelines:
                </span>

                <div className="space-y-2.5">
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <strong className="text-emerald-900 block mb-1">🌱 1. Cultural Controls:</strong>
                    <ul className="list-disc pl-4 space-y-1 text-slate-700">
                      {activeItem.integratedManagement.cultural.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <strong className="text-blue-900 block mb-1">🐞 2. Biological Controls:</strong>
                    <ul className="list-disc pl-4 space-y-1 text-slate-700">
                      {activeItem.integratedManagement.biological.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
                    <strong className="text-rose-900 block mb-1">🧪 3. Chemical Controls (Only if ETL Exceeded):</strong>
                    <ul className="list-disc pl-4 space-y-1 text-slate-700">
                      {activeItem.integratedManagement.chemical.map((ch, i) => (
                        <li key={i}>{ch}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Geographic Distribution */}
              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <strong>Indian Distribution: </strong>
                {activeItem.indiaDistribution.join(', ')}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
              <button
                onClick={() => setActiveItem(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

