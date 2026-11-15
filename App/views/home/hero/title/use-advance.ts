import { useEffect, useRef } from 'react';

import { useResponsive } from 'design/hooks';

import { getRest } from '@/views/home/hero/rest';

import { glide } from './glide';

const WAIT = 600;

const INTERRUPTIONS = ['keydown', 'touchmove', 'wheel'] as const;

const useAdvance = () => {
  const header = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const { prefersReducedMotion } = useResponsive();

  useEffect(() => {
    const [outer, inner] = [header.current, heading.current];

    if (prefersReducedMotion || !outer || !inner) {
      return;
    }

    const controller = new AbortController();
    const idle = new AbortController();
    const { signal } = controller;
    const words = inner.getAnimations({ subtree: true }).filter((animation) => {
      return Number.isFinite(animation.effect?.getComputedTiming().endTime);
    });

    const advance = async () => {
      await Promise.allSettled(
        words.map((word) => {
          return word.finished;
        })
      );
      await new Promise((resolve) => {
        window.setTimeout(resolve, WAIT);
      });

      if (signal.aborted) {
        return;
      }

      idle.abort();
      glide(getRest(), signal);
    };

    const interrupt = () => {
      controller.abort();
      idle.abort();
    };

    INTERRUPTIONS.forEach((type) => {
      window.addEventListener(type, interrupt, { passive: true, signal });
    });
    window.addEventListener('scroll', interrupt, {
      passive: true,
      signal: idle.signal,
    });

    void advance();

    return interrupt;
  }, [prefersReducedMotion]);

  return { header, heading };
};

export { useAdvance };
