import React from 'react';

import * as Tb from 'react-icons/tb';

import { Animated, Animation } from 'design/components';
import { useTranslation } from 'design/hooks';

import './styles.scss';

import { CLASS_NAME as EXPLORE } from '@/views/explore/constants';

const CLASS_NAME = `${EXPLORE}__title__reveal`;

const Reveal: React.FunctionComponent = () => {
  const { t } = useTranslation('home');

  return (
    <>
      <Animated.Text
        className={CLASS_NAME}
        easing='ease-expo-out'
        is='span'
        property='slide-from-left'
        unstyled
      >
        {t('explore')}
      </Animated.Text>
      <Animation
        className={CLASS_NAME}
        delay={300}
        duration='slower'
        easing='ease-expo-out'
        property='slide-from-left'
      >
        <Tb.TbArrowRight aria-hidden className='kicl-rtl-mirror' />
      </Animation>
    </>
  );
};

export { Reveal };
