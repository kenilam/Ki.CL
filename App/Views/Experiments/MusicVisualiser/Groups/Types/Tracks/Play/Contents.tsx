import React, { useEffect, useState } from 'react';

// Libraries
import classNames from 'classnames';

// Routes
import { useNavigate } from '@/Router';

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

// Context
import {
  useRadioContext,
  useTrackContext,
} from '@/Views/Experiments/MusicVisualiser/Context';

// Constants
import {
  CLASS_NAME as VIEW,
  toTrackPath,
  trackKey,
} from '@/Views/Experiments/MusicVisualiser/constants';

const CLASS_NAME = `${VIEW}__chrome`;

/** Seconds without the pointer moving before the chrome fades. */
const IDLE_SECONDS = 4;

const COPY = {
  copied: 'Link copied',
  copy: 'Copy link to this track',
  next: 'Next track',
  pause: 'Pause',
  volume: 'Volume',
};

/** How long "copied" stays on the button. */
const COPIED_MS = 1800;

/**
 * `/play` - the track sounds, and the route is the only thing that says
 * so. Arriving starts the track, or resumes it if it is the one held;
 * moving to another track's player starts that one; leaving holds it,
 * silent, so pausing is leaving for the track's gate. A play link opened
 * cold, with no gesture yet, is sent back to the gate, whose play link is
 * the gesture. Draws the now-playing card and the controls, which fade
 * once the listener has been still for a few seconds and come back on any
 * movement, so the stage is the page.
 */
const Play: React.FunctionComponent = () => {
  const track = useTrackContext();
  const navigate = useNavigate();
  const {
    error,
    next,
    setVolume,
    start,
    state,
    stop,
    track: current,
    volume,
  } = useRadioContext();
  const key = trackKey(track);
  const [idle, setIdle] = useState(false);
  const [copied, setCopied] = useState(false);
  const playing = state === 'playing';

  const pause = () => navigate(toTrackPath(track));

  useEffect(() => {
    let left = false;

    void start(track).then((started) => {
      if (!started && !left) {
        navigate(toTrackPath(track), { replace: true });
      }
    });

    return () => {
      left = true;
    };
    // The track is read by key: a new object for the same track is the same track.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => stop, [stop]);

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
        pause();
      } else if (event.key === 'n' || event.key === 'ArrowRight') {
        next();
      }
    };

    window.addEventListener('keydown', onKey);

    return () => window.removeEventListener('keydown', onKey);
    // `pause` only navigates; it has no state of its own.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next]);

  /* What the radio holds once it has started; until then, the route's track. */
  const shown = current ?? track;

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
              {shown.title}
            </Heading>
            <Text
              is='p'
              dense
              variant='secondary'
              className='kicl-font-size-small'
            >
              {shown.artist}
            </Text>
            {shown.attribution.url ? (
              <HyperLink
                className='kicl-font-size-smaller'
                to={shown.attribution.url}
              >
                {shown.attribution.label}
              </HyperLink>
            ) : (
              <Text
                is='p'
                dense
                variant='secondary'
                className='kicl-font-size-smaller'
              >
                {shown.attribution.label}
              </Text>
            )}
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
            {/* The same control as the track's play: here it shows pause and links back. */}
            <HyperLink
              aria-label={COPY.pause}
              lookLikeButton
              size='small'
              to={toTrackPath(track)}
              variant='secondary'
            >
              {state === 'loading' ? (
                <Spinner position='inline' size='smaller' />
              ) : (
                <Fa.FaPause aria-hidden />
              )}
            </HyperLink>
            <Button
              aria-label={COPY.next}
              onClick={next}
              variant='ghost'
              size='small'
            >
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

export default Play;
