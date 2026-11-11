import React from 'react';

// Components
import { ListItem, Text } from 'design/components';

type Props = {
  /** The reviewer's words, as written. */
  suggestion: string;
};

const Suggestion: React.FunctionComponent<Props> = ({ suggestion }) => {
  return (
    <ListItem>
      <Text is='span' className='kicl-color-grey-700'>
        {suggestion}
      </Text>
    </ListItem>
  );
};

export { Suggestion };
