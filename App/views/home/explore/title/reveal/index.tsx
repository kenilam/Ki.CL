import React from 'react';

import * as Tb from 'react-icons/tb';

import { Animation, AnimatedText } from 'design/components';
import { useTranslation } from 'design/hooks';

import './styles.scss';

import { CLASS_NAME as EXPLORE } from '@/views/home/explore/constants';

const CLASS_NAME = `${EXPLORE}__title__reveal`;

const Reveal: React.FunctionComponent = () => {
  const { t } = useTranslation('home');

  return (
    <>
      <AnimatedText
        className={CLASS_NAME}
        easing='ease-expo-out'
        is='span'
        property='slide-from-left'
        unstyled
      >
        {t('explore')}
      </AnimatedText>
      <Animation
        className={CLASS_NAME}
        delay={300}
        duration='slower'
        easing='ease-expo-out'
        property='slide-from-left'
      >
        <Tb.TbArrowRight aria-hidden />
      </Animation>
    </>
  );
};

export { Reveal };
