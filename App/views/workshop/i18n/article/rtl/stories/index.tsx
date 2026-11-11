import React from 'react';

// Partials
import { Story } from './story';

// Constants
import { STORIES } from './constants';

const Stories: React.FunctionComponent = () => {
  return (
    <>
      {STORIES.map(({ context }) => {
        return <Story context={context} key={context} />;
      })}
    </>
  );
};

export { Stories };
