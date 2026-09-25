'use client';

import React, { useEffect, useState } from 'react';
import { useGuide } from './GuideContext';

interface CameraSpotlightProps {
  panelRect?: DOMRect | null;
}

export function CameraSpotlight({ panelRect }: CameraSpotlightProps) {
  const { isActive, targetRect, currentStepIndex, currentStep, skipGuide } = useGuide();
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  if (!isActive || !targetRect || windowDimensions.width === 0) {
    return null;
  }

  // Smooth transition coordinates
  const { top, left, width, height } = targetRect;
  const padding = 6;
  const cutX = Math.max(0, left - padding);
  const cutY = Math.max(0, top - padding);
  const cutW = width + padding * 2;
  const cutH = height + padding * 2;

  // Calculate dynamic connector line between target rect center and panel
  let connectorLine: { x1: number; y1: number; x2: number; y2: number } | null = null;
  if (panelRect) {
    const targetCenterX = cutX + cutW / 2;
    const targetCenterY = cutY + cutH / 2;
    const panelCenterX = panelRect.left + panelRect.width / 2;
    const panelCenterY = panelRect.top + panelRect.height / 2;

    // Connect from closest edge
    let x1 = targetCenterX;
    let y1 = targetCenterY;
    let x2 = panelCenterX;
    let y2 = panelCenterY;

    if (panelRect.top > cutY + cutH) {
      // Panel is below target
      y1 = cutY + cutH;
      y2 = panelRect.top;
      x1 = targetCenterX;
      x2 = panelCenterX;
    } else if (panelRect.bottom < cutY) {
      // Panel is above target
      y1 = cutY;
      y2 = panelRect.bottom;
      x1 = targetCenterX;
      x2 = panelCenterX;
    } else if (panelRect.left > cutX + cutW) {
      // Panel is to the right
      x1 = cutX + cutW;
      x2 = panelRect.left;
      y1 = targetCenterY;
      y2 = panelCenterY;
    } else {
      // Panel is to the left
      x1 = cutX;
      x2 = panelRect.right;
      y1 = targetCenterY;
      y2 = panelCenterY;
    }

    connectorLine = { x1, y1, x2, y2 };
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden select-none">
      {/* Dimmed SVG Mask Overlay */}
      <svg
        className="absolute inset-0 w-full h-full"
        width={windowDimensions.width}
        height={windowDimensions.height}
      >
        <defs>
          <mask id="camera-focus-mask">
            {/* White covers entire viewport */}
            <rect width="100%" height="100%" fill="white" />
            {/* Cutout punch hole over target element */}
            <rect
              x={cutX}
              y={cutY}
              width={cutW}
              height={cutH}
              rx={12}
              ry={12}
              fill="black"
              className="transition-all duration-300 ease-out"
            />
          </mask>

          {/* Glowing laser connector line gradient */}
          <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#34d399" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
          </linearGradient>

          {/* Filter for glowing reticle */}
          <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Dimming Backdrop using Cutout Mask */}
        <rect
          width="100%"
          height="100%"
          fill="rgba(5, 18, 12, 0.78)"
          mask="url(#camera-focus-mask)"
          className="pointer-events-auto cursor-pointer"
          onClick={skipGuide}
          aria-label="Click background to close tour"
        />

        {/* Dynamic Connector Laser Line */}
        {connectorLine && (
          <g className="transition-all duration-300">
            <line
              x1={connectorLine.x1}
              y1={connectorLine.y1}
              x2={connectorLine.x2}
              y2={connectorLine.y2}
              stroke="url(#beamGradient)"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              strokeLinecap="round"
              filter="url(#emeraldGlow)"
              className="animate-pulse"
            />
            {/* Anchor pulse circles */}
            <circle cx={connectorLine.x1} cy={connectorLine.y1} r="4" fill="#34d399" />
            <circle cx={connectorLine.x2} cy={connectorLine.y2} r="4" fill="#10b981" />
          </g>
        )}
      </svg>

      {/* Target Focus Ring & Camera HUD Brackets */}
      <div
        className="absolute transition-all duration-300 ease-out pointer-events-none"
        style={{
          top: `${cutY}px`,
          left: `${cutX}px`,
          width: `${cutW}px`,
          height: `${cutH}px`,
        }}
      >
        {/* Soft glowing perimeter border */}
        <div className="absolute inset-0 rounded-xl border border-emerald-400/70 shadow-[0_0_30px_rgba(16,185,129,0.35)] animate-pulse" />

        {/* Corner Viewfinder Brackets */}
        {/* Top-Left */}
        <div className="absolute -top-1.5 -left-1.5 w-5 h-5 border-t-2 border-l-2 border-emerald-300 rounded-tl shadow-[0_0_8px_#34d399]" />
        {/* Top-Right */}
        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 border-t-2 border-r-2 border-emerald-300 rounded-tr shadow-[0_0_8px_#34d399]" />
        {/* Bottom-Left */}
        <div className="absolute -bottom-1.5 -left-1.5 w-5 h-5 border-b-2 border-l-2 border-emerald-300 rounded-bl shadow-[0_0_8px_#34d399]" />
        {/* Bottom-Right */}
        <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 border-b-2 border-r-2 border-emerald-300 rounded-br shadow-[0_0_8px_#34d399]" />

        {/* Center Edge Crosshairs */}
        <div className="absolute top-1/2 -left-2 w-1.5 h-0.5 bg-emerald-400/80 -translate-y-1/2" />
        <div className="absolute top-1/2 -right-2 w-1.5 h-0.5 bg-emerald-400/80 -translate-y-1/2" />
        <div className="absolute -top-2 left-1/2 w-0.5 h-1.5 bg-emerald-400/80 -translate-x-1/2" />
        <div className="absolute -bottom-2 left-1/2 w-0.5 h-1.5 bg-emerald-400/80 -translate-x-1/2" />

        {/* Camera HUD Reticle Badge */}
        <div className="absolute -top-8 left-0 flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-950/95 border border-emerald-500/80 text-[10px] font-mono tracking-wider text-emerald-300 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span className="font-bold">⊙ CAMERA FOCUS LOCK</span>
          <span className="text-slate-400">|</span>
          <span className="text-emerald-400/90 font-semibold">
            STEP {currentStepIndex + 1}
          </span>
        </div>
      </div>
    </div>
  );
}
