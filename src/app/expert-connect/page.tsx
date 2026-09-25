'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCheck,
  ShieldCheck,
  Camera,
  Upload,
  MessageSquare,
  Sparkles,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Award,
  ArrowRight,
  Info,
} from 'lucide-react';
import { demoExpertReviews } from '@/data/impact';
import { ExpertReview, ExpertReviewStatus, FeedbackItem } from '@/types';
import { useApp } from '@/context/AppContext';
import FeedbackWidget from '@/components/ui/FeedbackWidget';
import { SectionHero } from '@/components/ui/SectionHero';

export default function ExpertConnectPage() {
  const { language } = useApp();
  const isHi = language === 'hi';
  const [reviews, setReviews] = useState<ExpertReview[]>(demoExpertReviews);
  const [expandedId, setExpandedId] = useState<string | null>('exp-001');

  // Form State
  const [formCrop, setFormCrop] = useState('Wheat');
  const [formState, setFormState] = useState('Punjab');
  const [formDistrict, setFormDistrict] = useState('Ludhiana');
  const [formStage, setFormStage] = useState('Tillering');
  const [formSymptoms, setFormSymptoms] = useState('');
  const [formPrediction, setFormPrediction] = useState('Suspected Rust or Nutrient Deficiency');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formSymptoms.trim()) return;

    const newReview: ExpertReview = {
      id: `exp-${Date.now().toString().slice(-4)}`,
      status: 'submitted',
      crop: formCrop,
      state: formState,
      district: formDistrict,
      cropStage: formStage,
      symptoms: formSymptoms,
      bkinPrediction: formPrediction,
      bkinConfidence: 75,
      submittedAt: isHi ? 'अभी-अभी' : 'Just now',
    };

    setReviews([newReview, ...reviews]);
    setIsSubmitted(true);
    setFormSymptoms('');
  };

  const getStatusBadge = (status: ExpertReviewStatus) => {
    switch (status) {
      case 'resolved':
        return {
          bg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          label: isHi ? 'निस्तारित' : 'Resolved',
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
        };
      case 'expert_responded':
        return {
          bg: 'bg-blue-100 text-blue-800 border-blue-300',
          label: isHi ? 'विशेषज्ञ उत्तर उपलब्ध' : 'Expert Responded',
          icon: <FileCheck className="w-3.5 h-3.5 text-blue-600" />,
        };
      case 'under_review':
        return {
          bg: 'bg-amber-100 text-amber-800 border-amber-300',
          label: isHi ? 'समीक्षाधीन' : 'Under Review',
          icon: <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />,
        };
      case 'submitted':
      default:
        return {
          bg: 'bg-slate-100 text-slate-800 border-slate-300',
          label: isHi ? 'दर्ज किया गया' : 'Submitted',
          icon: <Clock className="w-3.5 h-3.5 text-slate-500" />,
        };
    }
  };

  const workflowSteps = isHi
    ? [
        { step: 1, label: 'किसान द्वारा मामला दर्ज', desc: 'संदेहास्पद लक्षण व एआई निदान विवरण प्रस्तुत' },
        { step: 2, label: 'स्वचालित छंटाई व प्रेषण', desc: 'राज्य कृषि विश्वविद्यालय / केवीके विशेषज्ञ को अग्रेषित' },
        { step: 3, label: 'विशेषज्ञ वैज्ञानिक समीक्षा', desc: 'पादप रोग विशेषज्ञ द्वारा साक्ष्यों का सूक्ष्म सत्यापन' },
        { step: 4, label: 'प्रमाणित एकीकृत परामर्श', desc: 'सत्यापित एकीकृत कीट/रोग प्रबंधन अनुशंसा जारी' },
      ]
    : [
        { step: 1, label: 'Farmer Submission', desc: 'Symptoms & AI diagnosis uploaded' },
        { step: 2, label: 'Triage & Route', desc: 'Forwarded to state agro-university specialist' },
        { step: 3, label: 'Expert Review', desc: 'Pathologist validates observations' },
        { step: 4, label: 'Actionable Advice', desc: 'Certified IPM recommendation issued' },
      ];

  return (
    <div className="space-y-0">
      <SectionHero
        imageSrc="/assets/farmer/farmer-network.svg"
        theme="forest"
        label={isHi ? 'विशेषज्ञ सत्यापन नेटवर्क' : 'EXPERT VERIFICATION NETWORK'}

        heading={<><span className="text-gradient-agri">{isHi ? 'कृषि विशेषज्ञ कनेक्ट' : 'Agri Expert Connect'}</span></>}
        description={isHi ? 'BKIN AI सिफारिशें 200+ कृषि वैज्ञानिकों द्वारा सत्यापित' : 'BKIN AI recommendations reviewed & verified by 200+ agricultural scientists'}
        showDemoBadge={true}
        stats={[
          { value: '247', label: isHi ? 'सत्यापित विशेषज्ञ' : 'Verified Experts' },
          { value: '4.2h', label: isHi ? 'औसत प्रतिक्रिया' : 'Avg Response' },
          { value: '98%', label: isHi ? 'संतुष्टि दर' : 'Satisfaction Rate' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Action buttons row preserved from original header */}
        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href="/crop-doctor"
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 border border-slate-300 transition"
          >
            {isHi ? '← फसल डॉक्टर एआई' : '← Crop Doctor AI'}
          </Link>
          <a
            href="#new-request"
            className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md"
          >
            <Send className="w-3.5 h-3.5" />
            {isHi ? 'नया मामला दर्ज करें' : 'Submit New Case'}
          </a>
        </div>

      {/* How It Works Diagram — 80% Translucent Surface */}
      <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">
          {isHi ? 'बीकेआईएन विशेषज्ञ सत्यापन कैसे कार्य करता है' : 'How BKIN Expert Verification Works'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {workflowSteps.map((s, idx) => (
            <div
              key={s.step}
              className="p-4 rounded-2xl bg-[rgba(10,20,15,0.30)] backdrop-blur-[6px] border border-white/10 space-y-2 relative"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs shadow-sm">
                0{s.step}
              </div>
              <h3 className="text-sm font-bold text-white">{s.label}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>
              {idx < 3 && (
                <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Submit Form + Workflow Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Submission Form */}
        <div id="new-request" className="lg:col-span-5 space-y-6">
          <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-5">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                {isHi ? 'मामला प्रस्तुति' : 'Case Submission'}
              </span>
              <h2 className="text-lg font-bold text-white">
                {isHi ? 'कृषि वैज्ञानिक समीक्षा का अनुरोध करें' : 'Request Agronomist Review'}
              </h2>
              <p className="text-xs text-slate-300">
                {isHi
                  ? 'कृषि विज्ञान या पादप रोग विशेषज्ञ द्वारा समीक्षा हेतु विवरण प्रदान करें।'
                  : 'Provide details for review by an agronomy or plant pathology officer.'}
              </p>
            </div>

            {isSubmitted && (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-emerald-300">
                    {isHi ? 'मामला सफलतापूर्वक दर्ज हुआ' : 'Case Submitted Successfully'}
                  </h4>
                  <p className="text-xs text-emerald-200">
                    {isHi
                      ? 'आपका अनुरोध क्षेत्रीय केवीके डेस्क को अग्रेषित कर दिया गया है। कार्य दिवसों में अनुमानित प्रतिक्रिया समय 4-8 घंटे है।'
                      : 'Your request has been routed to the regional KVK desk. Typical response time is 4–8 hours during working days.'}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">
                    {isHi ? 'लक्षित फसल' : 'Target Crop'}
                  </label>
                  <select
                    value={formCrop}
                    onChange={(e) => setFormCrop(e.target.value)}
                    className="w-full rounded-xl border border-white/20 p-2.5 bg-[rgba(10,20,15,0.60)] text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="Wheat" className="bg-slate-900 text-white">Wheat (गेहूं)</option>
                    <option value="Rice" className="bg-slate-900 text-white">Rice (धान / चावल)</option>
                    <option value="Cotton" className="bg-slate-900 text-white">Cotton (कपास)</option>
                    <option value="Mustard" className="bg-slate-900 text-white">Mustard (सरसों)</option>
                    <option value="Potato" className="bg-slate-900 text-white">Potato (आलू)</option>
                    <option value="Maize" className="bg-slate-900 text-white">Maize (मक्का)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">
                    {isHi ? 'वृद्धि अवस्था' : 'Growth Stage'}
                  </label>
                  <select
                    value={formStage}
                    onChange={(e) => setFormStage(e.target.value)}
                    className="w-full rounded-xl border border-white/20 p-2.5 bg-[rgba(10,20,15,0.60)] text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="Germination" className="bg-slate-900 text-white">{isHi ? 'अंकुरण (Germination)' : 'Germination'}</option>
                    <option value="Tillering" className="bg-slate-900 text-white">{isHi ? 'कल्ले फूटना (Tillering)' : 'Crown Root / Tillering'}</option>
                    <option value="Jointing" className="bg-slate-900 text-white">{isHi ? 'गांठ बनना (Jointing)' : 'Jointing'}</option>
                    <option value="Flowering" className="bg-slate-900 text-white">{isHi ? 'फूल / बाली आना (Flowering)' : 'Flowering / Booting'}</option>
                    <option value="Grain Fill" className="bg-slate-900 text-white">{isHi ? 'दाना भरना (Grain Fill)' : 'Grain Filling / Milking'}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">
                    {isHi ? 'राज्य' : 'State'}
                  </label>
                  <input
                    type="text"
                    value={formState}
                    onChange={(e) => setFormState(e.target.value)}
                    className="w-full rounded-xl border border-white/20 p-2.5 bg-[rgba(10,20,15,0.60)] text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">
                    {isHi ? 'जिला' : 'District'}
                  </label>
                  <input
                    type="text"
                    value={formDistrict}
                    onChange={(e) => setFormDistrict(e.target.value)}
                    className="w-full rounded-xl border border-white/20 p-2.5 bg-[rgba(10,20,15,0.60)] text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">
                  {isHi ? 'बीकेआईएन प्रारंभिक पूर्वानुमान' : 'BKIN Preliminary Prediction'}
                </label>
                <input
                  type="text"
                  value={formPrediction}
                  onChange={(e) => setFormPrediction(e.target.value)}
                  className="w-full rounded-xl border border-white/20 p-2.5 bg-[rgba(10,20,15,0.60)] text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">
                  {isHi ? 'देखे गए लक्षण व खेत की स्थिति' : 'Observed Symptoms & Field Notes'}
                </label>
                <textarea
                  rows={3}
                  value={formSymptoms}
                  onChange={(e) => setFormSymptoms(e.target.value)}
                  placeholder={
                    isHi
                      ? 'पत्तियों पर धब्बे, फैलाव का स्वरूप, मौसम या हाल में डाले गए उर्वरक का विवरण दें...'
                      : 'Describe leaf symptoms, spread pattern, weather conditions, or recent fertilizer applications...'
                  }
                  className="w-full rounded-xl border border-white/20 p-2.5 bg-[rgba(10,20,15,0.60)] text-white focus:ring-2 focus:ring-emerald-500 outline-none leading-relaxed"
                />
              </div>

              <div className="p-3 rounded-xl border border-dashed border-white/20 bg-[rgba(10,20,15,0.30)] text-center space-y-1">
                <Camera className="w-5 h-5 text-slate-400 mx-auto" />
                <span className="text-[11px] font-semibold text-slate-300 block">
                  {isHi ? 'खेत की तस्वीर संलग्न करें (वैकल्पिक डेमो)' : 'Attach Field Photo (Optional Demo)'}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  {isHi ? 'पादप रोग विश्लेषण हेतु अनुकरण' : 'Simulated upload for pathology analysis'}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition flex items-center justify-center gap-2 shadow-sm text-xs"
              >
                <Send className="w-4 h-4" />
                {isHi ? 'विशेषज्ञ सत्यापन हेतु भेजें' : 'Submit for Expert Verification'}
              </button>

              <p className="text-[10px] text-slate-400 text-center leading-tight">
                {isHi
                  ? '⚠️ इस प्रोटोटाइप में प्रस्तुत मामले कृत्रिम सत्यापन एजेंटों द्वारा संसाधित किए जाते हैं।'
                  : '⚠️ Case submissions in this prototype are processed through synthetic verification agents.'}
              </p>
            </form>
          </div>
        </div>

        {/* Right: Active Reviews Tracker */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-white">
              {isHi ? 'सक्रिय मामला सत्यापन ट्रैकर' : 'Active Case Verification Tracker'} ({reviews.length})
            </h2>
            <span className="text-xs text-slate-400">
              {isHi ? 'सक्रिय पायलट कतार' : 'Live Pilot Queue'}
            </span>
          </div>

          <div className="space-y-4">
            {reviews.map((rev) => {
              const badge = getStatusBadge(rev.status);
              const isExpanded = expandedId === rev.id;

              return (
                <div
                  key={rev.id}
                  className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.10)] hover:shadow-md transition space-y-4 text-white"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1 ${badge.bg}`}
                        >
                          {badge.icon}
                          {badge.label}
                        </span>
                        <span className="text-xs font-bold text-white">
                          {rev.crop} • {isHi ? 'अवस्था' : 'Stage'}: {rev.cropStage}
                        </span>
                        <span className="text-xs text-slate-400">
                          📍 {rev.district}, {rev.state}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 block">
                        {isHi ? 'मामला क्रमांक' : 'Case ID'}: {rev.id} • {isHi ? 'दर्ज' : 'Submitted'}: {rev.submittedAt}
                      </span>
                    </div>

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : rev.id)}
                      className="text-xs text-emerald-400 font-semibold flex items-center gap-1 hover:underline self-start sm:self-center"
                    >
                      {isExpanded ? (isHi ? 'विवरण छिपाएं' : 'Hide Details') : (isHi ? 'पूर्ण विवरण देखें' : 'View Full Case')}
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Summary row */}
                  <div className="p-3 rounded-xl bg-[rgba(10,20,15,0.30)] border border-white/10 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">
                        {isHi ? 'बीकेआईएन एआई आकलन:' : 'BKIN AI Assessment:'}
                      </span>
                      <span className="font-bold text-emerald-400">
                        {rev.bkinPrediction} ({rev.bkinConfidence}% {isHi ? 'विश्वसनीयता' : 'confidence'})
                      </span>
                    </div>
                    <p className="text-slate-200 font-medium pt-1">
                      <strong className="text-slate-400">{isHi ? 'खेत के लक्षण:' : 'Field Symptoms:'}</strong> {rev.symptoms}
                    </p>
                  </div>

                  {/* Expert Response Section */}
                  {rev.expertResponse && (
                    <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-emerald-500/20 pb-2">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-emerald-400" />
                          <div>
                            <span className="text-xs font-bold text-white block leading-tight">
                              {rev.expertName}
                            </span>
                            <span className="text-[10px] text-emerald-300 block">
                              {rev.expertDesignation}
                            </span>
                          </div>
                        </div>
                        {rev.reviewedAt && (
                          <span className="text-[10px] text-emerald-300 font-medium">
                            {isHi ? 'समीक्षित:' : 'Reviewed:'} {rev.reviewedAt}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-200 leading-relaxed font-normal">
                        {rev.expertResponse}
                      </p>

                      {/* Integrated Farmer Feedback Loop for Verified Cases */}
                      <div className="pt-2 border-t border-emerald-500/20">
                        <FeedbackWidget
                          advisoryId={rev.id}
                          advisoryTitle={`${rev.crop} - ${rev.bkinPrediction}`}
                        />
                      </div>
                    </div>
                  )}

                  {rev.status === 'under_review' && (
                    <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-center gap-2 text-xs text-amber-200">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0 animate-spin" />
                      <span>
                        {isHi
                          ? 'मामला वर्तमान में डॉ. आर. के. शर्मा (सस्य विज्ञान विभाग) के पास है। आज प्रतिक्रिया अपेक्षित है।'
                          : 'Case currently with Dr. R. K. Sharma (Agronomy Division). Feedback expected today.'}
                      </span>
                    </div>
                  )}

                  {rev.status === 'submitted' && (
                    <div className="p-3 rounded-xl bg-[rgba(10,20,15,0.40)] border border-white/10 flex items-center gap-2 text-xs text-slate-300">
                      <Info className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>
                        {isHi
                          ? 'जिले की कृषि-जलवायु रूपरेखा के आधार पर स्वचालित छंटाई हेतु कतारबद्ध।'
                          : 'Queued for automated triage based on district agro-climatic profile.'}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
