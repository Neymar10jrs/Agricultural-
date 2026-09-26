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
  User,
  PlusCircle,
  Trash2,
  ExternalLink,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { StatCard } from '@/components/ui/StatCard';
import { AlertBadge } from '@/components/ui/AlertBadge';
import { SatelliteFieldMap } from '@/components/maps/SatelliteFieldMap';
import { initialAdvisories } from '@/data/advisories';
import { ExplainableAICard } from '@/components/ai/ExplainableAICard';
import { SectionHero } from '@/components/ui/SectionHero';

export default function MyFarmPage() {
  const { farm, updateFarm: updateAppFarm, dict: t, language } = useApp();
  const {
    user,
    profile,
    farms,
    activeFarm,
    setActiveFarmId,
    addFarm,
    updateFarm: updateAuthFarm,
    deleteFarm,
  } = useAuth();

  const isHi = language === 'hi';

  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState(farm);

  // New Farm Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFarmName, setNewFarmName] = useState('');
  const [newFarmState, setNewFarmState] = useState('Punjab');
  const [newFarmDistrict, setNewFarmDistrict] = useState('Ludhiana');
  const [newFarmVillage, setNewFarmVillage] = useState('Gill Kalan');
  const [newFarmArea, setNewFarmArea] = useState(3.0);
  const [newFarmSoil, setNewFarmSoil] = useState('Alluvial');
  const [newFarmCrop, setNewFarmCrop] = useState('Wheat (HD-2967)');
  const [newFarmSowing, setNewFarmSowing] = useState('2025-11-15');
  const [newFarmIrrigation, setNewFarmIrrigation] = useState('Tubewell / Borewell');
  const [isAddingFarm, setIsAddingFarm] = useState(false);

  // Quick edit modal
  const handleSaveFarm = (e: React.FormEvent) => {
    e.preventDefault();
    updateAppFarm(formState);
    if (activeFarm) {
      updateAuthFarm(activeFarm.id, {
        name: formState.name,
        state: formState.state,
        district: formState.district,
        totalAreaAcres: formState.areaAcres,
        primaryCrop: formState.crop,
      });
    }
    setIsEditing(false);
  };

  const handleSelectFarm = (selectedId: string) => {
    setActiveFarmId(selectedId);
    const selected = farms.find((f) => f.id === selectedId);
    if (selected) {
      updateAppFarm({
        ...farm,
        id: selected.id,
        name: selected.name,
        state: selected.state,
        district: selected.district,
        village: selected.village || farm.village,
        areaAcres: selected.totalAreaAcres,
        crop: selected.primaryCrop,
        soilType: selected.soilType as any,
        irrigationType: selected.irrigationType as any,
      });
    }
  };

  const handleCreateFarm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingFarm(true);
    try {
      const created = await addFarm({
        name: newFarmName,
        state: newFarmState,
        district: newFarmDistrict,
        village: newFarmVillage,
        totalAreaAcres: Number(newFarmArea),
        soilType: newFarmSoil,
        primaryCrop: newFarmCrop,
        sowingDate: newFarmSowing,
        irrigationType: newFarmIrrigation,
      });

      handleSelectFarm(created.id);
      setShowAddModal(false);
      setNewFarmName('');
    } catch (err) {
      console.error('Failed to create farm:', err);
    } finally {
      setIsAddingFarm(false);
    }
  };

  const handleDeleteActiveFarm = async () => {
    if (!activeFarm) return;
    if (
      window.confirm(
        t.farmManagement?.confirmDelete ||
          'Are you sure you want to delete this farm parcel? This will remove all associated logs.'
      )
    ) {
      await deleteFarm(activeFarm.id);
    }
  };

  return (
    <div className="space-y-0">
      {/* Farm Identity Hero */}
      <SectionHero
        imageSrc="/resources/my-farm/wallpaper.png"
        theme="forest"
        label={isHi ? 'मेरी खेत पहचान' : 'MY FARM IDENTITY'}
        heading={<span className="text-gradient-agri">{activeFarm?.name || farm.name}</span>}
        description={
          isHi
            ? 'वास्तविक समय सैटेलाइट अवलोकन व AI-चालित खेत बुद्धिमत्ता'
            : 'Real-time satellite observations & AI-powered farm intelligence'
        }
        showDemoBadge={true}
        stats={[
          {
            value: (activeFarm?.totalAreaAcres || farm.areaAcres) + ' Ac',
            label: isHi ? 'क्षेत्रफल' : 'Total Area',
          },
          {
            value: activeFarm?.primaryCrop || farm.crop,
            label: isHi ? 'मुख्य फसल' : 'Current Crop',
          },
          { value: isHi ? 'कल्ले फूटना' : 'Tillering', label: isHi ? 'फसल चरण' : 'Growth Stage' },
        ]}
      >
        {/* Location & owner row */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/80">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-300" />
            {activeFarm?.village || farm.village}, {activeFarm?.district || farm.district},{' '}
            {activeFarm?.state || farm.state}
          </span>
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-emerald-300" />
            {isHi ? 'किसान:' : 'Owner:'}{' '}
            <strong className="text-white ml-1">
              {profile?.fullName || farm.ownerName || 'Verified Farmer'}
            </strong>
          </span>
          <span className="text-white/50">•</span>
          <span className="text-xs text-white/60 font-mono">
            {profile?.farmerId || `ID: ${farm.id}`}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-wrap pt-2">
          {user ? (
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition flex items-center gap-1.5 shadow-md"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{t.farmManagement?.addFarmBtn || 'Register New Farm Parcel'}</span>
            </button>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition flex items-center gap-1.5 shadow-md"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In to Save Parcels</span>
            </Link>
          )}

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-xl text-xs font-semibold border border-white/30 hover:bg-white/10 text-white transition flex items-center gap-1.5 backdrop-blur-sm"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>
              {isEditing
                ? isHi
                  ? 'रद्द करें'
                  : 'Cancel Edit'
                : isHi
                ? 'खेत प्रोफ़ाइल संपादित करें'
                : 'Edit Farm Profile'}
            </span>
          </button>

          <Link
            href="/todays-advisory"
            className="px-4 py-2 rounded-xl text-xs font-semibold border border-white/30 hover:bg-white/10 text-white transition flex items-center gap-1.5 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isHi ? 'आज की सलाह देखें' : "View Today's Actions"}</span>
          </Link>
        </div>
      </SectionHero>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Multi-Farm Parcels Switcher Strip — 80% Translucent Surface */}
        <div id="guide-myfarm-parcels" className="space-y-4">
        {user && farms.length > 0 && (
          <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] border border-white/10 rounded-3xl p-6 space-y-4 shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-400" />
                  <span>{t.farmManagement?.title || 'My Registered Parcels'}</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Switch between parcels to view dedicated satellite NDVI, soil analyses, and telemetry.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-emerald-400 text-xs font-semibold self-start sm:self-auto"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Parcel</span>
              </button>
            </div>

            {/* Parcel Cards Carousel/Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {farms.map((f) => {
                const isActive = activeFarm?.id === f.id;
                return (
                  <div
                    key={f.id}
                    onClick={() => handleSelectFarm(f.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isActive
                        ? 'bg-emerald-950/40 border-emerald-500 shadow-md ring-1 ring-emerald-500 backdrop-blur-[6px]'
                        : 'bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] border-white/10 hover:border-emerald-400/40 hover:bg-[rgba(10,20,15,0.28)] shadow-sm'
                    }`}
                  >

                    <div className="flex items-start justify-between">
                      <div className="font-bold text-sm text-white">{f.name}</div>
                      {isActive ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Active
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 hover:text-slate-300">
                          Click to select
                        </span>
                      )}
                    </div>

                    <div className="mt-2 text-xs text-slate-400 space-y-1">
                      <div>
                        Crop:{' '}
                        <strong className="text-slate-200">{f.primaryCrop}</strong>
                      </div>
                      <div>
                        Size:{' '}
                        <strong className="text-slate-200">{f.totalAreaAcres} Acres</strong> • Soil:{' '}
                        <strong className="text-slate-200">{f.soilType}</strong>
                      </div>
                      <div>
                        Location: {f.district}, {f.state}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Parcel Actions */}
            {activeFarm && farms.length > 1 && (
              <div className="flex justify-end pt-2 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={handleDeleteActiveFarm}
                  className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Active Parcel ({activeFarm.name})</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Guest Banner if not logged in */}
        {!user && (
          <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  Unlock Multi-Farm Management & Permanent Farmer ID
                </h4>
                <p className="text-xs text-slate-300">
                  Sign in with your mobile phone to save your parcels, soil tests, and AI consultations in the cloud.
                </p>
              </div>
            </div>
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 whitespace-nowrap shadow-md"
            >
              <span>Sign In with Phone</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
        </div>

        {/* Farm Profile Edit Modal / Form */}
        {isEditing && (
          <form
            onSubmit={handleSaveFarm}
            className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4 shadow-[0_4px_16px_rgba(0,0,0,0.10)]"
          >
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-emerald-400" />
              Modify Farm Parameters (Simulate Different State & Crops)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">State</label>
                <select
                  value={formState.state}
                  onChange={(e) => setFormState({ ...formState, state: e.target.value })}
                  className="w-full bg-[rgba(10,20,15,0.60)] border border-white/20 text-white rounded-lg p-2"
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
                <label className="font-semibold text-slate-300 block mb-1">District</label>
                <input
                  type="text"
                  value={formState.district}
                  onChange={(e) => setFormState({ ...formState, district: e.target.value })}
                  className="w-full bg-[rgba(10,20,15,0.60)] border border-white/20 text-white rounded-lg p-2"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Crop</label>
                <input
                  type="text"
                  value={formState.crop}
                  onChange={(e) => setFormState({ ...formState, crop: e.target.value })}
                  className="w-full bg-[rgba(10,20,15,0.60)] border border-white/20 text-white rounded-lg p-2"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Area (Acres)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formState.areaAcres}
                  onChange={(e) =>
                    setFormState({ ...formState, areaAcres: Number(e.target.value) })
                  }
                  className="w-full bg-[rgba(10,20,15,0.60)] border border-white/20 text-white rounded-lg p-2"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Irrigation Source</label>
                <select
                  value={formState.irrigationType}
                  onChange={(e) =>
                    setFormState({ ...formState, irrigationType: e.target.value as any })
                  }
                  className="w-full bg-[rgba(10,20,15,0.60)] border border-white/20 text-white rounded-lg p-2"
                >
                  <option value="Tubewell / Borewell">Tubewell / Borewell</option>
                  <option value="Canal">Canal</option>
                  <option value="Drip Micro-irrigation">Drip Micro-irrigation</option>
                  <option value="Sprinkler">Sprinkler</option>
                  <option value="Rainfed">Rainfed</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Days After Sowing</label>
                <input
                  type="number"
                  value={formState.daysAfterSowing}
                  onChange={(e) =>
                    setFormState({ ...formState, daysAfterSowing: Number(e.target.value) })
                  }
                  className="w-full bg-[rgba(10,20,15,0.60)] border border-white/20 text-white rounded-lg p-2"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Previous Crop</label>
                <input
                  type="text"
                  value={formState.previousCrop}
                  onChange={(e) => setFormState({ ...formState, previousCrop: e.target.value })}
                  className="w-full bg-[rgba(10,20,15,0.60)] border border-white/20 text-white rounded-lg p-2"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-1.5 rounded-lg border border-white/20 text-slate-300 hover:bg-white/10 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400"
              >
                Save Parameters
              </button>
            </div>
          </form>
        )}

        {/* Farm Health Composite Banner — 80% Translucent Surface */}
        <div id="guide-myfarm-health" className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] border border-white/10 rounded-2xl p-6 text-white shadow-[0_4px_16px_rgba(0,0,0,0.10)] relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
                  Multi-Factor Intelligence
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-emerald-200">
                  Real-Time Synced Telemetry
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black">Overall Farm Health Score</h2>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                Composite index calculated from multi-spectral Sentinel-2 NDVI, automated weather
                radar, soil nutrient tests, and block-level disease monitoring.
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

        {/* Diagnostic Health Matrix */}
        <div id="guide-myfarm-matrix" className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-white">Diagnostic Health Matrix</h3>
            <span className="text-xs text-slate-300">Updated today from ISRO/IMD/KVK feeds</span>
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

            <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] border border-white/10 rounded-xl p-4 flex flex-col justify-between text-white shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
              <div>
                <div className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">
                  Crop Stage
                </div>
                <div className="text-base font-bold text-white mt-1">CRI Initiation</div>
                <div className="text-xs text-slate-300">
                  {farm.daysAfterSowing} Days After Sowing
                </div>
              </div>
              <Link
                href="/todays-advisory"
                className="mt-3 text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <span>See stage recommendations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Embedded Satellite Crop Monitoring Canvas */}
        <div id="guide-myfarm-satellite" className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-white">
              Satellite Multi-Spectral Field Observer
            </h3>
            <Link
              href="/satellite-monitor"
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>Full Satellite Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <SatelliteFieldMap />
        </div>

        {/* Immediate Farmer Advisories */}
        <div id="guide-myfarm-advisories" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-white">
              Active Priority Advisories for this Farm
            </h3>
            <Link
              href="/todays-advisory"
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
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

      {/* Add New Farm Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-400" />
                <span>{t.farmManagement?.modalTitle || 'Add New Agricultural Parcel'}</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateFarm} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {t.farmManagement?.farmName || 'Parcel Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={newFarmName}
                  onChange={(e) => setNewFarmName(e.target.value)}
                  placeholder={
                    t.farmManagement?.farmNamePlaceholder || 'e.g. North Canal Wheat Parcel'
                  }
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={newFarmState}
                    onChange={(e) => setNewFarmState(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">District *</label>
                  <input
                    type="text"
                    required
                    value={newFarmDistrict}
                    onChange={(e) => setNewFarmDistrict(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {t.farmManagement?.areaAcres || 'Area (Acres)'} *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newFarmArea}
                    onChange={(e) => setNewFarmArea(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {t.farmManagement?.primaryCrop || 'Primary Crop'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={newFarmCrop}
                    onChange={(e) => setNewFarmCrop(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {t.farmManagement?.soilType || 'Soil Type'}
                  </label>
                  <select
                    value={newFarmSoil}
                    onChange={(e) => setNewFarmSoil(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Alluvial">Alluvial</option>
                    <option value="Black Soil (Regur)">Black Soil (Regur)</option>
                    <option value="Red & Yellow">Red & Yellow</option>
                    <option value="Laterite">Laterite</option>
                    <option value="Sandy Loam">Sandy Loam</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {t.farmManagement?.irrigationType || 'Irrigation System'}
                  </label>
                  <select
                    value={newFarmIrrigation}
                    onChange={(e) => setNewFarmIrrigation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Tubewell / Borewell">Tubewell / Borewell</option>
                    <option value="Canal">Canal</option>
                    <option value="Drip Micro-irrigation">Drip Micro-irrigation</option>
                    <option value="Sprinkler">Sprinkler</option>
                    <option value="Rainfed">Rainfed</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700"
                >
                  {t.common?.cancel || 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={isAddingFarm || !newFarmName}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/25 disabled:opacity-50"
                >
                  {isAddingFarm && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{t.farmManagement?.saveFarmBtn || 'Register Parcel'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
