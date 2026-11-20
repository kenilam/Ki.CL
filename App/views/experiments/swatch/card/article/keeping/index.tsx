import React, { useId } from 'react';

// Components
import { Heading, Layout, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

const Keeping: React.FunctionComponent = () => {
  const { t } = useTranslation('swatch');
  const id = useId();

  return (
    <Layout autoFlow='row' gap='narrow'>
      <section aria-labelledby={id} className='kicl-max-inline-size-columns-8'>
        <Heading id={id} is='h3' lookLike='h4'>
          {t('title', { context: 'privacy' })}
        </Heading>
        <Text is='p'>{t('privacy')}</Text>
      </section>
    </Layout>
  );
};

export { Keeping };
