import React from 'react';

import { Animated } from 'design/components';
import { useTranslation } from 'design/hooks';
import { Background } from 'design/widgets';

import { useAnchor } from '@/views/anchor/context';
import { useInverse } from '@/views/use-inverse';

import { useShown } from '@/views/resume/page/article/intro/use-shown';

import { NAME_ID } from '@/views/resume/page/article/intro/constants';

const Name: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const shown = useShown();
  const inverse = useInverse();
  const anchor = useAnchor();

  return (
    <Animated.Heading
      dense
      easing='ease-expo-out'
      hold
      id={NAME_ID}
      in={shown}
      is='h1'
      lookLike='display'
      media={<Background className={inverse} />}
      ref={anchor}
      stagger={60}
    >
      {t('name')}
    </Animated.Heading>
  );
};

export { Name };
