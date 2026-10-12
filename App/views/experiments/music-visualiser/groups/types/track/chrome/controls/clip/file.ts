// Catalog
import type { Track } from '@/views/experiments/music-visualiser/catalog';

/** Tried in order. Safari records mp4, and the others webm. */
const TYPES = ['video/mp4', 'video/webm;codecs=vp9,opus', 'video/webm'];

/** The first type this browser can record, or `null` if it records none. */
const pickType = (isSupported: (type: string) => boolean): string | null =>
  TYPES.find(isSupported) ?? null;

/** `video/webm;codecs=vp9,opus` is saved as `.webm`. */
const toExtension = (type: string): string => type.split(';')[0].split('/')[1];

const toFileName = (track: Pick<Track, 'id' | 'type'>, type: string): string =>
  `${track.type}-${track.id}.${toExtension(type)}`;

export { pickType, toFileName };
