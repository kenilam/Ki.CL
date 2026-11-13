import type { Experiment } from '@/views/routes';

import { CLASS_NAME as HERO } from '@/views/home/hero/constants';

const CLASS_NAME = `${HERO}__works`;

const WORKS = [
  'kinetic-light',
  'daylight',
  'music-visualiser',
] as const satisfies readonly Experiment['plate'][];

export { CLASS_NAME, WORKS };
