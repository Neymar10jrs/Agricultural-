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

export default function OfficerDashboardPage() {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider border border-blue-300">
              Department of Agriculture & Farmer Welfare
            </span>
            <span className="text-xs text-slate-500 font-medium">District Officer Command Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Agriculture Officer Field Dashboard
          </h1>
          <p className="text-xs text-slate-500">
            Regional crop monitoring, outbreak hotspot tracking, and block-level advisory dissemination.
          </p>
        </div>

        {/* Demo Data Notice Tag */}
        <div className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold shrink-0">
          Demo Data — Officer Simulation Mode
        </div>
      </div>

      {/* Officer KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Jurisdiction Reach</span>
          <div className="text-2xl font-black text-slate-900">42,800 Farmers</div>
          <div className="text-xs text-emerald-700 font-medium">Samrala & Khanna Blocks</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Advisory Delivery Rate</span>
          <div className="text-2xl font-black text-emerald-800">98.4%</div>
          <div className="text-xs text-slate-500">SMS, WhatsApp & App Push</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Active Disease Flags</span>
          <div className="text-2xl font-black text-amber-700">2 Hotspots</div>
          <div className="text-xs text-slate-500">Stripe Rust surveillance in border villages</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Field Scout Reports</span>
          <div className="text-2xl font-black text-slate-900">14 Verified</div>
          <div className="text-xs text-emerald-700 font-semibold">PAU Extension Linked</div>
        </div>
      </div>

      {/* Outbreak Hotspots & Broadcast Composer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Broadcast Advisory Tool */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
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
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
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
  );
}
