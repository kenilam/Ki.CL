import React from 'react';

// Components
import { List } from 'design/components';

// Partials
import { Need } from './need';

// Constants
import { NEEDS } from './constants';

const Needs: React.FunctionComponent = () => {
  return (
    <List gap='narrower' listStyleType='disc'>
      {NEEDS.map((need) => {
        return <Need need={need} key={need} />;
      })}
    </List>
  );
};

export { Needs };
