import React from 'react';

import classNames from 'classnames';

import * as Tb from 'react-icons/tb';

import { Layout, Text } from 'design/components';
import { useResponsive, useTranslation } from 'design/hooks';

const LOOKS = {
  true: 'h3',
  false: 'h1',
} as const;

const View: React.FunctionComponent = () => {
  const { t } = useTranslation('home');
  const { isNarrow } = useResponsive();

  return (
    <Layout
      alignItems='center'
      display='flex'
      gap='narrow'
      justifyContent='end'
    >
      <Text
        aria-hidden
        className={classNames(
          'kicl-letter-spacing-tight',
          'kicl-scroll-focus-reveal-start'
        )}
        is='span'
        lookLike={LOOKS[String(isNarrow)]}
      >
        <Tb.TbArrowRight className='kicl-rtl-mirror' />
        {t('action', { context: 'view' })}
      </Text>
    </Layout>
  );
};

export { View };
