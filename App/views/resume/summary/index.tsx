import React, { useId } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

// Components
import { Heading, Layout, Markdown, Separator, Text } from 'design/components';

// Context
import { useVersion } from '@/views/resume/context';

// Constants
import { HEADING } from '@/views/resume/constants';

/** Who this is, in one paragraph. Each version writes its own. */
const Summary: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');

  const { summary } = useVersion();

  const titleId = useId();

  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <section aria-labelledby={titleId}>
        <Layout autoFlow='row' gap='narrower' justifyItems='stretch'>
          <header>
            <Heading className={classNames(HEADING)} dense id={titleId} is='h2'>
              {t('copy.sections.summary')}
            </Heading>
            <Separator />
          </header>
        </Layout>
        <Text dense>
          <Markdown>{summary}</Markdown>
        </Text>
      </section>
    </Layout>
  );
};

export { Summary };
