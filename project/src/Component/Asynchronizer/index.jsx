// @flow
import React from 'react';
import { asyncReactor } from 'async-reactor';

import { CSSTransition, Errors, Loader } from 'Component';
import { debounce } from 'Helper';

import State, { Connector } from './State';

type AwaitForExpected = any;

type AwaitFor = Promise<AwaitForExpected>;

type Props = {
  awaitFor: AwaitFor,
  awaitProps: {},
  awaitDelay?: Number,
  awaitMessage: String,
  awaitExpect: Array | String | {},
  iconOnly?: Boolean
};

const InstanceWithState = ({ children, show, showComponent }) => {
  showComponent();

  return (
    <CSSTransition transitionIn={ show }>
      { children }
    </CSSTransition>
  )
}

const Instance = Connector(InstanceWithState);

const Component = props => (
  <State>
    <Instance { ...props }/>
  </State>
);

const Asynchronizer = ({
  children, // Accual children to be render
  awaitFor, // function to await for
  awaitProps, // Props that pass to awaitFor
  awaitDelay = Asynchronizer.defaultProps.awaitDelay,
  awaitMessage,
  awaitExpect, // Expected Data, return children immediately if truly
  iconOnly,
  staticContext,
  ...rest
}: Props) => {
  if (awaitExpect) {
    return (
      <Component>
        { React.cloneElement(children, { data: awaitExpect, ...rest }) }
      </Component>
    );
  }

  const AsyncComponent = async props => {
    const data = await awaitFor(awaitProps);

    await debounce(awaitDelay);

    return (
      <Component>
        { React.cloneElement(children, { data, ...rest, ...props }) }
      </Component>
    );
  }

  return asyncReactor(
    AsyncComponent,
    () => <Loader { ...{ iconOnly, text: awaitMessage } } />,
    Errors
  )();
};

Asynchronizer.defaultProps = {
  awaitDelay: 1000,
  iconOnly: false
}

export default Asynchronizer;
