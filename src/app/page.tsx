'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sprout,
  Satellite,
  CloudSun,
  Layers,
  Bot,
  UserCheck,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Activity,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  MessageSquare,
  Smartphone,
  Eye,
  Radio,
  FileText,
  Volume2,
  Share2,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { IndiaMapInteractive } from '@/components/maps/IndiaMapInteractive';
import { AgroScrollBackground } from '@/components/animation/AgroScrollBackground';

export default function HomePage() {
  const { t, dict, language, openAskKrishi } = useApp();
  const [activePipelineStep, setActivePipelineStep] = useState<number>(0);
  const [channelPreview, setChannelPreview] = useState<'whatsapp' | 'sms' | 'ivr'>('whatsapp');
  const isHi = language === 'hi';

  const pipelineSteps = [
    {
      id: 'sat',
      step: '01',
      name: 'Satellite Data',
      icon: Satellite,
      badge: 'Multi-spectral 10m',
      desc: 'Sentinel-2 & Resourcesat capture NDVI vegetation vigor, canopy moisture & spatial anomalies.',
    },
    {
      id: 'weath',
      step: '02',
      name: 'Weather Forecast',
      icon: CloudSun,
      badge: 'Hyperlocal Radar',
      desc: 'Precipitation probability, extreme heat risk, morning dew point & wind spraying index.',
    },
    {
      id: 'soil',
      step: '03',
      name: 'Soil Intelligence',
      icon: Layers,
      badge: 'Digital Soil Registry',
      desc: 'NPK availability, Organic Carbon %, pH balance, and electrical conductivity profiles.',
    },
    {
      id: 'ai',
      step: '04',
      name: 'AI Krishi Engine',
      icon: Bot,
      badge: 'Explainable Reasoning',
      desc: 'Multimodal computer vision, agronomic knowledge graphs & multi-risk epidemiological correlation.',
    },
    {
      id: 'farmer',
      step: '05',
      name: 'Actionable Advisory',
      icon: UserCheck,
      badge: 'Localized & Farmer-First',
      desc: 'Clear answer: "What should I do today?" with explanation, evidence, and confidence score.',
    },
  ];

  return (
    <AgroScrollBackground
      totalFrames={300}
      framesPath="/agro-animation"
      filePrefix="ezgif-frame-"
      fileExtension="jpg"
      className="min-h-screen text-white"
    >
      <div className="space-y-20 lg:space-y-28 py-10 lg:py-16">
        {/* 1. SCROLL-CONTROLLED CINEMATIC HERO */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[82vh] flex flex-col justify-center items-center">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 text-emerald-300 border border-emerald-500/40 text-xs font-semibold shadow-xl backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Digital Public Agriculture Infrastructure for India</span>
              <span className="text-white/30">|</span>
              <span className="text-white font-bold">BKIN 1.0</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] drop-shadow-2xl">
              {isHi ? (
                <>
                  भारत का बुद्धिमान <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
                    डिजिटल कृषि नेटवर्क
                  </span>
                </>
              ) : (
                <>
                  India&apos;s Intelligent <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
                    Digital Agriculture Network
                  </span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              {isHi
                ? 'उपग्रह डेटा, मृदा इंटेलिजेंस, मौसम पूर्वानुमान और एआई — हर भारतीय किसान के लिए सरल, स्थानीय व उपयोगी कृषि मार्गदर्शन में रूपांतरित।'
                : 'Satellite data, soil intelligence, weather forecasting and AI — transformed into simple, localized, and actionable farming guidance for every Indian farmer.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/my-farm"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl hover:shadow-2xl transition flex items-center justify-center gap-2 group"
              >
                <Sprout className="w-4 h-4" />
                <span>{dict.common.exploreFarm}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={() => openAskKrishi()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-black/60 hover:bg-black/80 border border-white/25 text-white font-semibold text-sm shadow-xl backdrop-blur-md transition flex items-center justify-center gap-2"
              >
                <Bot className="w-4 h-4 text-emerald-400" />
                <span>{dict.nav.askKrishi}</span>
              </button>

              <Link
                href="#how-it-works"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-slate-300 hover:text-white font-medium text-sm transition text-center"
              >
                {dict.common.seeHowItWorks}
              </Link>
            </div>

            {/* Quick Indicators Strip — Floating Transparent Metrics */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left border-y border-white/10 py-5">
              <div className="p-2 sm:p-3 text-white border-l-2 border-emerald-400/60 pl-3.5 hover:border-emerald-300 transition-colors">
                <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">Demo Farm Health</div>
                <div className="text-xl sm:text-2xl font-black text-white mt-0.5 flex items-center gap-1.5 text-shadow-agri">
                  78 / 100
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-400/40">
                    Healthy
                  </span>
                </div>
                <div className="text-[11px] text-slate-200 text-shadow-sm-agri font-medium">Punjab • 2.4 Acres Wheat</div>
              </div>

              <div className="p-2 sm:p-3 text-white border-l-2 border-amber-400/60 pl-3.5 hover:border-amber-300 transition-colors">
                <div className="text-[10px] uppercase font-bold tracking-wider text-amber-400">Rain Alert</div>
                <div className="text-xl sm:text-2xl font-black text-white mt-0.5 text-shadow-agri">12.5 mm</div>
                <div className="text-[11px] text-amber-300 font-semibold text-shadow-sm-agri">Delay Irrigation 24h</div>
              </div>

              <div className="p-2 sm:p-3 text-white border-l-2 border-emerald-400/60 pl-3.5 hover:border-emerald-300 transition-colors">
                <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">Satellite NDVI</div>
                <div className="text-xl sm:text-2xl font-black text-white mt-0.5 text-shadow-agri">0.68 Avg</div>
                <div className="text-[11px] text-emerald-300 font-medium text-shadow-sm-agri">North Parcel Dip (0.51)</div>
              </div>

              <div className="p-2 sm:p-3 text-white border-l-2 border-cyan-400/60 pl-3.5 hover:border-cyan-300 transition-colors">
                <div className="text-[10px] uppercase font-bold tracking-wider text-cyan-400">Federated States</div>
                <div className="text-xl sm:text-2xl font-black text-white mt-0.5 text-shadow-agri">6 Nodes</div>
                <div className="text-[11px] text-cyan-300 font-semibold text-shadow-sm-agri">Active Interoperability</div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. HERO DATA ANIMATION SECTION (Section 10) — Transparent Floating Intelligence Layer */}
        <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
          <div className="relative z-10 space-y-10 py-6">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 inline-block">
                The Agricultural Intelligence Layer
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white agri-heading-glow leading-tight">
                How Complex Agricultural Data Becomes Actionable Advice
              </h2>
              <p className="text-sm sm:text-base text-slate-200 text-shadow-agri max-w-2xl mx-auto leading-relaxed">
                Satellite + Weather + Soil + Crop Stage + Disease Surveillance → AI Engine → Risk + Explanation + Actionable Advisory.
              </p>
            </div>

            {/* Pipeline Flow Stepper — Floating Transparent Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3.5">
              {pipelineSteps.map((step, idx) => {
                const Icon = step.icon;
                const isSelected = activePipelineStep === idx;

                return (
                  <div
                    key={step.id}
                    onClick={() => setActivePipelineStep(idx)}
                    className={`cursor-pointer rounded-2xl p-4 transition-all relative border flex flex-col justify-between ${
                      isSelected
                        ? 'bg-emerald-900/30 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.3)] scale-[1.02]'
                        : 'bg-transparent border-white/15 hover:border-emerald-400/40 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono font-bold text-emerald-300 text-shadow-sm-agri">{step.step}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-emerald-200 border border-white/15 font-medium">
                        {step.badge}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/30 shadow-inner">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-extrabold text-base text-white text-shadow-agri">{step.name}</h4>
                      <p className="text-xs text-slate-200 leading-snug text-shadow-sm-agri">{step.desc}</p>
                    </div>

                    {idx < 4 && (
                      <div className="hidden sm:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 text-emerald-400 font-bold text-sm">
                        →
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Real-World Contrast Box — Transparent Comparison Grid */}
            <div className="rounded-2xl p-6 sm:p-8 border border-white/15 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-transparent">
              <div className="space-y-2.5 border-b md:border-b-0 md:border-r border-white/15 pb-6 md:pb-0 md:pr-8">
                <span className="text-[11px] font-bold uppercase text-rose-400 tracking-wider flex items-center gap-1.5">
                  <span>❌</span> What generic portals show:
                </span>
                <div className="border border-rose-500/40 p-3.5 rounded-xl font-mono text-xs text-rose-200 bg-rose-950/20">
                  NDVI: 0.62 | Moisture: 32.5% | Rain: 12.5mm | N: 195 kg/ha
                </div>
                <p className="text-xs text-slate-300 leading-relaxed text-shadow-sm-agri">
                  Raw numerical indices without agronomic translation or context confuse smallholder farmers.
                </p>
              </div>

              <div className="space-y-2.5">
                <span className="text-[11px] font-bold uppercase text-emerald-400 tracking-wider flex items-center gap-1.5">
                  <span>✅</span> What BKIN Agricultural Intelligence provides:
                </span>
                <div className="border border-emerald-400/50 p-4 rounded-xl space-y-1.5 text-xs text-emerald-100 bg-emerald-950/25">
                  <div className="font-bold text-white flex items-center gap-1.5 text-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    🌱 Crop Health: Good • Action: Delay Irrigation & Inspect North Parcel
                  </div>
                  <p className="text-xs text-emerald-100/90 leading-relaxed text-shadow-sm-agri">
                    <strong className="text-emerald-300">Why:</strong> 12.5 mm rainfall expected in 24h. Post-rain, inspect north-eastern parcel showing localized NDVI dip (0.51) before applying split urea.
                  </p>
                  <div className="text-[11px] text-emerald-300 font-semibold pt-1 border-t border-emerald-400/20">
                    Confidence: High (92%) • Data: Satellite + Radar + Soil Card
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* 3. PROBLEM SECTION (Section 11: 4 Cards) — Transparent Floating Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 inline-block">
              The Challenges We Solve
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight agri-heading-glow">
              Bridging India&apos;s Agricultural Intelligence Gap
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 text-shadow-agri leading-relaxed">
              Why traditional information portals fail smallholders and how a federated intelligence layer changes farm economics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1 */}
            <div className="bg-transparent border border-white/10 hover:border-emerald-400/40 p-5 space-y-3 rounded-2xl transition-all duration-300 hover:-translate-y-1 text-white group">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-300 flex items-center justify-center border border-amber-500/30 group-hover:scale-110 transition-transform">
                <CloudSun className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-white text-shadow-agri">Climate Uncertainty</h3>
              <p className="text-xs text-slate-200 leading-relaxed text-shadow-sm-agri">
                Unseasonal downpours, terminal heat stress, and erratic monsoons threaten yields. Farmers need pre-emptive, crop-stage specific warnings rather than generic forecast temperatures.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-transparent border border-white/10 hover:border-emerald-400/40 p-5 space-y-3 rounded-2xl transition-all duration-300 hover:-translate-y-1 text-white group">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-300 flex items-center justify-center border border-blue-500/30 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-white text-shadow-agri">Fragmented Data</h3>
              <p className="text-xs text-slate-200 leading-relaxed text-shadow-sm-agri">
                Valuable agricultural telemetry is siloed across ISRO satellite archives, IMD radars, state soil labs, and university pest portals. BKIN aggregates them into unified farm records.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-transparent border border-white/10 hover:border-emerald-400/40 p-5 space-y-3 rounded-2xl transition-all duration-300 hover:-translate-y-1 text-white group">
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-300 flex items-center justify-center border border-rose-500/30 group-hover:scale-110 transition-transform">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-white text-shadow-agri">Late Disease Detection</h3>
              <p className="text-xs text-slate-200 leading-relaxed text-shadow-sm-agri">
                Infections like Stripe Rust or Brown Planthopper multiply before visual discovery. Early detection through smartphone AI and environmental risk modeling stops epidemics.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-transparent border border-white/10 hover:border-emerald-400/40 p-5 space-y-3 rounded-2xl transition-all duration-300 hover:-translate-y-1 text-white group">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-300 flex items-center justify-center border border-emerald-500/30 group-hover:scale-110 transition-transform">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-white text-shadow-agri">Digital Divide</h3>
              <p className="text-xs text-slate-200 leading-relaxed text-shadow-sm-agri">
                Marginal farmers face language barriers, varying digital literacy, and patchy internet. BKIN supports 12 Indian languages, voice queries, offline mode, and SMS/WhatsApp dissemination.
              </p>
            </div>
          </div>
        </section>

        {/* 4. INTERACTIVE INDIA AGRICULTURE NETWORK */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden border border-white/15">
            <IndiaMapInteractive />
          </div>
        </section>

        {/* 5. MULTI-CHANNEL ADVISORY PREVIEW (Section 32: Agriculture for Everyone) — Transparent Layer */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-4">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 inline-block">
                Universal Access
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight agri-heading-glow">
                Agriculture for Everyone — Every Device, Every Channel
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 text-shadow-agri">
                Advisories delivered through whichever medium the farmer is most comfortable with.
              </p>
            </div>

            {/* Channel Selector Tabs */}
            <div className="flex justify-center gap-2 mb-6">
              <button
                onClick={() => setChannelPreview('whatsapp')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                  channelPreview === 'whatsapp'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20 border border-white/15'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Bot</span>
              </button>
              <button
                onClick={() => setChannelPreview('sms')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                  channelPreview === 'sms'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20 border border-white/15'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>SMS Flash Alert</span>
              </button>
              <button
                onClick={() => setChannelPreview('ivr')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                  channelPreview === 'ivr'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20 border border-white/15'
                }`}
              >
                <PhoneCall className="w-4 h-4" />
                <span>IVR Outbound Call</span>
              </button>
            </div>

            {/* Mock Phone Container — Translucent Minimal Frame */}
            <div className="max-w-md mx-auto bg-black/50 backdrop-blur-md rounded-3xl p-5 border-2 border-white/20 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[11px] text-slate-400">
                <span>9:41 AM • 4G VoLTE</span>
                <span className="font-bold text-slate-200">BKIN Krishi Seva</span>
              </div>

              {channelPreview === 'whatsapp' && (
                <div className="space-y-3 text-xs">
                  <div className="bg-emerald-950/60 border border-emerald-500/40 p-3 rounded-2xl rounded-tl-none space-y-1.5 text-slate-100">
                    <div className="font-bold text-emerald-300 flex items-center justify-between">
                      <span>🌾 BKIN Krishi Salahkar (Ludhiana)</span>
                      <span className="text-[10px] text-slate-400">Today 06:30 AM</span>
                    </div>
                    <p className="text-shadow-sm-agri">
                      <strong>ਕਿਸਾਨ ਵੀਰੋ (ਸ. ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ):</strong> ਅਗਲੇ 24 ਘੰਟਿਆਂ ਵਿੱਚ 12-15mm ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ ਹੈ। ਕਣਕ ਨੂੰ ਟਿਊਬਵੈੱਲ ਦਾ ਪਾਣੀ ਲਾਉਣਾ 36 ਘੰਟਿਆਂ ਲਈ ਮੁਲਤਵੀ ਕਰੋ।
                    </p>
                    <p className="text-[11px] text-emerald-200/90 text-shadow-sm-agri">
                      ਫਸਲ ਦੀ ਸਿਹਤ: 78% (ਚੰਗੀ)। ਉੱਤਰੀ ਖੇਤ ਵਿੱਚ ਨਮੀ ਦੀ ਜਾਂਚ ਕਰੋ।
                    </p>
                    <div className="pt-1 text-[10px] text-emerald-300 font-semibold">
                      ਜਵਾਬ ਦਿਓ: 1 (ਹੋਰ ਜਾਣਕਾਰੀ) | 2 (ਡਾਕਟਰ ਨਾਲ ਗੱਲ ਕਰੋ)
                    </div>
                  </div>
                </div>
              )}

              {channelPreview === 'sms' && (
                <div className="space-y-3 text-xs">
                  <div className="bg-slate-900/60 border border-white/15 p-3 rounded-2xl rounded-tl-none space-y-1 text-slate-200">
                    <div className="font-bold text-white flex items-center justify-between">
                      <span>VK-BKINAG</span>
                      <span className="text-[10px] text-slate-400">SMS • SIM 1</span>
                    </div>
                    <p className="font-mono text-[11px] text-slate-300 text-shadow-sm-agri">
                      [BKIN-ADVISORY] Sardar Gurpreet Singh, Rain (12mm) likely in Samrala block within 24h. Delay wheat irrigation. Sentinel-2 detected minor stress in North corner. Info: bkin.gov.in
                    </p>
                  </div>
                </div>
              )}

              {channelPreview === 'ivr' && (
                <div className="space-y-3 text-xs text-center py-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto animate-bounce border border-emerald-500/40">
                    <Volume2 className="w-7 h-7" />
                  </div>
                  <div className="font-bold text-white text-shadow-agri">Automated Agri-Voice Call Playing...</div>
                  <p className="text-slate-300 text-[11px] italic text-shadow-sm-agri">
                    &ldquo;ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ ਸ. ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ ਜੀ! ਭਾਰਤ ਕ੍ਰਿਸ਼ੀ ਨੈੱਟਵਰਕ ਤੋਂ ਜ਼ਰੂਰੀ ਸੂਚਨਾ: ਕੱਲ੍ਹ ਤੱਕ ਬਾਰਿਸ਼ ਦੇ ਆਸਾਰ ਹਨ, ਇਸ ਲਈ ਕਣਕ ਦੀ ਸਿੰਚਾਈ ਰੋਕ ਲਵੋ...&rdquo;
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 6. FINAL HOMEPAGE CTA (Section 61) — Transparent Editorial CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="border border-emerald-500/30 rounded-3xl p-8 sm:p-14 text-center text-white space-y-6 relative overflow-hidden bg-transparent">
            <div className="max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight agri-heading-glow">
                Turn Agricultural Data Into Better Decisions.
              </h2>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed text-shadow-agri">
                Join thousands of farmers, agriculture officers, and researchers across India using explainable AI to protect crops and boost farm resilience.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/my-farm"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-500 text-emerald-950 font-bold text-sm hover:bg-emerald-400 transition shadow-lg"
              >
                Explore the Platform
              </Link>

              <Link
                href="/india-network"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 font-semibold text-sm transition"
              >
                View Agriculture Network
              </Link>

              <Link
                href="/crop-doctor"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-white font-semibold text-sm border border-emerald-600/40 transition"
              >
                Try Crop Doctor
              </Link>
            </div>
          </div>
        </section>

      </div>
    </AgroScrollBackground>
  );
}
