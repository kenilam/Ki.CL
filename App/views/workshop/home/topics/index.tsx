import React from 'react';

// Components
import { List } from 'design/components';

// Partials
import { Placeholders } from './placeholders';
import { Topic } from './topic';

// Constants
import { TOPICS } from '@/views/routes';

/** A card for each topic, then the ones still to come. Two a row, and one a row on phones. */
const Topics: React.FunctionComponent = () => {
  return (
    <List fill={6} gap='normal'>
      {TOPICS.map(({ to }) => {
        return <Topic key={to} to={to} />;
      })}
      <Placeholders />
    </List>
  );
};

export { Topics };
