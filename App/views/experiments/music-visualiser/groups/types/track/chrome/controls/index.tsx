import React from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import * as Fa from 'react-icons/fa6';
import * as Ri from 'react-icons/ri';

// Components
import { HyperLink, Layout, List, ListItem } from 'design/components';

// Hooks
import { useResponsive } from 'design/hooks';

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
  const { isMobile } = useResponsive();

  return (
    <Layout
      alignItems='center'
      autoFlow={isMobile ? 'row' : 'column'}
      gap='narrow'
      justifyContent='end'
      justifyItems='end'
    >
      {/* Fades as one while the listener is still. */}
      <div className={classNames(CLASS_NAME, 'kicl-transition-duration-slow')}>
        <List alignItems='center' autoFlow='column' gap='narrow'>
          <ListItem>
            <HyperLink
              aria-label={COPY.pause}
              lookLikeButton
              size='small'
              to={toTrackPath(track)}
              variant='secondary'
            >
              {control.loading ? (
                <Ri.RiLoader4Line aria-hidden className='is-revolving' />
              ) : (
                <Fa.FaPause aria-hidden />
              )}
            </HyperLink>
          </ListItem>
          <ListItem>
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
          </ListItem>
          <ListItem>
            <CopyLink />
          </ListItem>
        </List>
        <Volume />
      </div>
    </Layout>
  );
};

export { Controls };
