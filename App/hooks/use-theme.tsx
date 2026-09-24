import { useSyncExternalStore } from 'react';

// Libraries
import { useMediaQuery } from 'react-responsive';

type Theme = 'dark' | 'light';

/**
 * A cookie rather than local storage, so a server can read the choice and
 * render in it once there is one that renders.
 */
const COOKIE_NAME = 'kicl-theme';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

const readCookie = (): Theme | undefined => {
  const value = document.cookie
    .split('; ')
    .find((entry) => entry.startsWith(`${COOKIE_NAME}=`))
    ?.split('=')[1];

  return value === 'dark' || value === 'light' ? value : undefined;
};

const setTheme = (theme: Theme) => {
  document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;

  listeners.forEach((listener) => listener());
};

/**
 * Follows the system until the person picks a theme, then keeps their pick.
 */
const useTheme = () => {
  const isDarkColorSchemePrefers = useMediaQuery({
    query: '(prefers-color-scheme: dark)',
  });

  const chosen = useSyncExternalStore(subscribe, readCookie);

  const theme: Theme = chosen ?? (isDarkColorSchemePrefers ? 'dark' : 'light');

  return { isDarkColorSchemePrefers, setTheme, theme };
};

export { type Theme, useTheme };
