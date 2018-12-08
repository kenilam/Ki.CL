// @flow
import React from 'react';
import { asyncReactor } from 'async-reactor';

import { Errors, Loader } from 'Component';
import { debounce } from 'Helper';

type Props = {
  Component: React.Node,
  awaitFor: () => void,
  awaitProps: {},
  awaitDelay?: Number,
  awaitMessage: String,
  expect: Array | String | {}
};

const Asynchronizer = ({
  Component, // Accual Component to be render
  awaitFor, // function to await for
  awaitProps, // Props that pass to awaitFor
  awaitDelay = Asynchronizer.defaultProps.awaitDelay,
  awaitMessage,
  expect // Expected Data, return Component immediately if truly
}: Props) => {
  if (expect) {
    return (
      <Component { ...{ data: expect } }/>
    );
  }

  const Instance = async ({ ...rest }) => {
    const data = await awaitFor(awaitProps);

    await debounce(awaitDelay);

    return (
      <Component {...{ data, ...rest } }/>
    );
  }

  return asyncReactor(Instance, () => <Loader { ...{ text: awaitMessage } } />, Errors)();
};

Asynchronizer.defaultProps = {
  awaitDelay: 1000
}

export default Asynchronizer;
