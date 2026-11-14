import React from 'react';

import classNames from 'classnames';

import { AnimatedText, Heading } from 'design/components';
import { useTranslation } from 'design/hooks';

import type { Props } from '@/views/about/chapters/chapter';
import { useSeen } from '@/views/about/use-seen';

const Title: React.FunctionComponent<Props> = ({ id }) => {
  const { t } = useTranslation('about');
  const { ref, seen } = useSeen<HTMLHeadingElement>();

  return (
    <Heading
      className={classNames(
        'kicl-font-size-headline',
        'kicl-font-weight',
        'kicl-letter-spacing-tight',
        'kicl-scroll-focus-color-a64',
        'kicl-scroll-shift-narrow',
        'kicl-text-box-trim-start',
        'kicl-text-wrap-balance'
      )}
      dense
      is='h2'
      ref={ref}
    >
      <AnimatedText
        easing='ease-expo-out'
        hold
        in={seen}
        is='span'
        property='slide-from-left'
        stagger={60}
        unstyled
      >
        {t('title', { context: id })}
      </AnimatedText>
    </Heading>
  );
};

export { Title };
