import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, Layout } from '@/components';

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
          Part 1 - The App platform
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
