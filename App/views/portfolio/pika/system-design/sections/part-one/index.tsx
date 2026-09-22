import React from 'react';

// Components
import { Heading, Layout } from '@/components';

// Partials
import { CoreDataModel } from './core-data-model';
import { Growth } from './growth';
import { KeyTradeOffs } from './key-trade-offs';
import { Resiliency } from './resiliency';
import { Services } from './services';
import { WhatIsAnApp } from './what-is-an-app';

const PartOne: React.FunctionComponent = () => {
  return (
    <Layout autoFlow='row' gap='wide' justifyItems='stretch'>
      <section>
        <Heading className='kicl-font-size-larger' is='h3'>
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
