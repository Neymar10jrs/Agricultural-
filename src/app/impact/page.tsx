'use client';

import React from 'react';
import Link from 'next/link';
import {
  BarChart3,
  TrendingUp,
  Sprout,
  AlertTriangle,
  Sparkles,
  Users,
  CheckCircle2,
  Droplets,
  Activity,
  Layers,
  MapPin,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Zap,
  Repeat,
  Radio,
  FileCheck,
} from 'lucide-react';
import { demoImpactMetrics, demoSystemStatus, demoExpertReviews } from '@/data/impact';
import { useApp } from '@/context/AppContext';
import { SectionHero } from '@/components/ui/SectionHero';

export default function ImpactPage() {
  const { language } = useApp();
  const isHi = language === 'hi';

  const metricCards = isHi
    ? [
        { label: 'निरंतर निगरानी में खेत', value: demoImpactMetrics.farmsMonitored.toLocaleString(), icon: Sprout, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
        { label: 'आपदा व प्रकोप पूर्व चेतावनियां', value: demoImpactMetrics.warningsGenerated.toLocaleString(), icon: AlertTriangle, color: 'text-amber-600 bg-amber-50 border-amber-200' },
        { label: 'वितरित व्यावहारिक परामर्श', value: demoImpactMetrics.advisoriesDelivered.toLocaleString(), icon: Sparkles, color: 'text-blue-600 bg-blue-50 border-blue-200' },
        { label: 'अनुकूलित सिंचाई चक्र', value: demoImpactMetrics.irrigationDecisionsSupported.toLocaleString(), icon: Droplets, color: 'text-sky-600 bg-sky-50 border-sky-200' },
        { label: 'चिन्हित रोग व कीट हॉटस्पॉट', value: demoImpactMetrics.diseaseDetections.toLocaleString(), icon: Activity, color: 'text-rose-600 bg-rose-50 border-rose-200' },
        { label: 'दर्ज किसान प्रतिक्रिया चक्र', value: demoImpactMetrics.farmerFeedbackReceived.toLocaleString(), icon: Repeat, color: 'text-teal-600 bg-teal-50 border-teal-200' },
        { label: 'कृषि वैज्ञानिक मामला समीक्षाएं', value: demoImpactMetrics.expertReviewsConducted.toLocaleString(), icon: Users, color: 'text-purple-600 bg-purple-50 border-purple-200' },
        { label: 'निस्तारित कृषि मामले', value: demoImpactMetrics.resolvedCases.toLocaleString(), icon: CheckCircle2, color: 'text-emerald-700 bg-emerald-100 border-emerald-300' },
        { label: 'सक्रिय संघीकृत राज्य नोड्स', value: demoImpactMetrics.statesActive.toString(), icon: MapPin, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
        { label: 'आच्छादित कृषि जिले', value: demoImpactMetrics.districtsReached.toString(), icon: Layers, color: 'text-slate-700 bg-slate-100 border-slate-300' },
      ]
    : [
        { label: 'Farms Continuously Monitored', value: demoImpactMetrics.farmsMonitored.toLocaleString(), icon: Sprout, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
        { label: 'Hazard & Outbreak Warnings', value: demoImpactMetrics.warningsGenerated.toLocaleString(), icon: AlertTriangle, color: 'text-amber-600 bg-amber-50 border-amber-200' },
        { label: 'Actionable Advisories Delivered', value: demoImpactMetrics.advisoriesDelivered.toLocaleString(), icon: Sparkles, color: 'text-blue-600 bg-blue-50 border-blue-200' },
        { label: 'Irrigation Cycles Optimized', value: demoImpactMetrics.irrigationDecisionsSupported.toLocaleString(), icon: Droplets, color: 'text-sky-600 bg-sky-50 border-sky-200' },
        { label: 'Pathogen & Pest Hotspots Detected', value: demoImpactMetrics.diseaseDetections.toLocaleString(), icon: Activity, color: 'text-rose-600 bg-rose-50 border-rose-200' },
        { label: 'Farmer Feedback Loops Recorded', value: demoImpactMetrics.farmerFeedbackReceived.toLocaleString(), icon: Repeat, color: 'text-teal-600 bg-teal-50 border-teal-200' },
        { label: 'Agronomist Case Reviews', value: demoImpactMetrics.expertReviewsConducted.toLocaleString(), icon: Users, color: 'text-purple-600 bg-purple-50 border-purple-200' },
        { label: 'Resolved Agronomic Cases', value: demoImpactMetrics.resolvedCases.toLocaleString(), icon: CheckCircle2, color: 'text-emerald-700 bg-emerald-100 border-emerald-300' },
        { label: 'Federated State Nodes Active', value: demoImpactMetrics.statesActive.toString(), icon: MapPin, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
        { label: 'Agricultural Districts Covered', value: demoImpactMetrics.districtsReached.toString(), icon: Layers, color: 'text-slate-700 bg-slate-100 border-slate-300' },
      ];

  const intelligenceLoopSteps = isHi
    ? [
        { step: 'अवलोकन (OBSERVE)', desc: 'उपग्रह बहु-स्पेक्ट्रमी, मौसम रडार व मृदा परीक्षण आंकड़े', icon: Radio },
        { step: 'पहचान (DETECT)', desc: 'एनडीवीआई विसंगतियां, आर्द्रता वृद्धि व तापमान विचलन', icon: Zap },
        { step: 'पूर्वानुमान (PREDICT)', desc: 'संभाव्य कीट उद्भव व मृदा नमी ह्रास का पूर्व-आकलन', icon: Activity },
        { step: 'व्याख्या (EXPLAIN)', desc: 'धरातलीय साक्ष्य, डेटा स्रोत व विश्वसनीयता स्तर', icon: ShieldCheck },
        { step: 'अनुशंसा (RECOMMEND)', desc: 'प्राथमिकता-प्राप्त वैज्ञानिक कार्य व समय सीमा', icon: Sparkles },
        { step: 'क्रियान्वयन (ACT)', desc: 'किसान द्वारा सिंचाई स्थगन या जैविक छिड़काव', icon: Sprout },
        { step: 'मापन (MEASURE)', desc: 'बाद के उपग्रह पास द्वारा बायोमास सुधार सत्यापन', icon: Layers },
        { step: 'सीखना (LEARN)', desc: 'किसान प्रतिक्रिया से स्थानीय जिला मॉडलों का संवर्धन', icon: Repeat },
      ]
    : [
        { step: 'OBSERVE', desc: 'Satellite multi-spectral, agro-met radar & lab soil registries', icon: Radio },
        { step: 'DETECT', desc: 'NDVI anomalies, humidity spikes, degree-day shifts', icon: Zap },
        { step: 'PREDICT', desc: 'Probabilistic pest emergence & soil moisture depletion', icon: Activity },
        { step: 'EXPLAIN', desc: 'Ground truth evidence, data provenance & confidence scores', icon: ShieldCheck },
        { step: 'RECOMMEND', desc: 'Prioritized agronomic actions with timing constraints', icon: Sparkles },
        { step: 'ACT', desc: 'Farmer implements tubewell postponement or IPM scouting', icon: Sprout },
        { step: 'MEASURE', desc: 'Post-action satellite pass verifies biomass response', icon: Layers },
        { step: 'LEARN', desc: 'Farmer feedback trains localized district models', icon: Repeat },
      ];

  return (
    <div>
      <SectionHero
        imageSrc="/assets/agriculture/fields-pattern.svg"
        theme="impact"
        label={isHi ? 'राष्ट्रीय प्रभाव डैशबोर्ड' : 'NATIONAL IMPACT DASHBOARD'}

        heading={<><span className='text-gradient-gold'>{isHi ? 'BKIN प्रभाव मेट्रिक्स' : 'BKIN Impact & Outcomes'}</span></>}
        description={isHi ? 'भारत भर में BKIN की AI कृषि बुद्धिमत्ता का सिद्ध प्रभाव' : 'Verified impact of BKIN AI agricultural intelligence across India — farmer outcomes, crop health improvements, and system reliability'}
        showDemoBadge={true}
        stats={[
          { value: '2.4M+', label: isHi ? 'किसान उपयोगकर्ता' : 'Farmer Users' },
          { value: '₹12,400', label: isHi ? 'औसत बचत/एकड़' : 'Avg Savings/Acre' },
          { value: '94%', label: isHi ? 'उपज में सुधार' : 'Yield Improvement' },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Demo Data Banner */}
      <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-2xl p-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2.5 text-xs text-amber-900">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
          <span className="font-bold uppercase tracking-wider">
            {isHi ? 'प्रोटोटाइप अनुकरण प्रभाव डेटा:' : 'Demo / Simulated Impact Data:'}
          </span>
          <span>
            {isHi
              ? 'नीचे दिए गए आंकड़े कृत्रिम पायलट डेटासेट का उपयोग करके प्लेटफ़ॉर्म क्षमताओं को दर्शाते हैं। बीकेआईएन कभी भी अनुकरण परिणामों को वास्तविक रूप में प्रस्तुत नहीं करता।'
              : 'The metrics below illustrate platform capability using synthetic pilot datasets. BKIN never presents simulated outcomes as verified real-world measurements.'}
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
          {isHi ? 'पायलट चरण v0.3' : 'Pilot Stage v0.3'}
        </span>
      </div>

      {/* Metrics Grid */}
      <div id="guide-impact-metrics" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            {isHi ? 'पायलट कार्यक्रम मुख्य मेट्रिक्स (सिम्युलेटेड)' : 'Pilot Program Core Metrics (Simulated)'}
          </h2>
          <span className="text-xs text-slate-500">
            {isHi ? 'दैनिक अद्यतन' : 'Updated Daily'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {metricCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-2xl border border-white/10 p-4 shadow-[0_4px_16px_rgba(0,0,0,0.10)] hover:bg-[rgba(10,20,15,0.28)] transition space-y-2"
              >
                <div className={`w-8 h-8 rounded-xl border flex items-center justify-center ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="count-reveal text-4xl font-extrabold tracking-tight text-slate-900 block">
                    {card.value}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 leading-tight block pt-0.5">
                    {card.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Before / After Comparison */}
      <div id="guide-impact-comparison" className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-3xl border border-white/10 p-6 sm:p-8 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            {isHi ? 'कृषि कार्यप्रणाली परिवर्तन' : 'Paradigm Shift'}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {isHi
              ? 'पारंपरिक कृषि बनाम बीकेआईएन आसूचना ऑपरेटिंग सिस्टम'
              : 'Traditional Agriculture vs. BKIN Intelligence Operating System'}
          </h2>
          <p className="text-xs text-slate-500">
            {isHi
              ? 'निरंतर भू-स्थानिक टेलीमेट्री और पूर्वानुमानात्मक मॉडलिंग कैसे कृषि परिचालन चक्र को बुनियादी रूप से रूपांतरित करते हैं।'
              : 'How continuous geospatial telemetry and predictive modeling fundamentally alter the agricultural operational cycle.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch relative">
          {/* Traditional */}
          <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200/80 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                <h3 className="font-extrabold text-rose-900 text-sm uppercase tracking-wide">
                  {isHi ? 'पारंपरिक प्रतिक्रियाशील प्रणाली' : 'Traditional Reactive Model'}
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-white/80 border border-rose-200 space-y-1">
                  <strong className="text-slate-800 block">
                    {isHi ? '1. देर से दृश्य पहचान' : '1. Late Visual Detection'}
                  </strong>
                  <p className="text-slate-600">
                    {isHi
                      ? 'किसान पीला रतुआ या तना छेदक का पता तभी लगा पाता है जब 30%+ फसल क्षति दृश्यमान हो चुकी होती है।'
                      : 'Farmer only notices yellow rust or stem borer after 30%+ canopy damage is visibly manifest.'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/80 border border-rose-200 space-y-1">
                  <strong className="text-slate-800 block">
                    {isHi ? '2. अपूर्ण व व्यावसायिक सलाह' : '2. Incomplete Local Advice'}
                  </strong>
                  <p className="text-slate-600">
                    {isHi
                      ? 'स्थानीय खाद-बीज विक्रेता से परामर्श, जिसका व्यावसायिक हित व्यापक रासायनिक छिड़काव बेचने में होता है।'
                      : 'Farmer consults local input dealer with commercial incentive to sell broad-spectrum chemicals.'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/80 border border-rose-200 space-y-1">
                  <strong className="text-slate-800 block">
                    {isHi ? '3. अनिश्चित सिंचाई समय' : '3. Blind Irrigation Timing'}
                  </strong>
                  <p className="text-slate-600">
                    {isHi
                      ? 'कल होने वाली वर्षा की पूर्व जानकारी के बिना 8 घंटे ट्यूबवेल चलाना, जिससे जड़ों में जलभराव व ऊर्जा बर्बादी होती है।'
                      : 'Pumping tubewells for 8 hours without knowing rain is arriving tomorrow, causing root asphyxiation.'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/80 border border-rose-200 space-y-1">
                  <strong className="text-slate-800 block">
                    {isHi ? '4. बढ़ती लागत व रासायनिक भार' : '4. Escalating Input Costs'}
                  </strong>
                  <p className="text-slate-600">
                    {isHi
                      ? 'यूरिया और अंधाधुंध कीटनाशकों के अत्यधिक प्रयोग से मिट्टी की जैविकी घटती है और किसान का मुनाफा सिकुड़ता है।'
                      : 'Over-application of Urea and non-targeted fungicides degrades soil biology and squeezes margins.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-rose-100/70 text-[11px] text-rose-800 font-semibold text-center border border-rose-200">
              {isHi
                ? 'परिणाम: उच्च उपज जोखिम, घटी हुई किसान आय, और पर्यावरण को नुकसान।'
                : 'Outcome: High yield vulnerability, compressed farmer incomes, environmental runoff.'}
            </div>
          </div>

          {/* BKIN */}
          <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-300 space-y-4 flex flex-col justify-between shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-600 animate-pulse"></span>
                <h3 className="font-extrabold text-emerald-950 text-sm uppercase tracking-wide">
                  {isHi ? 'बीकेआईएन पूर्वानुमानात्मक आसूचना प्रणाली' : 'BKIN Predictive Intelligence Model'}
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-white border border-emerald-200 space-y-1 shadow-xs">
                  <strong className="text-slate-800 block">
                    {isHi ? '1. उपग्रह बहु-स्पेक्ट्रमी अग्रिम पहचान' : '1. Multi-Spectral Sub-Canopy Detection'}
                  </strong>
                  <p className="text-slate-600">
                    {isHi
                      ? 'सेंटिनेल-2 एनडीवीआई मानवीय आंखों से दिखने से 10 दिन पूर्व ही सूक्ष्म पादप तनाव की पहचान कर लेता है।'
                      : 'Sentinel-2 NDVI detects localized stress 10 days before leaf discoloration appears to the human eye.'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-emerald-200 space-y-1 shadow-xs">
                  <strong className="text-slate-800 block">
                    {isHi ? '2. व्याख्या योग्य एआई + प्रमाणित वैज्ञानिक सत्यापन' : '2. Explainable AI + Certified Agronomists'}
                  </strong>
                  <p className="text-slate-600">
                    {isHi
                      ? 'आईसीएआर वैज्ञानिक ज्ञानकोश, साक्ष्य डेटा और राज्य कृषि विश्वविद्यालय के प्रमाणित विस्तार अधिकारियों द्वारा पुष्टि।'
                      : 'Diagnosis backed by ICAR knowledge base, confidence score, and certified SAU extension officer verification.'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-emerald-200 space-y-1 shadow-xs">
                  <strong className="text-slate-800 block">
                    {isHi ? '3. सटीक अग्रिम सिंचाई व सुरक्षा निर्देश' : '3. Precision Pre-Emptive Triggers'}
                  </strong>
                  <p className="text-slate-600">
                    {isHi
                      ? '\"ट्यूबवेल सिंचाई 48 घंटे टालें — 24 घंटे में 12.5 मिमी वर्षा संभावित\" जिससे बिजली बचती है और जड़ें सुरक्षित रहती हैं।'
                      : '\"Delay tubewell irrigation by 48h — 12.5mm rain arriving in 24h\" saves electricity and preserves root oxygen.'}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-emerald-200 space-y-1 shadow-xs">
                  <strong className="text-slate-800 block">
                    {isHi ? '4. बंद-लूप किसान प्रतिक्रिया' : '4. Closed-Loop Farmer Feedback'}
                  </strong>
                  <p className="text-slate-600">
                    {isHi
                      ? 'प्रत्येक किसान की प्रतिक्रिया जिला मॉडलों को प्रशिक्षित करती है, जिससे आस-पास के खेतों के लिए सटीकता बढ़ती है।'
                      : 'Every farmer rating trains district models, refining micro-climate calibrations for adjacent holdings.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-200/60 text-[11px] text-emerald-950 font-bold text-center border border-emerald-300">
              {isHi
                ? 'परिणाम: 30%+ लागत में कमी, सुरक्षित पैदावार, और पारदर्शी डेटा स्रोत।'
                : 'Outcome: 30%+ input cost reduction, protected yields, transparent provenance.'}
            </div>
          </div>
        </div>
      </div>

      {/* The 8-Step BKIN Intelligence Loop */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-xl">
        <div className="space-y-1">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            {isHi ? 'बंद-लूप स्वायत्त आर्किटेक्चर' : 'Closed-Loop Autonomous Architecture'}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold">
            {isHi ? '8-चरणीय बीकेआईएन कृषि आसूचना चक्र' : 'The 8-Stage BKIN Agricultural Intelligence Loop'}
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl">
            {isHi
              ? 'कक्षा में स्थापित उपग्रहों व धरातलीय सेंसरों से किसान के कार्य तक और पुनः एल्गोरिदमिक सुधार में डेटा का प्रवाह।'
              : 'How data flows from orbital satellites and ground sensors into farmer action and back into algorithmic learning.'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 pt-2">
          {intelligenceLoopSteps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="p-3.5 rounded-2xl bg-slate-800/90 border border-slate-700/80 space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-400">0{idx + 1}</span>
                    <Icon className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <h4 className="text-xs font-extrabold text-white tracking-wider">{s.step}</h4>
                </div>
                <p className="text-[10px] text-slate-400 leading-snug">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* System Status Panel */}
      <div id="guide-impact-status" className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-3xl border border-white/10 p-6 sm:p-8 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {isHi ? 'सक्रिय पाइपलाइन आर्किटेक्चर स्थिति' : 'Live Pipeline Architecture Status'}
            </h2>
            <p className="text-xs text-slate-500">
              {isHi
                ? 'सार्वजनिक डिजिटल कृषि डेटा फ़ीड्स में सक्रिय टेलीमेट्री सिंक्रोनाइज़ेशन।'
                : 'Active telemetry synchronizations across public digital agriculture feeds.'}
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            {isHi ? 'प्रणाली सामान्य रूप से सक्रिय' : 'System Operational'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {demoSystemStatus.modules.map((mod) => (
            <div
              key={mod.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{mod.label}</span>
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    mod.status === 'operational'
                      ? 'bg-emerald-500'
                      : mod.status === 'degraded'
                      ? 'bg-amber-500'
                      : 'bg-blue-500 animate-pulse'
                  }`}
                />
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                {isHi ? 'अंतिम सिंक:' : 'Last sync:'} {mod.lastSync}
              </p>
              {mod.detail && (
                <p className="text-[10px] text-slate-600 pt-1 border-t border-slate-200">
                  {mod.detail}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
