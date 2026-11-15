import React from 'react';

import classNames from 'classnames';

import { Animated } from 'design/components';
import { useTranslation } from 'design/hooks';

import { useShown } from './use-shown';

import './styles.scss';

import { CLASS_NAME as HERO } from '@/views/home/hero/constants';

const CLASS_NAME = `${HERO}__tagline`;

const Tagline: React.FunctionComponent = () => {
  const { t } = useTranslation('home');
  const shown = useShown();

  return (
    <Animated.Text
      className={classNames(
        CLASS_NAME,
        'kicl-letter-spacing-tight',
        'kicl-line-height-narrow',
        'kicl-text-wrap-balance'
      )}
      duration='fast'
      easing='ease-expo-out'
      in={shown}
      lookLike='h6'
      property='slide-from-left'
      stagger={20}
    >
      {t('tagline')}
    </Animated.Text>
  );
};

export { Tagline };
