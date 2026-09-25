'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sprout,
  Mic,
  Globe,
  ChevronDown,
  Menu,
  X,
  Shield,
  Activity,
  CloudSun,
  Eye,
  Layers,
  Sparkles,
  BookOpen,
  AlertTriangle,
  Code,
  Building2,
  SlidersHorizontal,
  ShieldAlert,
  BarChart3,
  Bell,
  Users,
  TrendingUp,
  Cpu,
  User,
  LogOut,
  Check,
  Copy,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { supportedLanguages } from '@/i18n';


export function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, t, dict, openAskKrishi, isHighContrast, toggleHighContrast, userMode, setUserMode } = useApp();
  const { user, profile, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [modeDropdownOpen, setModeDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [copiedNavId, setCopiedNavId] = useState(false);

  const handleCopyNavFarmerId = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (profile?.farmerId) {
      navigator.clipboard.writeText(profile.farmerId);
      setCopiedNavId(true);
      setTimeout(() => setCopiedNavId(false), 2000);
    }
  };


  const mainNavLinks = [
    { href: '/my-farm', label: dict.nav.myFarm, icon: Sprout },
    { href: '/farm-digital-twin', label: dict.nav.farmTwin, icon: Layers },
    { href: '/risk-center', label: dict.nav.riskCenter, icon: ShieldAlert },
    { href: '/crop-doctor', label: dict.nav.cropDoctor, icon: Activity },
    { href: '/todays-advisory', label: dict.nav.todaysAdvisory, icon: Sparkles },
  ];

  const moreNavLinks = [
    {
      section: dict.nav.sections.intelligence,
      links: [
        { href: '/alert-center', label: `🔔 ${dict.nav.alertCenter}`, desc: language === 'hi' ? 'गंभीर, उच्च व मध्यम अलर्ट' : 'Critical, high, moderate & info alerts' },
        { href: '/expert-connect', label: `👨‍🌾 ${dict.nav.expertConnect}`, desc: language === 'hi' ? 'प्रमाणित कृषि वैज्ञानिकों से पूछें' : 'Ask certified agricultural officers' },
        { href: '/impact', label: `📊 ${dict.nav.impact}`, desc: language === 'hi' ? 'पायलट कार्यक्रम परिणाम' : 'Demo pilot program outcomes' },
        { href: '/scenario-simulator', label: `🔮 ${dict.nav.scenarioSimulator}`, desc: language === 'hi' ? 'फसल व इनपुट सिमुलेशन' : 'What-if crop & input simulations' },
      ],
    },
    {
      section: dict.nav.sections.fieldData,
      links: [
        { href: '/weather', label: dict.nav.weather, desc: language === 'hi' ? 'लाइव कृषि-मौसम पूर्वानुमान' : 'Live agro-met forecast' },
        { href: '/soil-health', label: dict.nav.soilHealth, desc: language === 'hi' ? 'एनपीके, कार्बन, पीएच व नमी' : 'NPK, OC, pH and moisture' },
        { href: '/satellite-monitor', label: dict.nav.satelliteMonitor, desc: language === 'hi' ? 'एनडीवीआई व वनस्पति विश्लेषण' : 'NDVI and vegetation analytics' },
        { href: '/early-warnings', label: dict.nav.earlyWarnings, desc: language === 'hi' ? 'बहु-आपदा निगरानी फीड' : 'Multi-hazard surveillance feed' },
      ],
    },
    {
      section: dict.nav.sections.knowledge,
      links: [
        { href: '/climate-smart', label: dict.nav.climateSmart, desc: language === 'hi' ? 'तुलनात्मक कृषि परिदृश्य' : 'Comparative farming scenarios' },
        { href: '/regenerative-ag', label: dict.nav.regenerativeAg, desc: language === 'hi' ? 'मृदा कार्बन व संरक्षण' : 'Soil carbon & conservation' },
        { href: '/disease-library', label: dict.nav.diseaseLibrary, desc: language === 'hi' ? 'रोग व कीट खोज डेटाबेस' : 'Searchable pest & disease database' },
        { href: '/india-network', label: dict.nav.indiaNetwork, desc: language === 'hi' ? 'राज्य नोड्स व कृषि-जलवायु क्षेत्र' : 'Federated states & agro-zones' },
      ],
    },
    {
      section: dict.nav.sections.platform,
      links: [
        { href: '/state-dashboard', label: dict.nav.stateDashboard, desc: language === 'hi' ? 'क्षेत्रीय कृषि एनालिटिक्स' : 'Regional agricultural analytics' },
        { href: '/officer-dashboard', label: dict.nav.officerDashboard, desc: language === 'hi' ? 'अलर्ट, हॉटस्पॉट व स्काउट रिपोर्ट' : 'Alerts, hotspots & scout reports' },
        { href: '/open-apis', label: dict.nav.openApis, desc: language === 'hi' ? 'डिजिटल पब्लिक गुड एंडपॉइंट्स' : 'Digital public good endpoints' },
        { href: '/ai-engine', label: dict.nav.aiEngine, desc: language === 'hi' ? 'मल्टी-मॉडल इंटेलिजेंस पाइपलाइन' : 'Multi-modal intelligence pipeline' },
        { href: '/privacy-trust', label: dict.nav.privacyTrust, desc: language === 'hi' ? 'सहमति व संप्रभुता चार्टर' : 'Consent & sovereignty charter' },
        { href: '/about', label: dict.nav.about, desc: language === 'hi' ? 'मिशन, दृष्टिकोण व इकोसिस्टम' : 'Vision, ecosystem & public mission' },
      ],
    },
  ];

  // Flatten for mobile menu
  const allMoreLinks = moreNavLinks.flatMap((s) => s.links);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      {/* Skip to Main Content Link for Keyboard and Screen-Reader Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-800 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white text-xs font-bold"
      >
        {language === 'hi' ? 'मुख्य सामग्री पर जाएं (Skip to main content)' : 'Skip to main content'}
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-900 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-slate-900 leading-tight tracking-tight flex items-center gap-1">
                  BKIN
                  <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300/60">
                    {language === 'hi' ? 'भारत' : 'India'}
                  </span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wide hidden sm:block">
                  {dict.nav.networkTitle}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {mainNavLinks.slice(0, 5).map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {/* More Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                onBlur={() => setTimeout(() => setMoreDropdownOpen(false), 200)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              >
                <span>{dict.nav.more}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {moreDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 max-h-[80vh] overflow-y-auto">
                  {moreNavLinks.map((section) => (
                    <div key={section.section}>
                      <div className="px-3 pt-2 pb-1 text-[9px] uppercase font-bold text-slate-400 tracking-wider border-b border-slate-100 mb-1">
                        {section.section}
                      </div>
                      {section.links.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMoreDropdownOpen(false)}
                          className={`block px-3 py-1.5 hover:bg-emerald-50/70 transition rounded-md mx-1 ${
                            pathname === item.href ? 'bg-emerald-50' : ''
                          }`}
                        >
                          <div
                            className={`text-xs font-semibold ${
                              pathname === item.href ? 'text-emerald-800' : 'text-slate-800'
                            }`}
                          >
                            {item.label}
                          </div>
                          <div className="text-[10px] text-slate-500">{item.desc}</div>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Controls: Voice AI + Bilingual Toggle + Accessibility */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Ask Krishi AI Voice Trigger */}
            <button
              onClick={() => openAskKrishi()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-semibold shadow-sm hover:shadow hover:from-emerald-500 hover:to-teal-600 transition transform active:scale-95"
              aria-label="Open Ask Krishi AI Voice Assistant"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <Mic className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{dict.nav.askKrishi}</span>
              <span className="sm:hidden">एआई</span>
            </button>

            {/* User Mode Switcher: Farmer | Expert | Institution (Phases 14 & 15) */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setModeDropdownOpen(!modeDropdownOpen)}
                onBlur={() => setTimeout(() => setModeDropdownOpen(false), 200)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 hover:border-emerald-500 shadow-xs transition"
                title="Select User Mode"
              >
                <span>
                  {userMode === 'farmer' ? '👨‍🌾 Farmer' : userMode === 'expert' ? '🔬 Expert' : '🏛️ Officer'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {modeDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs">
                  <div className="px-3 py-1 text-[9px] uppercase font-bold text-slate-400 border-b border-slate-100 mb-1">
                    Select Mode (प्रारूप)
                  </div>
                  <button
                    onClick={() => setUserMode('farmer')}
                    className={`w-full px-3 py-1.5 text-left font-semibold flex items-center justify-between hover:bg-emerald-50 ${
                      userMode === 'farmer' ? 'text-emerald-800 bg-emerald-50/70 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <span>👨‍🌾 {language === 'hi' ? 'किसान मोड' : 'Farmer Mode'}</span>
                    {userMode === 'farmer' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />}
                  </button>
                  <button
                    onClick={() => setUserMode('expert')}
                    className={`w-full px-3 py-1.5 text-left font-semibold flex items-center justify-between hover:bg-emerald-50 ${
                      userMode === 'expert' ? 'text-emerald-800 bg-emerald-50/70 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <span>🔬 {language === 'hi' ? 'वैज्ञानिक / विशेषज्ञ' : 'Expert Agronomist'}</span>
                    {userMode === 'expert' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />}
                  </button>
                  <button
                    onClick={() => setUserMode('institution')}
                    className={`w-full px-3 py-1.5 text-left font-semibold flex items-center justify-between hover:bg-emerald-50 ${
                      userMode === 'institution' ? 'text-emerald-800 bg-emerald-50/70 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <span>🏛️ {language === 'hi' ? 'अधिकारी / संस्थान' : 'State Officer'}</span>
                    {userMode === 'institution' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />}
                  </button>
                </div>
              )}
            </div>

            {/* Language Selector: English | हिंदी Toggle (Phase 1 Requirement) */}
            <div className="flex items-center rounded-xl border border-slate-300 bg-slate-100 p-0.5 shadow-inner">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  language === 'en'
                    ? 'bg-white text-emerald-800 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to English"
              >
                English
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  language === 'hi'
                    ? 'bg-emerald-700 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="हिंदी में बदलें"
              >
                हिंदी
              </button>
            </div>

            {/* Desktop Accessibility High-Contrast Toggle */}
            <button
              onClick={toggleHighContrast}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-semibold transition ${
                isHighContrast
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
              title={isHighContrast ? `${dict.nav.highContrast}: ${dict.nav.enabled}` : `${dict.nav.highContrast}: ${dict.nav.disabled}`}
              aria-pressed={isHighContrast}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold">
                {isHighContrast ? 'A+' : 'A'}
              </span>
            </button>

            {/* Farmer Authentication State / Profile Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  onBlur={() => setTimeout(() => setUserDropdownOpen(false), 250)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300/80 text-emerald-950 transition shadow-xs"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                    {profile?.fullName ? profile.fullName.charAt(0).toUpperCase() : 'F'}
                  </div>
                  <div className="flex flex-col text-left hidden sm:flex">
                    <span className="text-xs font-bold leading-tight truncate max-w-[100px]">
                      {profile?.fullName || `Farmer ${user.phone.slice(-4)}`}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-mono font-medium">
                      {profile?.farmerId ? profile.farmerId.slice(-8) : 'Farmer'}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-emerald-700 ml-0.5" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    {/* User Card */}
                    <div className="px-4 py-2 border-b border-slate-100">
                      <div className="font-bold text-xs text-slate-900 truncate">
                        {profile?.fullName || 'Farmer Partner'}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">+91 {user.phone}</div>

                      <div className="mt-2 p-1.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between font-mono text-[11px] text-emerald-800 font-bold">
                        <span>{profile?.farmerId || 'FARM-IND-PENDING'}</span>
                        <button
                          type="button"
                          onClick={handleCopyNavFarmerId}
                          className="text-slate-400 hover:text-emerald-700 p-0.5"
                          title="Copy Farmer ID"
                        >
                          {copiedNavId ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Links */}
                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 transition"
                      >
                        <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Farmer Dashboard</span>
                      </Link>
                      <Link
                        href="/my-farm"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 transition"
                      >
                        <Layers className="w-3.5 h-3.5 text-emerald-600" />
                        <span>My Farm & Parcels</span>
                      </Link>
                      <Link
                        href="/history"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 transition"
                      >
                        <Activity className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Agricultural History</span>
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 transition"
                      >
                        <User className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Farmer Profile</span>
                      </Link>
                      <Link
                        href="/settings"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 transition"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Account Settings</span>
                      </Link>
                    </div>

                    {/* Sign Out */}
                    <div className="pt-1 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          signOut();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-500" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition transform active:scale-95"
              >
                <User className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'लॉग इन' : 'Sign In'}</span>
              </Link>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 max-h-[85vh] overflow-y-auto">
          {/* Mobile Auth Header */}
          {user ? (
            <div className="p-3 mb-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-slate-900">
                    {profile?.fullName || `Farmer ${user.phone.slice(-4)}`}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">+91 {user.phone}</div>
                </div>
                <div className="text-[11px] font-mono font-bold text-emerald-800 bg-white px-2 py-1 rounded border border-emerald-200">
                  {profile?.farmerId ? profile.farmerId.slice(-8) : 'Farmer'}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-emerald-200/60 text-xs">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-white border border-emerald-200 text-emerald-900 font-semibold text-center hover:bg-emerald-50"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-white border border-emerald-200 text-emerald-900 font-semibold text-center hover:bg-emerald-50"
                >
                  Profile
                </Link>
                <Link
                  href="/history"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-white border border-emerald-200 text-emerald-900 font-semibold text-center hover:bg-emerald-50"
                >
                  History
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-white border border-emerald-200 text-emerald-900 font-semibold text-center hover:bg-emerald-50"
                >
                  Settings
                </Link>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  signOut();
                }}
                className="w-full mt-2 py-1.5 text-xs text-rose-600 font-semibold flex items-center justify-center gap-1 hover:bg-rose-50 rounded-lg"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="mb-3">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <User className="w-4 h-4" />
                <span>{language === 'hi' ? 'मोबाइल नंबर से लॉग इन करें' : 'Sign In with Mobile'}</span>
              </Link>
            </div>
          )}

          {/* Mobile Language Switcher */}
          <div className="py-2 mb-2 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">भाषा / Language:</span>
            <div className="flex items-center rounded-lg border border-slate-300 bg-slate-100 p-0.5">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                  language === 'en' ? 'bg-white text-emerald-800 font-bold shadow-xs' : 'text-slate-600'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                  language === 'hi' ? 'bg-emerald-700 text-white font-bold shadow-xs' : 'text-slate-600'
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>

          <div className="space-y-1">

            <div className="px-2 py-1 text-[10px] font-bold uppercase text-slate-400">
              {dict.nav.sections.intelligence}
            </div>
            {mainNavLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    pathname === link.href ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-emerald-600" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <div className="pt-3 px-2 py-1 text-[10px] font-bold uppercase text-slate-400">
              {dict.nav.sections.knowledge} & {dict.nav.sections.fieldData}
            </div>
            {allMoreLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-xs font-medium text-slate-600 hover:text-emerald-700 hover:bg-slate-50 rounded-lg"
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">{dict.nav.highContrast}</span>
              <button
                onClick={toggleHighContrast}
                className={`px-2.5 py-1 text-xs rounded border font-medium ${
                  isHighContrast
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                {isHighContrast ? dict.nav.enabled : dict.nav.disabled}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
