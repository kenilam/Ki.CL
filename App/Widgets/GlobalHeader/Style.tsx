import React from 'react';

// Context
import { useGlobalHeaderContext } from './Context';

const Style: React.FunctionComponent = () => {
  const { rect } = useGlobalHeaderContext();

  return (
    <style>
      {`:root {
        --kicl--widgets--global-header--block-size: ${rect?.height || 0}px;
      }`}
    </style>
  );
};

export default Style;
