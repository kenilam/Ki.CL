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

/** Work outside the day job. A version gives an introduction, a list, or both. */
const Projects: React.FunctionComponent = () => {
  const {
    projects: { intro, items },
  } = useVersion();

  const titleId = useId();

  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='stretch'>
      <section aria-labelledby={titleId}>
        <Layout autoFlow='row' gap='narrower' justifyItems='stretch'>
          <header>
            <Heading className={classNames(HEADING)} dense id={titleId} is='h2'>
              {COPY.sections.projects}
            </Heading>
            <Separator />
          </header>
        </Layout>
        {intro && (
          <Text dense>
            <Runs line={intro} />
          </Text>
        )}
        {items && (
          <List gap='narrow'>
            {items.map((line, index) => (
              <ListItem key={index}>
                <Text dense>
                  <Runs line={line} />
                </Text>
              </ListItem>
            ))}
          </List>
        )}
      </section>
    </Layout>
  );
};

export { Projects };
