import React from 'react';

import classNames from 'classnames';

import { Animated } from 'design/components';
import { useTranslation } from 'design/hooks';

import type { Props } from '@/views/about/chapters/chapter';
import { useSeen } from '@/views/use-seen';

const Title: React.FunctionComponent<Props> = ({ id }) => {
  const { t } = useTranslation('about');
  const { ref, seen } = useSeen<HTMLHeadingElement>();

  return (
    <Animated.Heading
      className={classNames(
        'kicl-scroll-shift-narrow',
        'kicl-text-box-trim-start',
        'kicl-text-wrap-balance'
      )}
      dense
      easing='ease-expo-out'
      hold
      in={seen}
      is='h2'
      property='slide-from-left'
      ref={ref}
      stagger={60}
    >
      {t('title', { context: id })}
    </Animated.Heading>
  );
};

export { Title };
