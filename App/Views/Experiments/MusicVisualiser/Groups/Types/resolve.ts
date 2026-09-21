// Spec
import type { Provider } from '@/Views/Experiments/MusicVisualiser/Spec';

// Providers
import radio from '@/Views/Experiments/MusicVisualiser/Providers';

// Constants
import { PARAMS } from '@/Views/Experiments/MusicVisualiser/constants';

export type Params = { [PARAMS.group]?: string; [PARAMS.type]?: string };

export type Resolved = {
  group?: string;
  provider?: Provider;
  /** The type, when the provider has it. */
  type: string | null;
};

/** The station and the family the params name, when they name real ones. */
export default function resolve(params: Params): Resolved {
  const group = params[PARAMS.group];
  const type = params[PARAMS.type];
  const provider = group ? radio.group(group) : undefined;
  const known = provider && type && provider.types.includes(type) ? type : null;

  return { group, provider, type: known };
}
