// @flow

import React from 'react';
import { asyncReactor } from 'async-reactor';

import { Errors, Loader } from 'Component';

type Props = {
  Component: React.Node,
  awaitFor: () => void
};

const Preloader = ({ Component, awaitFor }: Props) => {
  const Instance = async ({ children, ...rest }) => {
    const data = await awaitFor();

    return (
      <Component {...{ data, ...rest }}/>
    );
  }

  return asyncReactor(Instance, Loader, Errors);
};

export default Preloader;
