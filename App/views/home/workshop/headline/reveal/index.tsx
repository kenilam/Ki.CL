import React from 'react';

import { AnimatedText } from 'design/components';
import { useTranslation } from 'design/hooks';

import './styles.scss';

import { CLASS_NAME as HEADLINE } from '@/views/home/workshop/headline/constants';

const CLASS_NAME = `${HEADLINE}__reveal`;

const Reveal: React.FunctionComponent = () => {
  const { t } = useTranslation('home');

  return (
    <AnimatedText
      className={CLASS_NAME}
      easing='ease-expo-out'
      is='span'
      property='slide-from-left'
      unstyled
    >
      {t('workshop')}
    </AnimatedText>
  );
};

export { Reveal };
