import React from 'react';

import { TOPICS } from '@/views/routes';

import { Anchor } from './anchor';

const Anchors: React.FunctionComponent = () => {
  return (
    <>
      {TOPICS.map(({ to }) => {
        return <Anchor key={to} to={to} />;
      })}
    </>
  );
};

export { Anchors };
