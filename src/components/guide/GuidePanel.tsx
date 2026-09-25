'use client';

import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Compass,
} from 'lucide-react';
import { useGuide } from './GuideContext';
import { useApp } from '@/context/AppContext';

interface GuidePanelProps {
  onPanelRectChange?: (rect: DOMRect | null) => void;
}

export function GuidePanel({ onPanelRectChange }: GuidePanelProps) {
  const {
    isActive,
    activeGuide,
    currentStepIndex,
    currentStep,
    totalSteps,
    targetRect,
    nextStep,
    prevStep,
    skipGuide,
    finishGuide,
    dontShowAgain,
    setDontShowAgain,
  } = useGuide();

  const { language } = useApp();
  const isHi = language === 'hi';

  const panelRef = useRef<HTMLDivElement>(null);
  const [panelPosition, setPanelPosition] = useState<{ top: number; left: number; isMobile: boolean }>({
    top: 100,
    left: 20,
    isMobile: false,
  });

  // Calculate panel position avoiding viewport overflow
  useLayoutEffect(() => {
    if (!isActive || !panelRef.current) {
      if (onPanelRectChange) onPanelRectChange(null);
      return;
    }

    const panelEl = panelRef.current;
    const panelWidth = panelEl.offsetWidth || 440;
    const panelHeight = panelEl.offsetHeight || 320;
    const windowW = window.innerWidth;
    const windowH = window.innerHeight;

    // Mobile fallback: fixed bottom dock
    if (windowW < 640) {
      setPanelPosition({
        top: windowH - panelHeight - 16,
        left: 16,
        isMobile: true,
      });
      if (onPanelRectChange) {
        onPanelRectChange(panelEl.getBoundingClientRect());
      }
      return;
    }

    if (!targetRect) {
      // Center of screen
      setPanelPosition({
        top: Math.max(80, (windowH - panelHeight) / 2),
        left: Math.max(16, (windowW - panelWidth) / 2),
        isMobile: false,
      });
      if (onPanelRectChange) {
        onPanelRectChange(panelEl.getBoundingClientRect());
      }
      return;
    }

    const gap = 16;
    const preference = currentStep?.placement || 'bottom';

    let top = 0;
    let left = 0;

    // Horizontal centering relative to target
    const targetCenterX = targetRect.left + targetRect.width / 2;
    left = targetCenterX - panelWidth / 2;

    // Clamp horizontally
    left = Math.max(16, Math.min(left, windowW - panelWidth - 16));

    if (preference === 'bottom') {
      top = targetRect.bottom + gap;
      // If overflows bottom, flip to top
      if (top + panelHeight > windowH - 16) {
        top = targetRect.top - panelHeight - gap;
      }
    } else if (preference === 'top') {
      top = targetRect.top - panelHeight - gap;
      // If overflows top, flip to bottom
      if (top < 70) {
        top = targetRect.bottom + gap;
      }
    } else if (preference === 'left') {
      left = targetRect.left - panelWidth - gap;
      top = targetRect.top;
      if (left < 16) {
        left = targetRect.right + gap;
      }
    } else if (preference === 'right') {
      left = targetRect.right + gap;
      top = targetRect.top;
      if (left + panelWidth > windowW - 16) {
        left = targetRect.left - panelWidth - gap;
      }
    } else {
      // Auto
      if (targetRect.bottom + panelHeight + gap < windowH) {
        top = targetRect.bottom + gap;
      } else {
        top = Math.max(70, targetRect.top - panelHeight - gap);
      }
    }

    // Final safety clamps
    top = Math.max(70, Math.min(top, windowH - panelHeight - 16));
    left = Math.max(16, Math.min(left, windowW - panelWidth - 16));

    setPanelPosition({ top, left, isMobile: false });

    if (onPanelRectChange) {
      setTimeout(() => {
        if (panelRef.current) {
          onPanelRectChange(panelRef.current.getBoundingClientRect());
        }
      }, 50);
    }
  }, [isActive, targetRect, currentStep, currentStepIndex, onPanelRectChange]);

  if (!isActive || !currentStep) return null;

  const isLastStep = currentStepIndex === totalSteps - 1;
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  return (
    <aside
      ref={panelRef}
      aria-label="Interactive Smart Guide"
      aria-live="polite"
      className={`fixed z-50 transition-all duration-300 ease-out ${
        panelPosition.isMobile
          ? 'left-3 right-3 bottom-3 w-auto max-w-none'
          : 'w-[440px] max-w-[calc(100vw-32px)]'
      }`}
      style={
        panelPosition.isMobile
          ? {}
          : {
              top: `${panelPosition.top}px`,
              left: `${panelPosition.left}px`,
            }
      }
    >
      {/* 
        CRITICAL REQUIREMENT: 
        The guide information box itself MUST be 100% OPAQUE / SOLID (never transparent).
        High-contrast solid dark emerald / slate background: #091a12.
      */}
      <div
        className="w-full rounded-2xl border-2 border-emerald-400/90 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(16,185,129,0.3)] text-white overflow-hidden"
        style={{
          backgroundColor: '#091a12',
          opacity: 1,
        }}
      >
        {/* Top Progress & Header Bar */}
        <div className="px-5 pt-4 pb-3 border-b border-emerald-800/60 bg-[#06140e] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
              <Compass className="w-4 h-4 animate-spin-slow" />
            </span>
            <div>
              <div className="text-[11px] font-mono uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1.5">
                <span>{activeGuide?.titleEn || 'BKIN SMART GUIDE'}</span>
                <span className="text-slate-500">•</span>
                <span className="text-amber-300">
                  {currentStepIndex + 1} / {totalSteps}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium">
                {activeGuide?.titleHi}
              </div>
            </div>
          </div>

          {/* Skip / Close Button */}
          <button
            onClick={skipGuide}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/10 transition"
            title="Skip Tour (Esc)"
          >
            <span className="text-[11px]">{isHi ? 'छोड़ें' : 'Skip'}</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Line */}
        <div className="w-full h-1.5 bg-emerald-950">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Body Content (Bilingual Presentation) */}
        <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {/* Titles */}
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug flex items-start justify-between gap-2">
              <span>{isHi ? currentStep.titleHi : currentStep.titleEn}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 font-mono flex-shrink-0">
                #{currentStepIndex + 1}
              </span>
            </h3>
            {/* Secondary language subtitle */}
            <p className="text-xs font-medium text-emerald-300/80">
              {isHi ? currentStep.titleEn : currentStep.titleHi}
            </p>
          </div>

          {/* Descriptions */}
          <div className="space-y-2 text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
            <p className="font-medium text-slate-100">
              {isHi ? currentStep.descHi : currentStep.descEn}
            </p>
            <p className="text-xs text-slate-400 italic border-l-2 border-emerald-600/40 pl-2.5">
              {isHi ? currentStep.descEn : currentStep.descHi}
            </p>
          </div>

          {/* Kisan Tip (किसान सलाह) Box */}
          {(currentStep.kisanTipEn || currentStep.kisanTipHi) && (
            <div className="rounded-xl p-3 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border border-amber-400/40 flex items-start gap-2.5 shadow-inner">
              <span className="text-amber-400 mt-0.5 flex-shrink-0">
                <Lightbulb className="w-4 h-4 fill-amber-400/20" />
              </span>
              <div className="space-y-0.5 text-xs">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <span>💡 किसान सलाह</span>
                  <span className="text-slate-500">•</span>
                  <span className="font-semibold text-amber-200/80">Kisan Advisory Tip</span>
                </div>
                <p className="text-slate-200 font-normal leading-normal">
                  {isHi ? currentStep.kisanTipHi : currentStep.kisanTipEn}
                </p>
                {/* Secondary tip */}
                <p className="text-[11px] text-slate-400">
                  {isHi ? currentStep.kisanTipEn : currentStep.kisanTipHi}
                </p>
              </div>
            </div>
          )}

          {/* Feature Route Trigger Hint (if applicable) */}
          {currentStep.featureRoute && (
            <div className="text-[11px] text-emerald-400/90 font-mono flex items-center gap-1">
              <ArrowRight className="w-3 h-3 text-emerald-400" />
              <span>
                {isHi ? 'नेविगेट मार्ग' : 'Navigates to'}: {currentStep.featureRoute}
              </span>
            </div>
          )}
        </div>

        {/* Footer Navigation Bar */}
        <div className="px-5 py-3.5 bg-[#06140e] border-t border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Don't Show Automatically Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer select-none text-[11px] text-slate-400 hover:text-slate-300">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-emerald-700 bg-slate-900 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-0"
            />
            <span>{isHi ? 'स्वतः न दिखाएं' : "Don't show automatically"}</span>
          </label>

          {/* Buttons: Back / Next / Finish */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={prevStep}
              disabled={currentStepIndex === 0}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                currentStepIndex === 0
                  ? 'border-slate-800 text-slate-600 cursor-not-allowed'
                  : 'border-emerald-700/80 text-slate-200 hover:bg-emerald-950/60 hover:text-white'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>{isHi ? 'पिछला' : 'Back'}</span>
            </button>

            {isLastStep ? (
              <button
                onClick={finishGuide}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(16,185,129,0.5)] hover:from-emerald-400 hover:to-teal-400 transition transform active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isHi ? 'समाप्त करें' : 'Finish Tour'}</span>
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:from-emerald-400 hover:to-teal-400 transition transform active:scale-95"
              >
                <span>{isHi ? 'अगला' : 'Next'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
