'use client';

import React from 'react';

export type HeroTheme = 'forest' | 'satellite' | 'soil' | 'risk' | 'weather' | 'impact';

interface HeroStat {
  value: string;
  label: string;
  accent?: string; // Tailwind text color class
}

interface SectionHeroProps {
  /** Background image URL (can be external or /public path) */
  imageSrc?: string;
  /** Overlay theme — controls gradient colour */
  theme?: HeroTheme;
  /** Optional pill label above the heading */
  label?: string;
  /** Main heading — can be a ReactNode for gradient text */
  heading: React.ReactNode;
  /** Sub-heading / description */
  description?: string;
  /** Optional stat cards rendered in a row below description */
  stats?: HeroStat[];
  /** Extra content slot (buttons, tags, etc.) */
  children?: React.ReactNode;
  /** Minimum height of the hero section */
  minHeight?: string;
  /** Padding class for the content */
  contentPadding?: string;
  /** Whether to show DEMO DATA badge */
  showDemoBadge?: boolean;
}

const overlayClass: Record<HeroTheme, string> = {
  forest:    'agri-overlay-forest',
  satellite: 'agri-overlay-satellite',
  soil:      'agri-overlay-soil',
  risk:      'agri-overlay-risk',
  weather:   'agri-overlay-weather',
  impact:    'agri-overlay-impact',
};

const fallbackGradient: Record<HeroTheme, string> = {
  forest:    'section-theme-agri',
  satellite: 'section-theme-satellite',
  soil:      'section-theme-soil',
  risk:      'section-theme-risk',
  weather:   'section-theme-weather',
  impact:    'section-theme-impact',
};

export function SectionHero({
  imageSrc,
  theme = 'forest',
  label,
  heading,
  description,
  stats,
  children,
  minHeight = 'min-h-[320px]',
  contentPadding = 'px-4 sm:px-6 lg:px-8 py-14 sm:py-20',
  showDemoBadge = false,
}: SectionHeroProps) {
  return (
    <section
      className={`agri-hero-section ${minHeight} ${!imageSrc ? fallbackGradient[theme] : ''}`}
    >
      {/* Background image layer with slow zoom */}
      {imageSrc && (
        <div
          className="agri-bg-layer"
          style={{ backgroundImage: `url(${imageSrc})` }}
          aria-hidden="true"
        />
      )}

      {/* Gradient overlay */}
      <div
        className={`agri-overlay ${overlayClass[theme]}`}
        aria-hidden="true"
      />

      {/* Content */}
      <div className={`agri-hero-content ${contentPadding} max-w-7xl mx-auto`}>
        <div className="flex flex-col gap-4">
          {/* Top row: label + demo badge */}
          {(label || showDemoBadge) && (
            <div className="flex flex-wrap items-center gap-2">
              {label && (
                <span className="section-label section-label-light">
                  {label}
                </span>
              )}
              {showDemoBadge && (
                <span className="demo-watermark">
                  ⚠ Demo Data
                </span>
              )}
            </div>
          )}

          {/* Heading */}
          <h1 className="text-white font-black leading-tight tracking-tight text-shadow-agri"
            style={{ fontSize: 'var(--text-hero)' }}
          >
            {heading}
          </h1>

          {/* Description */}
          {description && (
            <p className="text-emerald-100/90 max-w-2xl leading-relaxed text-shadow-agri"
              style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.125rem)' }}
            >
              {description}
            </p>
          )}

          {/* Children slot */}
          {children}

          {/* Stats row — Floating Typography over background visual */}
          {stats && stats.length > 0 && (
            <div className="flex flex-wrap gap-6 mt-4 pt-4 border-t border-white/10">
              {stats.map((stat, i) => (
                <div key={i} className="min-w-[100px] border-l-2 border-emerald-400/40 pl-3.5 py-1">
                  <p
                    className={`text-2xl sm:text-3xl font-black ${stat.accent ?? 'text-gradient-agri'} count-reveal text-shadow-agri`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-emerald-100/70 text-xs font-semibold mt-0.5 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
