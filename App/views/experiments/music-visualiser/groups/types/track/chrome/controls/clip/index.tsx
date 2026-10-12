import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Icons
import * as Ri from 'react-icons/ri';

// Components
import { Button, ListItem } from 'design/components';

// Hooks
import { CLIP_SECONDS, useClip } from './use-clip';

/** Saves a short video of the picture with the track. */
const Clip: React.FunctionComponent = () => {
  const clip = useClip();
  const { t } = useTranslation('music-visualiser');
  const idle = clip.failed
    ? t('error', { context: 'clip' })
    : t('action', { context: 'clip', seconds: CLIP_SECONDS });
  const label = clip.recording ? t('label', { context: 'recording' }) : idle;

  if (!clip.supported) {
    return null;
  }

  return (
    <ListItem>
      <Button
        aria-label={label}
        disabled={clip.recording}
        level={clip.failed ? 'error' : undefined}
        onClick={clip.record}
        size='small'
        title={label}
        variant='ghost'
      >
        {clip.recording ? (
          <Ri.RiRecordCircleFill aria-hidden />
        ) : (
          <Ri.RiVideoDownloadLine aria-hidden />
        )}
      </Button>
    </ListItem>
  );
};

export { Clip };
