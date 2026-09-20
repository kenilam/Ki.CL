import type { Provider } from '@/Views/Experiments/MusicVisualiser/Spec';

import builtIn from './builtIn';

/*
 * The providers, in the order they are asked. The first to answer wins.
 *
 * Only the built-in station is here yet. The catalogue provider - Audius
 * through the backend's Music module, streamed same-origin so the analyser
 * can read it - goes in front of it once that module exists; see the README
 * for the plan and the egress note on why it is not here already.
 */
const PROVIDERS: Provider[] = [builtIn];

/**
 * Asks each provider in turn until one returns a track. A provider that
 * throws is skipped and logged, never fatal: the built-in station at the
 * end cannot fail, so there is always something to play.
 */
const radio: Provider = {
  async get(id) {
    for (const provider of PROVIDERS) {
      try {
        const track = await provider.get(id);

        if (track) {
          return track;
        }
      } catch (error) {
        console.warn(
          `Music Visualiser: ${provider.name} could not resolve ${id}`,
          error
        );
      }
    }

    return null;
  },
  name: 'radio',
  async next(played) {
    let lastError: unknown = null;

    for (const provider of PROVIDERS) {
      try {
        return await provider.next(played);
      } catch (error) {
        lastError = error;
        console.warn(`Music Visualiser: ${provider.name} gave no track`, error);
      }
    }

    throw lastError ?? new Error('No provider returned a track');
  },
};

export default radio;
