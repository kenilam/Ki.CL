import React from 'react';

import classNames from 'classnames';

import { Animated, Layout } from 'design/components';
import { useTranslation } from 'design/hooks';
import { Background } from 'design/widgets';

import { TITLE_ID } from '@/views/home/hero/constants';
import { useInverse } from '@/views/use-inverse';

import { useAdvance } from './use-advance';

const Title: React.FunctionComponent = () => {
  const { t } = useTranslation('home');
  const { header, heading } = useAdvance();
  const inverse = useInverse();

  return (
    <Layout alignContent='center' justifyItems='center'>
      <header
        className={classNames(
          'kicl-block-size-screen',
          'kicl-scroll-exit',
          'kicl-text-align-center'
        )}
        ref={header}
      >
        <Animated.Heading
          className={classNames(
            'kicl-margin-inline-auto',
            'kicl-max-inline-size-columns-10',
            'kicl-padding-block-extreme',
            'kicl-scroll-exit-trail'
          )}
          id={TITLE_ID}
          is='h1'
          lookLike='display'
          media={<Background className={inverse} />}
          ref={heading}
          stagger={60}
        >
          {t('title')}
        </Animated.Heading>
      </header>
    </Layout>
  );
};

export { Title };
