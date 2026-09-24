'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  EyeOff,
  UserCheck,
  Server,
  FileCheck,
  Database,
  ArrowRight,
  HeartHandshake,
} from 'lucide-react';

export default function PrivacyTrustPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider border border-emerald-300">
            Trust & Governance Center
          </span>
          <span className="text-xs text-slate-500 font-medium">Digital Public Infrastructure Security Charter</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Data Privacy & Farmer Trust Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          BKIN is designed under the core principle that agricultural data belongs to the farmer and the state, not private monopolies or unchecked brokers.
        </p>
      </div>

      {/* Core Principle Quote Card (Section 35) */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-2 border border-emerald-500/30">
        <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">
          Our Public Charter Pledge
        </div>
        <blockquote className="text-lg sm:text-2xl font-black leading-snug">
          &ldquo;Your agricultural data should be useful to you while being handled responsibly.&rdquo;
        </blockquote>
        <p className="text-xs text-slate-300 pt-1">
          Every field boundary, soil test, and smartphone photo remains under your explicit consent.
        </p>
      </div>

      {/* 6 Trust Pillars Grid (Section 35) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="telemetry-card bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900">Data Minimization</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We only collect telemetry required to generate agronomic guidance. Personal identification numbers are never cross-sold or exposed to commercial advertisement networks.
          </p>
        </div>

        <div className="telemetry-card bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100">
            <UserCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900">Explicit Farmer Consent</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Data sharing with banks, crop insurance companies, or subsidy registries occurs only when explicitly authorized by the farmer with one-time verification tokens.
          </p>
        </div>

        <div className="telemetry-card bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
            <Server className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900">State Sovereignty</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Each Indian state hosts its own regional node. State agriculture departments retain ultimate sovereign custodianship of their state farm registers.
          </p>
        </div>

        <div className="telemetry-card bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-100">
            <EyeOff className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900">Research Anonymization</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Public open APIs provide aggregated and k-anonymized data strips (e.g. block-level averages) preventing deanonymization of individual smallholder parcels.
          </p>
        </div>

        <div className="telemetry-card bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900">Military-Grade Encryption</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            AES-256 encryption at rest in government cloud data centers and TLS 1.3 encryption in transit protect all sensor and image uploads.
          </p>
        </div>

        <div className="telemetry-card bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center border border-rose-100">
            <FileCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900">AI Transparency & Auditing</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every machine learning model is explainable. We never provide opaque &apos;black-box&apos; recommendations and disclose exactly which datasets produced each piece of advice.
          </p>
        </div>
      </div>
    </div>
  );
}
