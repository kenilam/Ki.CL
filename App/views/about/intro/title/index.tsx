import React from 'react';

import classNames from 'classnames';

import { Animated } from 'design/components';
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
    <Animated.Heading
      className={classNames(
        COLUMNS[String(isWider)],
        'kicl-align-self-center',
        'kicl-text-hyphenate',
        'kicl-scroll-leave-far'
      )}
      easing='ease-expo-out'
      hold
      id={TITLE_ID}
      in={ready || prefersReducedMotion}
      is='h1'
      lookLike='display'
      stagger={60}
    >
      {t('title', { context: 'about' })}
    </Animated.Heading>
  );
};

export { Title };
