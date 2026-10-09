import React, { useId } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, Layout, Separator, Text } from 'design/components';

// Context
import { useVersion } from '@/views/resume/context';

// Partials
import { Runs } from '@/views/resume/runs';

// Constants
import { COPY, HEADING } from '@/views/resume/constants';

/** Who this is, in one paragraph. Each version writes its own. */
const Summary: React.FunctionComponent = () => {
  const { summary } = useVersion();

  const titleId = useId();

  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <section aria-labelledby={titleId}>
        <Layout autoFlow='row' gap='narrower' justifyItems='stretch'>
          <header>
            <Heading className={classNames(HEADING)} dense id={titleId} is='h2'>
              {COPY.sections.summary}
            </Heading>
            <Separator />
          </header>
        </Layout>
        <Text dense>
          <Runs line={summary} />
        </Text>
      </section>
    </Layout>
  );
};

export { Summary };
