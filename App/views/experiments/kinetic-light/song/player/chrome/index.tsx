import React, { useEffect, useRef } from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Icons
import * as Bs from 'react-icons/bs';

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

// Partials
import { Beat } from './beat';
import { Progress } from './progress';
import { Settings } from './settings';
import { Sound } from './sound';
import { Title } from './title';

// Styles
import './styles.scss';

// Constants
import {
  CLASS_NAME as VIEW,
  toPath,
} from '@/views/experiments/kinetic-light/constants';

const CLASS_NAME = `${VIEW}__player__chrome`;

const Chrome: React.FunctionComponent = () => {
  const { arranger, piece, transport } = usePlayerContext();
  const translations = {
    common: useTranslation(),
    kineticLight: useTranslation('kinetic-light'),
  };
  const { error, pause, play, status } = transport;
  const playing = status === 'playing';
  const playButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (status !== 'playing' && status !== 'paused') {
      return;
    }

    playButton.current?.focus({ preventScroll: true });
  }, [status]);

  let line = translations.kineticLight.t('source', { context: piece.source });

  if (transport.voice === 'wurlitzer') {
    line = translations.kineticLight.t('credit', { context: 'wurlitzer' });
  }

  if (status === 'loading') {
    line = translations.kineticLight.t('status', { context: 'loading' });
  }

  if (arranger.arranging) {
    line = translations.common.t('arranging');
  }

  if (arranger.error) {
    line = arranger.error.message;
  }

  if (error) {
    line = translations.kineticLight.t('error', { context: 'playback' });
  }

  let icon = <Bs.BsPlayFill aria-hidden />;

  if (playing) {
    icon = <Bs.BsPauseFill aria-hidden />;
  }

  if (status === 'loading' || arranger.arranging) {
    icon = <Bs.BsArrowClockwise aria-hidden className='is-revolving' />;
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
        <Layout autoFlow='row' gap='narrow'>
          <div className='kicl-pointer-events-auto'>
            <Progress />
            <List alignItems='center' display='flex' gap='narrow' wrap>
              <ListItem className={`${CLASS_NAME}__play`}>
                <Button
                  aria-keyshortcuts='Space'
                  aria-label={
                    playing
                      ? translations.common.t('action', { context: 'pause' })
                      : translations.common.t('action', { context: 'play' })
                  }
                  disabled={arranger.arranging}
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
          </div>
        </Layout>
      </section>
    </Layout>
  );
};

export { Chrome };
