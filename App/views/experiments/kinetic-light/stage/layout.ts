type Note = { duration: number; pitch: number; time: number };

type Span = { center: number; high: number; low: number; width: number };

type Vector = [number, number, number];

const LANE = 0.24;
const PADDING = 2;
const NOTE_HEIGHT = 0.08;
const GAP = LANE * 2;
const SHORTEST = 0.05;
const BEHIND_SECONDS = 1;
const DEPTH = 60;
const MIDDLE_C = 60;
const FILL = 0.85;
const RISE = 4.5;
const BACK = 6;
const AHEAD = 6;

const toSpan = (notes: readonly Note[]): Span => {
  const pitches = notes.map(({ pitch }) => pitch);
  const low = (pitches.length ? Math.min(...pitches) : MIDDLE_C) - PADDING;
  const high = (pitches.length ? Math.max(...pitches) : MIDDLE_C) + PADDING;

  return { center: (low + high) / 2, high, low, width: (high - low) * LANE };
};

const toX = (pitch: number, span: Span): number => (pitch - span.center) * LANE;

const toShade = (pitch: number, span: Span): number =>
  (pitch - span.low) / Math.max(1, span.high - span.low);

const toBox = (
  { duration, time }: Note,
  clock: number,
  speed: number
): { length: number; z: number } => {
  const full = duration * speed;
  const length = Math.max(SHORTEST, full / 2, full - GAP);

  return { length, z: -(time - clock) * speed - length / 2 };
};

const toWindow = (clock: number, speed: number): [number, number] => [
  clock - BEHIND_SECONDS,
  clock + DEPTH / speed,
];

const firstAt = (notes: readonly Note[], time: number): number => {
  let low = 0;
  let high = notes.length;

  while (low < high) {
    const middle = Math.floor((low + high) / 2);

    if (notes[middle].time < time) {
      low = middle + 1;
    } else {
      high = middle;
    }
  }

  return low;
};

const toCamera = (
  span: Span,
  aspect: number,
  fov: number
): { distance: number; position: Vector; target: Vector } => {
  const across = Math.tan((fov * Math.PI) / 360) * aspect;
  const fits = span.width / 2 / FILL / across;
  const reach = Math.hypot(RISE, BACK);
  const scale = Math.max(1, span.width / 10, fits / reach);

  return {
    distance: reach * scale,
    position: [0, RISE * scale, BACK * scale],
    target: [0, 0, -AHEAD * scale],
  };
};

export {
  DEPTH,
  GAP,
  LANE,
  NOTE_HEIGHT,
  firstAt,
  toBox,
  toCamera,
  toShade,
  toSpan,
  toWindow,
  toX,
  type Span,
  type Vector,
};
