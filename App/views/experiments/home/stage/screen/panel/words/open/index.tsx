import React from 'react';

// Components
import { HyperLink, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useScreenContext } from '@/views/experiments/home/stage/screen/context';

const Open: React.FunctionComponent = () => {
  const translations = {
    common: useTranslation(),
    experiments: useTranslation('experiments'),
  };
  const { experiment } = useScreenContext();

  return (
    <HyperLink
      className='kicl-margin-block-start-narrow'
      level={experiment.level}
      lookLikeButton
      size='small'
      to={experiment.to}
    >
      {translations.common.t('action', { context: 'see_experience' })}
      <Text is='span' className='kicl-hidden'>
        {translations.experiments.t('action', {
          context: 'open_title',
          title: translations.common.t('experiment', {
            context: experiment.context,
          }),
        })}
      </Text>
    </HyperLink>
  );
};

export { Open };
