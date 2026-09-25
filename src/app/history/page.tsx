'use client';

import React, { useState } from 'react';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import {
  FileText,
  Sprout,
  Stethoscope,
  Layers,
  CloudSun,
  Sparkles,
  Calendar,
  AlertCircle,
  PlusCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';

type HistoryTab = 'crop' | 'disease' | 'soil' | 'weather' | 'ai';

export default function HistoryPage() {
  return (
    <AuthGuard>
      <HistoryContent />
    </AuthGuard>
  );
}

function HistoryContent() {
  const { crops, diseaseRecords, soilRecords, weatherHistory, aiHistory, activeFarm } = useAuth();
  const { dict: t } = useApp();

  const [activeTab, setActiveTab] = useState<HistoryTab>('crop');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <FileText className="w-8 h-8 text-emerald-400" />
              <span>{t.history?.title || 'Agricultural History & Records'}</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              {t.history?.subtitle ||
                'Comprehensive audit trail of past crop cycles, soil tests, disease scans, weather alerts, and AI recommendations.'}
            </p>
          </div>

          {activeFarm && (
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-2.5 flex items-center gap-2 text-xs">
              <span className="text-slate-400">Current Parcel:</span>
              <span className="font-bold text-emerald-400">{activeFarm.name}</span>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('crop')}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              activeTab === 'crop'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span>{t.history?.tabs?.crop || 'Crop Cycle History'}</span>
            <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-slate-900/30">
              {crops.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('disease')}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              activeTab === 'disease'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>{t.history?.tabs?.disease || 'Disease & Pest Scans'}</span>
            <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-slate-900/30">
              {diseaseRecords.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('soil')}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              activeTab === 'soil'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t.history?.tabs?.soil || 'Soil Health Tests'}</span>
            <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-slate-900/30">
              {soilRecords.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('weather')}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              activeTab === 'weather'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <CloudSun className="w-4 h-4" />
            <span>{t.history?.tabs?.weather || 'Weather Records'}</span>
            <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-slate-900/30">
              {weatherHistory.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              activeTab === 'ai'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.history?.tabs?.ai || 'Krishi AI Consultations'}</span>
            <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-slate-900/30">
              {aiHistory.length}
            </span>
          </button>
        </div>

        {/* Tab Content Display */}

        {/* TAB 1: CROPS */}
        {activeTab === 'crop' && (
          <div className="space-y-4">
            {crops.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {crops.map((crop) => (
                  <div
                    key={crop.id}
                    className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-lg space-y-4 hover:border-emerald-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                          {crop.season}
                        </span>
                        <h3 className="text-lg font-bold text-white mt-0.5">{crop.cropName}</h3>
                        <p className="text-xs text-slate-400">{crop.variety}</p>
                      </div>

                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold capitalize ${
                          crop.status === 'active'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        {crop.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs pt-3 border-t border-slate-700/60">
                      <div>
                        <span className="text-slate-500 block">Sown</span>
                        <span className="font-medium text-slate-200">{crop.sowingDate}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Harvest</span>
                        <span className="font-medium text-slate-200">
                          {crop.harvestDate || 'In Progress'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Yield</span>
                        <span className="font-medium text-emerald-400">
                          {crop.yieldQuintal ? `${crop.yieldQuintal} Qtl` : 'Pending'}
                        </span>
                      </div>
                    </div>

                    {crop.notes && (
                      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/50 text-xs text-slate-300">
                        {crop.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-800/40 border border-dashed border-slate-700 rounded-3xl p-12 text-center text-slate-400 space-y-2">
                <Sprout className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="text-sm font-semibold">{t.history?.emptyCrop || 'No past crop cycles recorded.'}</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DISEASE SCANS */}
        {activeTab === 'disease' && (
          <div className="space-y-4">
            {diseaseRecords.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {diseaseRecords.map((rec) => (
                  <div
                    key={rec.id}
                    className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-lg space-y-4 hover:border-emerald-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                          {rec.cropName} Diagnostic
                        </span>
                        <h3 className="text-lg font-bold text-white mt-0.5">{rec.diseaseName}</h3>
                        <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{new Date(rec.scannedAt).toLocaleDateString('en-IN')}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30 capitalize">
                          {rec.severity} Risk
                        </span>
                        <div className="text-[10px] text-slate-400 mt-1">
                          Confidence: <strong className="text-emerald-400">{rec.confidenceScore}%</strong>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-slate-400 font-semibold block mb-0.5">Observed Symptoms:</span>
                        <p className="text-slate-300">{rec.symptoms}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                        <span className="text-emerald-400 font-semibold block mb-0.5">
                          {t.history?.treatment || 'Recommended Remedy'}:
                        </span>
                        <p className="text-slate-200">{rec.treatment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-800/40 border border-dashed border-slate-700 rounded-3xl p-12 text-center text-slate-400 space-y-2">
                <Stethoscope className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="text-sm font-semibold">{t.history?.emptyDisease || 'No crop disease scans recorded.'}</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SOIL TESTS */}
        {activeTab === 'soil' && (
          <div className="space-y-4">
            {soilRecords.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {soilRecords.map((soil) => (
                  <div
                    key={soil.id}
                    className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-lg space-y-4 hover:border-emerald-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
                          Lab & Sensor Analysis
                        </span>
                        <h3 className="text-lg font-bold text-white mt-0.5">pH {soil.phLevel}</h3>
                        <span className="text-xs text-emerald-400 font-semibold">{soil.healthStatus}</span>
                      </div>

                      <div className="text-xs text-slate-400 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{soil.testDate}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center text-xs py-3 border-y border-slate-700/60">
                      <div className="bg-slate-900/60 p-2 rounded-xl">
                        <span className="text-slate-500 block text-[10px]">Nitrogen</span>
                        <span className="font-bold text-white">{soil.nitrogenKgHa} kg/ha</span>
                      </div>
                      <div className="bg-slate-900/60 p-2 rounded-xl">
                        <span className="text-slate-500 block text-[10px]">Phosphorus</span>
                        <span className="font-bold text-white">{soil.phosphorusKgHa} kg/ha</span>
                      </div>
                      <div className="bg-slate-900/60 p-2 rounded-xl">
                        <span className="text-slate-500 block text-[10px]">Potassium</span>
                        <span className="font-bold text-white">{soil.potassiumKgHa} kg/ha</span>
                      </div>
                      <div className="bg-slate-900/60 p-2 rounded-xl">
                        <span className="text-slate-500 block text-[10px]">Organic C</span>
                        <span className="font-bold text-white">{soil.organicCarbonPct}%</span>
                      </div>
                    </div>

                    {soil.recommendations && (
                      <div className="text-xs text-slate-300">
                        <span className="font-semibold text-slate-400 block mb-0.5">Corrective Advice:</span>
                        <p>{soil.recommendations}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-800/40 border border-dashed border-slate-700 rounded-3xl p-12 text-center text-slate-400 space-y-2">
                <Layers className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="text-sm font-semibold">{t.history?.emptySoil || 'No soil testing records logged.'}</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: WEATHER ALERTS */}
        {activeTab === 'weather' && (
          <div className="space-y-4">
            {weatherHistory.length > 0 ? (
              <div className="divide-y divide-slate-800 bg-slate-800/70 border border-slate-700 rounded-3xl p-6">
                {weatherHistory.map((w) => (
                  <div key={w.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                        <CloudSun className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {w.alertTitle || 'Weather Snapshot Recorded'}
                        </h4>
                        <div className="text-xs text-slate-400 flex items-center gap-3 mt-0.5">
                          <span>Temp: {w.temperatureC}°C</span>
                          <span>Humidity: {w.humidityPct}%</span>
                          <span>Rain: {w.rainfallMm}mm</span>
                          <span>Wind: {w.windSpeedKmh} km/h</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 whitespace-nowrap">
                      {new Date(w.recordedAt).toLocaleDateString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-800/40 border border-dashed border-slate-700 rounded-3xl p-12 text-center text-slate-400 space-y-2">
                <CloudSun className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="text-sm font-semibold">{t.history?.emptyWeather || 'No weather alerts recorded.'}</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: AI CONSULTATIONS */}
        {activeTab === 'ai' && (
          <div className="space-y-4">
            {aiHistory.length > 0 ? (
              <div className="space-y-4">
                {aiHistory.map((ai) => (
                  <div
                    key={ai.id}
                    className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-lg space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-semibold uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        Krishi AI Consultation ({ai.category})
                      </span>
                      <span>{new Date(ai.createdAt).toLocaleDateString('en-IN')}</span>
                    </div>

                    <div className="bg-slate-900/80 rounded-xl p-3.5 text-sm font-semibold text-white border border-slate-800">
                      &ldquo;{ai.query}&rdquo;
                    </div>

                    <div className="text-xs text-slate-300 pl-3 border-l-2 border-emerald-500 space-y-1">
                      <span className="font-semibold text-emerald-400 block">AI Agronomic Response:</span>
                      <p>{ai.response}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-800/40 border border-dashed border-slate-700 rounded-3xl p-12 text-center text-slate-400 space-y-2">
                <Sparkles className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="text-sm font-semibold">{t.history?.emptyAi || 'No AI consultation records found.'}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
