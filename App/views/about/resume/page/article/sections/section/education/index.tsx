import React, { useId } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, Layout, List, Separator } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useVersion } from '@/views/about/resume/context';

// Partials
import { Line } from '@/views/about/resume/page/article/sections/section/line';

// Constants
import { HEADING } from '@/views/about/resume/constants';

/** Degrees, newest first. */
const Education: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');

  const { education } = useVersion();

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
              {t('title', { context: 'education' })}
            </Heading>
            <Separator />
          </header>
        </Layout>
        <List gap='narrow' listStyleType='inherit'>
          {education.map((line) => {
            return <Line key={line} line={line} />;
          })}
        </List>
      </section>
    </Layout>
  );
};

export { Education };
