import React from 'react';

import { AnimatedText } from 'design/components';
import { useTranslation } from 'design/hooks';

import { useWithin } from '@/views/about/intro/use-within';

const Name: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { ref, within } = useWithin<HTMLElement>();

  return (
    <AnimatedText
      className='kicl-scroll-leave-near'
      easing='ease-expo-out'
      hold
      in={within}
      ref={ref}
      stagger={40}
      variant='secondary'
    >
      {t('name')}
    </AnimatedText>
  );
};

export { Name };
