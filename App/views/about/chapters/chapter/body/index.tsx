import React from 'react';

import classNames from 'classnames';

import { Animated } from 'design/components';
import { useTranslation } from 'design/hooks';

import type { Props } from '@/views/about/chapters/chapter';
import { useSeen } from '@/views/about/use-seen';

const Body: React.FunctionComponent<Props> = ({ id }) => {
  const { t } = useTranslation('about');
  const { ref, seen } = useSeen<HTMLElement>();

  return (
    <Animated.Text
      className={classNames(
        'kicl-font-size-moderate',
        'kicl-max-inline-size-columns-5',
        'kicl-scroll-focus-color-a80',
        'kicl-scroll-shift-narrow'
      )}
      delay={150}
      duration='slow'
      easing='ease-expo-out'
      hold
      in={seen}
      property='fade'
      ref={ref}
      stagger={12}
    >
      {t('body', { context: id })}
    </Animated.Text>
  );
};

export { Body };
