import React from 'react';

import classNames from 'classnames';

import { Animated } from 'design/components';
import { useResponsive, useTranslation } from 'design/hooks';
import { Background } from 'design/widgets';

import { useReady } from '@/views/ready/context';

import { TITLE_ID } from '@/views/about/intro/constants';
import { useInverse } from '@/views/use-inverse';

const COLUMNS = {
  true: 'kicl-grid-column-1',
  false: 'kicl-grid-column-2',
};

const Title: React.FunctionComponent = () => {
  const { t } = useTranslation('home');
  const { isNarrow, isWider, prefersReducedMotion } = useResponsive();
  const { ready } = useReady();
  const inverse = useInverse();

  return (
    <Animated.Heading
      className={classNames(
        COLUMNS[String(isWider)],
        'kicl-align-self-center',
        'kicl-overflow-wrap-break-word',
        'kicl-scroll-leave-far',
        { 'kicl-hyphens-auto': isNarrow }
      )}
      easing='ease-expo-out'
      hold
      id={TITLE_ID}
      in={ready || prefersReducedMotion}
      is='h1'
      lookLike='display'
      media={<Background className={inverse} />}
      stagger={60}
    >
      {t('title', { context: 'about' })}
    </Animated.Heading>
  );
};

export { Title };
