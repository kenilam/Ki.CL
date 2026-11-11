import React from 'react';

// Libraries
import classNames from 'classnames';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { Button, ListItem } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
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
        variant='secondary'
      >
        <Tb.TbDisc
          aria-hidden
          className={classNames({
            'kicl-color-error': clip.recording,
            'is-revolving': clip.recording,
          })}
        />
      </Button>
    </ListItem>
  );
};

export { Clip };
