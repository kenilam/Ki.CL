import React from 'react';

import { ListItem, Markdown, Text } from 'design/components';

type Props = { line: string };

const Line: React.FunctionComponent<Props> = ({ line }) => {
  return (
    <ListItem className='kicl-print-break-inside-avoid'>
      <Text dense>
        <Markdown>{line}</Markdown>
      </Text>
    </ListItem>
  );
};

export { Line };
