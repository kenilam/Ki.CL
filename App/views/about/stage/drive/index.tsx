import React, { PropsWithChildren, useEffect, useRef } from 'react';

import { useResponsive } from 'design/hooks';

import { Fiber } from '@/three';

import { Provider, type Glyph } from '@/views/mark/context';

import { useActive } from '@/views/about/active/context';
import { scroll } from '@/views/about/stage/scroll';

import { GLYPHS, OPENING } from '@/views/about/constants';

const HOLD = 900;

const LIGHT = { ambient: 1, environment: 0.35, key: 1 };

const OCCLUSION = { halfRes: true, quality: 'medium', samples: 4 } as const;

const sway = () => {
  return Math.sin(scroll().past * 1.3) * 0.5;
};

const rest = () => {
  return 0;
};

const Drive: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { prefersReducedMotion: still } = useResponsive();
  const invalidate = Fiber.useThree(({ invalidate }) => invalidate);
  const { read } = useActive();
  const scrolled = useRef(-HOLD);
  const shown = useRef<Glyph>(GLYPHS[OPENING]);

  const pick = () => {
    if (still || performance.now() - scrolled.current >= HOLD) {
      shown.current = GLYPHS[read()];
    }

    return shown.current;
  };

  useEffect(() => {
    const mark = () => {
      scrolled.current = performance.now();
      invalidate();
    };

    window.addEventListener('scroll', mark, { passive: true });

    return () => {
      window.removeEventListener('scroll', mark);
    };
  }, [invalidate]);

  return (
    <Provider
      ink='backgroundColor'
      light={LIGHT}
      occlusion={OCCLUSION}
      pick={pick}
      sway={still ? rest : sway}
    >
      {children}
    </Provider>
  );
};

export { Drive };
