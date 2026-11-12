// Hooks
import { useNow } from 'design/hooks';

/**
 * Whether the API would still turn a message away as too soon after the last
 * one. The agent can ask its next question inside that gap, so its choices
 * would otherwise be offered while picking one fails.
 */
function useCooldown(nextAllowedAt: string | null | undefined) {
  const until = nextAllowedAt ? Date.parse(nextAllowedAt) : 0;
  const now = useNow(1000, until);

  return until > now;
}

export { useCooldown };
