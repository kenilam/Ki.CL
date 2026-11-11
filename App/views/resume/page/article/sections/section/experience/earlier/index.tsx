import React, { useId } from 'react';

// Components
import { Heading, Layout, List } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useVersion } from '@/views/resume/context';

// Partials
import { Line } from '@/views/resume/page/article/sections/section/line';

/** The roles before 2014, one line each. */
const Earlier: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');

  const { earlier } = useVersion();

  const titleId = useId();

  return (
    <Layout autoFlow='row' gap='narrower' justifyItems='stretch'>
      <section aria-labelledby={titleId}>
        <Heading dense id={titleId} is='h3'>
          {t('title', { context: 'earlier' })}
        </Heading>
        <List gap='narrower' listStyleType='inherit'>
          {earlier.map((line) => {
            return <Line key={line} line={line} />;
          })}
        </List>
      </section>
    </Layout>
  );
};

export { Earlier };
