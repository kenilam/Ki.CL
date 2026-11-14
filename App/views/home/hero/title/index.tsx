import React from 'react';

import classNames from 'classnames';

import { Animated } from 'design/components';
import { useTranslation } from 'design/hooks';

import { TITLE_ID } from '@/views/home/hero/constants';

const Title: React.FunctionComponent = () => {
  const { t } = useTranslation('home');

  return (
    <Animated.Heading
      className={classNames(
        'kicl-margin-inline-auto',
        'kicl-max-inline-size-columns-10',
        'kicl-padding-block-extreme',
        'kicl-text-align-center'
      )}
      id={TITLE_ID}
      is='h1'
      lookLike='display'
      stagger={60}
    >
      {t('title')}
    </Animated.Heading>
  );
};

export { Title };
