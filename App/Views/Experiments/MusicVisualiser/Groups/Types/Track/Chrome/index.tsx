import React, { useEffect } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from '@/Components';

// Catalog
import type { Track } from '@/Views/Experiments/MusicVisualiser/Catalog';

// Hooks
import useIdle from './useIdle';
import type { Control } from '../useAudio';

// Partials
import Controls from './Controls';
import NowPlaying from './NowPlaying';

// Styles
import './Styles.scss';

// Constants
import { CLASS_NAME as VIEW } from '@/Views/Experiments/MusicVisualiser/constants';

const CLASS_NAME = `${VIEW}__chrome`;

type Props = {
  control: Control;
  next: Track | null;
  track: Track;
};

/**
 * The player over the picture: what is playing, and the controls. They fade
 * once the track sounds and the listener has been still, and come back on
 * any movement. Space pauses; `n` or the right arrow skips.
 */
const Chrome: React.FunctionComponent<Props> = ({ control, next, track }) => {
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
      <footer
        className={classNames(CLASS_NAME, 'kicl-position-relative', {
          [`${CLASS_NAME}--idle`]: idle,
        })}
      >
        <NowPlaying error={control.error} track={track} />
        <Controls control={control} next={next} track={track} />
      </footer>
    </Layout>
  );
};

export { CLASS_NAME };
export default Chrome;
