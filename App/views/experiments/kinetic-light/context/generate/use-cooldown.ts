// Hooks
import { useNow } from 'design/hooks';

function useCooldown(nextAllowedAt: string | null | undefined) {
  const until = nextAllowedAt ? Date.parse(nextAllowedAt) : 0;
  const now = useNow(1000, until);

  return Math.max(0, (until - now) / 1000);
}

export { useCooldown };
