'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sprout,
  ShieldCheck,
  Building2,
  Users,
  Code2,
  GraduationCap,
  Globe2,
  HeartHandshake,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-300">
          <Sprout className="w-3.5 h-3.5" />
          <span>India&apos;s Agricultural Public Infrastructure</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          About Bharat Krishi Intelligence Network (BKIN)
        </h1>
        <p className="text-base text-slate-600 leading-relaxed font-medium">
          &ldquo;From Data to Decisions — Smarter Farming for Every Indian Farmer.&rdquo;
        </p>
      </div>

      {/* Mission & Vision Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-3">
          <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">Our Purpose</span>
          <h2 className="text-xl font-bold text-slate-900">Democratizing Agricultural Intelligence</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            India has over 140 million farming households, predominantly small and marginal landholders. While satellite constellations, meteorological radars, and agricultural research generate petabytes of telemetry daily, this intelligence historically remained trapped in research silos or commercial subscriptions.
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            BKIN acts as the national translation layer, converting complex multi-spectral pixels and meteorological forecasts into plain-spoken, localized guidance in the farmer&apos;s mother tongue.
          </p>
        </div>

        <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
          <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Our Architecture</span>
          <h2 className="text-xl font-bold text-white">Built as a Digital Public Good</h2>
          <p className="text-xs text-emerald-100/90 leading-relaxed">
            Just as UPI transformed digital payments and ONDC opened digital commerce, BKIN is architected as an interoperable, open-standard digital public good.
          </p>
          <p className="text-xs text-emerald-100/90 leading-relaxed">
            Every Indian state maintains sovereignty over its data nodes, while open APIs enable startups, cooperatives, FPOs, and researchers to build value-added agronomic applications on top.
          </p>
        </div>
      </div>

      {/* Target Audiences Served (Section 7) */}
      <div className="space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Who We Serve</span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">Designed for the Entire Agricultural Ecosystem</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="telemetry-card bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block text-sm">🌱 Small & Marginal Farmers</span>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Simple local language, voice interaction, irrigation delay alerts, crop disease diagnosis, and today&apos;s direct action plan.
            </p>
          </div>

          <div className="telemetry-card bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block text-sm">🏛️ Agriculture Officers</span>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Block-level disease hotspot heatmaps, active pest traps, advisory coverage statistics, and farmer escalation queues.
            </p>
          </div>

          <div className="telemetry-card bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block text-sm">🤝 FPOs & Cooperatives</span>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Acreage-wide crop health monitoring, bulk input planning, harvest timing forecasts, and collective resilience reporting.
            </p>
          </div>

          <div className="telemetry-card bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block text-sm">🔬 Agronomic Researchers</span>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Historical multi-season satellite NDVI trends, climate correlation data, soil degradation maps, and open research feeds.
            </p>
          </div>

          <div className="telemetry-card bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block text-sm">💻 AgriTech Developers</span>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Open REST APIs, standardized JSON schemas, interactive sandbox testing, and seamless state node interoperability.
            </p>
          </div>

          <div className="telemetry-card bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block text-sm">🇮🇳 Citizens & Students</span>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Transparent understanding of India&apos;s agricultural seasons, food security, agro-climatic zones, and soil health condition.
            </p>
          </div>
        </div>
      </div>

      {/* Public Ecosystem Partners */}
      <div className="bg-slate-100/80 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4 text-center">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Integrated Public Data Standards & Collaborations
        </span>
        <div className="flex flex-wrap items-center justify-center gap-6 text-slate-700 font-bold text-sm">
          <span>ICAR</span>
          <span>•</span>
          <span>IMD Agro-met</span>
          <span>•</span>
          <span>ISRO / NRSC</span>
          <span>•</span>
          <span>State Agricultural Universities</span>
          <span>•</span>
          <span>DAC&FW</span>
          <span>•</span>
          <span>Digital Green</span>
        </div>
      </div>
    </div>
  );
}
