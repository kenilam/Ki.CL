import React from 'react';

import classNames from 'classnames';

import { Animated } from 'design/components';
import { useTranslation } from 'design/hooks';

import { useSeen } from '@/views/use-seen';

import type { Props } from '@/views/resume/page/article/sections/section';

const Title: React.FunctionComponent<Props> = ({ id }) => {
  const { t } = useTranslation('resume');
  const { ref, seen } = useSeen<HTMLHeadingElement>();

  return (
    <Animated.Heading
      className={classNames(
        'kicl-print-hidden',
        'kicl-scroll-enter-far',
        'kicl-text-hyphenate'
      )}
      dense
      easing='ease-expo-out'
      hold
      in={seen}
      is='h2'
      lookLike='display'
      property='slide-from-bottom'
      ref={ref}
      split='letter'
      stagger={60}
    >
      {t('title', { context: id })}
    </Animated.Heading>
  );
};

export { Title };
