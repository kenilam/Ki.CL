import React, { useId } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import {
  Heading,
  Layout,
  List,
  Markdown,
  Separator,
  Text,
} from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useVersion } from '@/views/about/resume/context';

// Partials
import { Line } from '@/views/about/resume/page/article/sections/section/line';

// Constants
import { HEADING } from '@/views/about/resume/constants';

/** Work outside the day job. A version gives an introduction, a list, or both. */
const Projects: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');

  const {
    projects: { intro, items },
  } = useVersion();

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
              {t('title', { context: 'projects' })}
            </Heading>
            <Separator />
          </header>
        </Layout>
        {intro ? (
          <Text dense>
            <Markdown>{intro}</Markdown>
          </Text>
        ) : null}
        {items ? (
          <List gap='narrow' listStyleType='inherit'>
            {items.map((line) => {
              return <Line key={line} line={line} />;
            })}
          </List>
        ) : null}
      </section>
    </Layout>
  );
};

export { Projects };
