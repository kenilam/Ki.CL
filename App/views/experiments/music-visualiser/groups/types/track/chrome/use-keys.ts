import { useEffect } from 'react';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

export function useKeys() {
  const {
    control: { skip, stop },
  } = useTrackContext();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;

      if (
        target &&
        ['INPUT', 'TEXTAREA', 'BUTTON', 'A'].includes(target.tagName)
      ) {
        return;
      }

      if (event.key === ' ') {
        event.preventDefault();
        stop();
      } else if (event.key === 'n' || event.key === 'ArrowRight') {
        skip();
      }
    };

    window.addEventListener('keydown', onKey);

    return () => window.removeEventListener('keydown', onKey);
  }, [skip, stop]);
}
