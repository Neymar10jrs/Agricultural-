'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sprout,
  Calendar,
  MapPin,
  Maximize2,
  Droplets,
  Activity,
  Layers,
  CloudSun,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Edit3,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { StatCard } from '@/components/ui/StatCard';
import { AlertBadge } from '@/components/ui/AlertBadge';
import { SatelliteFieldMap } from '@/components/maps/SatelliteFieldMap';
import { initialAdvisories } from '@/data/advisories';
import { ExplainableAICard } from '@/components/ai/ExplainableAICard';

export default function MyFarmPage() {
  const { farm, updateFarm, t } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState(farm);

  const handleSaveFarm = (e: React.FormEvent) => {
    e.preventDefault();
    updateFarm(formState);
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Demo Farm Identification Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider border border-emerald-300">
              Demo Farm
            </span>
            <span className="text-xs text-slate-500 font-medium">ID: {farm.id}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            {farm.name}
          </h1>
          <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              {farm.village}, Block {farm.block}, {farm.district}, {farm.state}
            </span>
            <span>•</span>
            <span>Owner: <strong className="text-slate-700">{farm.ownerName}</strong></span>
            <span>•</span>
            <span>Area: <strong className="text-slate-700">{farm.areaAcres} Acres</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-300 hover:bg-slate-50 text-slate-700 transition flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Farm Profile'}</span>
          </button>

          <Link
            href="/todays-advisory"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white transition flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>View Today&apos;s Actions</span>
          </Link>
        </div>
      </div>

      {/* Farm Profile Edit Modal / Form */}
      {isEditing && (
        <form onSubmit={handleSaveFarm} className="bg-emerald-50/70 rounded-2xl border border-emerald-200 p-5 sm:p-6 space-y-4">
          <h3 className="font-bold text-sm text-emerald-950 flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-emerald-700" />
            Modify Farm Parameters (Simulate Different State & Crops)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">State</label>
              <select
                value={formState.state}
                onChange={(e) => setFormState({ ...formState, state: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2"
              >
                <option value="Punjab">Punjab</option>
                <option value="Haryana">Haryana</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Bihar">Bihar</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">District</label>
              <input
                type="text"
                value={formState.district}
                onChange={(e) => setFormState({ ...formState, district: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Crop</label>
              <input
                type="text"
                value={formState.crop}
                onChange={(e) => setFormState({ ...formState, crop: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Area (Acres)</label>
              <input
                type="number"
                step="0.1"
                value={formState.areaAcres}
                onChange={(e) => setFormState({ ...formState, areaAcres: Number(e.target.value) })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Irrigation Source</label>
              <select
                value={formState.irrigationType}
                onChange={(e) => setFormState({ ...formState, irrigationType: e.target.value as any })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2"
              >
                <option value="Tubewell / Borewell">Tubewell / Borewell</option>
                <option value="Canal">Canal</option>
                <option value="Drip Micro-irrigation">Drip Micro-irrigation</option>
                <option value="Sprinkler">Sprinkler</option>
                <option value="Rainfed">Rainfed</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Days After Sowing</label>
              <input
                type="number"
                value={formState.daysAfterSowing}
                onChange={(e) => setFormState({ ...formState, daysAfterSowing: Number(e.target.value) })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Previous Crop</label>
              <input
                type="text"
                value={formState.previousCrop}
                onChange={(e) => setFormState({ ...formState, previousCrop: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-white text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800"
            >
              Save Parameters
            </button>
          </div>
        </form>
      )}

      {/* Farm Health Composite Banner (Section 13) */}
      <div className="bg-gradient-to-br from-emerald-900 to-slate-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
                Multi-Factor Intelligence
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-emerald-200">
                Demo Value: Simulated Telemetry
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              Overall Farm Health Score
            </h2>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Composite index calculated from multi-spectral Sentinel-2 NDVI, automated weather radar, soil nutrient tests, and block-level disease monitoring.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
            <div className="text-right">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400">
                {farm.overallHealthScore} <span className="text-xl font-normal text-white">/ 100</span>
              </div>
              <div className="text-xs font-bold text-emerald-200 mt-0.5">
                🟢 Healthy Condition
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7 Farm Health Status Breakdown Cards (Section 13) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-900">
            Diagnostic Health Matrix
          </h3>
          <span className="text-xs text-slate-500">
            Updated today from ISRO/IMD/KVK feeds
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Crop Vegetation Health"
            value={`${farm.statusMetrics.cropHealth.score}%`}
            subtitle={farm.statusMetrics.cropHealth.status}
            icon={Sprout}
            riskLevel={farm.statusMetrics.cropHealth.level}
            riskLabel="🟢 Good Canopy"
          />

          <StatCard
            title="Soil Nutrient Condition"
            value={`${farm.statusMetrics.soilHealth.score}%`}
            subtitle={farm.statusMetrics.soilHealth.status}
            icon={Layers}
            riskLevel={farm.statusMetrics.soilHealth.level}
            riskLabel="🟡 Low Organic C"
          />

          <StatCard
            title="Root-Zone Water Status"
            value={`${farm.statusMetrics.waterStatus.score}%`}
            subtitle={farm.statusMetrics.waterStatus.status}
            icon={Droplets}
            riskLevel={farm.statusMetrics.waterStatus.level}
            riskLabel="🟢 Optimal Moisture"
          />

          <StatCard
            title="Weather Impact Risk"
            value={`${farm.statusMetrics.weatherRisk.score}%`}
            subtitle={farm.statusMetrics.weatherRisk.status}
            icon={CloudSun}
            riskLevel={farm.statusMetrics.weatherRisk.level}
            riskLabel="🟡 Rain Alert"
          />

          <StatCard
            title="Disease Outbreak Risk"
            value={`${farm.statusMetrics.diseaseRisk.score}%`}
            subtitle={farm.statusMetrics.diseaseRisk.status}
            icon={Activity}
            riskLevel={farm.statusMetrics.diseaseRisk.level}
            riskLabel="🟢 Low Infection"
          />

          <StatCard
            title="Pest Infestation Risk"
            value={`${farm.statusMetrics.pestRisk.score}%`}
            subtitle={farm.statusMetrics.pestRisk.status}
            icon={AlertTriangle}
            riskLevel={farm.statusMetrics.pestRisk.level}
            riskLabel="🟡 Aphid Caution"
          />

          <StatCard
            title="Seasonal Climate Resilience"
            value={`${farm.statusMetrics.climateRisk.score}%`}
            subtitle={farm.statusMetrics.climateRisk.status}
            icon={ShieldCheck}
            riskLevel={farm.statusMetrics.climateRisk.level}
            riskLabel="🟢 High Resilience"
          />

          <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider">Crop Stage</div>
              <div className="text-base font-bold text-emerald-950 mt-1">CRI Initiation</div>
              <div className="text-xs text-emerald-700">{farm.daysAfterSowing} Days After Sowing</div>
            </div>
            <Link
              href="/todays-advisory"
              className="mt-3 text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
            >
              <span>See stage recommendations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Embedded Satellite Crop Monitoring Canvas */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-900">
            Satellite Multi-Spectral Field Observer
          </h3>
          <Link
            href="/satellite-monitor"
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
          >
            <span>Full Satellite Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <SatelliteFieldMap />
      </div>

      {/* Immediate Farmer Advisories */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-900">
            Active Priority Advisories for this Farm
          </h3>
          <Link
            href="/todays-advisory"
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-900"
          >
            View all 4 advisories →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {initialAdvisories.slice(0, 2).map((adv) => (
            <ExplainableAICard key={adv.id} advisory={adv} />
          ))}
        </div>
      </div>
    </div>
  );
}
