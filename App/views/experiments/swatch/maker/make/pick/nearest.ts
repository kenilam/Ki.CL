// Helpers
import { distanceOf } from '@/views/experiments/swatch/oklab';

type Swatch = { hex?: string | null; id: string };

// The swatch whose color looks closest to `hex`, measured in OKLab.
const nearestOf = (swatches: Swatch[], hex: string) => {
  return swatches.reduce<{ distance: number; id: string } | null>(
    (closest, swatch) => {
      if (!swatch.hex) {
        return closest;
      }

      const distance = distanceOf(hex, swatch.hex);

      return closest && closest.distance <= distance
        ? closest
        : { distance, id: swatch.id };
    },
    null
  );
};

export { nearestOf };
