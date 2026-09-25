'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  AlertTriangle,
  Radio,
  Send,
  Users,
  Layers,
  Activity,
  CheckCircle2,
  MapPin,
  FileText,
  Search,
  Check,
} from 'lucide-react';
import { indianStatesData } from '@/data/states';
import { useApp } from '@/context/AppContext';
import { SectionHero } from '@/components/ui/SectionHero';



export default function OfficerDashboardPage() {
  const { language } = useApp();
  const isHi = language === 'hi';
  const [selectedDistrict, setSelectedDistrict] = useState('Ludhiana');
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastBody, setBroadcastBody] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);

  const farmerGrievanceQueue = [
    {
      id: 'rep-101',
      farmer: 'Harpreet Singh (Vill. Khatra)',
      crop: 'Wheat (Day 38)',
      issue: 'Suspected Yellow Rust powder on leaf tips bordering canal',
      status: 'Pending Verification',
      urgency: 'High',
      time: '2 hours ago',
    },
    {
      id: 'rep-102',
      farmer: 'Balwinder Kaur (Vill. Ghulal)',
      crop: 'Wheat (Day 40)',
      issue: 'Sub-surface waterlogging in 1.5-acre depression',
      status: 'Advisory Dispatched',
      urgency: 'Medium',
      time: '4 hours ago',
    },
    {
      id: 'rep-103',
      farmer: 'Jasbir Singh (Vill. Otalan)',
      crop: 'Mustard (Day 30)',
      issue: 'Aphid cluster observed on flowering top shoots',
      status: 'Advisory Dispatched',
      urgency: 'High',
      time: 'Yesterday',
    },
  ];

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastTitle('');
      setBroadcastBody('');
      setBroadcastSent(false);
    }, 3000);
  };

  return (
    <div className="space-y-0">
      <SectionHero
        imageSrc="/assets/national-grid/india-grid.svg"
        theme="satellite"
        label={isHi ? 'कृषि एवं किसान कल्याण विभाग' : 'DEPARTMENT OF AGRICULTURE & FARMER WELFARE'}
        heading={
          <span className="text-gradient-satellite">
            {isHi ? 'कृषि अधिकारी फील्ड डैशबोर्ड' : 'Agriculture Officer Field Dashboard'}
          </span>
        }
        description={
          isHi
            ? 'क्षेत्रीय फसल निगरानी, प्रकोप हॉटस्पॉट ट्रैकिंग, और ब्लॉक स्तरीय परामर्श प्रसारण कमांड हब।'
            : 'Regional crop monitoring, outbreak hotspot tracking, and block-level advisory dissemination command hub.'
        }
        showDemoBadge={true}
        stats={[
          { value: '42,800', label: isHi ? 'पंजीकृत किसान' : 'Farmers Monitored' },
          { value: '98.4%', label: isHi ? 'परामर्श वितरण' : 'Delivery Rate' },
          { value: '2', label: isHi ? 'सक्रिय हॉटस्पॉट' : 'Active Hotspots' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">


      {/* Officer KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-2xl border border-white/10 p-5 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Jurisdiction Reach</span>
          <div className="text-2xl font-black text-slate-900">42,800 Farmers</div>
          <div className="text-xs text-emerald-700 font-medium">Samrala & Khanna Blocks</div>
        </div>

        <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-2xl border border-white/10 p-5 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Advisory Delivery Rate</span>
          <div className="text-2xl font-black text-emerald-800">98.4%</div>
          <div className="text-xs text-slate-500">SMS, WhatsApp & App Push</div>
        </div>

        <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-2xl border border-white/10 p-5 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Active Disease Flags</span>
          <div className="text-2xl font-black text-amber-700">2 Hotspots</div>
          <div className="text-xs text-slate-500">Stripe Rust surveillance in border villages</div>
        </div>

        <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-2xl border border-white/10 p-5 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Field Scout Reports</span>
          <div className="text-2xl font-black text-slate-900">14 Verified</div>
          <div className="text-xs text-emerald-700 font-semibold">PAU Extension Linked</div>
        </div>
      </div>

      {/* Outbreak Hotspots & Broadcast Composer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Broadcast Advisory Tool */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-2xl border border-white/10 p-5 sm:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-4">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
              <h3 className="font-bold text-base text-slate-900">
                Broadcast Regional Farmer Advisory
              </h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dispatches authenticated notifications directly across WhatsApp, SMS flash, and Kisan Mobile apps to all farmers registered in the selected block.
            </p>

            <form onSubmit={handleBroadcast} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Target District & Block</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                >
                  <option value="Ludhiana">Ludhiana (All 6 Blocks)</option>
                  <option value="Samrala">Ludhiana - Samrala Block</option>
                  <option value="Khanna">Ludhiana - Khanna Block</option>
                  <option value="Jagraon">Ludhiana - Jagraon Block</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Advisory Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mandatory Irrigation Delay Notice Post Western Disturbance"
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Advisory Message Content</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Draft localized action points, recommended spray dosages, and hotline numbers..."
                  value={broadcastBody}
                  onChange={(e) => setBroadcastBody(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow transition flex items-center justify-center gap-2"
              >
                {broadcastSent ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Advisory Broadcast Dispatched to 18,400 Farmers!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Broadcast to Block Farmers (SMS + WhatsApp)</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right: Farmer Scout Grievance / Surveillance Queue */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-2xl border border-white/10 p-5 sm:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                Live Farmer Observations & Scout Queue
              </h3>
              <span className="text-xs text-slate-500">Real-time incoming crowdsource</span>
            </div>

            <div className="space-y-3">
              {farmerGrievanceQueue.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 space-y-2 text-xs transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{item.farmer}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          item.urgency === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.urgency}
                      </span>
                      <span className="text-[10px] text-slate-400">{item.time}</span>
                    </div>
                  </div>

                  <p className="text-slate-700 font-medium leading-relaxed">
                    {item.issue}
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-slate-500">{item.crop}</span>
                    <span className="text-emerald-700 font-semibold">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

