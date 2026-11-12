import React from 'react';

// Components
import { Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useScreenContext } from '@/views/experiments/home/stage/screen/context';

// Constants
import { MUSIC_VISUALISER_SCENES } from '@/views/experiments/previews';

const Description: React.FunctionComponent = () => {
  const { t } = useTranslation('experiments');
  const { experiment } = useScreenContext();

  return (
    <Text className='kicl-max-inline-size-columns-8' dense is='p'>
      {t('description', {
        context: experiment.context,
        scenes: MUSIC_VISUALISER_SCENES.length,
      })}
    </Text>
  );
};

export { Description };
