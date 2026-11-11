import React from 'react';

// Components
import { Animation, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

const Failure: React.FunctionComponent = () => {
  const { control } = useTrackContext();
  const { t } = useTranslation('music-visualiser');

  if (!control.error) {
    return null;
  }

  return (
    <Animation property='slide-from-top'>
      <Text className='kicl-color-error' dense is='p' role='alert'>
        {t('error', { context: 'playback' })}
      </Text>
    </Animation>
  );
};

export { Failure };
