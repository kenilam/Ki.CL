import { useEffect, useState } from 'react';

/**
 * Whether the API would still turn a message away as too soon after the last
 * one. The agent can ask its next question inside that gap, so its choices
 * would otherwise be offered while picking one fails.
 */
function useCooldown(nextAllowedAt: string | null | undefined) {
  // Only there to render again once the gap is over.
  const [, setNow] = useState(0);
  const until = nextAllowedAt ? Date.parse(nextAllowedAt) : 0;

  useEffect(() => {
    const wait = until - Date.now();
    if (wait <= 0) {
      return;
    }
    const timer = setTimeout(() => setNow(Date.now()), wait);
    return () => clearTimeout(timer);
  }, [until]);

  return until > Date.now();
}

export { useCooldown };
