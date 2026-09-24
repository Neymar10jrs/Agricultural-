'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  X,
  Send,
  Volume2,
  VolumeX,
  Sparkles,
  Bot,
  User,
  ShieldAlert,
  ArrowRight,
  Globe,
  Radio,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { supportedLanguages } from '@/i18n';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  recommendation?: string;
  why?: string;
  confidence?: 'High' | 'Medium' | 'Low';
  dataSources?: string[];
  timestamp: string;
}

export function AskKrishiModal() {
  const { isAskKrishiOpen, closeAskKrishi, language, setLanguage, t, initialVoicePrompt } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Namaste! I am Krishi AI, your local agricultural intelligence assistant. Ask me about crop health, irrigation timing, weather forecasts, pest remedies, or soil nutrients in ${supportedLanguages.find(l => l.code === language)?.nativeName || 'your language'}.`,
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // If opened with an initial prompt, process it immediately
  useEffect(() => {
    if (initialVoicePrompt && isAskKrishiOpen) {
      handleUserQuery(initialVoicePrompt);
    }
  }, [initialVoicePrompt, isAskKrishiOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  if (!isAskKrishiOpen) return null;

  const handleSpeechRecognition = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        const activeLang = supportedLanguages.find((l) => l.code === language);
        recognition.lang = activeLang?.ttsVoiceLang || 'en-IN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (event: any) => {
          const speechResult = event.results[0][0].transcript;
          setIsListening(false);
          if (speechResult) {
            handleUserQuery(speechResult);
          }
        };
        recognition.onerror = () => {
          setIsListening(false);
          // Fallback simulation if micro permission denied
          simulateVoiceInput();
        };
        recognition.onend = () => setIsListening(false);
        recognition.start();
      } catch {
        simulateVoiceInput();
      }
    } else {
      simulateVoiceInput();
    }
  };

  const simulateVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      const sampleQuestion = t.suggestedQuestions[0] || 'Should I irrigate my wheat crop today?';
      handleUserQuery(sampleQuestion);
    }, 2000);
  };

  const handleUserQuery = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsProcessing(true);

    // AI agronomic inference simulation
    setTimeout(() => {
      let aiReply: Message;
      const lower = queryText.toLowerCase();

      if (lower.includes('water') || lower.includes('irrigat') || lower.includes('सिंचाई') || lower.includes('ਪਾਣੀ') || lower.includes('সেচ')) {
        aiReply = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: 'Based on satellite soil moisture and upcoming weather radars, delay irrigation for 36–48 hours.',
          recommendation: 'Delay scheduled tubewell watering across all wheat plots.',
          why: 'Western disturbance is bringing 12.5mm rain with 78% probability in Ludhiana within 24 hours. Soil moisture is already optimal at 32.5%.',
          confidence: 'High',
          dataSources: ['IMD Radar Forecast', 'Sentinel-2 Soil Moisture Index', 'Wheat Crop Stage (Day 38)'],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      } else if (lower.includes('rust') || lower.includes('रतुआ') || lower.includes('ਕੁੰਗੀ') || lower.includes('disease') || lower.includes('yellow')) {
        aiReply = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: 'Stripe Rust (Yellow Rust) requires immediate field scouting in cool, foggy weather.',
          recommendation: 'Scout northern field perimeter and check for yellow powder lines on leaves.',
          why: 'Isolated rust foci reported in Shivalik belt. If verified, spray Propiconazole 25% EC @ 200 ml/acre in 200L water.',
          confidence: 'High',
          dataSources: ['State Disease Surveillance Network', 'Thermal-Humidity Inoculum Model', 'Farmer Scout Reports'],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      } else if (lower.includes('north') || lower.includes('stress') || lower.includes('कमजोर') || lower.includes('weak')) {
        aiReply = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: 'Satellite NDVI indicates localized vegetation stress in your north-eastern 0.35-acre parcel.',
          recommendation: 'Conduct a physical field walk to check for micro-drainage compaction or moisture deficit.',
          why: 'NDVI is 0.51 vs field baseline 0.68. The soil compaction during laser leveling may have caused uneven germination.',
          confidence: 'Medium',
          dataSources: ['Sentinel-2 10m NDVI Multi-spectral', 'Historical Elevation DTM', 'Soil Health Card'],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      } else {
        aiReply = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: `Here is the localized agricultural recommendation for your farm in Ludhiana, Punjab: Your wheat is at 38 Days After Sowing (Crown Root Initiation stage). Overall health index is 78/100. Soil Nitrogen is deficient (195 kg/ha) while Potassium is adequate.`,
          recommendation: 'Prepare split Urea (45 kg/acre) top-dressing once surface dries post-rain.',
          why: 'Supplying nitrogen during early tillering maximizes productive spikelets per earhead.',
          confidence: 'High',
          dataSources: ['PAU Crop Calendar', 'Soil Health Registry', 'Weather Satellite Telemetry'],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      }

      setMessages((prev) => [...prev, aiReply]);
      setIsProcessing(false);

      // Speak response if speech synthesis is supported
      if ('speechSynthesis' in window) {
        speakText(aiReply.text + (aiReply.recommendation ? ' ' + aiReply.recommendation : ''));
      }
    }, 1200);
  };

  const speakText = (textToSpeak: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    const activeLang = supportedLanguages.find((l) => l.code === language);
    utterance.lang = activeLang?.ttsVoiceLang || 'en-IN';
    utterance.rate = 0.95;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl h-[90vh] max-h-[700px] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white px-5 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-white border border-white/20">
              <Bot className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm tracking-tight">Ask Krishi AI</h3>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-200 border border-emerald-300/30">
                  Multilingual Voice
                </span>
              </div>
              <p className="text-[11px] text-emerald-200">
                12 Indian Languages • Satellite + Weather + Soil Grounded
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isSpeaking ? (
              <button
                onClick={stopSpeaking}
                className="p-1.5 rounded-lg bg-emerald-700/80 hover:bg-emerald-700 text-emerald-100 transition text-xs flex items-center gap-1"
                title="Stop Audio"
              >
                <VolumeX className="w-4 h-4 text-amber-300" />
                <span className="hidden sm:inline">Mute</span>
              </button>
            ) : (
              <div className="text-[11px] text-emerald-300 flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Voice Ready</span>
              </div>
            )}
            <button
              onClick={closeAskKrishi}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Language Quick Switcher Ribbon */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center gap-2 overflow-x-auto text-xs shrink-0">
          <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="text-[11px] text-slate-500 font-medium shrink-0">Language:</span>
          {supportedLanguages.map((l) => (
            <button
              key={l.code}
              onClick={() => setLanguage(l.code)}
              className={`px-2.5 py-1 rounded-md text-[11px] whitespace-nowrap transition ${
                language === l.code
                  ? 'bg-emerald-700 text-white font-semibold shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {l.nativeName}
            </button>
          ))}
        </div>

        {/* Chat History Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 text-xs shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none space-y-2'
                }`}
              >
                <p>{msg.text}</p>

                {msg.recommendation && (
                  <div className="mt-2.5 pt-2.5 border-t border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-800 text-[11px] uppercase tracking-wide">
                        Actionable Advisory:
                      </span>
                      {msg.confidence && (
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                          Confidence: {msg.confidence}
                        </span>
                      )}
                    </div>
                    <p className="font-semibold text-slate-900 bg-emerald-50/80 p-2 rounded-lg border border-emerald-200/60">
                      🌱 {msg.recommendation}
                    </p>
                    {msg.why && (
                      <p className="text-slate-600 text-[11px]">
                        <span className="font-semibold text-slate-700">Why: </span>
                        {msg.why}
                      </p>
                    )}
                    {msg.dataSources && (
                      <div className="pt-1 flex flex-wrap gap-1">
                        {msg.dataSources.map((ds) => (
                          <span
                            key={ds}
                            className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] border border-slate-200"
                          >
                            {ds}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div
                  className={`text-[10px] pt-1 text-right ${
                    msg.sender === 'user' ? 'text-emerald-100' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 text-xs font-semibold">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isProcessing && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 text-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-slate-500 shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                <span>Analyzing satellite, soil, weather & crop intelligence…</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Question Chips */}
        <div className="px-4 py-2 bg-slate-100/70 border-t border-slate-200 flex items-center gap-2 overflow-x-auto text-[11px] shrink-0">
          <span className="text-slate-500 font-medium shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            Try asking:
          </span>
          {t.suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleUserQuery(q)}
              className="px-2.5 py-1 rounded-full bg-white text-slate-700 hover:text-emerald-800 hover:border-emerald-300 border border-slate-200 transition shrink-0 shadow-2xs"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Voice Input & Query Composer */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0">
          {isListening && (
            <div className="mb-2 p-2 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800 animate-pulse">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-600 animate-ping" />
                <span>{t.voiceListening}</span>
              </div>
              <button
                onClick={() => setIsListening(false)}
                className="text-xs text-emerald-700 underline font-semibold"
              >
                Cancel
              </button>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUserQuery(inputText);
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={handleSpeechRecognition}
              className={`p-2.5 rounded-xl border transition flex items-center justify-center shrink-0 ${
                isListening
                  ? 'bg-red-500 text-white border-red-600 shadow-md animate-bounce'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
              }`}
              title={isListening ? 'Stop listening' : 'Speak your question in your language'}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.speakToAsk}
              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <p className="text-[10px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1">
            <ShieldAlert className="w-3 h-3 text-amber-500" />
            AI-generated advisory. Always verify with local agricultural university guidelines before treatment.
          </p>
        </div>
      </div>
    </div>
  );
}
