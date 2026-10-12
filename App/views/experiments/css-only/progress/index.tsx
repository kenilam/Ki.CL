import React, { useId } from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import {
  Heading,
  Layout,
  Markdown,
  ScrollIndicator,
  Text,
} from 'design/components';

// Constants
import { SECTION } from '@/views/experiments/css-only/constants';

/** The bar along the top of the window, and the words about it. */
const Progress: React.FunctionComponent = () => {
  const id = useId();
  const { t } = useTranslation('css-only');

  return (
    <Layout autoFlow='row' gap='narrow'>
      <section aria-labelledby={id} className={classNames(SECTION)}>
        <ScrollIndicator />
        <Heading className='kicl-font-size-large' dense id={id} is='h2'>
          {t('title', { context: 'progress' })}
        </Heading>
        <Text is='p'>
          <Markdown>{t('text', { context: 'progress' })}</Markdown>
        </Text>
      </section>
    </Layout>
  );
};

export { Progress };
