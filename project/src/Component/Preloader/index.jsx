// @flow
import React from 'react';

import { CSSTransition, Errors, Loader } from 'Component';
import { debounce } from 'Helper';

import State, { Connector } from './State';

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
  
  data,
  updateData,
  
  error,
  catchError,
  
  show,
  showComponent,
  ...rest
}: Props) => {
  const pendingFor = async () => {
    try {
      const data = await awaitFor(awaitProps);

      await debounce(awaitDelay);

      showComponent();
      updateData(data);
    } catch (errors) {
      catchError(errors);
    }
  }

  const Component = () => React.Children.map(
    children, child => React.cloneElement(child, { data: awaitExpect || data, ...rest })
  );

  pendingFor();

  if (awaitExpect) {
    return (
      <Component/>
    );
  }

  if (error) {
    return (
      <Errors { ...{ error } } />
    );
  }

  return (
    <React.Fragment>
      <CSSTransition in={ !show }>
        <Loader { ...{ text: awaitMessage, iconOnly } } />
      </CSSTransition>
      <CSSTransition in={ show }>
        <Component { ...{ data } } />
      </CSSTransition>
    </React.Fragment>
  );
}

const Instance = Connector(Preloader);

const Component = props => (
  <State>
    <Instance { ...props } />
  </State>
);

Preloader.defaultProps = {
  awaitDelay: 1000,
  iconOnly: false
}

export default Component;
