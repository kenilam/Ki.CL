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

/** One line. */
const Languages: React.FunctionComponent = () => {
  const { languages } = useVersion();

  const titleId = useId();

  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <section aria-labelledby={titleId}>
        <Layout autoFlow='row' gap='narrower' justifyItems='stretch'>
          <header>
            <Heading className={classNames(HEADING)} dense id={titleId} is='h2'>
              {COPY.sections.languages}
            </Heading>
            <Separator />
          </header>
        </Layout>
        <Text dense>
          <Runs line={languages} />
        </Text>
      </section>
    </Layout>
  );
};

export { Languages };
