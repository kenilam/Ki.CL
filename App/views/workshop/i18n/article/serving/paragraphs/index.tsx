import React from 'react';

// Partials
import { Paragraph } from './paragraph';

// Constants
import { PARAGRAPHS } from './constants';

const Paragraphs: React.FunctionComponent = () => {
  return (
    <>
      {PARAGRAPHS.map((paragraph) => {
        return <Paragraph paragraph={paragraph} key={paragraph} />;
      })}
    </>
  );
};

export { Paragraphs };
