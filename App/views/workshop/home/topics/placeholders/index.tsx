import React from 'react';

// Partials
import { Placeholder } from './placeholder';

const PLACEHOLDERS = 2;

/** Cards for the topics still to come, after the real ones. */
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
