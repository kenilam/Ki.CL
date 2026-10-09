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

/** Degrees, newest first. */
const Education: React.FunctionComponent = () => {
  const { education } = useVersion();

  const titleId = useId();

  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <section aria-labelledby={titleId}>
        <Layout autoFlow='row' gap='narrower' justifyItems='stretch'>
          <header>
            <Heading className={classNames(HEADING)} dense id={titleId} is='h2'>
              {COPY.sections.education}
            </Heading>
            <Separator />
          </header>
        </Layout>
        <List gap='narrower'>
          {education.map((line, index) => (
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

export { Education };
