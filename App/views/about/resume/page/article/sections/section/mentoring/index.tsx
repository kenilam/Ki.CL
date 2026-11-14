import React, { useId } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, Layout, Markdown, Separator, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useVersion } from '@/views/about/resume/context';

// Constants
import { HEADING } from '@/views/about/resume/constants';

/** The ADPList record, with the link to it. */
const Mentoring: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');

  const { mentoring } = useVersion();

  const titleId = useId();

  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <section
        aria-labelledby={titleId}
        className='kicl-print-break-inside-avoid'
      >
        <Layout autoFlow='row' gap='narrower' justifyItems='stretch'>
          <header>
            <Heading className={classNames(HEADING)} dense id={titleId} is='h2'>
              {t('title', { context: 'mentoring' })}
            </Heading>
            <Separator />
          </header>
        </Layout>
        <Text dense>
          <Markdown>{mentoring}</Markdown>
        </Text>
      </section>
    </Layout>
  );
};

export { Mentoring };
