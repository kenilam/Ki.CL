import React from 'react';

// Components
import { CardFooter } from 'design/components';

// Partials
import { Reset } from './reset';
import { Save } from './save';

const Actions: React.FunctionComponent = () => {
  return (
    <CardFooter justifyContent='center'>
      <Reset />
      <Save />
    </CardFooter>
  );
};

export { Actions };
