'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { GuideConfig, GuideStep, TargetRect } from './types';
import { GLOBAL_GUIDE, PAGE_GUIDES } from './guideConfig';

interface GuideContextType {
  isActive: boolean;
  activeGuide: GuideConfig | null;
  currentStepIndex: number;
  currentStep: GuideStep | null;
  totalSteps: number;
  targetRect: TargetRect | null;
  targetElement: HTMLElement | null;
  isModalOpen: boolean;
  dontShowAgain: boolean;
  availablePageGuide: GuideConfig | null;
  startGuide: (guideOrId: GuideConfig | 'global' | string) => void;
  startGlobalTour: () => void;
  startPageTour: (route?: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
  skipGuide: () => void;
  finishGuide: () => void;
  openGuideModal: () => void;
  closeGuideModal: () => void;
  toggleGuideModal: () => void;
  setDontShowAgain: (value: boolean) => void;
  resetGuidePreferences: () => void;
}

const GuideContext = createContext<GuideContextType | undefined>(undefined);

const STORAGE_KEY_COMPLETED = 'bkin_guide_completed_ids';
const STORAGE_KEY_DONT_SHOW = 'bkin_guide_dont_show_again';
const STORAGE_KEY_HAS_SEEN_GLOBAL = 'bkin_guide_has_seen_global';

export function GuideProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [isActive, setIsActive] = useState(false);
  const [activeGuide, setActiveGuide] = useState<GuideConfig | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<TargetRect | null>(null);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dontShowAgain, setDontShowAgainState] = useState(false);
  const [completedGuides, setCompletedGuides] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // Identify current available page guide
  const availablePageGuide = PAGE_GUIDES[pathname] || null;

  // Load persistence preferences on mount
  useEffect(() => {
    setMounted(true);
    try {
      const storedDontShow = localStorage.getItem(STORAGE_KEY_DONT_SHOW);
      if (storedDontShow === 'true') {
        setDontShowAgainState(true);
      }
      const storedCompleted = localStorage.getItem(STORAGE_KEY_COMPLETED);
      if (storedCompleted) {
        setCompletedGuides(JSON.parse(storedCompleted));
      }
    } catch {
      // Storage access may fail in private mode
    }
  }, []);

  const setDontShowAgain = (value: boolean) => {
    setDontShowAgainState(value);
    try {
      localStorage.setItem(STORAGE_KEY_DONT_SHOW, value ? 'true' : 'false');
    } catch {
      // Ignore storage errors
    }
  };

  const resetGuidePreferences = () => {
    try {
      localStorage.removeItem(STORAGE_KEY_DONT_SHOW);
      localStorage.removeItem(STORAGE_KEY_COMPLETED);
      localStorage.removeItem(STORAGE_KEY_HAS_SEEN_GLOBAL);
      setDontShowAgainState(false);
      setCompletedGuides([]);
    } catch {
      // Ignore
    }
  };

  const startGuide = useCallback(
    (guideOrId: GuideConfig | 'global' | string) => {
      let guide: GuideConfig | null = null;
      if (typeof guideOrId === 'string') {
        if (guideOrId === 'global') {
          guide = GLOBAL_GUIDE;
        } else if (PAGE_GUIDES[guideOrId]) {
          guide = PAGE_GUIDES[guideOrId];
        } else {
          // Check by ID match
          const found = Object.values(PAGE_GUIDES).find((g) => g.id === guideOrId);
          guide = found || GLOBAL_GUIDE;
        }
      } else {
        guide = guideOrId;
      }

      if (guide && guide.steps.length > 0) {
        setActiveGuide(guide);
        setCurrentStepIndex(0);
        setIsActive(true);
        setIsModalOpen(false);
      }
    },
    []
  );

  const startGlobalTour = useCallback(() => {
    startGuide(GLOBAL_GUIDE);
  }, [startGuide]);

  const startPageTour = useCallback(
    (route?: string) => {
      const targetRoute = route || pathname;
      const guide = PAGE_GUIDES[targetRoute];
      if (guide) {
        startGuide(guide);
      } else {
        // Fallback to global guide
        startGlobalTour();
      }
    },
    [pathname, startGuide, startGlobalTour]
  );

  const currentStep = activeGuide?.steps[currentStepIndex] || null;
  const totalSteps = activeGuide?.steps.length || 0;

  const finishGuide = useCallback(() => {
    if (activeGuide) {
      try {
        const updated = Array.from(new Set([...completedGuides, activeGuide.id]));
        setCompletedGuides(updated);
        localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(updated));
        if (activeGuide.id === 'global') {
          localStorage.setItem(STORAGE_KEY_HAS_SEEN_GLOBAL, 'true');
        }
      } catch {
        // Ignore storage errors
      }
    }
    setIsActive(false);
    setActiveGuide(null);
    setCurrentStepIndex(0);
    setTargetRect(null);
    setTargetElement(null);
  }, [activeGuide, completedGuides]);

  const skipGuide = useCallback(() => {
    setIsActive(false);
    setActiveGuide(null);
    setCurrentStepIndex(0);
    setTargetRect(null);
    setTargetElement(null);
  }, []);

  const nextStep = useCallback(() => {
    if (!activeGuide) return;
    if (currentStepIndex < activeGuide.steps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      const nextStepObj = activeGuide.steps[nextIndex];
      // If step targets another route, navigate if not already there
      if (nextStepObj.featureRoute && nextStepObj.featureRoute !== pathname) {
        router.push(nextStepObj.featureRoute);
      }
      setCurrentStepIndex(nextIndex);
    } else {
      finishGuide();
    }
  }, [activeGuide, currentStepIndex, pathname, router, finishGuide]);

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  }, [currentStepIndex]);

  const goToStep = useCallback(
    (index: number) => {
      if (activeGuide && index >= 0 && index < activeGuide.steps.length) {
        setCurrentStepIndex(index);
      }
    },
    [activeGuide]
  );

  // Measure and track target bounding box
  const updateTargetRect = useCallback(() => {
    if (!isActive || !currentStep) {
      setTargetRect(null);
      setTargetElement(null);
      return;
    }

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
    const selector =
      isMobile && currentStep.mobileSelector
        ? currentStep.mobileSelector
        : currentStep.targetSelector;

    let el = document.querySelector<HTMLElement>(selector);

    // Fallback attempt: if mobile selector failed, try targetSelector
    if (!el && currentStep.mobileSelector) {
      el = document.querySelector<HTMLElement>(currentStep.targetSelector);
    }

    if (el) {
      setTargetElement(el);
      const rect = el.getBoundingClientRect();

      // Add a generous 8px focus margin
      const padding = 8;
      const top = Math.max(0, rect.top - padding);
      const left = Math.max(0, rect.left - padding);
      const width = rect.width + padding * 2;
      const height = rect.height + padding * 2;

      setTargetRect({
        top,
        left,
        width,
        height,
        bottom: top + height,
        right: left + width,
      });
    } else {
      // Element not in DOM yet or hidden
      setTargetElement(null);
      // Center spotlight fallback
      if (typeof window !== 'undefined') {
        const width = Math.min(window.innerWidth - 32, 420);
        const height = 180;
        const left = (window.innerWidth - width) / 2;
        const top = Math.max(80, window.innerHeight * 0.25);
        setTargetRect({
          top,
          left,
          width,
          height,
          bottom: top + height,
          right: left + width,
        });
      }
    }
  }, [isActive, currentStep]);

  // Handle step change: smooth scroll and element measurement
  useEffect(() => {
    if (!isActive || !currentStep) return;

    // Clear previous timeouts
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }

    let retryCount = 0;
    const maxRetries = 10;

    const attemptMeasurement = () => {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
      const selector =
        isMobile && currentStep.mobileSelector
          ? currentStep.mobileSelector
          : currentStep.targetSelector;

      const el = document.querySelector<HTMLElement>(selector) ||
                 (currentStep.mobileSelector ? document.querySelector<HTMLElement>(currentStep.targetSelector) : null);

      if (el) {
        // Smooth scroll element into view if not in viewport
        const rect = el.getBoundingClientRect();
        const isInViewport =
          rect.top >= 64 &&
          rect.bottom <= (window.innerHeight - 80) &&
          rect.left >= 0 &&
          rect.right <= window.innerWidth;

        if (!isInViewport) {
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest',
          });
        }

        // Allow scroll animation to settle before final rect capture
        setTimeout(() => {
          updateTargetRect();
        }, 150);
      } else if (retryCount < maxRetries) {
        retryCount += 1;
        retryTimeoutRef.current = setTimeout(attemptMeasurement, 100);
      } else {
        updateTargetRect();
      }
    };

    attemptMeasurement();

    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [isActive, currentStep, currentStepIndex, updateTargetRect]);

  // Keep target rect synchronized during window resize & scroll
  useEffect(() => {
    if (!isActive) return;

    const handleScrollOrResize = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = requestAnimationFrame(() => {
        updateTargetRect();
      });
    };

    window.addEventListener('resize', handleScrollOrResize, { passive: true });
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleScrollOrResize);
      window.removeEventListener('scroll', handleScrollOrResize);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isActive, updateTargetRect]);

  // Keyboard navigation
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        skipGuide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextStep();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevStep();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, nextStep, prevStep, skipGuide]);

  const openGuideModal = () => setIsModalOpen(true);
  const closeGuideModal = () => setIsModalOpen(false);
  const toggleGuideModal = () => setIsModalOpen((prev) => !prev);

  return (
    <GuideContext.Provider
      value={{
        isActive,
        activeGuide,
        currentStepIndex,
        currentStep,
        totalSteps,
        targetRect,
        targetElement,
        isModalOpen,
        dontShowAgain,
        availablePageGuide,
        startGuide,
        startGlobalTour,
        startPageTour,
        nextStep,
        prevStep,
        goToStep,
        skipGuide,
        finishGuide,
        openGuideModal,
        closeGuideModal,
        toggleGuideModal,
        setDontShowAgain,
        resetGuidePreferences,
      }}
    >
      {children}
    </GuideContext.Provider>
  );
}

export function useGuide() {
  const context = useContext(GuideContext);
  if (!context) {
    throw new Error('useGuide must be used within a GuideProvider');
  }
  return context;
}
