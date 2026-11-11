import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { Button, CopyButton, ListItem } from 'design/components';

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
  const url = () => new URL(toPlayPath(track), window.location.origin).href;

  if (!('share' in navigator)) {
    return (
      <ListItem>
        <CopyButton
          copiedLabel={translations.common.t('status', { context: 'copied' })}
          icon={<Tb.TbLink aria-hidden />}
          label={translations.musicVisualiser.t('action', {
            context: 'copy_link',
          })}
          size='small'
          value={url}
          variant='secondary'
        />
      </ListItem>
    );
  }

  const label = translations.musicVisualiser.t('action', { context: 'share' });

  return (
    <ListItem>
      <Button
        aria-label={label}
        onClick={() => {
          navigator.share({ title, url: url() }).catch(() => undefined);
        }}
        size='small'
        title={label}
        variant='secondary'
      >
        <Tb.TbShare aria-hidden />
      </Button>
    </ListItem>
  );
};

export { Share };
