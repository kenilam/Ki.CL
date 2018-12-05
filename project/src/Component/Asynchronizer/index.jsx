// @flow

import React from 'react';
import { asyncReactor } from 'async-reactor';

import { Errors, Loader } from 'Component';

type Props = {
  Component: React.Node,
  awaitFor: () => void,
  awaitProps: {}
};

const Asynchronizer = ({ Component, awaitFor, awaitProps }: Props) => {
  const Instance = async ({ children, ...rest }) => {
    const data = await awaitFor(awaitProps);

    return (
      <Component {...{ data, ...rest }}/>
    );
  }

  return asyncReactor(Instance, Loader, Errors);
};

export default Asynchronizer;
