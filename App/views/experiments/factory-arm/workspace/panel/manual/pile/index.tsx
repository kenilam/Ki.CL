import React, { useId } from 'react';

// Components
import { Heading, Layout, List } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Layers } from './layers';
import { SecondStack } from './second-stack';
import { Seed } from './seed';

/**
 * How the incoming cases are built for the next run: how many layers, the
 * seed that picks each layer's case type (or a random one), and whether a
 * second stack comes in behind the arm. One setting a row, its name on the
 * left and its control on the right.
 */
const Pile: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');
  const id = useId();

  return (
    <Layout gap='narrow'>
      <section aria-labelledby={id}>
        <Heading dense id={id} is='h2' lookLike='h5'>
          {t('title', { context: 'cases' })}
        </Heading>

        <List gap='narrow'>
          <Layers />
          <Seed />
          <SecondStack />
        </List>
      </section>
    </Layout>
  );
};

export { Pile };
