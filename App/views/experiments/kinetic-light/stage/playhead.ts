// Stage
import type { Head, Sheet } from './engrave';

// Constants
import { PAUSE_EASE_SECONDS } from '@/views/experiments/kinetic-light/constants';

type Timing = { descent: number; hold: number; length: number };

type Playhead = Timing & { times: number[]; width: number; xs: number[] };

const SCALE = 0.01;
const SAME_TIME = 0.001;
const SHEET_GAP = 6;
const HOVER_BACK = SHEET_GAP / 2;
const WRAP_SECONDS = 1;
const SNAP_SECONDS = 1;
const SETTLED = 0.999;

const indexAt = (times: readonly number[], time: number): number => {
  let low = 0;
  let high = times.length;

  while (low < high) {
    const middle = Math.floor((low + high) / 2);

    if (times[middle] <= time) {
      low = middle + 1;
    } else {
      high = middle;
    }
  }

  return low - 1;
};

const widthOf = ({ end }: Sheet): number => end * SCALE + SHEET_GAP;

const periodOf = ({ descent, hold, length }: Timing): number =>
  descent + length + hold;

const roundOf = (time: number, timing: Timing): number =>
  time < -timing.descent || timing.length <= 0
    ? 0
    : Math.floor((time + timing.descent) / periodOf(timing));

const localOf = (time: number, timing: Timing): number =>
  time - roundOf(time, timing) * periodOf(timing);

const hoverAt = (time: number, timing: Timing): number => {
  const local = localOf(time, timing);

  if (local > timing.length) {
    return Math.min(1, (local - timing.length) / timing.hold);
  }

  if (roundOf(time, timing) > 0 && local < 0) {
    return Math.min(1, -local / timing.descent);
  }

  return 0;
};

const unwrap = (clock: () => number, timing: Timing): (() => number) => {
  const period = periodOf(timing);
  let round = 0;
  let last = Number.NEGATIVE_INFINITY;

  return () => {
    const now = clock();

    if (now < -timing.descent - SAME_TIME) {
      round = 0;
    } else if (last - now > period - WRAP_SECONDS) {
      round += 1;
    }

    last = now;

    return now + round * period;
  };
};

const ease = (clock: () => number, moving: () => boolean): (() => number) => {
  let last = Number.NaN;
  let ahead = 0;
  let speed = 0;
  let at = performance.now() / 1000;

  return () => {
    const now = clock();
    const real = performance.now() / 1000;
    const target = moving() ? 1 : 0;
    const settle = Math.exp(-Math.max(0, real - at) / PAUSE_EASE_SECONDS);
    const jumped = Number.isNaN(last) || Math.abs(now - last) > SNAP_SECONDS;

    at = real;
    last = now;

    if (jumped) {
      ahead = 0;
      speed = target;

      return now;
    }

    ahead = Math.max(
      0,
      ahead + (speed - target) * PAUSE_EASE_SECONDS * (1 - settle)
    );
    speed = target + (speed - target) * settle;

    if (target && speed > SETTLED) {
      ahead = 0;
    }

    return now + ahead;
  };
};

const toPlayhead = (
  heads: readonly Head[],
  timing: Timing,
  width: number
): Playhead => {
  const times: number[] = [];
  const xs: number[] = [];

  heads.forEach(({ time, x }) => {
    const last = times.length - 1;

    if (last >= 0 && time - times[last] < SAME_TIME) {
      xs[last] = Math.max(
        Math.min(xs[last], x * SCALE),
        xs[last - 1] ?? Number.NEGATIVE_INFINITY
      );
      return;
    }

    times.push(time);
    xs.push(Math.max(x * SCALE, xs[last] ?? Number.NEGATIVE_INFINITY));
  });

  return { ...timing, times, width, xs };
};

const between = (
  time: number,
  from: number,
  to: number,
  fromX: number,
  toX: number
): number =>
  fromX +
  (toX - fromX) *
    Math.min(1, Math.max(0, (time - from) / Math.max(SAME_TIME, to - from)));

const playheadAt = (playhead: Playhead, time: number): number => {
  const { hold, length, times, width, xs } = playhead;
  const round = roundOf(time, playhead);
  const offset = round * width;
  const local = localOf(time, playhead);
  const first = times[0] ?? 0;
  const last = times[times.length - 1] ?? 0;
  const firstX = xs[0] ?? 0;
  const lastX = xs[xs.length - 1] ?? 0;

  if (local < first) {
    return round === 0
      ? firstX
      : offset +
          between(local, -playhead.descent, first, firstX - HOVER_BACK, firstX);
  }

  if (local >= last) {
    return (
      offset +
      between(local, last, length + hold, lastX, firstX + width - HOVER_BACK)
    );
  }

  const index = indexAt(times, local);

  return (
    offset +
    between(local, times[index], times[index + 1], xs[index], xs[index + 1])
  );
};

export {
  HOVER_BACK,
  SCALE,
  SAME_TIME,
  ease,
  hoverAt,
  indexAt,
  localOf,
  periodOf,
  playheadAt,
  roundOf,
  toPlayhead,
  unwrap,
  widthOf,
  type Playhead,
  type Timing,
};
