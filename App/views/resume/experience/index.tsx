import React, { useId } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, Layout, Separator } from 'design/components';

// Context
import { useVersion } from '@/views/resume/context';

// Partials
import { Earlier } from './earlier';
import { Role } from './role';

// Constants
import { COPY, HEADING } from '@/views/resume/constants';

/**
 * The six most recent roles, each a disclosure, then the earlier ones as a
 * list.
 */
const Experience: React.FunctionComponent = () => {
  const { experience } = useVersion();

  const titleId = useId();

  return (
    <Layout autoFlow='row' gap='normal' justifyItems='stretch'>
      <section aria-labelledby={titleId}>
        <Layout autoFlow='row' gap='narrower' justifyItems='stretch'>
          <header>
            <Heading className={classNames(HEADING)} dense id={titleId} is='h2'>
              {COPY.sections.experience}
            </Heading>
            <Separator />
          </header>
        </Layout>
        {experience.map((role, index) => (
          <Role index={index} key={`${role.title} ${role.dates}`} />
        ))}
        <Earlier />
      </section>
    </Layout>
  );
};

export { Experience };
