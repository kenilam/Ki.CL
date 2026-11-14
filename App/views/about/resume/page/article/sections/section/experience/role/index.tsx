import React, { useId } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Card, Details, Heading, Layout } from 'design/components';

// Content
import type { Resolved } from '@/views/about/resume/content';

// Context
import { useVersion } from '@/views/about/resume/context';

// Partials
import { Logo } from './logo';
import { Points } from './points';
import { Summary } from './summary';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as RESUME } from '@/views/about/resume/constants';

const CLASS_NAME = `${RESUME}__role`;

type Props = Pick<Resolved['experience'][number], 'dates'>;

/**
 * One role, as a card headed by the employer. The title and the dates are the
 * summary of a disclosure, and what was done is behind it. The current role
 * starts open, and on paper every one prints open.
 */
const Role: React.FunctionComponent<Props> = ({ dates }) => {
  const { experience } = useVersion();
  const headingId = useId();
  const role = experience.find((each) => {
    return each.dates === dates;
  });

  if (!role) {
    return null;
  }

  return (
    <Card
      aria-labelledby={headingId}
      className={classNames(CLASS_NAME, 'kicl-print-break-inside-avoid')}
      is='article'
      variant='secondary'
    >
      <Layout alignItems='center' display='flex' gap='narrow'>
        <header>
          <Logo dates={dates} />
          <Heading dense id={headingId} is='h3'>
            {role.organisation}
          </Heading>
        </header>
      </Layout>
      <Details
        open={experience[0].dates === dates}
        summary={<Summary dates={dates} />}
      >
        <Points dates={dates} />
      </Details>
    </Card>
  );
};

export { Role };
