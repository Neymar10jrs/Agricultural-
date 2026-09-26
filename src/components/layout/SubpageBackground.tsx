'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Velaris from '@/components/ui/velaris';

/**
 * Section-specific wallpapers from C:\Users\Rohit\Downloads\resource.
 *
 * Mapped according to Step 3 & Step 4:
 * - /my-farm: Farm, Village, Crops, Fields, Tractor, Livestock, Farmer, Rural agricultural landscape
 * - /risk-center: Agricultural risk telemetry & field agronomists
 * - /alert-center: Severe weather, disease alerts & early warnings
 * - /login: Rural agricultural village setting
 *
 * All other sections remain on the living Velaris background as no suitable
 * resource exists in the resource folder.
 */
const SECTION_WALLPAPERS: Record<string, { src: string; alt: string }> = {
  '/risk-center': {
    src: '/resources/risk-center/wallpaper.png',
    alt: 'Risk Intelligence Center background',
  },
  '/alert-center': {
    src: '/resources/alert-center/wallpaper.png',
    alt: 'Alert & Early Warning Center background',
  },
  '/crop-doctor': {
    src: '/resources/crop-doctor/wallpaper.png',
    alt: 'Crop Doctor symptom analysis and diagnostic background',
  },
  '/weather': {
    src: '/resources/weather/wallpaper.png',
    alt: 'Weather intelligence meteorological forecast background',
  },
  '/login': {
    src: '/resources/login/wallpaper.png',
    alt: 'Rural agriculture login background',
  },
};

export function SubpageBackground() {
  const pathname = usePathname();

  // Strict constraint: do not change or mount on the front page
  if (!pathname || pathname === '/') {
    return null;
  }

  const wallpaper = SECTION_WALLPAPERS[pathname];

  if (wallpaper) {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
        data-testid="subpage-wallpaper-bg"
      >
        {/* Section-specific wallpaper from C:\Users\Rohit\Downloads\resource */}
        <img
          src={wallpaper.src}
          alt={wallpaper.alt}
          className="w-full h-full object-cover object-center scale-105 transition-all duration-700"
        />

        {/* Subtle overlay for text and 80% translucent card legibility (Step 5) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 30%, rgba(2, 8, 5, 0.35) 0%, rgba(2, 8, 5, 0.60) 60%, rgba(1, 5, 3, 0.85) 100%)',
          }}
        />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
      data-testid="subpage-velaris-bg"
    >
      {/* Living WebGL simplex noise gradient canvas */}
      <Velaris
        height="100vh"
        className="w-full h-full"
        bg="#04120a"
        colors={["#86efac", "#4ade80", "#059669", "#000000"]}
        speed={1.6}
        grain={0.22}
      />

      {/* Atmospheric overlays for optimal legibility of 80% translucent cards */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, rgba(5, 20, 13, 0.12) 0%, rgba(5, 20, 13, 0.35) 60%, rgba(2, 10, 6, 0.65) 100%)',
        }}
      />
      <div className="fixed inset-x-0 top-0 h-28 bg-gradient-to-b from-black/50 via-black/15 to-transparent pointer-events-none" />
      <div className="fixed inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 via-black/15 to-transparent pointer-events-none" />
    </div>
  );
}
