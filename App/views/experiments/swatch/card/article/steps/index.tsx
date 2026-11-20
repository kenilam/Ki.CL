import React, { useId } from 'react';

// Components
import { Heading, Layout, List } from 'design/components';

// Hooks
import { useResponsive, useTranslation } from 'design/hooks';

// Partials
import { Step } from './step';

// Constants
import { STEPS } from '@/views/experiments/swatch/card/article/constants';

const FILLS = {
  true: 6,
  false: 3,
} as const;

const Steps: React.FunctionComponent = () => {
  const { t } = useTranslation('swatch');
  const { isNormal } = useResponsive();
  const id = useId();

  return (
    <Layout autoFlow='row' gap='normal'>
      <section aria-labelledby={id}>
        <Heading id={id} is='h3'>
          {t('article.steps_title')}
        </Heading>
        <List fill={FILLS[String(isNormal)]} gap='normal' is='ol'>
          {STEPS.map((step) => {
            return <Step key={step} step={step} />;
          })}
        </List>
      </section>
    </Layout>
  );
};

export { Steps };
