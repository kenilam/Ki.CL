import { PATH as EXPERIMENTS } from '@/views/experiments/constants';

const PATH = 'swatch';

const PARAM = 'id';

const MAKER = 'swatch-maker';

const CLASS_NAME = 'kicl--views--experiments--swatch';

const ACCEPT = 'image/png,image/jpeg,image/webp,image/gif';

const MAX_FILE_BYTES = 8 * 1024 * 1024;

const MAX_FILE_SIZE = '8 MB';

// The tone's level in decibels, and the film's own sound as a share of it.
const TONE_LEVEL = -26;

const FILM_SHARE = 0.2;

const toPath = (id?: string): string =>
  id ? `/${EXPERIMENTS}/${PATH}/${id}` : `/${EXPERIMENTS}/${PATH}`;

export {
  ACCEPT,
  CLASS_NAME,
  FILM_SHARE,
  MAKER,
  MAX_FILE_BYTES,
  MAX_FILE_SIZE,
  PARAM,
  PATH,
  TONE_LEVEL,
  toPath,
};
