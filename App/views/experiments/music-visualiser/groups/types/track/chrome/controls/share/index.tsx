import React from 'react';

// Components
import { ListItem, ShareButton } from 'design/components';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

// Hooks
import { useTranslation } from 'design/hooks';
import { useNames } from '@/views/experiments/music-visualiser/use-names';

// Constants
import { toPlayPath } from '@/views/experiments/music-visualiser/constants';

const Share: React.FunctionComponent = () => {
  const { track } = useTrackContext();
  const { title } = useNames(track);
  const translations = {
    common: useTranslation(),
    musicVisualiser: useTranslation('music-visualiser'),
  };

  return (
    <ListItem>
      <ShareButton
        copiedLabel={translations.common.t('status', { context: 'copied' })}
        label={translations.musicVisualiser.t('action', { context: 'share' })}
        size='small'
        title={title}
        value={() => {
          return new URL(toPlayPath(track), window.location.origin).href;
        }}
        variant='secondary'
      />
    </ListItem>
  );
};

export { Share };
