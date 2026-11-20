import { useEffect, useRef, useState } from 'react';

// Hooks
import { useCard } from '@/views/experiments/swatch/use-card';

// Context
import { useFilm } from '@/views/experiments/swatch/film/context';

// Helpers
import { createEngine, type Engine } from './engine';

/**
 * Plays the swatch's tone while the sound is on and the film plays, under the
 * film's own sound, once the swatch is made.
 * Another swatch fades into its own tone. The engine is kept as a promise, so
 * a change while it loads stops the right one. Returns whether it's loading.
 */
const useTone = () => {
  const card = useCard();
  const film = useFilm();
  const quiet =
    (film?.muted ?? true) || (film?.paused ?? false) || Boolean(card?.stage);
  const engine = useRef<Promise<Engine> | null>(null);
  const [loading, setLoading] = useState(false);
  const tone = quiet ? null : (card?.tone ?? null);

  useEffect(() => {
    const previous = engine.current;
    const next = tone ? createEngine(tone) : null;

    engine.current = next;
    setLoading(Boolean(next));
    void next?.finally(() => {
      if (engine.current === next) {
        setLoading(false);
      }
    });
    void previous?.then((current) => current.stop());
  }, [tone]);

  useEffect(() => {
    return () => {
      void engine.current?.then((current) => current.stop());
    };
  }, []);

  return loading;
};

export { useTone };
