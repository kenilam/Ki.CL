import { PLACES, type Place } from './constants';
import { toVector, type Coordinates } from './sun';

/** The offset from UTC is fifteen degrees of longitude an hour, four minutes a degree. */
const MINUTES_A_DEGREE = 4;

/** How far apart two longitudes are, the short way round. */
const apart = (a: number, b: number): number =>
  Math.abs(((((a - b + 180) % 360) + 360) % 360) - 180);

/**
 * The place nearest the visitor, from their clock alone: the one in their
 * time zone, or else the one nearest the longitude their offset from UTC
 * stands for. Nothing asks for their location.
 */
export function toNearest(timeZone: string, offsetMinutes: number): Place {
  const longitude = -offsetMinutes / MINUTES_A_DEGREE;

  return (
    PLACES.find((place) => place.timeZone === timeZone) ??
    PLACES.reduce((nearest, place) =>
      apart(place.longitude, longitude) < apart(nearest.longitude, longitude)
        ? place
        : nearest
    )
  );
}

/** The place nearest a point on the globe, over its surface. */
export function toNearestTo(point: Coordinates): Place {
  const [x, y, z] = toVector(point);
  /* The nearer two points are, the larger the product of their directions. */
  const close = (place: Place) => {
    const [px, py, pz] = toVector(place);

    return x * px + y * py + z * pz;
  };

  return PLACES.reduce((nearest, place) =>
    close(place) > close(nearest) ? place : nearest
  );
}

/** The same, read from this browser. */
export function toNearestHere(date: Date): Place {
  return toNearest(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    date.getTimezoneOffset()
  );
}
