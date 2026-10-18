import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Heading, Layout, Markdown, Text } from 'design/components';

// Constants
import {
  SECTION_HEADING,
  SECTION_ID,
} from '@/views/portfolio/pika/system-design/constants';

const Walkthrough: React.FunctionComponent = () => {
  const { t } = useTranslation('pika');

  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <section aria-labelledby={SECTION_ID.walkthrough}>
        <header>
          <Heading
            className={SECTION_HEADING}
            dense
            id={SECTION_ID.walkthrough}
            is='h2'
          >
            {t('title', { context: 'walkthrough' })}
          </Heading>
          <Text lookLike='h6'>{t('read_this_first')}</Text>
        </header>
        <Text>{t('walkthrough.manifest')}</Text>
        <Text>{t('walkthrough.async')}</Text>
        <Text>{t('walkthrough.flow')}</Text>
        <Text>
          <Markdown>{t('walkthrough.agent')}</Markdown>
        </Text>
      </section>
    </Layout>
  );
};

export { Walkthrough };
