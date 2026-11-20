import { useMemo } from 'react';

// Libraries
import { identify } from 'chromonym';
import { pantone } from 'chromonym/pantone';

// Hooks
import { useCard } from '@/views/experiments/swatch/use-card';

// The nearest Pantone Coated color by CIEDE2000, as pantoneconverter.com finds it.
const usePantone = () => {
  const hex = useCard()?.hex;

  return useMemo(() => {
    if (!hex) {
      return null;
    }

    const [match] = identify(hex, {
      k: 1,
      metric: 'deltaE2000',
      palette: pantone,
    });

    return match ?? null;
  }, [hex]);
};

export { usePantone };
