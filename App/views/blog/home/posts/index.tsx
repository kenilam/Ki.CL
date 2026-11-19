import React from 'react';

// Components
import { List } from 'design/components';

// Partials
import { Placeholders } from './placeholders';
import { Post } from './post';

// Constants
import { POSTS } from '@/views/routes';

const Posts: React.FunctionComponent = () => {
  return (
    <List fill={6} gap='normal'>
      {POSTS.map(({ to }) => {
        return <Post key={to} to={to} />;
      })}
      <Placeholders />
    </List>
  );
};

export { Posts };
