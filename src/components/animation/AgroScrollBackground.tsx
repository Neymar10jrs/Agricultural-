'use client';

import React, { useEffect, useRef, useCallback, ReactNode } from 'react';

export interface AgroScrollBackgroundProps {
  children?: ReactNode;
  totalFrames?: number;
  framesPath?: string;
  filePrefix?: string;
  fileExtension?: string;
  className?: string;
}

export function AgroScrollBackground({
  children,
  totalFrames = 300,
  framesPath = '/agro-animation',
  filePrefix = 'ezgif-frame-',
  fileExtension = 'jpg',
  className = '',
}: AgroScrollBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // References for 60 FPS requestAnimationFrame loop (zero React re-render during scroll)
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(totalFrames).fill(null));
  const loadedFlagsRef = useRef<boolean[]>(new Array(totalFrames).fill(false));
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);
  const isMountedRef = useRef<boolean>(true);
  const prefersReducedMotionRef = useRef<boolean>(false);

  // Helper to format frame path
  const getFrameUrl = useCallback(
    (index: number) => {
      const padded = String(index + 1).padStart(3, '0');
      return `${framesPath}/${filePrefix}${padded}.${fileExtension}`;
    },
    [framesPath, filePrefix, fileExtension]
  );

  // Draw a frame onto canvas with cover scaling and sub-frame alpha blending
  const renderFrame = useCallback(
    (baseIndex: number, fraction: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const images = imagesRef.current;
      const loaded = loadedFlagsRef.current;

      // Find nearest loaded frame if base frame isn't ready yet
      let activeIndex = baseIndex;
      if (!loaded[activeIndex]) {
        for (let offset = 1; offset < totalFrames; offset++) {
          if (activeIndex - offset >= 0 && loaded[activeIndex - offset]) {
            activeIndex = activeIndex - offset;
            break;
          }
          if (activeIndex + offset < totalFrames && loaded[activeIndex + offset]) {
            activeIndex = activeIndex + offset;
            break;
          }
        }
      }

      const primaryImg = images[activeIndex];
      if (!primaryImg || !primaryImg.complete || primaryImg.naturalWidth === 0) {
        return;
      }

      const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
      const width = typeof window !== 'undefined' ? window.innerWidth : 1920;
      const height = typeof window !== 'undefined' ? window.innerHeight : 1080;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Cover scaling math (maintains 16:9 aspect ratio without distortion)
      const imgW = primaryImg.naturalWidth;
      const imgH = primaryImg.naturalHeight;
      const imgRatio = imgW / imgH;
      const containerRatio = width / height;

      let drawW: number, drawH: number, drawX: number, drawY: number;

      if (containerRatio > imgRatio) {
        drawW = width;
        drawH = width / imgRatio;
        drawX = 0;
        drawY = (height - drawH) / 2;
      } else {
        drawH = height;
        drawW = height * imgRatio;
        drawX = (width - drawW) / 2;
        drawY = 0;
      }

      // Draw primary base frame
      ctx.globalAlpha = 1;
      ctx.drawImage(primaryImg, drawX, drawY, drawW, drawH);

      // Sub-frame alpha crossfading for buttery smoothness if adjacent frame is loaded
      if (fraction > 0.005 && baseIndex < totalFrames - 1) {
        const nextIndex = baseIndex + 1;
        if (loaded[nextIndex]) {
          const nextImg = images[nextIndex];
          if (nextImg && nextImg.complete && nextImg.naturalWidth > 0) {
            ctx.globalAlpha = fraction;
            ctx.drawImage(nextImg, drawX, drawY, drawW, drawH);
          }
        }
      }

      ctx.restore();
    },
    [totalFrames]
  );

  // Progressive Preload Strategy: Priority-based loading
  useEffect(() => {
    isMountedRef.current = true;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotionRef.current = mediaQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    const images = imagesRef.current;
    const loadedFlags = loadedFlagsRef.current;

    const loadImage = (index: number, priority = false): Promise<void> => {
      return new Promise((resolve) => {
        if (loadedFlags[index] && images[index]) {
          resolve();
          return;
        }

        const img = new Image();
        img.src = getFrameUrl(index);
        img.onload = () => {
          if (!isMountedRef.current) return;
          images[index] = img;
          loadedFlags[index] = true;

          if (index === 0) {
            renderFrame(0, 0);
          }

          resolve();
        };
        img.onerror = () => {
          resolve();
        };
      });
    };

    // Phase 1: Load initial frame immediately
    loadImage(0, true).then(() => {
      if (!isMountedRef.current) return;

      // Phase 2: Load keyframes across the timeline (every 10th frame) for immediate scrubbability
      const keyframePromises: Promise<void>[] = [];
      for (let i = 1; i < totalFrames; i += 10) {
        keyframePromises.push(loadImage(i));
      }

      Promise.all(keyframePromises).then(() => {
        if (!isMountedRef.current) return;

        // Phase 3: Fill in all remaining frames in batches
        const remainingIndices: number[] = [];
        for (let i = 0; i < totalFrames; i++) {
          if (!loadedFlags[i]) remainingIndices.push(i);
        }

        const batchSize = 12;
        let currentBatch = 0;

        const loadNextBatch = () => {
          if (!isMountedRef.current) return;
          const slice = remainingIndices.slice(currentBatch, currentBatch + batchSize);
          if (slice.length === 0) return;

          Promise.all(slice.map((idx) => loadImage(idx))).then(() => {
            currentBatch += batchSize;
            if (currentBatch < remainingIndices.length && isMountedRef.current) {
              if (typeof window.requestIdleCallback === 'function') {
                window.requestIdleCallback(loadNextBatch);
              } else {
                setTimeout(loadNextBatch, 50);
              }
            }
          });
        };

        loadNextBatch();
      });
    });

    return () => {
      isMountedRef.current = false;
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, [getFrameUrl, renderFrame, totalFrames]);

  // Main 60 FPS requestAnimationFrame Scroll Loop
  useEffect(() => {
    const tick = () => {
      if (prefersReducedMotionRef.current) {
        renderFrame(149, 0);
        animFrameIdRef.current = requestAnimationFrame(tick);
        return;
      }

      // Smooth momentum lerp
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * 0.18;
      } else {
        currentProgressRef.current = target;
      }

      const progress = Math.min(Math.max(currentProgressRef.current, 0), 1);
      const exactFrame = progress * (totalFrames - 1);
      const baseIndex = Math.floor(exactFrame);
      const fraction = exactFrame - baseIndex;

      renderFrame(baseIndex, fraction);

      animFrameIdRef.current = requestAnimationFrame(tick);
    };

    animFrameIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [renderFrame, totalFrames]);

  // Scroll listener tracking the entire document progress from top to bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        document.documentElement.clientHeight
      );
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const totalScrollable = Math.max(docHeight - windowHeight, 1);
      const progress = Math.min(Math.max(scrollY / totalScrollable, 0), 1);
      targetProgressRef.current = progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    // Re-check after small delays as dynamic layout settles
    const t1 = setTimeout(handleScroll, 150);
    const t2 = setTimeout(handleScroll, 600);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Layer 1: Fixed Full-Viewport Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full block pointer-events-none z-0"
      />

      {/* Layer 2: Fixed Atmospheric Overlay Gradients for Transparent Information Layers */}
      <div
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(circle at 50% 35%, rgba(2, 6, 23, 0.15) 0%, rgba(2, 6, 23, 0.35) 60%, rgba(2, 6, 23, 0.58) 100%)',
        }}
      />

      {/* Layer 3: Fixed Ambient Vignettes (Subtle Header & Bottom Track distinction) */}
      <div className="fixed inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none z-0" />
      <div className="fixed inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none z-0" />


      {/* Layer 4: Foreground Content (All Homepage Sections flow naturally over the canvas) */}
      <div className="relative z-10 w-full pointer-events-auto">
        {children}
      </div>

    </div>
  );
}
