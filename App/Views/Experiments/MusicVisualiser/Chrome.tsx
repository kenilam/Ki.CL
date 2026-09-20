import React, { useEffect, useState } from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import { Ri, Fa } from '@/Icons';

// Components
import {
  Button,
  Heading,
  HyperLink,
  Input,
  Layout,
  Spinner,
  Text,
} from '@/Components';

// Hooks
import type { Radio } from './useRadio';

// Constants
import { CLASS_NAME as VIEW } from './constants';

const CLASS_NAME = `${VIEW}__chrome`;

/** Seconds without the pointer moving before the chrome fades. */
const IDLE_SECONDS = 4;

const COPY = {
  copied: 'Link copied',
  copy: 'Copy link to this track',
  lede: 'A radio for slow music, drawn as it plays. Chill, lo-fi and piano, chosen at random, one after another. Press play once and it keeps going.',
  next: 'Next track',
  pause: 'Pause',
  play: 'Play',
  title: 'Music Visualiser',
  volume: 'Volume',
};

/** How long "copied" stays on the button. */
const COPIED_MS = 1800;

type Props = Radio;

/**
 * Everything that is not the picture: the opening gate, the now-playing
 * card and the controls. It fades once the listener has been still for a
 * few seconds and comes back on any movement, so the stage is the page.
 */
const Chrome: React.FunctionComponent<Props> = ({
  error,
  next,
  requested,
  setVolume,
  state,
  toggle,
  track,
  volume,
}) => {
  const [idle, setIdle] = useState(false);
  const [copied, setCopied] = useState(false);
  const playing = state === 'playing';

  const copyLink = () => {
    void navigator.clipboard?.writeText(window.location.href).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), COPIED_MS);
    });
  };

  useEffect(() => {
    if (!playing) {
      setIdle(false);

      return;
    }

    let timer = 0;

    const arm = () => {
      setIdle(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setIdle(true), IDLE_SECONDS * 1000);
    };

    const events = ['pointermove', 'pointerdown', 'keydown', 'touchstart'];

    events.forEach((event) => window.addEventListener(event, arm));
    arm();

    return () => {
      window.clearTimeout(timer);
      events.forEach((event) => window.removeEventListener(event, arm));
    };
  }, [playing]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;

      if (target && ['INPUT', 'TEXTAREA', 'BUTTON'].includes(target.tagName)) {
        return;
      }

      if (event.key === ' ') {
        event.preventDefault();
        toggle();
      } else if (event.key === 'n' || event.key === 'ArrowRight') {
        next();
      }
    };

    window.addEventListener('keydown', onKey);

    return () => window.removeEventListener('keydown', onKey);
  }, [next, toggle]);

  if (state === 'idle') {
    return (
      <Layout
        alignContent='center'
        alignItems='center'
        autoFlow='row'
        gap='wide'
        justifyContent='center'
        justifyItems='center'
      >
        <section
          className={classNames(
            CLASS_NAME,
            `${CLASS_NAME}--gate`,
            'kicl-inset-0',
            'kicl-position-absolute',
            'kicl-text-align-center'
          )}
        >
          <Heading is='h1' dense className='kicl-font-size-huge'>
            {COPY.title}
          </Heading>
          <Text is='p' className='kicl-font-size-medium'>
            {COPY.lede}
          </Text>
          <Button onClick={toggle} variant='ghost'>
            <Fa.FaPlay aria-hidden />
          </Button>
          {requested ? (
            <Text
              is='p'
              dense
              variant='secondary'
              className='kicl-font-size-small'
            >
              {requested.title} · {requested.artist}
            </Text>
          ) : null}
        </section>
      </Layout>
    );
  }

  return (
    <Layout
      alignContent='end'
      alignItems='end'
      autoFlow='column'
      gap='wide'
      justifyContent='space-between'
      justifyItems='start'
    >
      <footer
        className={classNames(CLASS_NAME, 'kicl-position-relative', {
          [`${CLASS_NAME}--idle`]: idle,
        })}
      >
        <Layout autoFlow='row' gap='narrowest' justifyItems='start'>
          <div className={`${CLASS_NAME}__now-playing`} aria-live='polite'>
            <Heading is='h2' dense className='kicl-font-size-large'>
              {track?.title ?? '…'}
            </Heading>
            <Text
              is='p'
              dense
              variant='secondary'
              className='kicl-font-size-small'
            >
              {track?.artist}
            </Text>
            {track?.attribution.url ? (
              <HyperLink
                className='kicl-font-size-smaller'
                to={track.attribution.url}
              >
                {track.attribution.label}
              </HyperLink>
            ) : track ? (
              <Text
                is='p'
                dense
                variant='secondary'
                className='kicl-font-size-smaller'
              >
                {track.attribution.label}
              </Text>
            ) : null}
            {error ? (
              <Text
                is='p'
                dense
                className='kicl-color-error kicl-font-size-small'
              >
                {error}
              </Text>
            ) : null}
          </div>
        </Layout>

        <Layout
          alignItems='center'
          autoFlow='column'
          gap='narrow'
          justifyContent='end'
        >
          <div className={`${CLASS_NAME}__controls`}>
            <Button
              aria-label={playing ? COPY.pause : COPY.play}
              onClick={toggle}
              variant='secondary'
              size='small'
            >
              {state === 'loading' ? (
                <Spinner position='inline' size='smaller' />
              ) : playing ? (
                <Fa.FaPause aria-hidden />
              ) : (
                <Fa.FaPlay aria-hidden />
              )}
            </Button>
            <Button aria-label={COPY.next} onClick={next} variant='ghost' size='small'>
              <Ri.RiSkipForwardFill aria-hidden />
            </Button>
            <Button
              aria-label={copied ? COPY.copied : COPY.copy}
              onClick={copyLink}
              title={copied ? COPY.copied : COPY.copy}
              variant='ghost'
              size='small'
            >
              <Fa.FaLink aria-hidden />
            </Button>
            <Input
              aria-label={COPY.volume}
              className={`${CLASS_NAME}__volume`}
              max={1}
              min={0}
              onChange={(event) => setVolume(Number(event.target.value))}
              step={0.01}
              type='range'
              value={volume}
            />
          </div>
        </Layout>
      </footer>
    </Layout>
  );
};

export { CLASS_NAME };
export default Chrome;
