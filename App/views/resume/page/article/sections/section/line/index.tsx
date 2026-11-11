import React from 'react';

// Components
import { ListItem, Markdown, Text } from 'design/components';

type Props = {
  /** The line, already in the version's wording. */
  line: string;
};

/** One line of a section's list. */
const Line: React.FunctionComponent<Props> = ({ line }) => {
  return (
    <ListItem>
      <Text dense>
        <Markdown>{line}</Markdown>
      </Text>
    </ListItem>
  );
};

export { Line };
