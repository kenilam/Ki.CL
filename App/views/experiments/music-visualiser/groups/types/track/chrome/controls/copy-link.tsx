import React, { useState } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Icons
import * as Fa from 'react-icons/fa6';

// Components
import { Button } from 'design/components';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

// Constants
import { toPlayPath } from '@/views/experiments/music-visualiser/constants';

/** How long "copied" stays on the link. */
const COPIED_MS = 1800;

/** Copies the address of this track's `/play`. */
const CopyLink: React.FunctionComponent = () => {
  const { track } = useTrackContext();
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation('music-visualiser');
  const { t: common } = useTranslation();
  const label = copied
    ? common('status', { context: 'copied' })
    : t('action', { context: 'copy_link' });

  const copyLink = async () => {
    // Missing outside a secure context, where nothing was copied.
    if (!navigator.clipboard) {
      return;
    }

    const url = new URL(toPlayPath(track), window.location.origin).href;

    await navigator.clipboard.writeText(url);

    setCopied(true);
    window.setTimeout(() => setCopied(false), COPIED_MS);
  };

  return (
    <Button
      aria-label={label}
      onClick={() => void copyLink()}
      size='small'
      title={label}
      variant='ghost'
    >
      <Fa.FaLink aria-hidden />
    </Button>
  );
};

export { CopyLink };
