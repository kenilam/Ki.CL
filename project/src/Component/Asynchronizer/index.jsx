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
  awaitExpect: Array | String | {},
  iconOnly?: Boolean
};

const Asynchronizer = ({
  Component, // Accual Component to be render
  awaitFor, // function to await for
  awaitProps, // Props that pass to awaitFor
  awaitDelay = Asynchronizer.defaultProps.awaitDelay,
  awaitMessage,
  awaitExpect, // Expected Data, return Component immediately if truly
  iconOnly,
  ...rest
}: Props) => {
  if (awaitExpect) {
    return (
      <Component { ...{ data: awaitExpect, ...rest } }/>
    );
  }

  const Instance = async props => {
    const data = await awaitFor(awaitProps);

    await debounce(awaitDelay);

    return (
      <Component {...{ data, ...props, ...rest } }/>
    );
  }

  return asyncReactor(Instance, () => <Loader { ...{ iconOnly, text: awaitMessage } } />, Errors)();
};

Asynchronizer.defaultProps = {
  awaitDelay: 1000,
  iconOnly: false
}

export default Asynchronizer;
