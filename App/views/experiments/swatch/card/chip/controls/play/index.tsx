import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { Button } from 'design/components';

// Hooks
import { useResponsive, useTranslation } from 'design/hooks';
import { useCard } from '@/views/experiments/swatch/use-card';

// Context
import { useFilm } from '@/views/experiments/swatch/film/context';

// Busy while the film is still being made, then pauses and plays it.
const Play: React.FunctionComponent = () => {
  const { t } = useTranslation('swatch');
  const film = useFilm();
  const card = useCard();
  const making = Boolean(card?.stage);
  const { prefersReducedMotion } = useResponsive();

  if (!film || prefersReducedMotion || (!card?.video && !making)) {
    return null;
  }

  const { paused, setPaused } = film;
  const loading = making || film.loading;
  const play = paused || making;

  return (
    <Button
      aria-label={t('action', { context: play ? 'play' : 'pause' })}
      busy={loading}
      disabled={loading}
      onClick={() => {
        setPaused(!paused);
      }}
      size='small'
      variant='secondary'
    >
      {play ? (
        <Tb.TbPlayerPlay aria-hidden />
      ) : (
        <Tb.TbPlayerPause aria-hidden />
      )}
    </Button>
  );
};

export { Play };
