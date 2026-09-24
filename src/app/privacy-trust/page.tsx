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
import { useApp } from '@/context/AppContext';
import { SectionHero } from '@/components/ui/SectionHero';

export default function PrivacyTrustPage() {
  const { language } = useApp();
  const isHi = language === 'hi';

  return (
    <div className="space-y-0">
      <SectionHero
        imageSrc="/assets/national-grid/india-grid.svg"
        theme="forest"
        label={isHi ? 'विश्वास व शासन केंद्र' : 'TRUST & GOVERNANCE CHARTER'}
        heading={
          <span className="text-gradient-agri">
            {isHi ? 'डेटा गोपनीयता व किसान विश्वास केंद्र' : 'Data Privacy & Farmer Trust Center'}
          </span>
        }
        description={
          isHi
            ? 'बीकेआईएन इस मूल सिद्धांत पर निर्मित है कि कृषि डेटा किसान और राज्य का है, किसी निजी एकाधिकार या अनियंत्रित ब्रोकर का नहीं।'
            : 'BKIN is designed under the core principle that agricultural data belongs to the farmer and the state, not private monopolies or unchecked brokers.'
        }
        showDemoBadge={true}
        stats={[
          { value: 'AES-256', label: isHi ? 'एन्क्रिप्शन' : 'Encryption' },
          { value: 'Zero', label: isHi ? 'डेटा बिक्री' : 'Data Sales' },
          { value: '100%', label: isHi ? 'सहमति आधारित' : 'Consent-Driven' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">


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
    </div>
  );
}

