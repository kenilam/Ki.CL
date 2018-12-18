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

const Asynchronizer = ({
  children, // Accual children to be render
  awaitFor, // function to await for
  awaitProps, // Props that pass to awaitFor
  awaitDelay,
  awaitMessage,
  awaitExpect, // Expected Data, return Component immediately if truly,
  iconOnly,
  ...rest
}: Props) => awaitExpect
  ? React.cloneElement(children, { data: awaitExpect, ...rest })
  : (
    <Async promiseFn={ async () => {
      const data = await awaitFor(awaitProps);
      
      await debounce(awaitDelay);

      return data;
    } }>
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

Asynchronizer.defaultProps = {
  awaitDelay: 1000,
  iconOnly: false
}

export default Asynchronizer;
