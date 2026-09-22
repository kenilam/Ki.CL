import React from 'react';

// Partials
import { Contents } from './contents';
import { CssVariables } from './css-variables';

// Context
import { useGlobalHeaderContext, GlobalHeaderProvider } from './context';

// Styles
import './styles.scss';

const GlobalHeader: React.FunctionComponent = () => {
  return (
    <>
      <CssVariables />
      <Contents />
    </>
  );
};

export { GlobalHeaderProvider, useGlobalHeaderContext, GlobalHeader };
