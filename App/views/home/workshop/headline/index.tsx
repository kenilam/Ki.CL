import React from 'react';

import classNames from 'classnames';

import { Animated } from 'design/components';
import { useResponsive, useTranslation } from 'design/hooks';

import { useEntered } from '@/views/use-entered';
import { TITLE_ID } from '@/views/home/workshop/constants';

import './styles.scss';

import { CLASS_NAME } from './constants';

const LOOKS = {
  true: 'h3',
  false: 'h2',
} as const;

const Headline: React.FunctionComponent = () => {
  const { t } = useTranslation('home');
  const { entered, ref } = useEntered();
  const { isNarrow } = useResponsive();

  return (
    <Animated.Heading
      className={classNames(
        CLASS_NAME,
        'kicl-max-inline-size-columns-8',
        'kicl-text-align-center'
      )}
      easing='ease-expo-out'
      hold
      id={TITLE_ID}
      in={entered}
      is='h2'
      lookLike={LOOKS[String(isNarrow)]}
      property='slide-from-top'
      ref={ref}
    >
      {t('workshop')}
    </Animated.Heading>
  );
};

export { Headline };
