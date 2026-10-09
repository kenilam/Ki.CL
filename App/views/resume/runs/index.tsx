import React from 'react';

// Components
import { HyperLink, Text } from 'design/components';

// Content
import type { Line } from '@/views/resume/content';

type Props = {
  line: Line;
};

/** A line's runs as inline content: plain text, bold text and links. */
const Runs: React.FunctionComponent<Props> = ({ line }) => {
  if (typeof line === 'string') {
    return line;
  }

  return line.map((run, index) => {
    if (typeof run === 'string') {
      return run;
    }

    if ('strong' in run) {
      return (
        <Text className='kicl-font-weight-bold' is='strong' key={index}>
          {run.strong}
        </Text>
      );
    }

    return (
      <HyperLink key={index} to={run.to}>
        {run.link}
      </HyperLink>
    );
  });
};

export { Runs };
