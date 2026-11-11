import { useMemo } from 'react';

// Context
import { useStageContext } from '@/views/experiments/kinetic-light/stage/context';

// Stage
import { SCALE } from '@/views/experiments/kinetic-light/stage/playhead';

const BARS_PER_SHOT = 8;

const useFraming = () => {
  const { sections, sheet } = useStageContext();
  const staves = useMemo(() => {
    const top = Math.min(...sheet.staves.map(({ top }) => top));
    const bottom = Math.max(...sheet.staves.map(({ bottom }) => bottom));

    return {
      center: ((top + bottom) / 2) * SCALE,
      depth: (bottom - top) * SCALE,
    };
  }, [sheet]);
  const cuts = useMemo(() => {
    const firsts = sections.length
      ? sections
      : sheet.bars
          .map((_, index) => index + 1)
          .filter((bar) => (bar - 1) % BARS_PER_SHOT === 0);

    return firsts
      .map((bar) => sheet.bars[bar - 1]?.time)
      .filter((time) => time !== undefined)
      .sort((a, b) => a - b);
  }, [sections, sheet]);

  return { cuts, staves };
};

export { useFraming };
