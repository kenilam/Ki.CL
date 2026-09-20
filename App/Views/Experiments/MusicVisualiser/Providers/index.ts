import type {
  Provider,
  Track,
  VibeFamily,
} from '@/Views/Experiments/MusicVisualiser/Spec';

import builtIn from './builtIn';

/*
 * The providers, in the order they are asked. Each is a group in the URL,
 * and the first is where the view's index sends a listener who arrives
 * with no group in mind.
 *
 * Only the built-in station is here yet. The catalogue provider - Audius
 * through the backend's Music module, streamed same-origin so the analyser
 * can read it - goes in front of it once that module exists; see the README
 * for the plan and the egress note on why it is not here already.
 */
const PROVIDERS: readonly Provider[] = [builtIn];

export type Radio = {
  /** The track at `/:group/:type/:id`, or `null` if no provider has it. */
  get(group: string, type: string, id: string): Promise<Track | null>;
  /** The provider for a group segment, if any. */
  group(slug: string): Provider | undefined;
  groups: readonly Provider[];
  /**
   * The next track. Held to a group, and within it a type, when asked;
   * otherwise the first provider that answers.
   */
  next(played: string[], group?: string, type?: VibeFamily): Promise<Track>;
};

const radio: Radio = {
  async get(group, type, id) {
    const provider = radio.group(group);

    if (!provider) {
      return null;
    }

    try {
      return await provider.get(type, id);
    } catch (error) {
      console.warn(
        `Music Visualiser: ${provider.name} could not resolve ${type}/${id}`,
        error
      );

      return null;
    }
  },
  group(slug) {
    return PROVIDERS.find((provider) => provider.group === slug);
  },
  groups: PROVIDERS,
  async next(played, group, type) {
    const candidates = group
      ? PROVIDERS.filter((provider) => provider.group === group)
      : PROVIDERS;
    let lastError: unknown = null;

    for (const provider of candidates) {
      try {
        return await provider.next(played, type);
      } catch (error) {
        lastError = error;
        console.warn(`Music Visualiser: ${provider.name} gave no track`, error);
      }
    }

    throw lastError ?? new Error('No provider returned a track');
  },
};

export default radio;
