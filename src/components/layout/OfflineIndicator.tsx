'use client';

import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, RefreshCw } from 'lucide-react';

export function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(false);
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setShowReconnected(true);
      const timer = setTimeout(() => setShowReconnected(false), 4000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setShowReconnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setIsOffline(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOffline) {
    return (
      <div className="bg-amber-600 text-white text-xs py-2 px-4 text-center sticky top-0 z-50 flex items-center justify-center gap-2 shadow-md">
        <WifiOff className="w-4 h-4 animate-pulse" />
        <span className="font-medium">
          Offline Mode — Showing latest synchronized information cached on your device.
        </span>
      </div>
    );
  }

  if (showReconnected) {
    return (
      <div className="bg-emerald-600 text-white text-xs py-2 px-4 text-center sticky top-0 z-50 flex items-center justify-center gap-2 shadow-md transition-all duration-500">
        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
        <span className="font-medium">
          Back Online — Synchronizing latest farm advisories and weather telemetry…
        </span>
      </div>
    );
  }

  return null;
}
