import React from 'react';

import classNames from 'classnames';

import { AnimatedText } from 'design/components';
import { useTranslation } from 'design/hooks';

import { useWithin } from '@/views/about/intro/use-within';

const CLASS_NAME = classNames(
  'kicl-font-size-medium',
  'kicl-max-inline-size-columns-4',
  'kicl-scroll-leave-near',
  'kicl-text-wrap-balance'
);

const Lead: React.FunctionComponent = () => {
  const { t } = useTranslation('about');
  const { ref, within } = useWithin<HTMLElement>();

  return (
    <>
      <AnimatedText
        className={CLASS_NAME}
        delay={120}
        duration='slow'
        easing='ease-expo-out'
        hold
        in={within}
        ref={ref}
        stagger={20}
      >
        {t('lead')}
      </AnimatedText>
      <AnimatedText
        className={CLASS_NAME}
        delay={240}
        duration='slow'
        easing='ease-expo-out'
        hold
        in={within}
        stagger={20}
      >
        {t('lead', { context: 'material' })}
      </AnimatedText>
    </>
  );
};

export { Lead };
