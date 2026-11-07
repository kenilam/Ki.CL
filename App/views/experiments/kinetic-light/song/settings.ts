// Song
import type { Song } from '@/views/experiments/kinetic-light/song/use-song';

// Stage
import {
  DEFAULT_SETTINGS,
  type Settings,
} from '@/views/experiments/kinetic-light/stage/settings';

const settingsOf = (
  arrangement: Song['arrangement'] | undefined
): Settings => ({
  ...DEFAULT_SETTINGS,
  ...arrangement,
  glow: arrangement?.glow ?? DEFAULT_SETTINGS.glow,
  hue: arrangement?.hue ?? DEFAULT_SETTINGS.hue,
  speed: arrangement?.speed ?? DEFAULT_SETTINGS.speed,
});

export { settingsOf };
