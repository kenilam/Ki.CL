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
import { Skill } from './skill';

// Constants
import { HEADING } from '@/views/about/resume/constants';

/** One line per area, each led by its name in bold. */
const Skills: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');

  const { skills } = useVersion();

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
              {t('title', { context: 'skills' })}
            </Heading>
            <Separator />
          </header>
        </Layout>
        <List gap='narrow' listStyleType='inherit'>
          {skills.map((line) => {
            return <Skill key={line} line={line} />;
          })}
        </List>
      </section>
    </Layout>
  );
};

export { Skills };
