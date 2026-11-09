import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Icons
import * as Bs from 'react-icons/bs';

// Components
import { CopyButton } from 'design/components';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

// Constants
import { toPlayPath } from '@/views/experiments/music-visualiser/constants';

/** Copies the address of this track's `/play`. */
const CopyLink: React.FunctionComponent = () => {
  const { track } = useTrackContext();
  const translations = {
    common: useTranslation(),
    musicVisualiser: useTranslation('music-visualiser'),
  };

  return (
    <CopyButton
      copiedLabel={translations.common.t('status', { context: 'copied' })}
      icon={<Bs.BsLink45Deg aria-hidden />}
      label={translations.musicVisualiser.t('action', { context: 'copy_link' })}
      size='small'
      value={() => new URL(toPlayPath(track), window.location.origin).href}
      variant='ghost'
    />
  );
};

export { CopyLink };
