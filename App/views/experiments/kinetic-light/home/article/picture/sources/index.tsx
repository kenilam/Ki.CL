import React from 'react';

// Components
import { List } from 'design/components';

// Partials
import { Source } from './source';

// Constants
import { SOURCES } from './constants';

const Sources: React.FunctionComponent = () => {
  return (
    <List gap='narrow' listStyleType='disc'>
      {SOURCES.map((context) => {
        return <Source context={context} key={context} />;
      })}
    </List>
  );
};

export { Sources };
