import React, { useId } from 'react';

// Components
import { Heading, Layout, List, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Shape } from './shape';

// Constants
import { NAMES } from './constants';

/**
 * The obstacle shapes. Drag one onto the stage to put it there, or click it
 * to put it in front by the belt; either way it goes where there is room.
 */
const Shapes: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');
  const id = useId();

  return (
    <Layout gap='narrow'>
      <section aria-labelledby={id}>
        <Heading dense id={id} is='h2' lookLike='h5'>
          {t('title', { context: 'obstacles' })}
        </Heading>
        <Text className='kicl-color-grey-700' is='p'>
          {t('hint')}
        </Text>

        <List gap='narrower'>
          {NAMES.map((shape) => {
            return <Shape key={shape} shape={shape} />;
          })}
        </List>
      </section>
    </Layout>
  );
};

export { Shapes };
