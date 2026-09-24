import React from 'react';

// Icons
import { Fa, Ri } from '@/icons';

// Components
import { HyperLink, Layout, Spinner } from '@/components';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

// Partials
import { CopyLink } from './copy-link';
import { Volume } from './volume';

// Styles
import './styles.scss';

// Constants
import {
  CLASS_NAME as VIEW,
  toPlayPath,
  toTrackPath,
} from '@/views/experiments/music-visualiser/constants';

const CLASS_NAME = `${VIEW}__chrome__controls`;

const COPY = {
  next: 'Next track',
  pause: 'Pause',
};

/**
 * Pause, skip, copy and volume. Pause links to the track's gate and skip to
 * the next track's `/play`. On phones and tablets the volume goes under the buttons.
 */
const Controls: React.FunctionComponent = () => {
  const { control, next, track } = useTrackContext();

  return (
    <Layout
      alignItems='center'
      autoFlow='column'
      gap='narrow'
      justifyContent='end'
      justifyItems='end'
    >
      <div className={CLASS_NAME}>
        <Layout alignItems='center' autoFlow='column' gap='narrow'>
          <div>
            <HyperLink
              aria-label={COPY.pause}
              lookLikeButton
              size='small'
              to={toTrackPath(track)}
              variant='secondary'
            >
              {control.loading ? (
                <Spinner position='inline' size='small' />
              ) : (
                <Fa.FaPause aria-hidden />
              )}
            </HyperLink>
            <HyperLink
              aria-label={COPY.next}
              disabled={!next}
              lookLikeButton
              size='small'
              to={toPlayPath(next ?? track)}
              variant='ghost'
            >
              <Ri.RiSkipForwardFill aria-hidden />
            </HyperLink>
            <CopyLink />
          </div>
        </Layout>
        <Volume />
      </div>
    </Layout>
  );
};

export { Controls };
