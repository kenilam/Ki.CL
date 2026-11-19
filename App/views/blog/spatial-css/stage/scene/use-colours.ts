import { useMemo } from 'react';

// Hooks
import { useResponsive } from 'design/hooks';

const PALETTES = {
  dark: {
    glass: 0.22,
    ink: '#4a4a4a',
    paper: '#e2e1e4',
    rims: { back: 'blue-300', side: 'red-300', under: 'yellow-300' },
    sheet: 0.5,
    stone: '#9a9a9a',
  },
  light: {
    glass: 0.42,
    ink: '#2e2e30',
    paper: '#9c9ca2',
    rims: { back: 'blue-500', side: 'orange-500', under: 'blue-300' },
    sheet: 0.88,
    stone: '#6a6a70',
  },
};

const useColours = () => {
  const { theme } = useResponsive();

  return useMemo(() => {
    const root = getComputedStyle(document.documentElement);
    const token = (name: string) => {
      return root.getPropertyValue(`--kicl-color-${name}`).trim();
    };
    const { rims, ...palette } = PALETTES[theme];

    return {
      ...palette,
      accent: token('info'),
      rims: {
        back: token(rims.back),
        side: token(rims.side),
        under: token(rims.under),
      },
      theme,
    };
  }, [theme]);
};

export { useColours };
