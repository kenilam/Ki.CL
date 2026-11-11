import React from 'react';

// Components
import { List } from 'design/components';

// Partials
import { Topic } from './topic';

// Views
import { TOPICS } from '@/views/routes';

const Topics: React.FunctionComponent = () => {
  return (
    <List gap='narrow' justifyItems='end'>
      {TOPICS.map(({ to }) => {
        return <Topic key={to} to={to} />;
      })}
    </List>
  );
};

export { Topics };
