import React, { useEffect, useRef } from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Icons
import * as Ri from 'react-icons/ri';

// Components
import {
  BackLink,
  Button,
  Layout,
  List,
  ListItem,
  Markdown,
  Text,
} from 'design/components';

// Context
import { usePlayerContext } from '@/views/experiments/kinetic-light/song/player/context';

// Hooks
import { useArrangement } from '@/views/experiments/kinetic-light/song/player/use-arrangement';

// Partials
import { Beat } from '@/views/experiments/kinetic-light/song/player/beat';
import { Settings } from '@/views/experiments/kinetic-light/song/player/settings';
import { Sound } from '@/views/experiments/kinetic-light/song/player/sound';
import { Title } from '@/views/experiments/kinetic-light/song/player/title';

// Styles
import './styles.scss';

// Constants
import {
  CLASS_NAME as VIEW,
  toPath,
} from '@/views/experiments/kinetic-light/constants';

const CLASS_NAME = `${VIEW}__player__chrome`;

const Chrome: React.FunctionComponent = () => {
  const { piece, transport } = usePlayerContext();
  const translations = {
    common: useTranslation(),
    kineticLight: useTranslation('kinetic-light'),
  };
  const { error, pause, play, status } = transport;
  const arrangement = useArrangement();
  const playButton = useRef<HTMLButtonElement>(null);
  const playing = status === 'playing';

  useEffect(() => {
    if (arrangement.arranging) {
      return;
    }

    playButton.current?.focus({ preventScroll: true });
  }, [arrangement.arranging]);

  let line = translations.kineticLight.t('source', { context: piece.source });

  if (transport.voice === 'wurlitzer') {
    line = translations.kineticLight.t('credit', { context: 'wurlitzer' });
  }

  if (status === 'loading') {
    line = translations.kineticLight.t('status', { context: 'loading' });
  }

  if (arrangement.arranging) {
    line = translations.common.t('arranging');
  }

  if (arrangement.error) {
    line = arrangement.error.message;
  }

  if (error) {
    line = translations.kineticLight.t('error', { context: 'playback' });
  }

  let icon = <Ri.RiPlayFill aria-hidden />;

  if (playing) {
    icon = <Ri.RiPauseMiniFill aria-hidden />;
  }

  if (status === 'loading' || arrangement.arranging) {
    icon = <Ri.RiLoader4Line aria-hidden className='is-revolving' />;
  }

  return (
    <Layout
      alignContent='end'
      alignItems='end'
      display='flex'
      gap='narrow'
      justifyContent='space-between'
      wrap
    >
      <section
        aria-label={translations.kineticLight.t('label', { context: 'player' })}
        className={classNames(
          CLASS_NAME,
          'kicl-inset-block-end-0',
          'kicl-inset-inline-0',
          'kicl-padding-block-end-frame',
          'kicl-padding-block-start-extreme',
          'kicl-padding-inline-frame',
          'kicl-pointer-events-none',
          'kicl-position-absolute'
        )}
      >
        <Layout autoFlow='row' gap='narrowest' justifyItems='start'>
          <header className='kicl-pointer-events-auto'>
            <BackLink
              className='kicl-margin-block-end'
              label={translations.common.t('experiment', {
                context: 'kinetic_light',
              })}
              to={toPath()}
            />
            <Title />
            <Text is='p' dense role='status' variant='secondary'>
              <Markdown>{line}</Markdown>
            </Text>
          </header>
        </Layout>
        <List
          alignItems='center'
          className='kicl-pointer-events-auto'
          display='flex'
          gap='narrow'
          wrap
        >
          <ListItem>
            <Button
              aria-label={
                playing
                  ? translations.common.t('action', { context: 'pause' })
                  : translations.common.t('action', { context: 'play' })
              }
              disabled={arrangement.arranging}
              onClick={() => (playing ? pause() : void play())}
              ref={playButton}
              size='small'
              variant='secondary'
            >
              {icon}
            </Button>
          </ListItem>
          <ListItem>
            <Sound />
          </ListItem>
          <ListItem>
            <Beat />
          </ListItem>
          <ListItem>
            <Settings />
          </ListItem>
        </List>
      </section>
    </Layout>
  );
};

export { Chrome };
