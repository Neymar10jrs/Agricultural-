'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode, translations, TranslationSet, supportedLanguages } from '@/i18n';
import { getLocale, LocaleTranslations } from '@/locales';
import { initialDemoFarm } from '@/data/demoFarm';
import { DemoFarmState, UserMode } from '@/types';

interface AppContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: TranslationSet;
  dict: LocaleTranslations;
  isAskKrishiOpen: boolean;
  setIsAskKrishiOpen: (open: boolean) => void;
  initialVoicePrompt: string;
  openAskKrishi: (prompt?: string) => void;
  closeAskKrishi: () => void;
  farm: DemoFarmState;
  updateFarm: (updated: Partial<DemoFarmState>) => void;
  isHighContrast: boolean;
  toggleHighContrast: () => void;
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [isAskKrishiOpen, setIsAskKrishiOpen] = useState(false);
  const [initialVoicePrompt, setInitialVoicePrompt] = useState('');
  const [farm, setFarm] = useState<DemoFarmState>(initialDemoFarm);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [userMode, setUserModeState] = useState<UserMode>('farmer');

  // Load persisted preferences
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('bkin_lang') as LanguageCode;
      if (savedLang && translations[savedLang]) {
        setLanguageState(savedLang);
      }
      const savedContrast = localStorage.getItem('bkin_high_contrast');
      if (savedContrast === 'true') {
        setIsHighContrast(true);
      }
      const savedMode = localStorage.getItem('bkin_user_mode') as UserMode;
      if (savedMode && ['farmer', 'expert', 'institution'].includes(savedMode)) {
        setUserModeState(savedMode);
      }
    } catch {
      // Storage unavailable or disabled
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('bkin_lang', lang);
    } catch {}
  };

  const setUserMode = (mode: UserMode) => {
    setUserModeState(mode);
    try {
      localStorage.setItem('bkin_user_mode', mode);
    } catch {}
  };

  const toggleHighContrast = () => {
    setIsHighContrast((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('bkin_high_contrast', String(next));
      } catch {}
      return next;
    });
  };

  const openAskKrishi = (prompt?: string) => {
    setInitialVoicePrompt(prompt || '');
    setIsAskKrishiOpen(true);
  };

  const closeAskKrishi = () => {
    setIsAskKrishiOpen(false);
    setInitialVoicePrompt('');
  };

  const updateFarm = (updated: Partial<DemoFarmState>) => {
    setFarm((prev) => ({ ...prev, ...updated }));
  };

  const t = translations[language] || translations.en;
  const dict = getLocale(language);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        dict,
        isAskKrishiOpen,
        setIsAskKrishiOpen,
        initialVoicePrompt,
        openAskKrishi,
        closeAskKrishi,
        farm,
        updateFarm,
        isHighContrast,
        toggleHighContrast,
        userMode,
        setUserMode,
      }}
    >
      <div className={isHighContrast ? 'bkin-high-contrast' : ''}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
