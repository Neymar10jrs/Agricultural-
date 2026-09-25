'use client';

import React, { useState } from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { useGuide } from './GuideContext';
import { useApp } from '@/context/AppContext';
import { CameraSpotlight } from './CameraSpotlight';
import { GuidePanel } from './GuidePanel';
import { SmartGuideModal } from './SmartGuideModal';

/**
 * SmartGuideNavButton: Designed for inclusion inside Navbar.tsx
 */
export function SmartGuideNavButton() {
  const { openGuideModal, isActive } = useGuide();
  const { language } = useApp();
  const isHi = language === 'hi';

  return (
    <button
      id="nav-smart-guide"
      onClick={openGuideModal}
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition shadow-xs ${
        isActive
          ? 'bg-emerald-600 text-white border border-emerald-400'
          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300/80 hover:border-emerald-400'
      }`}
      title={isHi ? 'बीकेआईएन स्मार्ट गाइड' : 'BKIN Smart Guide'}
      aria-label="Open Smart Guide"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
      </span>
      <span>🎯</span>
      <span className="hidden xl:inline">{isHi ? 'गाइड' : 'Guide'}</span>
    </button>
  );
}

/**
 * SmartGuideFloatingButton: Fixed floating action button in bottom-right corner
 */
export function SmartGuideFloatingButton() {
  const { openGuideModal, isActive, availablePageGuide } = useGuide();
  const { language } = useApp();
  const isHi = language === 'hi';

  if (isActive) return null;

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-5 z-40 select-none group">
      <button
        onClick={openGuideModal}
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-emerald-800 to-teal-900 border-2 border-emerald-400/80 text-white font-bold text-xs shadow-[0_10px_25px_rgba(5,20,12,0.6)] hover:shadow-[0_10px_30px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95 transition transform duration-200"
        title="Interactive Platform Tour"
        aria-label="Interactive Platform Tour"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300"></span>
        </span>
        <span className="text-sm">🎯</span>
        <span className="hidden sm:inline font-semibold">
          {isHi ? 'स्मार्ट गाइड' : 'Smart Guide'}
        </span>
        {availablePageGuide && (
          <span className="hidden md:inline text-[10px] px-1.5 py-0.5 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
            {isHi ? 'पेज टूर' : 'Page Tour'}
          </span>
        )}
      </button>
    </div>
  );
}

/**
 * SmartGuideSystem: Container combining Spotlight, Panel, and Modal
 */
export function SmartGuideSystem() {
  const [panelRect, setPanelRect] = useState<DOMRect | null>(null);

  return (
    <>
      <CameraSpotlight panelRect={panelRect} />
      <GuidePanel onPanelRectChange={setPanelRect} />
      <SmartGuideModal />
      <SmartGuideFloatingButton />
    </>
  );
}
