import React from 'react';

import classNames from 'classnames';

import { AnimatedText } from 'design/components';
import { useTranslation } from 'design/hooks';

import { useShown } from './use-shown';

import './styles.scss';

import { CLASS_NAME as HERO } from '@/views/home/hero/constants';

const CLASS_NAME = `${HERO}__tagline`;

const Tagline: React.FunctionComponent = () => {
  const { t } = useTranslation('home');
  const shown = useShown();

  return (
    <AnimatedText
      className={classNames(
        CLASS_NAME,
        'kicl-font-size-medium',
        'kicl-font-weight-bold',
        'kicl-letter-spacing-tight',
        'kicl-line-height-narrow',
        'kicl-text-wrap-balance'
      )}
      duration='slow'
      easing='ease-expo-out'
      in={shown}
      property='slide-from-left'
      stagger={20}
    >
      {t('tagline')}
    </AnimatedText>
  );
};

export { Tagline };
