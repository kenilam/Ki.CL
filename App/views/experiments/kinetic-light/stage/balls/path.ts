// Stage
import type { Sheet } from '@/views/experiments/kinetic-light/stage/engrave';
import {
  HOVER_BACK,
  SAME_TIME,
  SCALE,
  indexAt,
  localOf,
  periodOf,
  playheadAt,
  roundOf,
  type Playhead,
} from '@/views/experiments/kinetic-light/stage/playhead';

type Landing = { time: number; x: number; z: number };

type Track = { landings: Landing[]; times: number[] };

type Point = { x: number; y: number; z: number };

const ARC_PER_DISTANCE = 0.3;
const HIGHEST_ARC = 0.8;
const DROP_SECONDS = 0.8;
const DROP_HEIGHT = 12;
const HOVER_HEIGHT = 0.6;

const toSteps = (sheet: Sheet, staff: number): Landing[][] => {
  const steps: Landing[][] = [];

  sheet.heads
    .filter((head) => head.staff === staff && head.sounded)
    .forEach(({ time, x, y }) => {
      const step = steps[steps.length - 1];
      const landing = { time, x: x * SCALE, z: y * SCALE };

      if (step && time - step[0].time < SAME_TIME) {
        step.push({ ...landing, time: step[0].time });
        return;
      }

      steps.push([landing]);
    });

  return steps.map((step) => step.sort((a, b) => a.z - b.z));
};

const toTrack = (notes: Landing[], playhead: Playhead): Track => {
  const first = playhead.times[0] ?? 0;
  const landings =
    notes[0].time - first >= SAME_TIME
      ? [
          { time: first, x: playheadAt(playhead, first), z: notes[0].z },
          ...notes,
        ]
      : notes;

  return { landings, times: landings.map(({ time }) => time) };
};

const toTracks = (sheet: Sheet, playhead: Playhead): Track[] =>
  sheet.staves.flatMap((_, staff) => {
    const steps = toSteps(sheet, staff);
    const balls = Math.max(0, ...steps.map(({ length }) => length));

    return Array.from({ length: balls }, (_, ball) =>
      toTrack(
        steps.map(
          (step) =>
            step[
              balls === 1
                ? 0
                : Math.round((ball * (step.length - 1)) / (balls - 1))
            ]
        ),
        playhead
      )
    );
  });

const drop = (landing: Landing, time: number, point: Point): number => {
  const left = (landing.time - time) / DROP_SECONDS;

  point.x = landing.x;
  point.y = DROP_HEIGHT * (1 - (1 - Math.min(1, left)) ** 2);
  point.z = landing.z;

  return left > 1 ? 0 : 1;
};

const shift = (
  landing: Landing,
  rounds: number,
  playhead: Playhead
): Landing => ({
  ...landing,
  time: landing.time + rounds * periodOf(playhead),
  x: landing.x + rounds * playhead.width,
});

const rise = (
  from: Landing,
  to: Landing,
  top: number,
  time: number,
  point: Point
): number => {
  const progress = Math.min(1, (time - from.time) / (top - from.time));

  point.x = from.x + (to.x - HOVER_BACK - from.x) * progress;
  point.y = HOVER_HEIGHT * (1 - (1 - progress) ** 2);
  point.z = from.z + (to.z - from.z) * progress;

  return 1;
};

const descend = (
  to: Landing,
  from: number,
  time: number,
  point: Point
): number => {
  const progress = Math.min(1, Math.max(0, (time - from) / (to.time - from)));

  point.x = to.x - HOVER_BACK * (1 - progress);
  point.y = HOVER_HEIGHT * (1 - progress * progress * (3 - 2 * progress));
  point.z = to.z;

  return 1;
};

const positionAt = (
  { landings, times }: Track,
  playhead: Playhead,
  time: number,
  point: Point
): number => {
  const round = roundOf(time, playhead);
  const period = periodOf(playhead);
  const index = indexAt(times, localOf(time, playhead));
  const here = landings[index];
  const next = landings[index + 1];

  if (!here) {
    const to = shift(landings[0], round, playhead);

    return round === 0
      ? drop(to, time, point)
      : descend(to, round * period - playhead.descent, time, point);
  }

  const from = shift(here, round, playhead);

  if (!next) {
    return rise(
      from,
      shift(landings[0], round + 1, playhead),
      round * period + playhead.length + playhead.hold,
      time,
      point
    );
  }

  const to = shift(next, round, playhead);
  const progress = (time - from.time) / (to.time - from.time);
  const arc = Math.min(
    HIGHEST_ARC,
    ARC_PER_DISTANCE * Math.hypot(to.x - from.x, to.z - from.z)
  );

  point.x = from.x + (to.x - from.x) * progress;
  point.y = arc * 4 * progress * (1 - progress);
  point.z = from.z + (to.z - from.z) * progress;

  return 1;
};

const segmentStart = (
  { times }: Track,
  playhead: Playhead,
  time: number
): number =>
  roundOf(time, playhead) === 0 && indexAt(times, localOf(time, playhead)) < 0
    ? times[0] - DROP_SECONDS
    : Number.NEGATIVE_INFINITY;

const sinceLanding = (
  { times }: Track,
  playhead: Playhead,
  time: number
): number => {
  const local = localOf(time, playhead);
  const index = indexAt(times, local);

  if (index >= 0) {
    return local - times[index];
  }

  return roundOf(time, playhead) === 0
    ? Number.POSITIVE_INFINITY
    : local - (times[times.length - 1] - periodOf(playhead));
};

export {
  positionAt,
  segmentStart,
  sinceLanding,
  toTracks,
  type Point,
  type Track,
};
