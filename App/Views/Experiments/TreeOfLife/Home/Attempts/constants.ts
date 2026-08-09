import {
  VERSIONS,
  type Version,
} from '@/Views/Experiments/TreeOfLife/Versions/constants';

type Era = {
  label: string;
  versions: readonly Version[];
};

/**
 * The fifteen, grouped the way they actually divide.
 *
 * Each band is a different answer to the same question, not a refinement of the
 * one before — which is why the numbers are worth showing as a run rather than
 * a menu. The labels say what the band *was*, so the index reads as a history
 * and not as a list of files.
 */
export const ERAS: readonly Era[] = [
  { label: 'Drawn at once, in WebGL', versions: VERSIONS.slice(0, 8) },
  { label: 'Read as documents', versions: VERSIONS.slice(8, 13) },
  { label: 'The map', versions: VERSIONS.slice(13, 14) },
  { label: 'The frame', versions: VERSIONS.slice(14) },
];
