'use client';

import React from 'react';
import VelarisDemo from '@/components/ui/demo';

export default function DemoVelarisPage() {
  return (
    <div className="min-h-[85vh] py-16 px-4 max-w-5xl mx-auto flex flex-col items-center justify-center space-y-6">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          Component Preview
        </span>
        <h1 className="text-3xl font-bold text-white">Velaris WebGL Component Demo</h1>
        <p className="text-sm text-slate-300 max-w-lg mx-auto">
          Standalone demo component showcasing the animated simplex-noise shader with color blending, vignette, and grain.
        </p>
      </div>

      <div className="w-full max-w-3xl rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
        <VelarisDemo />
      </div>
    </div>
  );
}
