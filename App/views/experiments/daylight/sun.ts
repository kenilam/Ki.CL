/*
 * Where the sun is. The globe's own frame has north along y, the prime
 * meridian facing z and 90° east along x, so east is to the right when the
 * meridian faces the viewer.
 */

export type Vector = [number, number, number];

export type Coordinates = { latitude: number; longitude: number };

/** Day, night, or the half hour or so between them. */
export type Light = 'day' | 'night' | 'twilight';

const RADIANS = Math.PI / 180;
const DAY_MS = 86_400_000;

/** The sun is this far below the horizon when civil twilight ends. */
const TWILIGHT_DEGREES = -6;

export function toVector({ latitude, longitude }: Coordinates): Vector {
  const phi = latitude * RADIANS;
  const lambda = longitude * RADIANS;

  return [
    Math.cos(phi) * Math.sin(lambda),
    Math.sin(phi),
    Math.cos(phi) * Math.cos(lambda),
  ];
}

/**
 * The point the sun is directly above, by NOAA's low-accuracy series. It is
 * right to about a degree, which is less than the drawing can show.
 */
export function toSubsolar(date: Date): Coordinates {
  const start = Date.UTC(date.getUTCFullYear(), 0, 1);
  const hours = (date.getTime() % DAY_MS) / 3_600_000;
  const day = Math.floor((date.getTime() - start) / DAY_MS);
  const year = ((2 * Math.PI) / 365) * (day + (hours - 12) / 24);

  /* How far the sundial runs ahead of the clock, in minutes. */
  const equation =
    229.18 *
    (0.000075 +
      0.001868 * Math.cos(year) -
      0.032077 * Math.sin(year) -
      0.014615 * Math.cos(2 * year) -
      0.040849 * Math.sin(2 * year));
  const declination =
    0.006918 -
    0.399912 * Math.cos(year) +
    0.070257 * Math.sin(year) -
    0.006758 * Math.cos(2 * year) +
    0.000907 * Math.sin(2 * year) -
    0.002697 * Math.cos(3 * year) +
    0.00148 * Math.sin(3 * year);
  const longitude = -15 * (hours - 12 + equation / 60);

  return {
    latitude: declination / RADIANS,
    longitude: ((((longitude + 180) % 360) + 360) % 360) - 180,
  };
}

/** How high the sun stands over a place, in degrees; negative is below the horizon. */
export function toAltitude(place: Coordinates, subsolar: Coordinates): number {
  const [x, y, z] = toVector(place);
  const [sx, sy, sz] = toVector(subsolar);

  return Math.asin(x * sx + y * sy + z * sz) / RADIANS;
}

export function toLight(place: Coordinates, subsolar: Coordinates): Light {
  const altitude = toAltitude(place, subsolar);

  if (altitude > 0) {
    return 'day';
  }

  return altitude > TWILIGHT_DEGREES ? 'twilight' : 'night';
}

/**
 * The matrix that turns a direction seen by the viewer into the globe's own
 * frame, with `centre` facing the viewer. Column-major, as WebGL takes it.
 */
export function toView({ latitude, longitude }: Coordinates): number[] {
  const phi = latitude * RADIANS;
  const lambda = longitude * RADIANS;
  const [sinPhi, cosPhi] = [Math.sin(phi), Math.cos(phi)];
  const [sinLambda, cosLambda] = [Math.sin(lambda), Math.cos(lambda)];

  return [
    cosLambda,
    0,
    -sinLambda,
    -sinLambda * sinPhi,
    cosPhi,
    -cosLambda * sinPhi,
    sinLambda * cosPhi,
    sinPhi,
    cosLambda * cosPhi,
  ];
}

/** A direction in the globe's frame, as the viewer sees it. */
export function toSeen(vector: Vector, view: number[]): Vector {
  const [x, y, z] = vector;

  return [
    view[0] * x + view[1] * y + view[2] * z,
    view[3] * x + view[4] * y + view[5] * z,
    view[6] * x + view[7] * y + view[8] * z,
  ];
}
