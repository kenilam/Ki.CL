import { useResponsive, useTranslation } from 'design/hooks';
import { useMatch } from 'design/router';

import type { Fiber } from '@/three';

import { useAnchor } from '@/views/anchor/context';
import { PAGES } from '@/views/routes';
import { ease, scroll } from '@/views/stage/scroll';

import { useStage } from '@/views/stage/context';

import { beside } from './beside';
import { GRID, POSES, SIDES } from './constants';

type Pose = (typeof POSES)['about']['true']['opening'];

const PAGE = { true: 'resume', false: 'about' } as const;

const mix = (from: number, to: number, amount: number) => {
  return from + (to - from) * amount;
};

const usePose = () => {
  const { isNarrow, prefersReducedMotion: still } = useResponsive();
  const stage = useStage();
  const anchor = useAnchor();
  const { i18n } = useTranslation();
  const resume = useMatch(`${PAGES.resume}/*`);

  return (
    viewport: Fiber.RootState['viewport'],
    screen: Fiber.RootState['size']
  ) => {
    const { height, width } = viewport;
    const { ending, opening, timeline } =
      POSES[PAGE[String(Boolean(resume))]][String(isNarrow)];
    const { left, past } = scroll();
    const into = still ? 1 : ease(past);
    const out = still ? 0 : 1 - ease(left);
    const drift = still ? 0 : Math.sin(past * 0.9) * 0.05;
    const side = Math.min(height, width);
    const columns = ((stage.columns || screen.width) * height) / screen.height;
    const dir = i18n.dir();

    const place = ({ across, span, up }: Pose) => {
      return {
        scale: Math.min(side * span, columns / 2) / GRID,
        x: columns * across * SIDES[dir],
        y: height * up,
      };
    };

    const name = isNarrow ? anchor?.current : null;
    const start = name ? beside(name, viewport, screen, dir) : place(opening);
    const middle = place(timeline);
    const end = place(ending);

    return {
      scale: mix(mix(start.scale, middle.scale, into), end.scale, out),
      x: mix(mix(start.x, middle.x, into), end.x, out),
      y: mix(mix(start.y, middle.y, into), end.y, out) + height * drift,
    };
  };
};

export { usePose };
