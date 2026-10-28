import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Icons
import * as Fa from 'react-icons/fa6';
import * as Ri from 'react-icons/ri';

// Components
import { HyperLink, List, ListItem } from 'design/components';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

// Partials
import { Clip } from './clip';
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

/**
 * Pause, skip, copy, clip and volume. Pause links to the track's gate and skip to
 * the next track's `/play`. On phones and tablets the volume goes under the buttons.
 */
const Controls: React.FunctionComponent = () => {
  const { control, next, track } = useTrackContext();
  const { t } = useTranslation('music-visualiser');
  const { t: common } = useTranslation();

  return (
    // Fades as one while the listener is still.
    <List
      alignItems='center'
      className={classNames(CLASS_NAME, 'kicl-transition-duration-slow')}
      display='flex'
      gap='narrow'
      justifyContent='end'
      wrap
    >
      <ListItem>
        <HyperLink
          aria-label={common('action', { context: 'pause' })}
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
          aria-label={t('action', { context: 'next' })}
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
      <Clip />
      <ListItem>
        <Volume />
      </ListItem>
    </List>
  );
};

export { Controls };
