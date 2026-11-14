import React from 'react';

import classNames from 'classnames';

import { Animated } from 'design/components';
import { useTranslation } from 'design/hooks';

import { useEntered } from '@/views/use-entered';
import { TITLE_ID } from '@/views/home/workshop/constants';

import './styles.scss';

import { CLASS_NAME } from './constants';

const Headline: React.FunctionComponent = () => {
  const { t } = useTranslation('home');
  const { entered, ref } = useEntered();

  return (
    <Animated.Heading
      className={classNames(
        CLASS_NAME,
        'kicl-font-size-headline',
        'kicl-max-inline-size-columns-10',
        'kicl-text-align-center'
      )}
      easing='ease-expo-out'
      hold
      id={TITLE_ID}
      in={entered}
      is='h2'
      property='slide-from-left'
      ref={ref}
    >
      {t('workshop')}
    </Animated.Heading>
  );
};

export { Headline };
