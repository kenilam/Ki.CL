import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { HyperLink, ListItem, Spinner } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

// Constants
import { toTrackPath } from '@/views/experiments/music-visualiser/constants';

const Pause: React.FunctionComponent = () => {
  const { control, track } = useTrackContext();
  const { t } = useTranslation();

  return (
    <ListItem>
      <HyperLink
        aria-label={t('action', { context: 'pause' })}
        lookLikeButton
        size='small'
        to={toTrackPath(track)}
        variant='secondary'
      >
        {control.loading ? (
          <Spinner position='inline' />
        ) : (
          <Tb.TbPlayerPauseFilled aria-hidden />
        )}
      </HyperLink>
    </ListItem>
  );
};

export { Pause };
