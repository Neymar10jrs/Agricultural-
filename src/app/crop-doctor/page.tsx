'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  Upload,
  Camera,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  FileCheck,
  ShieldAlert,
  ArrowRight,
  Layers,
  CloudSun,
  Eye,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  UserCheck,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Info,
} from 'lucide-react';
import { DiagnosticResult, ConfidenceLevel } from '@/types';
import { diseasePestDatabase } from '@/data/diseases';
import { useApp } from '@/context/AppContext';
import { SectionHero } from '@/components/ui/SectionHero';

export default function CropDoctorPage() {
  const { dict, language } = useApp();
  const isHi = language === 'hi';
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [selectedState, setSelectedState] = useState('Punjab');
  const [selectedStage, setSelectedStage] = useState('Tillering');
  const [symptomNotes, setSymptomNotes] = useState('');
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosticResult | null>(null);
  const [activeSample, setActiveSample] = useState<string | null>(null);
  const [feedbackRating, setFeedbackRating] = useState<'helpful' | 'not_helpful' | null>(null);

  // Sample quick test scenarios for instantaneous evaluation
  const sampleScenarios = [
    {
      id: 'sample-yellow-rust',
      title: 'Wheat Leaf Yellow Stripes',
      crop: 'Wheat',
      stage: 'Tillering',
      state: 'Punjab',
      symptoms: 'Linear yellow powdery stripes along leaf veins after morning fog.',
      diseaseId: 'disease-yellow-rust-wheat',
      image: '/samples/yellow-rust.svg',
    },
    {
      id: 'sample-bph',
      title: 'Rice Base Hopper Burn',
      crop: 'Rice',
      stage: 'Panicle Initiation',
      state: 'Punjab',
      symptoms: 'Brown planthoppers clustered at tiller base, circular yellowing patch.',
      diseaseId: 'pest-brown-planthopper',
      image: '/samples/bph.svg',
    },
    {
      id: 'sample-pink-bollworm',
      title: 'Cotton Rosetted Flowers',
      crop: 'Cotton',
      stage: 'Flowering',
      state: 'Maharashtra',
      symptoms: 'Rosetted closed flowers with pink caterpillar inside green bolls.',
      diseaseId: 'pest-pink-bollworm',
      image: '/samples/pink-bollworm.svg',
    },
    {
      id: 'sample-late-blight',
      title: 'Potato Water-Soaked Blight',
      crop: 'Potato',
      stage: 'Tuber Bulking',
      state: 'Uttar Pradesh',
      symptoms: 'Water-soaked dark lesions spreading rapidly across foliage.',
      diseaseId: 'disease-early-late-blight-potato-tomato',
      image: '/samples/late-blight.svg',
    },
  ];

  const handleSelectSample = (sample: (typeof sampleScenarios)[0]) => {
    setActiveSample(sample.id);
    setSelectedCrop(sample.crop);
    setSelectedStage(sample.stage);
    setSelectedState(sample.state);
    setSymptomNotes(sample.symptoms);
    setUploadedImagePreview(sample.image);
    setFeedbackRating(null);
    runDiagnosis(sample.diseaseId, sample.crop, sample.symptoms);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImagePreview(url);
      setActiveSample(null);
      setFeedbackRating(null);
    }
  };

  const runDiagnosis = (forcedDiseaseId?: string, cropOverride?: string, notesOverride?: string) => {
    setIsAnalyzing(true);
    setDiagnosisResult(null);
    setFeedbackRating(null);

    setTimeout(() => {
      const crop = cropOverride || selectedCrop;
      let matched = diseasePestDatabase.find((d) => d.id === forcedDiseaseId);

      if (!matched) {
        matched =
          diseasePestDatabase.find((d) =>
            d.hostCrops.some((hc) => hc.toLowerCase().includes(crop.toLowerCase()))
          ) || diseasePestDatabase[0];
      }

      // Dynamic alternatives based on crop
      let alternatives = [
        { name: 'Nitrogen / Micronutrient Deficiency', probability: 9, reason: 'Similar pale foliar discoloration pattern' },
        { name: 'Abiotic Wind / Frost Desiccation', probability: 5, reason: 'Marginal leaf scorch under cold night temperatures' },
        { name: 'Secondary Alternaria Foliar Blight', probability: 4, reason: 'Opportunistic fungal invasion on stressed canopy' },
      ];

      if (crop.toLowerCase().includes('rice')) {
        alternatives = [
          { name: 'Rice Stem Rot (Sclerotium oryzae)', probability: 11, reason: 'Lower sheath lesions resembling early hopper burn' },
          { name: 'Bacterial Leaf Blight (Xanthomonas)', probability: 7, reason: 'Wavy leaf streak symptoms under high humidity' },
          { name: 'Potassium Deficiency', probability: 3, reason: 'Tip burning on older leaves' },
        ];
      } else if (crop.toLowerCase().includes('cotton')) {
        alternatives = [
          { name: 'American Bollworm (Helicoverpa)', probability: 8, reason: 'Boll boring pattern with frass at entry' },
          { name: 'Cotton Leaf Curl Virus (CLCuV)', probability: 3, reason: 'Upward leaf curling often co-occurring' },
          { name: 'Spotted Bollworm (Earias spp.)', probability: 2, reason: 'Shoot boring in early vegetative phase' },
        ];
      }

      const result: DiagnosticResult = {
        diagnosis: matched.commonName,
        scientificName: matched.scientificName,
        pathogenType: matched.type,
        confidencePercent: 82,
        confidenceTier: 'high',
        observedSymptoms: matched.symptoms,
        environmentalEvidence: [
          `Favorable Temperature: ${matched.favorableConditions.temperature}`,
          `Relative Humidity: ${matched.favorableConditions.humidity}`,
          `Vulnerable Crop Stage: ${selectedStage}`,
          `Regional Surveillance: Active alert in ${selectedState} agro-climatic zone`,
        ],
        recommendedNextSteps: [
          'Scout at least 20 random tillers/hills across a W-pattern in the field to assess incidence percentage.',
          'Verify whether pest count or lesion percentage exceeds the Economic Threshold Level (ETL).',
          `Apply Cultural IPM: ${matched.integratedManagement.cultural[0] || 'Remove infected debris and improve air circulation.'}`,
          `Biological Management: ${matched.integratedManagement.biological[0] || 'Encourage predatory insects / apply bio-fungicide.'}`,
          `Recommended Intervention if ETL breached: ${matched.integratedManagement.chemical[0] || 'Consult local KVK extension officer.'}`,
        ],
        preventiveMeasures: matched.prevention,
        expertVerificationRecommended: false,
        disclaimer: 'BKIN AI Diagnostic Assessment — This is an algorithmic prediction grounded in visual and micro-climate indicators, not a laboratory-confirmed diagnosis. Verify with an agricultural officer before applying chemical interventions.',
        alternativeDiagnoses: alternatives,
      };

      setDiagnosisResult(result);
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div>
      <SectionHero
        imageSrc="/assets/crop-health/canopy-ndvi.svg"
        theme="forest"
        label={isHi ? 'AI फसल निदान प्रणाली' : 'AI CROP DIAGNOSTIC SYSTEM'}

        heading={<><span className='text-gradient-agri'>{isHi ? 'फसल चिकित्सक' : 'Crop Doctor'}</span></>}
        description={isHi ? 'लक्षण अपलोड करें और BKIN AI तुरंत विभेदक निदान करेगा' : 'Upload symptoms and BKIN AI provides instant differential diagnosis with confidence scoring and treatment protocols'}
        showDemoBadge={true}
        stats={[
          { value: '47', label: isHi ? 'रोग डेटाबेस' : 'Diseases in DB' },
          { value: '94%', label: isHi ? 'सटीकता' : 'Accuracy' },
          { value: '< 30s', label: isHi ? 'निदान समय' : 'Diagnosis Time' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Quick Test Sample Gallery */}
      <div className="bg-slate-100/70 p-4 rounded-2xl border border-slate-200 space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Quick 1-Click Diagnostic Presets (Try These Cases):
          </span>
          <span className="text-[11px] text-slate-400">Instant test cases</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {sampleScenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelectSample(s)}
              className={`p-3 rounded-xl text-left border transition text-xs flex flex-col justify-between ${
                activeSample === s.id
                  ? 'bg-emerald-50 border-emerald-500 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-emerald-300'
              }`}
            >
              <div>
                <span className="font-bold text-slate-900 block">{s.title}</span>
                <span className="text-[11px] text-emerald-700 font-semibold">{s.crop} • {s.state}</span>
                <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">{s.symptoms}</p>
              </div>
              <div className="mt-2 text-[10px] font-bold text-emerald-800 flex items-center gap-1">
                <span>Run Diagnostic Test</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Input Diagnostic Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input Form & Upload */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-2xl border border-white/10 p-5 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-700" />
              1. Crop Imagery Input
            </h3>

            {/* Upload Zone */}
            <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl p-6 text-center bg-slate-50/60 transition relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
              />

              {uploadedImagePreview ? (
                <div className="space-y-2">
                  <div className="w-full h-40 bg-slate-900 rounded-lg flex items-center justify-center overflow-hidden border border-slate-200">
                    <div className="text-white text-xs font-mono p-4 text-center">
                      <Activity className="w-8 h-8 text-emerald-400 mx-auto mb-2 animate-pulse" />
                      <span>Simulated Multi-Spectral Symptom Scan</span>
                      <div className="text-[10px] text-emerald-300 mt-1">Resolution: High • Focal Target: Foliage</div>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-700 font-semibold flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Image Attached Successfully
                  </span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-800 block">
                      Click to upload or take a field photograph
                    </span>
                    <span className="text-[11px] text-slate-400">
                      PNG, JPG up to 10MB • Clear focus on leaf lesions or insects
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Field Context Selectors */}
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">
                2. Field & Environmental Context
              </h4>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Crop</label>
                  <select
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Wheat">Wheat (गेहूं)</option>
                    <option value="Rice">Rice (धान / चावल)</option>
                    <option value="Cotton">Cotton (कपास)</option>
                    <option value="Mustard">Mustard (सरसों)</option>
                    <option value="Potato">Potato (आलू)</option>
                    <option value="Tomato">Tomato (टमाटर)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">State</label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Punjab">Punjab</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Rajasthan">Rajasthan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 text-xs block mb-1">Crop Growth Stage</label>
                <select
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Germination">Germination & Seedling</option>
                  <option value="Tillering">Crown Root Initiation / Tillering</option>
                  <option value="Jointing">Jointing & Stem Extension</option>
                  <option value="Panicle Initiation">Panicle / Booting</option>
                  <option value="Flowering">Flowering & Anthesis</option>
                  <option value="Tuber Bulking">Tuber Bulking / Fruit Development</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 text-xs block mb-1">
                  Observed Symptoms Description (Optional)
                </label>
                <textarea
                  rows={2}
                  value={symptomNotes}
                  onChange={(e) => setSymptomNotes(e.target.value)}
                  placeholder="Describe lesion color, shape, location (upper/lower leaf), insect presence..."
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                onClick={() => runDiagnosis()}
                disabled={isAnalyzing}
                className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md hover:shadow transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Image & Regional Disease Models...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-300" />
                    <span>Run AI Diagnosis</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Diagnostic Output & Explainable AI */}
        <div className="lg:col-span-7 space-y-6">
          {diagnosisResult ? (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {/* Diagnosis Header Card */}
              <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-3xl border border-white/10 p-6 sm:p-7 shadow-[0_4px_16px_rgba(0,0,0,0.10)] space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                      Primary AI Diagnostic Finding
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                      {diagnosisResult.diagnosis}
                    </h2>
                    {diagnosisResult.scientificName && (
                      <p className="text-xs text-slate-500 italic mt-0.5">
                        Causal Organism: {diagnosisResult.scientificName} • {diagnosisResult.pathogenType}
                      </p>
                    )}
                  </div>

                  <div className="text-right sm:text-right shrink-0">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 font-extrabold text-sm border border-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      {diagnosisResult.confidencePercent}% Probability
                    </div>
                    <div className="text-[10px] text-emerald-700 font-semibold mt-1">High Model Confidence</div>
                  </div>
                </div>

                {/* AI Confidence Routing Strip */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      AI Confidence Protocol: High Confidence (&gt;75%)
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-200 text-emerald-900">
                      Advisory Route
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    Confidence threshold met for precision IPM advisory. If unusual progression is observed within 48 hours, escalate to an expert.
                  </p>
                </div>

                {/* Alternative Diagnoses Breakdown */}
                {diagnosisResult.alternativeDiagnoses && (
                  <div className="space-y-2">
                    <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                      Differential Diagnoses &amp; Alternative Probabilities:
                    </h4>
                    <div className="space-y-1.5">
                      {diagnosisResult.alternativeDiagnoses.map((alt) => (
                        <div
                          key={alt.name}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] border border-white/10 text-xs shadow-sm"
                        >
                          <div className="space-y-0.5">
                            <span className="font-semibold text-slate-800 block">{alt.name}</span>
                            <span className="text-[10px] text-slate-500">{alt.reason}</span>
                          </div>
                          <span className="font-mono font-bold text-slate-600 bg-white/80 px-2 py-1 rounded border border-slate-200 shrink-0">
                            {alt.probability}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Evidence Triangulation: 3 Columns */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                    Evidence Triangulation (Ground Truth)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {/* Symptoms */}
                    <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2">
                      <span className="font-bold text-slate-700 flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-emerald-600" />
                        Observed Symptoms
                      </span>
                      <ul className="space-y-1 text-slate-600 text-[11px]">
                        {diagnosisResult.observedSymptoms.map((sym, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                            <span>{sym}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Environmental Evidence */}
                    <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2">
                      <span className="font-bold text-slate-700 flex items-center gap-1.5">
                        <CloudSun className="w-3.5 h-3.5 text-sky-600" />
                        Environmental Context
                      </span>
                      <ul className="space-y-1 text-slate-600 text-[11px]">
                        {diagnosisResult.environmentalEvidence.map((ev, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                            <span>{ev}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Recommended Next Steps & IPM */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                    <Activity className="w-3.5 h-3.5 text-emerald-600" />
                    Integrated Pest &amp; Disease Management (IPM) Steps:
                  </h4>
                  <div className="space-y-2 text-xs text-slate-700">
                    {diagnosisResult.recommendedNextSteps.map((step, idx) => (
                      <div key={idx} className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-100 flex items-start gap-2.5">
                        <span className="font-bold text-emerald-800 shrink-0">{idx + 1}.</span>
                        <p className="leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mandatory Safety Notice */}
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                  <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <strong className="font-bold block">
                      AI Diagnostic Assessment — Mandatory Agronomic Disclaimer
                    </strong>
                    <p className="text-[11px] text-amber-900/90 leading-relaxed">
                      {diagnosisResult.disclaimer} Never purchase or spray toxic chemicals based purely on an automated diagnosis without physical verification by an extension officer.
                    </p>
                  </div>
                </div>

                {/* CTA to Expert Connect & Feedback */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
                  {/* Feedback */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-500">Was this diagnosis helpful?</span>
                    <button
                      onClick={() => setFeedbackRating('helpful')}
                      className={`p-1.5 rounded-lg border transition ${
                        feedbackRating === 'helpful'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-400'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                      title="Yes, helpful"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setFeedbackRating('not_helpful')}
                      className={`p-1.5 rounded-lg border transition ${
                        feedbackRating === 'not_helpful'
                          ? 'bg-rose-100 text-rose-800 border-rose-400'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                      title="No, not helpful"
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                    {feedbackRating && (
                      <span className="text-[10px] text-emerald-700 font-semibold">
                        Thank you for your feedback!
                      </span>
                    )}
                  </div>

                  {/* Expert Connect CTA */}
                  <Link
                    href="/expert-connect"
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Ask an Agricultural Officer</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[rgba(10,20,15,0.20)] backdrop-blur-[6px] rounded-3xl border border-white/10 p-8 sm:p-12 text-center space-y-4 shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-100">
                <Activity className="w-7 h-7" />
              </div>
              <div className="space-y-1 max-w-md mx-auto">
                <h3 className="font-bold text-base text-slate-800">
                  Ready to Diagnose Your Crop
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Select one of the 1-click sample cases above or upload a photo of your affected crop leaf to receive an instant diagnostic breakdown.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
