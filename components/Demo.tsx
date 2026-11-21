'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { RotateCcw } from 'lucide-react';
import PhoneMock from '@/components/PhoneMock';
import { siteContent } from '@/lib/content';
import {
  DEMO_SEQUENCE,
  getInitialDemoPhase,
  isConfirmationVisible,
  isGymBlockVisible,
  type DemoPhase,
} from '@/lib/demo-machine';

function subscribeReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export default function Demo() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timersRef = useRef<number[]>([]);
  const hasPlayedRef = useRef(false);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const [phase, setPhase] = useState<DemoPhase>('idle');
  const [undone, setUndone] = useState(false);

  const clearTimers = useCallback(() => {
    for (const id of timersRef.current) {
      window.clearTimeout(id);
    }
    timersRef.current = [];
  }, []);

  const scheduleSequence = useCallback(() => {
    clearTimers();
    for (const step of DEMO_SEQUENCE) {
      const id = window.setTimeout(() => {
        setPhase(step.phase);
      }, step.delayMs);
      timersRef.current.push(id);
    }
  }, [clearTimers]);

  useEffect(() => {
    if (reducedMotion) {
      hasPlayedRef.current = true;
      clearTimers();
      return;
    }

    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      hasPlayedRef.current = true;
      scheduleSequence();
      return () => clearTimers();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasPlayedRef.current) {
            hasPlayedRef.current = true;
            scheduleSequence();
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      clearTimers();
    };
  }, [clearTimers, reducedMotion, scheduleSequence]);

  const effectivePhase: DemoPhase = reducedMotion
    ? getInitialDemoPhase(true)
    : phase;

  const handleReplay = () => {
    setUndone(false);
    if (reducedMotion) {
      return;
    }
    setPhase('idle');
    scheduleSequence();
  };

  const handleUndo = () => {
    setUndone(true);
  };

  const showGym = isGymBlockVisible(effectivePhase) && !undone;
  const showConfirmation = isConfirmationVisible(effectivePhase) && !undone;

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center"
      data-demo-phase={effectivePhase}
    >
      <div
        role="region"
        aria-label="Interactive preview of Dump & Day: tapping the mic, listening for Gym at 9 pm, sorting it, and adding a sage-colored Gym block to the Today timeline at 9:00 pm."
        className="w-full"
      >
        <PhoneMock
          variant="today"
          demoPhase={effectivePhase}
          showGymBlock={showGym}
          showConfirmation={showConfirmation}
          onUndoGym={handleUndo}
          breatheMic={!reducedMotion}
        />
      </div>

      <button
        type="button"
        onClick={handleReplay}
        className="mt-4 inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-3.5 py-2 text-[14px] font-medium text-muted transition-colors duration-150 hover:text-ink"
      >
        <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
        <span>{siteContent.hero.demo.replayLabel}</span>
      </button>
    </div>
  );
}
