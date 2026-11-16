import React from 'react';

import classNames from 'classnames';

import { ListItem, Markdown, Text } from 'design/components';

type Props = { line: string };

const Line: React.FunctionComponent<Props> = ({ line }) => {
  return (
    <ListItem
      className={classNames(
        'kicl-print-break-inside-avoid',
        'kicl-scroll-reveal'
      )}
    >
      <Text dense>
        <Markdown>{line}</Markdown>
      </Text>
    </ListItem>
  );
};

export { Line };
