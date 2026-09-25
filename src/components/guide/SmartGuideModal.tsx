'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import {
  Compass,
  X,
  Play,
  RotateCcw,
  Sparkles,
  MapPin,
  ChevronRight,
  Shield,
  Activity,
  Layers,
  CloudSun,
  Layers3,
  Bell,
  BarChart3,
} from 'lucide-react';
import { useGuide } from './GuideContext';
import { GLOBAL_GUIDE, PAGE_GUIDES } from './guideConfig';
import { useApp } from '@/context/AppContext';

export function SmartGuideModal() {
  const {
    isModalOpen,
    closeGuideModal,
    startGuide,
    startGlobalTour,
    startPageTour,
    availablePageGuide,
    resetGuidePreferences,
  } = useGuide();

  const { language } = useApp();
  const isHi = language === 'hi';
  const pathname = usePathname();

  if (!isModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="smart-guide-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-gradient-to-b from-[#091f16] to-[#04100b] border-2 border-emerald-500/60 shadow-2xl text-white overflow-hidden flex flex-col max-h-[90vh]"
        style={{ opacity: 1 }}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-emerald-800/60 flex items-center justify-between bg-black/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h2
                id="smart-guide-title"
                className="text-lg font-bold text-white flex items-center gap-2"
              >
                <span>{isHi ? 'बीकेआईएन स्मार्ट गाइड' : 'BKIN Smart Guide'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 uppercase font-mono">
                  Interactive HUD
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                {isHi
                  ? 'प्लेटफॉर्म सुविधाओं और कृषि बुद्धिमत्ता का इंटरएक्टिव भ्रमण'
                  : 'Interactive camera-focus onboarding & deep feature walkthroughs'}
              </p>
            </div>
          </div>

          <button
            onClick={closeGuideModal}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
          {/* Layer 1: Core National Platform Tour */}
          <div className="space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
              <span>LAYER 1</span>
              <span className="text-slate-500">•</span>
              <span>{isHi ? 'सार्वजनिक मंच दौरा' : 'NATIONAL PLATFORM TOUR'}</span>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/70 to-teal-950/70 border border-emerald-500/50 hover:border-emerald-400 transition group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                    {isHi ? GLOBAL_GUIDE.titleHi : GLOBAL_GUIDE.titleEn}
                  </h3>
                  <span className="px-2 py-0.5 text-[10px] rounded bg-emerald-900/80 text-emerald-200 border border-emerald-600/50 font-mono">
                    {GLOBAL_GUIDE.steps.length} Steps
                  </span>
                </div>
                <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
                  {isHi ? GLOBAL_GUIDE.descriptionHi : GLOBAL_GUIDE.descriptionEn}
                </p>
              </div>

              <button
                onClick={() => startGlobalTour()}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition transform active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isHi ? 'भ्रमण शुरू करें' : 'Start Tour'}</span>
              </button>
            </div>
          </div>

          {/* Layer 2: Current Contextual Page Tour */}
          {availablePageGuide && (
            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-teal-400 font-bold flex items-center gap-1.5">
                <span>LAYER 2</span>
                <span className="text-slate-500">•</span>
                <span>{isHi ? 'वर्तमान पृष्ठ गाइड' : 'ACTIVE PAGE GUIDE'}</span>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-teal-950/70 to-slate-900/80 border border-teal-500/50 hover:border-teal-400 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">
                      {isHi ? availablePageGuide.titleHi : availablePageGuide.titleEn}
                    </h3>
                    <span className="px-2 py-0.5 text-[10px] rounded bg-teal-900/80 text-teal-200 border border-teal-600/50 font-mono">
                      {availablePageGuide.steps.length} Steps
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
                    {isHi ? availablePageGuide.descriptionHi : availablePageGuide.descriptionEn}
                  </p>
                </div>

                <button
                  onClick={() => startPageTour()}
                  className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs shadow-lg transition transform active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isHi ? 'पृष्ठ गाइड शुरू करें' : 'Explore Page'}</span>
                </button>
              </div>
            </div>
          )}

          {/* All Available Page Tours Directory */}
          <div className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center justify-between">
              <span>{isHi ? 'सभी उपलब्ध मॉड्यूल मार्गदर्शिकाएँ' : 'ALL MODULE GUIDES'}</span>
              <span className="text-emerald-400 font-mono">{Object.keys(PAGE_GUIDES).length} Modules</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {Object.entries(PAGE_GUIDES).map(([route, guide]) => {
                const isCurrent = pathname === route;
                return (
                  <button
                    key={route}
                    onClick={() => {
                      if (pathname !== route) {
                        window.location.href = route;
                      } else {
                        startGuide(guide);
                      }
                    }}
                    className={`p-3 rounded-xl border text-left transition flex items-center justify-between gap-2 group ${
                      isCurrent
                        ? 'bg-emerald-950/50 border-emerald-500/70 hover:bg-emerald-900/50'
                        : 'bg-black/30 border-slate-800/80 hover:border-slate-700 hover:bg-white/5'
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="text-xs font-bold text-white group-hover:text-emerald-300 truncate">
                        {isHi ? guide.titleHi : guide.titleEn}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-2">
                        <span className="font-mono text-emerald-400/90">{guide.steps.length} Steps</span>
                        <span>•</span>
                        <span className="truncate">{route}</span>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-emerald-800/60 bg-black/40 flex items-center justify-between text-xs">
          <button
            onClick={() => {
              resetGuidePreferences();
              alert(
                isHi
                  ? 'गाइड प्राथमिकताएं रीसेट कर दी गई हैं।'
                  : 'Guide preferences have been reset.'
              );
            }}
            className="flex items-center gap-1.5 text-slate-400 hover:text-amber-300 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isHi ? 'गाइड प्राथमिकताएं रीसेट करें' : 'Reset Guide State'}</span>
          </button>

          <span className="text-slate-500 text-[11px] font-mono">
            Esc to close • 🎯 Camera Focus
          </span>
        </div>
      </div>
    </div>
  );
}
