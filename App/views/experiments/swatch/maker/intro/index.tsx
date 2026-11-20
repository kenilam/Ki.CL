import React from 'react';

// Components
import { Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
import { useSpent } from '@/views/experiments/swatch/use-spent';

const Intro: React.FunctionComponent = () => {
  const { t } = useTranslation('swatch');
  const spent = useSpent();

  return (
    <Text dense is='p'>
      {t('lede', { context: spent ? 'spent' : undefined })}
    </Text>
  );
};

export { Intro };
