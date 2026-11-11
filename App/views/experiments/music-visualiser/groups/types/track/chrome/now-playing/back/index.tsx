import React from 'react';

// Components
import { BackLink } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { toPath } from '@/views/experiments/music-visualiser/constants';

const Back: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <BackLink
      className='kicl-margin-block-end'
      label={t('experiment', { context: 'music_visualiser' })}
      to={toPath()}
    />
  );
};

export { Back };
