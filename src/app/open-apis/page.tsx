'use client';

import React, { useState } from 'react';
import {
  Code2,
  Play,
  Copy,
  Check,
  Terminal,
  ShieldCheck,
  Key,
  Database,
  ExternalLink,
  Layers,
  Sparkles,
  Radio,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SectionHero } from '@/components/ui/SectionHero';

interface EndpointMeta {
  path: string;
  method: 'GET' | 'POST';
  title: string;
  description: string;
  params: { name: string; type: string; required: boolean; defaultVal: string; desc: string }[];
  sampleResponse: any;
}

export default function OpenApisPage() {
  const { language } = useApp();
  const isHi = language === 'hi';
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('/api/v1/weather');
  const [copied, setCopied] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [responseStatus, setResponseStatus] = useState<number>(200);

  const endpoints: EndpointMeta[] = [
    {
      path: '/api/v1/weather',
      method: 'GET',
      title: 'Weather & Agro-Meteorological Impact API',
      description: 'Returns real-time and 7-day forecasted parameters with automated agricultural impact translations.',
      params: [
        { name: 'state', type: 'string', required: true, defaultVal: 'Punjab', desc: 'Target Indian state name' },
        { name: 'district', type: 'string', required: false, defaultVal: 'Ludhiana', desc: 'District administrative unit' },
      ],
      sampleResponse: {
        status: 'success',
        timestamp: '2026-09-18T06:30:00Z',
        station: 'IMD-Agromet-Ludhiana',
        current: {
          temp_c: 22.4,
          humidity_percent: 68,
          wind_speed_kmh: 14,
          rain_prob_percent: 78,
          spraying_index: 'Caution',
        },
        forecast_summary: 'Western disturbance showers (12.5mm) likely within 24h.',
        operational_advice: 'Delay surface tubewell irrigation for 36-48 hours.',
      },
    },
    {
      path: '/api/v1/soil',
      method: 'GET',
      title: 'Digital Soil Health Registry API',
      description: 'Fetches soil fertility metrics (N, P, K, pH, OC, EC) with explainable fertilizer amendment rationales.',
      params: [
        { name: 'farm_id', type: 'string', required: true, defaultVal: 'farm-pb-ldh-042', desc: 'Unique farm identifier' },
      ],
      sampleResponse: {
        farm_id: 'farm-pb-ldh-042',
        soil_type: 'Alluvial Loam',
        ph: 7.2,
        nitrogen_kg_ha: 195,
        phosphorus_kg_ha: 24,
        potassium_kg_ha: 280,
        organic_carbon_percent: 0.46,
        recommendation: 'Top-dress 45 kg/acre Urea post-rain for crown root expansion.',
      },
    },
    {
      path: '/api/v1/satellite',
      method: 'GET',
      title: 'Satellite Multi-Spectral Observation API',
      description: 'Provides Sentinel-2 and Resourcesat-2A NDVI, NDWI, cloud cover, and spatial anomaly coordinates.',
      params: [
        { name: 'farm_id', type: 'string', required: true, defaultVal: 'farm-pb-ldh-042', desc: 'Farm identifier' },
      ],
      sampleResponse: {
        satellite: 'Sentinel-2 Level-2A',
        acquisition_date: '2026-09-16',
        cloud_cover_percent: 2.1,
        mean_ndvi: 0.68,
        mean_ndwi: 0.22,
        anomalies_detected: 1,
        anomaly_zone: 'North-Eastern parcel (NDVI 0.51 vs 0.68 avg)',
      },
    },
    {
      path: '/api/v1/disease-risk',
      method: 'GET',
      title: 'Epidemiological Disease Risk API',
      description: 'Evaluates pathogen incubation probability based on thermal-moisture windows and surveillance traps.',
      params: [
        { name: 'crop', type: 'string', required: true, defaultVal: 'Wheat', desc: 'Target crop' },
        { name: 'state', type: 'string', required: true, defaultVal: 'Punjab', desc: 'State node' },
      ],
      sampleResponse: {
        crop: 'Wheat',
        state: 'Punjab',
        active_threats: [
          {
            pathogen: 'Puccinia striiformis (Yellow Rust)',
            risk_level: 'moderate',
            evidence: 'Persistent morning fog with cool temperatures in Shivalik foothill districts.',
            ipm_action: 'Scout field perimeters and apply Propiconazole 25% EC if stripes emerge.',
          },
        ],
      },
    },
    {
      path: '/api/v1/advisory',
      method: 'GET',
      title: 'Explainable Farmer Advisory API',
      description: 'Generates prioritized "What should I do today?" actionable recommendations with confidence scores.',
      params: [
        { name: 'farm_id', type: 'string', required: true, defaultVal: 'farm-pb-ldh-042', desc: 'Farm identifier' },
      ],
      sampleResponse: {
        farm_id: 'farm-pb-ldh-042',
        advisories_count: 4,
        advisories: [
          {
            title: 'Delay Tubewell Irrigation for 36–48 Hours',
            urgency: 'Immediate',
            recommendation: 'Postpone irrigation due to 78% rainfall probability.',
            confidence: 'High (92%)',
            evidence: 'IMD radar precipitation spike + soil moisture at 32.5%.',
          },
        ],
      },
    },
    {
      path: '/api/v1/states',
      method: 'GET',
      title: 'Federated State Nodes Directory API',
      description: 'Lists all connected state nodes, agro-climatic zones, and public data endpoints.',
      params: [],
      sampleResponse: {
        total_nodes: 8,
        active_nodes: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Maharashtra', 'Karnataka', 'Bihar', 'Gujarat', 'Madhya Pradesh'],
        protocol_version: 'BKIN-Interoperable-1.0',
      },
    },
  ];

  const currentEp = endpoints.find((e) => e.path === selectedEndpoint) || endpoints[0];

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setApiResponse(currentEp.sampleResponse);
      setResponseStatus(200);
      setIsExecuting(false);
    }, 600);
  };

  const curlCommand = `curl -X ${currentEp.method} "https://api.bkin.gov.in${currentEp.path}" \\
  -H "Authorization: Bearer bkin_live_open_key_demo" \\
  -H "Accept: application/json"`;

  const copyCurl = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-0">
      <SectionHero
        imageSrc="/assets/satellite/satellite-telemetry.svg"
        theme="satellite"
        label={isHi ? 'ओपन डिजिटल सार्वजनिक अवसंरचना' : 'OPEN DIGITAL PUBLIC INFRASTRUCTURE'}
        heading={
          <span className="text-gradient-satellite">
            {isHi ? 'खुले कृषि एपीआई एवं डेवलपर पोर्टल' : 'Open Agriculture APIs & Developer Portal'}
          </span>
        }
        description={
          isHi
            ? 'राज्य सरकारों, एग्रीटेक स्टार्टअप्स, एफपीओ और विश्वविद्यालयों के लिए मानकीकृत कृषि एपीआई जो उपग्रह टेलीमेट्री, मृदा सूचकांक और व्याख्यात्मक परामर्श प्रदान करते हैं।'
            : 'Standardized agricultural APIs allowing state governments, AgriTech startups, FPO software, and research universities to query satellite telemetry, soil indices, and explainable advisories.'
        }
        showDemoBadge={true}
        stats={[
          { value: '8', label: isHi ? 'सक्रिय एपीआई' : 'Endpoints' },
          { value: 'OpenAPI 3.0', label: isHi ? 'मानक' : 'Specification' },
          { value: '100 req/m', label: isHi ? 'दर सीमा' : 'Public Limit' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">


      {/* Auth & Rate Limit Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="font-bold text-slate-800 flex items-center gap-1.5">
            <Key className="w-4 h-4 text-emerald-600" />
            Authentication Standard
          </span>
          <p className="text-slate-500 text-[11px]">
            Bearer token authentication via HTTP Header <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700 font-mono">Authorization: Bearer &lt;API_KEY&gt;</code>.
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="font-bold text-slate-800 flex items-center gap-1.5">
            <Radio className="w-4 h-4 text-blue-600" />
            Open Public Tier Rate Limits
          </span>
          <p className="text-slate-500 text-[11px]">
            100 requests / minute per IP for open research and startup prototyping. Burst up to 250 req/min.
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="font-bold text-slate-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Federated Data Sovereignty
          </span>
          <p className="text-slate-500 text-[11px]">
            Granular PII data is stripped; telemetry is served with anonymized geographic coordinates.
          </p>
        </div>
      </div>

      {/* Main Interactive API Explorer & Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Endpoint Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block px-1">
            Available Endpoints
          </span>

          <div className="space-y-1.5">
            {endpoints.map((ep) => (
              <button
                key={ep.path}
                onClick={() => {
                  setSelectedEndpoint(ep.path);
                  setApiResponse(null);
                }}
                className={`w-full text-left p-3 rounded-xl border transition text-xs flex items-center justify-between ${
                  selectedEndpoint === ep.path
                    ? 'bg-emerald-50 border-emerald-500 shadow-sm text-emerald-950'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-800 text-white font-mono font-bold text-[9px]">
                      {ep.method}
                    </span>
                    <span className="font-mono text-[11px] font-semibold">{ep.path}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">{ep.title}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Interactive Testing Console */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-4 space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-800 text-white font-mono font-bold text-xs">
                {currentEp.method}
              </span>
              <h3 className="font-bold text-base text-slate-900 font-mono">
                {currentEp.path}
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              {currentEp.description}
            </p>
          </div>

          {/* Parameters Table */}
          {currentEp.params.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Query Parameters:
              </span>
              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-[10px] text-slate-500 uppercase font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">Parameter</th>
                      <th className="p-2.5">Type</th>
                      <th className="p-2.5">Requirement</th>
                      <th className="p-2.5">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {currentEp.params.map((p) => (
                      <tr key={p.name}>
                        <td className="p-2.5 font-mono font-semibold text-slate-900">{p.name}</td>
                        <td className="p-2.5 font-mono text-slate-500 text-[11px]">{p.type}</td>
                        <td className="p-2.5">
                          {p.required ? (
                            <span className="text-rose-600 font-bold text-[10px]">Required</span>
                          ) : (
                            <span className="text-slate-400 text-[10px]">Optional</span>
                          )}
                        </td>
                        <td className="p-2.5 text-slate-600 text-[11px]">{p.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* cURL Snippet Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                Example cURL Request
              </span>
              <button
                onClick={copyCurl}
                className="text-slate-500 hover:text-slate-900 flex items-center gap-1 text-[11px] font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy cURL'}</span>
              </button>
            </div>
            <pre className="bg-slate-950 text-emerald-400 p-3.5 rounded-xl font-mono text-[11px] overflow-x-auto">
              {curlCommand}
            </pre>
          </div>

          {/* Try It Out Button */}
          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={handleExecute}
              disabled={isExecuting}
              className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow transition flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isExecuting ? 'Querying API Endpoint...' : 'Send Live Request'}</span>
            </button>

            {responseStatus && (
              <span className="text-xs text-slate-500 font-mono">
                Status: <strong className="text-emerald-700">200 OK</strong> • Format: <strong className="text-slate-700">application/json</strong>
              </span>
            )}
          </div>

          {/* Live Response Viewer */}
          <div className="space-y-1.5 pt-2">
            <span className="text-xs font-bold text-slate-700 block">Response Output (JSON):</span>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800 max-h-72">
              {JSON.stringify(apiResponse || currentEp.sampleResponse, null, 2)}
            </pre>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

