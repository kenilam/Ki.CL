import { useResponsive } from 'design/hooks';

import type { Fiber } from '@/three';

import { ease, scroll } from '@/views/about/stage/scroll';

import { useStage } from '@/views/about/stage/context';

import { GRID, POSES } from './constants';

const mix = (from: number, to: number, amount: number) => {
  return from + (to - from) * amount;
};

const usePose = () => {
  const { isNarrow, prefersReducedMotion: still } = useResponsive();
  const stage = useStage();

  return (
    { height, width }: Fiber.RootState['viewport'],
    screen: Fiber.RootState['size']
  ) => {
    const { ending, opening, timeline } = POSES[String(isNarrow)];
    const { left, past } = scroll();
    const into = still ? 1 : ease(past);
    const out = still ? 0 : 1 - ease(left);
    const drift = still ? 0 : Math.sin(past * 0.9) * 0.05;
    const side = Math.min(height, width);
    const columns = ((stage.columns || screen.width) * height) / screen.height;

    const across = mix(
      mix(opening.across, timeline.across, into),
      ending.across,
      out
    );
    const span = mix(mix(opening.span, timeline.span, into), ending.span, out);
    const up = mix(mix(opening.up, timeline.up, into), ending.up, out);

    return {
      scale: Math.min(side * span, columns / 2) / GRID,
      x: columns * across,
      y: height * (up + drift),
    };
  };
};

export { usePose };
