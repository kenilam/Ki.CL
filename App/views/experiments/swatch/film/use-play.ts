import { useEffect, useRef } from 'react';

// Context
import { useFilm } from './context';

// Constants
import { FILM_SHARE, TONE_LEVEL } from '@/views/experiments/swatch/constants';

// A share of the tone's level, so the film's sound sits under it.
const VOLUME = FILM_SHARE * 10 ** (TONE_LEVEL / 20);

// Pauses, plays, mutes and unmutes the film's video when the visitor asks. A film without a sound of
// its own stays muted.
const usePlay = (src?: string | null, audio?: boolean) => {
  const ref = useRef<HTMLElement>(null);
  const film = useFilm();
  const paused = film?.paused ?? false;
  const muted = film?.muted ?? true;
  const setLoading = film?.setLoading;

  // Loading until the video can play; a photograph shown instead has nothing to wait for.
  useEffect(() => {
    const video = ref.current?.querySelector('video');

    if (!setLoading) {
      return;
    }

    if (!video) {
      setLoading(false);

      return;
    }

    const ready = () => {
      setLoading(false);
    };
    const waiting = () => {
      setLoading(true);
    };

    setLoading(video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA);
    video.addEventListener('canplay', ready);
    video.addEventListener('playing', ready);
    video.addEventListener('waiting', waiting);

    return () => {
      video.removeEventListener('canplay', ready);
      video.removeEventListener('playing', ready);
      video.removeEventListener('waiting', waiting);
    };
  }, [setLoading, src]);

  useEffect(() => {
    const video = ref.current?.querySelector('video');

    if (!video) {
      return;
    }

    video.muted = muted || !audio;
    video.volume = VOLUME;

    if (paused) {
      video.pause();

      return;
    }

    void video.play().catch(() => undefined);
  }, [audio, muted, paused, src]);

  return ref;
};

export { usePlay };
