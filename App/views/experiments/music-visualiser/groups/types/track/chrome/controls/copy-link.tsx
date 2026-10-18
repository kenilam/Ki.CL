import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Icons
import * as Fa from 'react-icons/fa6';

// Components
import { CopyButton } from 'design/components';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

// Constants
import { toPlayPath } from '@/views/experiments/music-visualiser/constants';

/** Copies the address of this track's `/play`. */
const CopyLink: React.FunctionComponent = () => {
  const { track } = useTrackContext();
  const { t } = useTranslation('music-visualiser');
  const { t: common } = useTranslation();

  return (
    <CopyButton
      copiedLabel={common('status', { context: 'copied' })}
      icon={<Fa.FaLink aria-hidden />}
      label={t('action', { context: 'copy_link' })}
      size='small'
      value={() => new URL(toPlayPath(track), window.location.origin).href}
      variant='ghost'
    />
  );
};

export { CopyLink };
