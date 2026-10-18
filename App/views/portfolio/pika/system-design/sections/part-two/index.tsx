import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Heading, Layout, Text } from 'design/components';

// Partials
import { AgentHarness } from './agent-harness';
import { Cost } from './cost';
import { Testing } from './testing';
import { WhatChanges } from './what-changes';

// Constants
import {
  SECTION_HEADING,
  SECTION_ID,
} from '@/views/portfolio/pika/system-design/constants';

const PartTwo: React.FunctionComponent = () => {
  const { t } = useTranslation('pika');

  return (
    <Layout autoFlow='row' gap='wide' justifyItems='stretch'>
      <section aria-labelledby={SECTION_ID.partTwo}>
        <Heading className={SECTION_HEADING} id={SECTION_ID.partTwo} is='h2'>
          {t('title', { context: 'part_two' })}
        </Heading>
        <Text variant='secondary'>{t('part_two.intro')}</Text>
        <WhatChanges />
        <AgentHarness />
        <Cost />
        <Testing />
      </section>
    </Layout>
  );
};

export { PartTwo };
