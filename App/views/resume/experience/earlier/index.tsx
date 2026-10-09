import React, { useId } from 'react';

// Components
import { Heading, Layout, List, ListItem, Text } from 'design/components';

// Context
import { useVersion } from '@/views/resume/context';

// Partials
import { Runs } from '@/views/resume/runs';

// Constants
import { COPY } from '@/views/resume/constants';

/** The roles before 2014, one line each. */
const Earlier: React.FunctionComponent = () => {
  const { earlier } = useVersion();

  const titleId = useId();

  return (
    <Layout autoFlow='row' gap='narrower' justifyItems='stretch'>
      <section aria-labelledby={titleId}>
        <Heading dense id={titleId} is='h3'>
          {COPY.earlier}
        </Heading>
        <List gap='narrower'>
          {earlier.map((line, index) => (
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

export { Earlier };
