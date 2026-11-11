import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { HyperLink, ListItem } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

// Constants
import { toPlayPath } from '@/views/experiments/music-visualiser/constants';

const Next: React.FunctionComponent = () => {
  const { next, track } = useTrackContext();
  const { t } = useTranslation('music-visualiser');

  return (
    <ListItem>
      <HyperLink
        aria-label={t('action', { context: 'next' })}
        disabled={!next}
        lookLikeButton
        size='small'
        to={toPlayPath(next ?? track)}
        variant='secondary'
      >
        <Tb.TbPlayerSkipForwardFilled aria-hidden />
      </HyperLink>
    </ListItem>
  );
};

export { Next };
