// Constants
import { CLASS_NAME } from '@/views/experiments/tree-of-life/explorer/constants';

export const LIST_ID = `${CLASS_NAME}--taxa`;

/**
 * How long typing has to pause before a search is sent. On the fallback path
 * each request goes to a third party.
 */
export const DEBOUNCE_MS = 250;

/** Below this the server rejects the query, so there is no point sending it. */
export const MIN_LENGTH = 2;

/** What the dropdown offers: a name to show and the node it leads to. */
export type Option = {
  nodeId: string;
  name: string;
  detail: string;
};

/**
 * Which `status` phrase the field reads. A search matching nothing falls back
 * to what is on screen, so it says so.
 */
export function statusKey({
  loading,
  searching,
  matches,
}: {
  loading: boolean;
  searching: boolean;
  matches: number;
}): 'searching' | 'on_screen' | 'matched' | 'unmatched' {
  if (loading) {
    return 'searching';
  }

  if (!searching) {
    return 'on_screen';
  }

  return matches > 0 ? 'matched' : 'unmatched';
}

/** Two taxa can share a name, so the rank is what keeps an option unique. */
export function label(option: Option): string {
  return option.detail ? `${option.name} · ${option.detail}` : option.name;
}
