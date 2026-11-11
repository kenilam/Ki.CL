import React from 'react';

// Partials
import { FirstName } from './first-name';
import { LastName } from './last-name';

const Name: React.FunctionComponent = () => {
  return (
    <>
      <FirstName />
      <LastName />
    </>
  );
};

export { Name };
