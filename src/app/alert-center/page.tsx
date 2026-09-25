'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  AlertTriangle,
  ShieldAlert,
  Info,
  CheckCircle2,
  Filter,
  CloudRain,
  Bug,
  Activity,
  Layers,
  Droplets,
  Eye,
  Cpu,
  Smartphone,
  MessageSquare,
  Radio,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ArrowRight,
  MapPin,
  Send,
  PlusCircle,
} from 'lucide-react';
import { demoAlerts, unreadAlertCount } from '@/data/alerts';
import { demoSystemStatus } from '@/data/impact';
import { AlertItem, AlertSeverity } from '@/types';
import { useApp } from '@/context/AppContext';
import { SectionHero } from '@/components/ui/SectionHero';



export default function AlertCenterPage() {
  const { language } = useApp();
  const isHi = language === 'hi';
  const [alerts, setAlerts] = useState<AlertItem[]>(demoAlerts);
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = ['all', 'Weather', 'Disease', 'Pest', 'Soil', 'Irrigation', 'Vegetation', 'System'];

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    const matchesCategory = categoryFilter === 'all' || alert.category === categoryFilter;
    return matchesSeverity && matchesCategory;
  });

  const markAllRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, isRead: true })));
  };

  const toggleRead = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isRead: !a.isRead } : a))
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Weather':
        return <CloudRain className="w-4 h-4 text-sky-500" />;
      case 'Disease':
        return <Activity className="w-4 h-4 text-rose-500" />;
      case 'Pest':
        return <Bug className="w-4 h-4 text-amber-500" />;
      case 'Soil':
        return <Layers className="w-4 h-4 text-amber-700" />;
      case 'Irrigation':
        return <Droplets className="w-4 h-4 text-blue-500" />;
      case 'Vegetation':
        return <Eye className="w-4 h-4 text-emerald-500" />;
      case 'System':
        return <Cpu className="w-4 h-4 text-purple-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-slate-500" />;
    }
  };

  const getSeverityStyle = (severity: AlertSeverity) => {
    switch (severity) {
      case 'critical':
        return {
          border: 'border-l-rose-500',
          badge: 'bg-rose-100 text-rose-800 border-rose-200',
          dot: 'bg-rose-500',
          label: 'Critical',
        };
      case 'high':
        return {
          border: 'border-l-orange-500',
          badge: 'bg-orange-100 text-orange-800 border-orange-200',
          dot: 'bg-orange-500',
          label: 'High Risk',
        };
      case 'moderate':
        return {
          border: 'border-l-amber-500',
          badge: 'bg-amber-100 text-amber-800 border-amber-200',
          dot: 'bg-amber-500',
          label: 'Moderate',
        };
      case 'info':
      default:
        return {
          border: 'border-l-sky-500',
          badge: 'bg-sky-100 text-sky-800 border-sky-200',
          dot: 'bg-sky-500',
          label: 'Info',
        };
    }
  };

  const currentUnread = alerts.filter((a) => !a.isRead).length;

  return (
    <div className="space-y-0">
      <SectionHero
        imageSrc="/assets/risk/drought-risk.svg"
        theme="risk"
        label={isHi ? 'बीकेआईएन प्रारंभिक चेतावनी नेटवर्क' : 'BKIN EARLY WARNING NETWORK'}
        heading={
          <span className="text-gradient-agri">
            {isHi ? 'अलर्ट व अधिसूचना केंद्र' : 'Alert & Notification Center'}
          </span>
        }
        description={
          isHi
            ? 'मौसम, मृदा, और उपग्रह अवलोकनों के आधार पर वास्तविक समय बहु-आपदा टेलीमेट्री और जैव सुरक्षा प्रकोप चेतावनियाँ।'
            : 'Real-time multi-hazard telemetry, biosecurity outbreak warnings, and precision agronomic action triggers across weather, soil, and satellite observations.'
        }
        showDemoBadge={true}
        stats={[
          { value: `${currentUnread}`, label: isHi ? 'अपठित अलर्ट' : 'Unread Alerts' },
          { value: `${alerts.length}`, label: isHi ? 'कुल चेतावनियां' : 'Total Warnings' },
          { value: 'Active', label: isHi ? 'पाइपलाइन' : 'Pipelines' },
        ]}
      >
        <div className="flex items-center gap-3 mt-2 flex-wrap">
          {currentUnread > 0 && (
            <button
              onClick={markAllRead}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/20 transition backdrop-blur"
            >
              {isHi ? 'सभी को पढ़ा हुआ चिन्हित करें' : 'Mark all as read'}
            </button>
          )}
          <Link
            href="/todays-advisory"
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition flex items-center gap-1.5 shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {isHi ? 'आज की आवश्यक कार्रवाइयां' : "Today's Actions"}
          </Link>
        </div>
      </SectionHero>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">


      {/* System Status Mini Strip — 80% Translucent Surface */}
      <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] border border-white/10 rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Telemetry Pipelines Active
            </span>
            <span className="text-[10px] bg-white/10 text-slate-300 px-2 py-0.5 rounded border border-white/10">
              Demo Mode Active
            </span>
          </div>
          <div className="flex items-center gap-3 overflow-x-auto pb-1 lg:pb-0 text-xs">
            {demoSystemStatus.modules.slice(0, 5).map((mod) => (
              <div
                key={mod.id}
                className="flex items-center gap-1.5 bg-[rgba(10,20,15,0.40)] px-2.5 py-1 rounded-lg border border-white/10 whitespace-nowrap text-[11px]"
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    mod.status === 'operational'
                      ? 'bg-emerald-500'
                      : mod.status === 'degraded'
                      ? 'bg-amber-500'
                      : 'bg-blue-500 animate-pulse'
                  }`}
                />
                <span className="font-semibold text-slate-200">{mod.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters — 80% Translucent Surface */}
      <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] border border-white/10 rounded-2xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-4">
        {/* Severity Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-semibold text-slate-300 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Severity:
            </span>
            {[
              { id: 'all', label: 'All Alerts', count: alerts.length },
              { id: 'critical', label: '🔴 Critical', count: alerts.filter((a) => a.severity === 'critical').length },
              { id: 'high', label: '🟠 High', count: alerts.filter((a) => a.severity === 'high').length },
              { id: 'moderate', label: '🟡 Moderate', count: alerts.filter((a) => a.severity === 'moderate').length },
              { id: 'info', label: '🔵 Info', count: alerts.filter((a) => a.severity === 'info').length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSeverityFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  severityFilter === tab.id
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-white/10">
          <span className="text-xs font-semibold text-slate-300 mr-2">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition capitalize ${
                categoryFilter === cat
                  ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                  : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Feed */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] border border-white/10 rounded-2xl p-12 text-center space-y-3 shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Alerts Match Your Filters</h3>
            <p className="text-xs text-slate-300">
              There are currently no active notifications for the selected criteria.
            </p>
            <button
              onClick={() => {
                setSeverityFilter('all');
                setCategoryFilter('all');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition inline-block font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const style = getSeverityStyle(alert.severity);
            return (
              <div
                key={alert.id}
                className={`rounded-2xl border border-white/10 p-5 sm:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.10)] hover:shadow-md transition border-l-4 backdrop-blur-[6px] ${
                  style.border
                } ${!alert.isRead ? 'bg-[rgba(10,20,15,0.30)] ring-1 ring-emerald-500/30' : 'bg-[rgba(10,20,15,0.20)]'}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${style.badge}`}
                      >
                        {style.label}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-white bg-white/10 px-2 py-0.5 rounded border border-white/10">
                        {getCategoryIcon(alert.category)}
                        {alert.category}
                      </span>
                      {alert.farm && (
                        <span className="text-[11px] text-slate-400">
                          📍 {alert.farm}
                        </span>
                      )}
                      {!alert.isRead && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400" title="Unread" />
                      )}
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {alert.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {alert.description}
                    </p>

                    {alert.recommendedAction && (
                      <div className="mt-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
                            Recommended Field Action
                          </span>
                          <p className="text-xs text-emerald-100 font-medium leading-relaxed">
                            {alert.recommendedAction}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3 pt-2 text-[11px] text-slate-400 flex-wrap">
                      <span>🕒 {alert.createdAt}</span>
                      {alert.validUntil && <span>• Valid until: {alert.validUntil}</span>}
                      <span>• Source: <strong className="text-slate-300">{alert.dataSource}</strong></span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-white/10">
                    <button
                      onClick={() => toggleRead(alert.id)}
                      className="text-xs text-slate-400 hover:text-white underline font-medium"
                    >
                      {alert.isRead ? 'Mark unread' : 'Mark as read'}
                    </button>
                    {alert.actionRequired && (
                      <Link
                        href="/todays-advisory"
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition flex items-center gap-1 shadow-sm"
                      >
                        Take Action
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Multichannel Notification Design Strip — 80% Translucent Surface */}
      <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] border border-white/10 rounded-3xl p-6 sm:p-8 text-white space-y-4 shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
        <div className="space-y-1">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            BKIN Omnichannel Delivery Protocol
          </span>
          <h2 className="text-xl sm:text-2xl font-bold">
            Delivering Intelligence Across Every Farmer Touchpoint
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl">
            BKIN dispatches verified warnings through multimodal channels tailored for rural connectivity profiles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-[rgba(10,20,15,0.30)] backdrop-blur-[6px] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <Smartphone className="w-5 h-5 text-emerald-400" />
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">Active</span>
            </div>
            <h3 className="text-sm font-bold">PWA / Web Notification</h3>
            <p className="text-xs text-slate-400">Instant push telemetry on farmer device with rich satellite NDVI overlays.</p>
          </div>

          <div className="p-4 rounded-2xl bg-[rgba(10,20,15,0.30)] backdrop-blur-[6px] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <MessageSquare className="w-5 h-5 text-green-400" />
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-green-300">Connected</span>
            </div>
            <h3 className="text-sm font-bold">WhatsApp Krishi Bot</h3>
            <p className="text-xs text-slate-400">Localized text and voice notes in Punjabi, Hindi, and 9 regional languages.</p>
          </div>

          <div className="p-4 rounded-2xl bg-[rgba(10,20,15,0.30)] backdrop-blur-[6px] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <Radio className="w-5 h-5 text-sky-400" />
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-300">Broadcasting</span>
            </div>
            <h3 className="text-sm font-bold">Outbound Voice IVR</h3>
            <p className="text-xs text-slate-400">Automated phone calls with synthesized regional voice alerts for low-literacy farmers.</p>
          </div>

          <div className="p-4 rounded-2xl bg-[rgba(10,20,15,0.30)] backdrop-blur-[6px] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <Smartphone className="w-5 h-5 text-purple-400" />
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300">GSM Fallback</span>
            </div>
            <h3 className="text-sm font-bold">SMS Early Warnings</h3>
            <p className="text-xs text-slate-400">160-character action-first flash messages when data networks are offline.</p>
          </div>
        </div>
      </div>

      {/* ── Two-way Community Ground Intelligence (Phase 13) — 80% Translucent Surface ── */}
      <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>Phase 13: Two-Way Intelligence Loop</span>
              </span>
              <span className="text-xs text-slate-400 font-medium">Farmer-to-Grid Uplink</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {isHi ? 'सामुदायिक जमीनी रिपोर्ट एवं द्वि-मार्गी आसूचना' : 'Community Ground Observations & Upstream Telemetry'}
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {isHi
                ? 'बीकेआईएन केवल ऊपर से निर्देश नहीं देता; किसानों और स्थानीय विस्तार अधिकारियों द्वारा दर्ज की गई जमीनी रिपोर्ट (कीट दिखना, वर्षा माप, मंडी दरें) ग्रिड के एआई मॉडल को लगातार अद्यतन करती हैं।'
                : 'BKIN is bidirectional. Ground reports submitted by farmers and scouts (pest sightings, micro-rain gauges, mandi prices) continuously calibrate upstream epidemiological models.'}
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => alert(isHi ? 'जमीनी अवलोकन सबमिट किया गया! केवीके स्काउट द्वारा सत्यापन जारी।' : 'Ground observation registered! Validating with local KVK scout grid.')}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition flex items-center gap-2 shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-slate-950" />
              <span>{isHi ? 'नई जमीनी रिपोर्ट दर्ज करें' : 'Report Ground Observation'}</span>
            </button>
          </div>
        </div>

        {/* Live Ground Reports Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                <Bug className="w-4 h-4 text-amber-400" />
                <span>{isHi ? 'कीट स्काउटिंग रिपोर्ट' : 'Pest Scout Sighting'}</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                4 Farmers Corroborated
              </span>
            </div>
            <p className="text-amber-100 leading-relaxed text-[11px]">
              {isHi
                ? 'समराला ब्लॉक (रोहणो कलां): सीमांत गेहूं पंक्तियों पर माहू (एफिड) का प्रकोप देखा गया। फसल क्षति से पहले पीले चिपचिपे ट्रैप लगाए गए।'
                : 'Samrala Block (Rohno Kalan): Early wheat aphid clusters observed on border rows. Yellow sticky traps deployed before ETL breach.'}
            </p>
            <div className="text-[10px] text-amber-300/80 flex items-center justify-between pt-1 border-t border-amber-500/20">
              <span>📍 Plot 3B, Jaswant Singh & Neighbors</span>
              <span>18 mins ago</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-sky-950/30 border border-sky-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sky-300 flex items-center gap-1.5">
                <CloudRain className="w-4 h-4 text-sky-400" />
                <span>{isHi ? 'स्थानीय वर्षा गेज रिपोर्ट' : 'Hyper-Local Rain Gauge'}</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                Verified by KVK Scout
              </span>
            </div>
            <p className="text-sky-100 leading-relaxed text-[11px]">
              {isHi
                ? 'लुधियाना ग्रामीण: स्थानीय वर्षा गेज में पिछले 12 घंटों में 16.5 मिमी बारिश दर्ज की गई। नहरी व ट्यूबवेल सिंचाई 48 घंटे बंद रखने की सलाह।'
                : 'Ludhiana Rural: Manual rain gauge logged 16.5mm rainfall. Farmers advised to defer tubewell pumping for 48 hours.'}
            </p>
            <div className="text-[10px] text-sky-300/80 flex items-center justify-between pt-1 border-t border-sky-500/20">
              <span>📍 Samrala KVK Monitoring Station</span>
              <span>1 hour ago</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

