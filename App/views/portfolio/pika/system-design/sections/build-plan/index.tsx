import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Heading, Layout, Text } from 'design/components';

// Partials
import { Phases } from './phases';
import { Prompts } from './prompts';

// Constants
import {
  SECTION_HEADING,
  SECTION_ID,
} from '@/views/portfolio/pika/system-design/constants';

const BuildPlan: React.FunctionComponent = () => {
  const { t } = useTranslation('pika');

  return (
    <Layout autoFlow='row' gap='wide' justifyItems='stretch'>
      <section aria-labelledby={SECTION_ID.estimate}>
        <Heading className={SECTION_HEADING} id={SECTION_ID.estimate} is='h2'>
          {t('title', { context: 'estimate' })}
        </Heading>
        <Text>{t('build_plan.assumptions')}</Text>
        <Phases />
        <Text>{t('build_plan.estimate')}</Text>
        <Prompts />
      </section>
    </Layout>
  );
};

export { BuildPlan };
