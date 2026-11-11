import { CLASS_NAME as VIEW } from '@/views/experiments/daylight/constants';
import {
  toBearing,
  toDay,
  toSubsolar,
  type Coordinates,
} from '@/views/experiments/daylight/sun';

/*
 * Where along the title the blue gives way to the orange, in per cent. It runs
 * past both ends, so full night leaves a trace of orange and full day a trace
 * of blue.
 */
const EDGE_START = -10;
const EDGE_SPAN = 120;

/**
 * Sets the custom properties the title's colour reads, for where the globe
 * faces now: which way the sun is, in CSS degrees, and how much of the title
 * is night's blue. Rounded, so a globe at rest sets nothing new.
 */
export function setGradient(on: HTMLElement, facing: Coordinates, date: Date) {
  const subsolar = toSubsolar(date);
  const night = EDGE_START + (1 - toDay(facing, subsolar)) * EDGE_SPAN;

  on.style.setProperty(
    `--${VIEW}--bearing`,
    `${toBearing(facing, subsolar).toFixed(1)}deg`
  );
  on.style.setProperty(`--${VIEW}--night`, `${night.toFixed(1)}%`);
}
