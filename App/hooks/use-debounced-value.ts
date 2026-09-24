import { useEffect, useState } from 'react';

/**
 * Returns `value` once it has stopped changing for `delay` ms. For work that
 * follows typing but shouldn't run on every keystroke.
 */
function useDebouncedValue<T>(value: T, delay: number): T {
  const [settled, setSettled] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setSettled(value), delay);
    return () => window.clearTimeout(timer);
  }, [delay, value]);

  return settled;
}

export { useDebouncedValue };
