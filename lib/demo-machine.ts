export type DemoPhase = 'idle' | 'tapped' | 'listening' | 'sorting' | 'confirmed';

export interface DemoStep {
  phase: DemoPhase;
  delayMs: number;
}

/**
 * Total hero demo sequence lasts ~6 seconds:
 * 0.0s -> idle
 * 0.6s -> tapped (mic press)
 * 1.1s -> listening (soft waveform)
 * 3.0s -> sorting (gentle shimmer)
 * 4.5s -> confirmed (card slides up + Gym block added at 9:00 pm)
 * Finishes settling cleanly by ~6.0s.
 */
export const DEMO_SEQUENCE: readonly DemoStep[] = [
  { phase: 'tapped', delayMs: 600 },
  { phase: 'listening', delayMs: 1100 },
  { phase: 'sorting', delayMs: 3000 },
  { phase: 'confirmed', delayMs: 4500 },
];

export function getInitialDemoPhase(prefersReducedMotion: boolean): DemoPhase {
  return prefersReducedMotion ? 'confirmed' : 'idle';
}

export function isGymBlockVisible(phase: DemoPhase): boolean {
  return phase === 'confirmed';
}

export function isConfirmationVisible(phase: DemoPhase): boolean {
  return phase === 'confirmed';
}

export function isDemoFinished(phase: DemoPhase): boolean {
  return phase === 'confirmed';
}
