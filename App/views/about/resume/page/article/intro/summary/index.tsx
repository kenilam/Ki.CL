import React from 'react';

import classNames from 'classnames';

import { Animated, Heading } from 'design/components';
import { useTranslation } from 'design/hooks';

import { useShown } from '@/views/about/resume/page/article/intro/use-shown';

import { useVersion } from '@/views/about/resume/context';

const Summary: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');
  const { summary } = useVersion();
  const shown = useShown();

  return (
    <>
      <Heading className='kicl-print-only' dense is='h2' lookLike='h6'>
        {t('title', { context: 'summary' })}
      </Heading>
      <Animated.Text
        className={classNames(
          'kicl-max-inline-size-columns-4',
          'kicl-scroll-leave-near',
          'kicl-text-hyphenate'
        )}
        delay={120}
        duration='slow'
        easing='ease-expo-out'
        hold
        in={shown}
        stagger={8}
      >
        {summary}
      </Animated.Text>
    </>
  );
};

export { Summary };
