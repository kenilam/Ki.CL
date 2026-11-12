import React from 'react';

// Components
import { Layout, ListItem, Markdown, Text } from 'design/components';

type Props = {
  /** The line, already in the version's wording. */
  line: string;
};

const Skill: React.FunctionComponent<Props> = ({ line }) => {
  return (
    <ListItem className='kicl-print-break-inside-avoid'>
      <Layout gap='narrower'>
        <Text dense>
          <Markdown>{line}</Markdown>
        </Text>
      </Layout>
    </ListItem>
  );
};

export { Skill };
