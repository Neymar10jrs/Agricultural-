'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Sprout, Activity, Bell, Mic } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function MobileNav() {
  const pathname = usePathname();
  const { openAskKrishi, dict } = useApp();

  const items = [
    { href: '/', label: dict.common.back === 'वापस जाएं' ? 'होम' : 'Home', icon: Home },
    { href: '/my-farm', label: dict.nav.myFarm, icon: Sprout, id: 'mobile-nav-my-farm' },
    { isVoice: true, label: dict.nav.askKrishi, icon: Mic },
    { href: '/risk-center', label: dict.nav.riskCenter, icon: Activity, id: 'mobile-nav-risk-center' },
    { href: '/alert-center', label: dict.nav.alertCenter, icon: Bell },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 px-2 py-1.5 shadow-lg">
      <nav aria-label="Mobile Bottom Navigation" className="flex items-center justify-around max-w-md mx-auto">
        {items.map((item, idx) => {
          if (item.isVoice) {
            return (
              <button
                key="voice"
                onClick={() => openAskKrishi()}
                className="flex flex-col items-center justify-center -mt-5 group"
                aria-label="Ask Krishi AI"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg border-2 border-white group-active:scale-95 transition-transform">
                  <Mic className="w-5 h-5 animate-pulse" />
                </div>
                <span className="text-[10px] font-bold text-emerald-800 mt-0.5">{dict.nav.askKrishi}</span>
              </button>
            );
          }

          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href || idx}
              id={item.id}
              href={item.href!}
              className={`flex flex-col items-center justify-center py-1 px-3 min-w-[56px] rounded-lg transition ${
                isActive ? 'text-emerald-700 font-semibold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600 scale-110' : 'text-slate-400'}`} />
              <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
