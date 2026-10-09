import React, { useId } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import {
  Heading,
  Layout,
  List,
  ListItem,
  Separator,
  Text,
} from 'design/components';

// Context
import { useVersion } from '@/views/resume/context';

// Partials
import { Runs } from '@/views/resume/runs';

// Constants
import { COPY, HEADING } from '@/views/resume/constants';

/** One line per area, each led by its name in bold. */
const Skills: React.FunctionComponent = () => {
  const { skills } = useVersion();

  const titleId = useId();

  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <section aria-labelledby={titleId}>
        <Layout autoFlow='row' gap='narrower' justifyItems='stretch'>
          <header>
            <Heading className={classNames(HEADING)} dense id={titleId} is='h2'>
              {COPY.sections.skills}
            </Heading>
            <Separator />
          </header>
        </Layout>
        <List gap='narrower'>
          {skills.map((line, index) => (
            <ListItem key={index}>
              <Text dense>
                <Runs line={line} />
              </Text>
            </ListItem>
          ))}
        </List>
      </section>
    </Layout>
  );
};

export { Skills };
