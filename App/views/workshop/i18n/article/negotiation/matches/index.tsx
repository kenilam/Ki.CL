import React from 'react';

// Components
import { List } from 'design/components';

// Partials
import { Match } from './match';

// Constants
import { MATCHES } from './constants';

const Matches: React.FunctionComponent = () => {
  return (
    <List gap='narrower' listStyleType='disc'>
      {MATCHES.map((match) => {
        return <Match match={match} key={match} />;
      })}
    </List>
  );
};

export { Matches };
