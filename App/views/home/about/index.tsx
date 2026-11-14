import React from 'react';

import classNames from 'classnames';

import { Heading, Layout, Text } from 'design/components';
import { useTranslation } from 'design/hooks';

import { useInverse } from '@/views/use-inverse';

import { Read } from './read';

import { CLASS_NAME, TITLE_ID } from './constants';

const About: React.FunctionComponent = () => {
  const { t } = useTranslation('home');
  const inverse = useInverse();

  return (
    <Layout autoFlow='row' gap='wide'>
      <section
        aria-labelledby={TITLE_ID}
        className={classNames(
          CLASS_NAME,
          inverse,
          'kicl-background-color-body',
          'kicl-inline-size-full',
          'kicl-padding-block-extreme',
          'kicl-padding-inline-frame-columns-12'
        )}
      >
        <Heading
          className={classNames(
            'kicl-font-size-headline',
            'kicl-max-inline-size-columns-8',
            'kicl-text-wrap-balance'
          )}
          id={TITLE_ID}
          is='h2'
        >
          {t('title', { context: 'about' })}
        </Heading>
        <Text
          className={classNames(
            'kicl-color-neutral-a64',
            'kicl-font-size-medium',
            'kicl-max-inline-size-columns-6',
            'kicl-text-wrap-balance'
          )}
        >
          {t('tagline', { context: 'about' })}
        </Text>
        <Read />
      </section>
    </Layout>
  );
};

export { About };
