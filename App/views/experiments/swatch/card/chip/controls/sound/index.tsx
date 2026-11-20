import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { Button } from 'design/components';

// Hooks
import { useResponsive, useTranslation } from 'design/hooks';
import { useCard } from '@/views/experiments/swatch/use-card';
import { useTone } from './use-tone';

// Context
import { useFilm } from '@/views/experiments/swatch/film/context';

// Turns the swatch's sound on and off: its tone, with the film's own sound over it. Hidden until the swatch is made.
const Sound: React.FunctionComponent = () => {
  const { t } = useTranslation('swatch');
  const card = useCard();
  const film = useFilm();

  const { prefersReducedMotion } = useResponsive();
  const toneLoading = useTone();

  if (!film || card?.stage || (!card?.audio && !card?.tone)) {
    return null;
  }

  const { muted, setMuted } = film;
  const filmSound = card?.audio && !prefersReducedMotion;
  const loading = toneLoading || Boolean(filmSound && film.loading);

  return (
    <Button
      aria-label={t('action', { context: muted ? 'sound_on' : 'sound_off' })}
      aria-pressed={!muted}
      busy={loading}
      disabled={loading}
      onClick={() => {
        setMuted(!muted);
      }}
      size='small'
      variant='secondary'
    >
      {muted ? <Tb.TbVolumeOff aria-hidden /> : <Tb.TbVolume aria-hidden />}
    </Button>
  );
};

export { Sound };
