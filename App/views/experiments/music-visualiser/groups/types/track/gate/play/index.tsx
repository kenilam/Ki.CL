import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { HyperLink } from 'design/components';

// Catalog
import { useNames } from '@/views/experiments/music-visualiser/use-names';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

// Constants
import { toPlayPath } from '@/views/experiments/music-visualiser/constants';

const Play: React.FunctionComponent = () => {
  const { track } = useTrackContext();
  const { t } = useTranslation('music-visualiser');
  const { title } = useNames(track);

  return (
    <HyperLink
      aria-label={t('action', { context: 'play', title })}
      className='kicl-margin-block-start-wide'
      lookLikeButton
      size='small'
      to={toPlayPath(track)}
      variant='ghost'
    >
      <Tb.TbPlayerPlayFilled aria-hidden />
    </HyperLink>
  );
};

export { Play };
