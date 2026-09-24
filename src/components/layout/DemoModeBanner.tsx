'use client';

import React, { useState } from 'react';
import { Info, X, ShieldCheck, Database, RefreshCw } from 'lucide-react';

export function DemoModeBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [synced, setSynced] = useState(false);

  if (dismissed) return null;

  return (
    <aside aria-label="Simulation Notice" className="bg-gradient-to-r from-emerald-900 via-zinc-900 to-emerald-950 text-emerald-100 text-xs px-4 py-2 border-b border-emerald-800/40 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold uppercase tracking-wider text-[10px] border border-emerald-400/30 shrink-0">
            <Database className="w-3 h-3 text-emerald-400" />
            Demo Mode Active
          </span>
          <p className="text-zinc-300">
            Agricultural telemetry (satellite, weather, soil, pest) is simulated for demonstration. Connect approved state datasets to enable live services.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              setSynced(true);
              setTimeout(() => setSynced(false), 1500);
            }}
            className="flex items-center gap-1 text-[11px] text-emerald-300 hover:text-white bg-emerald-800/30 hover:bg-emerald-800/60 px-2 py-1 rounded transition"
            title="Simulate refreshing federated node cache"
          >
            <RefreshCw className={`w-3 h-3 ${synced ? 'animate-spin text-emerald-200' : ''}`} />
            <span>{synced ? 'Synced' : 'Sync Nodes'}</span>
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="text-zinc-400 hover:text-zinc-100 p-0.5 rounded transition"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
