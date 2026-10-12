import {
  VERSIONS,
  type Version,
} from '@/views/experiments/tree-of-life/versions/constants';

export type Era = {
  /** Which `era` phrase names the band. */
  context: 'webgl' | 'html' | 'widest' | 'close_up';
  versions: readonly Version[];
};

/**
 * The fifteen, grouped the way they actually divide.
 *
 * Each band is a different answer to the same question, not a refinement of the
 * one before - which is why the numbers are worth showing as a run rather than
 * a menu. The labels say what the band *was*, so the index reads as a history
 * and not as a list of files.
 */
export const ERAS: readonly Era[] = [
  { context: 'webgl', versions: VERSIONS.slice(0, 8) },
  { context: 'html', versions: VERSIONS.slice(8, 13) },
  { context: 'widest', versions: VERSIONS.slice(13, 14) },
  { context: 'close_up', versions: VERSIONS.slice(14) },
];
