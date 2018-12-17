// @flow
import React from 'react';
import Async from 'react-async';

import { CSSTransition, Errors, Loader } from 'Component';
import { debounce } from 'Helper';

type Node = React.Node;

type AwaitForExpected = any;

type AwaitFor = Promise<AwaitForExpected>;

type Props = {
  children: Node,
  awaitFor: AwaitFor,
  awaitProps: {},
  awaitDelay?: Number,
  awaitMessage: String,
  awaitExpect: Array | String | {},
  iconOnly?: Boolean
};

const Preloader = ({
  children, // Accual children to be render
  awaitFor, // function to await for
  awaitProps, // Props that pass to awaitFor
  awaitDelay = Preloader.defaultProps.awaitDelay,
  awaitMessage,
  awaitExpect, // Expected Data, return Component immediately if truly,
  iconOnly = Preloader.defaultProps.iconOnly,
  ...rest
}: Props) => {
  const pendingFor = async () => {
    const data = await awaitFor(awaitProps);
    
    await debounce(awaitDelay);

    return data;
  }

  return (
    <Async promiseFn={ pendingFor }>
      {({ data, error, isLoading }) => (
        <React.Fragment>
          <CSSTransition transitionIn={ Boolean(isLoading) }>
            <Loader { ...{ iconOnly } }/>
          </CSSTransition>
          <CSSTransition transitionIn={ Boolean(error) }>
            <Errors { ...{ errors: error } }/>
          </CSSTransition>
          <CSSTransition transitionIn={ Boolean(data) }>
            { React.cloneElement(children, { data, ...rest }) }
          </CSSTransition>
        </React.Fragment>
      )}
    </Async>
  );
}

Preloader.defaultProps = {
  awaitDelay: 1000,
  iconOnly: false
}

export default Preloader;
