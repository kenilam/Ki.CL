import React from 'react';

import classNames from 'classnames';

import { AnimatedText, Heading } from 'design/components';
import { useResponsive, useTranslation } from 'design/hooks';

import { useReady } from '@/views/about/ready/context';

import { TITLE_ID } from '@/views/about/intro/constants';

const COLUMNS = {
  true: 'kicl-grid-column-1',
  false: 'kicl-grid-column-2',
};

const Title: React.FunctionComponent = () => {
  const { t } = useTranslation('home');
  const { isWider, prefersReducedMotion } = useResponsive();
  const { ready } = useReady();

  return (
    <Heading
      className={classNames(
        COLUMNS[String(isWider)],
        'kicl-align-self-center',
        'kicl-scroll-leave-far'
      )}
      id={TITLE_ID}
      is='h1'
      lookLike='display'
    >
      <AnimatedText
        easing='ease-expo-out'
        hold
        in={ready || prefersReducedMotion}
        is='span'
        stagger={60}
        unstyled
      >
        {t('title', { context: 'about' })}
      </AnimatedText>
    </Heading>
  );
};

export { Title };
