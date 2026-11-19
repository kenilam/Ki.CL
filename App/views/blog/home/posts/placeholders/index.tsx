import React from 'react';

// Partials
import { Placeholder } from './placeholder';

const PLACEHOLDERS = 3;

const Placeholders: React.FunctionComponent = () => {
  return (
    <>
      {Array.from({ length: PLACEHOLDERS }, (_, index) => {
        return <Placeholder key={index} />;
      })}
    </>
  );
};

export { Placeholders };
