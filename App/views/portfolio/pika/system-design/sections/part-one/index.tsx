import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { Heading, Layout } from 'design/components';

// Partials
import { CoreDataModel } from './core-data-model';
import { Growth } from './growth';
import { KeyTradeOffs } from './key-trade-offs';
import { Resiliency } from './resiliency';
import { Services } from './services';
import { WhatIsAnApp } from './what-is-an-app';

// Constants
import { SECTION_ID } from '@/views/portfolio/pika/system-design/constants';

const PartOne: React.FunctionComponent = () => {
  const { t } = useTranslation('pika');

  return (
    <Layout autoFlow='row' gap='wide' justifyItems='stretch'>
      <section aria-labelledby={SECTION_ID.partOne}>
        <Heading
          className={classNames(
            'kicl-font-size-larger',
            'kicl-padding-block-start-narrow',
            'kicl-position-relative'
          )}
          id={SECTION_ID.partOne}
          is='h2'
        >
          {t('title', { context: 'part_one' })}
        </Heading>
        <WhatIsAnApp />
        <CoreDataModel />
        <Services />
        <KeyTradeOffs />
        <Resiliency />
        <Growth />
      </section>
    </Layout>
  );
};

export { PartOne };
