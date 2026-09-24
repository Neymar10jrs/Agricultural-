'use client';

import React from 'react';
import Link from 'next/link';
import { Sprout, ShieldCheck, Radio } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function Footer() {
  const { language, dict } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-24 lg:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <span className="text-white font-bold text-base tracking-tight">BKIN</span>
                <span className="text-emerald-400 text-xs font-semibold ml-2">
                  {language === 'hi' ? 'डिजिटल पब्लिक गुड' : 'Digital Public Good'}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {dict.footer.coreMessage}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {language === 'hi'
                  ? 'संप्रभु राज्य डेटा व गोपनीयता सुरक्षा वास्तुकला'
                  : 'Sovereign State Data & Privacy Protection Architecture'}
              </span>
            </div>
            <div className="text-[11px] text-emerald-300 font-medium">
              📞 {dict.footer.emergencyHelpline}
            </div>
          </div>

          {/* Col 1: Farm Intelligence */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              {dict.nav.sections.intelligence}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/my-farm" className="hover:text-emerald-400 transition">
                  {dict.nav.myFarm}
                </Link>
              </li>
              <li>
                <Link href="/farm-digital-twin" className="hover:text-emerald-400 transition">
                  {dict.nav.farmTwin}
                </Link>
              </li>
              <li>
                <Link href="/risk-center" className="hover:text-emerald-400 transition">
                  {dict.nav.riskCenter}
                </Link>
              </li>
              <li>
                <Link href="/crop-doctor" className="hover:text-emerald-400 transition">
                  {dict.nav.cropDoctor}
                </Link>
              </li>
              <li>
                <Link href="/todays-advisory" className="hover:text-emerald-400 transition">
                  {dict.nav.todaysAdvisory}
                </Link>
              </li>
              <li>
                <Link href="/alert-center" className="hover:text-emerald-400 transition">
                  {dict.nav.alertCenter}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Climate & Field Telemetry */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              {dict.nav.sections.fieldData}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/weather" className="hover:text-emerald-400 transition">
                  {dict.nav.weather}
                </Link>
              </li>
              <li>
                <Link href="/soil-health" className="hover:text-emerald-400 transition">
                  {dict.nav.soilHealth}
                </Link>
              </li>
              <li>
                <Link href="/satellite-monitor" className="hover:text-emerald-400 transition">
                  {dict.nav.satelliteMonitor}
                </Link>
              </li>
              <li>
                <Link href="/early-warnings" className="hover:text-emerald-400 transition">
                  {dict.nav.earlyWarnings}
                </Link>
              </li>
              <li>
                <Link href="/climate-smart" className="hover:text-emerald-400 transition">
                  {dict.nav.climateSmart}
                </Link>
              </li>
              <li>
                <Link href="/regenerative-ag" className="hover:text-emerald-400 transition">
                  {dict.nav.regenerativeAg}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Public Infrastructure & Verification */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              {dict.nav.sections.platform}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/expert-connect" className="hover:text-emerald-400 transition">
                  {dict.nav.expertConnect}
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-emerald-400 transition">
                  {dict.nav.impact}
                </Link>
              </li>
              <li>
                <Link href="/india-network" className="hover:text-emerald-400 transition">
                  {dict.nav.indiaNetwork}
                </Link>
              </li>
              <li>
                <Link href="/state-dashboard" className="hover:text-emerald-400 transition">
                  {dict.nav.stateDashboard}
                </Link>
              </li>
              <li>
                <Link href="/open-apis" className="hover:text-emerald-400 transition">
                  {dict.nav.openApis}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition">
                  {dict.nav.about}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>
              © {new Date().getFullYear()} {dict.nav.networkTitle}. {dict.footer.mission}
            </p>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {dict.common.madeBy}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              {language === 'hi' ? 'फेडरेटेड नोड्स: 6 सक्रिय राज्य' : 'Federated Nodes: 6 Active States'}
            </span>
            <Link href="/privacy-trust" className="hover:text-slate-300">
              {dict.nav.privacyTrust}
            </Link>
            <Link href="/open-apis" className="hover:text-slate-300">
              {dict.nav.openApis}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
