import type { Coordinates } from './sun';

/** The latitude the globe starts at: most people live north of the equator. */
const LATITUDE = 20;

/**
 * Roughly where the visitor is, from their clock alone: the offset from UTC
 * is fifteen degrees of longitude an hour. Nothing asks for their location.
 */
export function toHome(date: Date): Coordinates {
  return { latitude: LATITUDE, longitude: -date.getTimezoneOffset() / 4 };
}
