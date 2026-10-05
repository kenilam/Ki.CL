import type { Status } from 'arm/brains';

/*
 * What the floor costs to run, gathered every frame without React and read
 * by the panel a few times a second. A frame counts as dropped when it took
 * more than half again the usual frame's time: the browser skipped painting
 * at least one refresh.
 */

/** Frames kept for the averages, about two seconds at 60 Hz. */
const WINDOW = 120;

type Snapshot = {
  fps: number;
  /** Milliseconds between frames: the middle one, and the slowest in twenty. */
  frame: number;
  slowest: number;
  /** Milliseconds a frame spends stepping the plant and reading its sensors. */
  step: number;
  /** Frames dropped in the window, and since the floor started. */
  dropped: number;
  droppedTotal: number;
  /** Bus ticks a second. */
  ticks: number;
  roundTrip: number | null;
  late: number;
  /** Milliseconds the jitter buffer holds the link's commands. */
  hold: number;
  refused: number;
  handing: number;
};

const median = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b);

  return sorted[Math.floor(sorted.length / 2)] ?? 0;
};

const percentile = (values: number[], share: number) => {
  const sorted = [...values].sort((a, b) => a - b);

  return (
    sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * share))] ?? 0
  );
};

const metrics = () => {
  const frames: number[] = [];
  const steps: number[] = [];
  const ticks: number[] = [];
  let droppedTotal = 0;
  let roundTrip: number | null = null;
  let brains = { late: 0, violations: 0, handing: 0, delay: 2 };

  return {
    /** One rendered frame: its interval and the time the floor's step took, in milliseconds. */
    frame: (interval: number, step: number) => {
      const usual = median(frames);

      if (frames.length >= 10 && interval > usual * 1.5) {
        droppedTotal += 1;
      }

      frames.push(interval);
      steps.push(step);

      if (frames.length > WINDOW) {
        frames.shift();
        steps.shift();
      }
    },
    tick: (at: number) => {
      ticks.push(at);

      while (ticks.length && at - ticks[0] > 1000) {
        ticks.shift();
      }
    },
    status: (status: Status) => {
      roundTrip = status.roundTrip ?? roundTrip;
    },
    brains: (counts: typeof brains) => {
      brains = counts;
    },
    read: (): Snapshot => {
      const usual = median(frames);

      return {
        fps: usual ? 1000 / usual : 0,
        frame: usual,
        slowest: percentile(frames, 0.95),
        step:
          steps.reduce((sum, value) => sum + value, 0) / (steps.length || 1),
        dropped: frames.filter((interval) => interval > usual * 1.5).length,
        droppedTotal,
        ticks: ticks.length,
        roundTrip,
        late: brains.late,
        hold: brains.delay * 20,
        refused: brains.violations,
        handing: brains.handing,
      };
    },
  };
};

type Metrics = ReturnType<typeof metrics>;

export { metrics, type Metrics, type Snapshot };
