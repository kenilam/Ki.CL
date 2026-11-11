import { PATH as EXPERIMENTS } from '@/views/experiments/constants';

const PATH = 'kinetic-light';

const PARAM = 'id';

const CLASS_NAME = 'kicl--views--experiments--kinetic-light';

const ACCEPT = '.mid,.midi,.musicxml,.xml,.mxl,image/*,application/pdf';

const MAX_FILE_BYTES = 8 * 1024 * 1024;

const MAX_FILE_SIZE = '8 MB';

const END_HOLD_SECONDS = 5;

const REPLAY_LEAD_SECONDS = 1.2;

const PAUSE_EASE_SECONDS = 0.35;

const VOICES = ['grand', 'upright', 'sixteen', 'wurlitzer', 'synth'] as const;

const BEATS = [
  'none',
  'kit',
  'lofi',
  'percussion',
  'linndrum',
  'machine',
] as const;

const toPath = (id?: string): string =>
  id ? `/${EXPERIMENTS}/${PATH}/${id}` : `/${EXPERIMENTS}/${PATH}`;

export {
  ACCEPT,
  BEATS,
  CLASS_NAME,
  END_HOLD_SECONDS,
  MAX_FILE_BYTES,
  MAX_FILE_SIZE,
  PARAM,
  PATH,
  PAUSE_EASE_SECONDS,
  REPLAY_LEAD_SECONDS,
  VOICES,
  toPath,
};
