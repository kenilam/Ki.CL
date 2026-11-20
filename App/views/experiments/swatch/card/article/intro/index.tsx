import React from 'react';

// Components
import { Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

const Intro: React.FunctionComponent = () => {
  const { t } = useTranslation('swatch');

  return (
    <Text className='kicl-max-inline-size-columns-8' is='p'>
      {t('article.intro')}
    </Text>
  );
};

export { Intro };
