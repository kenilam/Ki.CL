import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { Button, ListItem } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
import { usePlay } from './use-play';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/kinetic-light/constants';

const CLASS_NAME = `${VIEW}__player__chrome__play`;

const Play: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { arranging, button, pause, play, status } = usePlay();
  const playing = status === 'playing';

  let icon = <Tb.TbPlayerPlayFilled aria-hidden />;

  if (playing) {
    icon = <Tb.TbPlayerPauseFilled aria-hidden />;
  }

  return (
    <ListItem className={CLASS_NAME}>
      <Button
        aria-keyshortcuts='Space'
        aria-label={t('action', { context: playing ? 'pause' : 'play' })}
        busy={status === 'loading' || arranging}
        onClick={() => (playing ? pause() : void play())}
        ref={button}
        size='small'
        variant='secondary'
      >
        {icon}
      </Button>
    </ListItem>
  );
};

export { Play };
