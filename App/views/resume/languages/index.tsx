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

/** One line. */
const Languages: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');

  const { languages } = useVersion();

  const titleId = useId();

  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <section aria-labelledby={titleId}>
        <Layout autoFlow='row' gap='narrower' justifyItems='stretch'>
          <header>
            <Heading className={classNames(HEADING)} dense id={titleId} is='h2'>
              {t('languages.title')}
            </Heading>
            <Separator />
          </header>
        </Layout>
        <Text dense>
          <Markdown>{languages}</Markdown>
        </Text>
      </section>
    </Layout>
  );
};

export { Languages };
