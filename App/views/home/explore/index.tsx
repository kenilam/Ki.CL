import React from 'react';

import classNames from 'classnames';

import { HyperLink, Layout, Text } from 'design/components';
import { useTranslation } from 'design/hooks';

import { PAGES } from '@/views/routes';

import { useInverse } from '@/views/home/use-inverse';

import { Title } from './title';

import { CLASS_NAME } from './constants';

const Explore: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const inverse = useInverse();

  return (
    <section
      className={classNames(
        CLASS_NAME,
        inverse,
        'kicl-background-color-body',
        'kicl-inline-size-full',
        'kicl-padding-block-extreme',
        'kicl-padding-inline-frame-columns-12'
      )}
    >
      <Layout autoFlow='row' gap='normal'>
        <HyperLink
          className={classNames('kicl-display-grid', 'kicl-inline-size-full')}
          to={PAGES.experiments}
          unstyled
        >
          <Text
            className={classNames(
              'kicl-color-neutral-a64',
              'kicl-font-family-mono',
              'kicl-font-size-small'
            )}
            is='span'
          >
            {t('experiments')}
          </Text>
          <Title />
        </HyperLink>
      </Layout>
    </section>
  );
};

export { Explore };
