import React, { useEffect } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from '@/components';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

// Hooks
import { useIdle } from './use-idle';

// Partials
import { Controls } from './controls';
import { NowPlaying } from './now-playing';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/music-visualiser/constants';

const CLASS_NAME = `${VIEW}__chrome`;

const COPY = {
  player: 'Player',
};

/**
 * The player over the picture: what is playing, and the controls. They fade
 * once the track sounds and the listener has been still, and come back on
 * any movement. Space pauses; `n` or the right arrow skips.
 */
const Chrome: React.FunctionComponent = () => {
  const { control } = useTrackContext();
  const idle = useIdle(control.playing && !control.loading);
  const { skip, stop } = control;

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

  return (
    <Layout
      alignContent='end'
      alignItems='end'
      autoFlow='column'
      gap='wide'
      justifyContent='space-between'
      justifyItems='start'
    >
      <section
        aria-label={COPY.player}
        className={classNames(
          CLASS_NAME,
          'kicl-inline-size-full',
          'kicl-position-relative',
          {
            [`${CLASS_NAME}--idle`]: idle,
          }
        )}
      >
        <NowPlaying />
        <Controls />
      </section>
    </Layout>
  );
};

export { CLASS_NAME, Chrome };
