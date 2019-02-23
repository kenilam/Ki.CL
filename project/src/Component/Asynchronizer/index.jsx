// @flow
import React from 'react';
import Async from 'react-async';

import { CSSTransition, Errors, Spinner } from 'Component';
import { debounce, isEmpty } from 'Helper';

import './style';

type Node = React.Node;

type AwaitForExpected = any;

type AwaitFor = Promise<AwaitForExpected>;

type Props = {
  children: Node,
  awaitFor: AwaitFor,
  awaitProps: {},
  awaitDelay?: Number,
  awaitMessage: String,
  iconOnly?: Boolean
};

const Component = ({ children, data }) =>
  typeof children === 'function'
    ? children({ data })
    : React.cloneElement(children, { data });

const Asynchronizer = ({
  children, // Accual children to be render
  awaitCache, // caches to await for
  awaitError,
  awaitFor, // function to await for
  awaitProps, // Props that pass to awaitFor
  awaitDelay,
  awaitMessage,
  iconOnly
}: Props) => {
  if (!isEmpty(awaitCache)) {
    return <Component data={awaitCache}>{children}</Component>;
  }

  return (
    <Async
      promiseFn={async () => {
        const data = await awaitFor(awaitProps);

        await debounce(awaitDelay);

        return data;
      }}
    >
      {({ data, error, isLoading }) => (
        <React.Fragment>
          <Spinner
            iconOnly={iconOnly}
            message={awaitMessage}
            show={Boolean(isLoading)}
          />
          <Errors errors={error} onError={awaitError} show={Boolean(error)} />
          <CSSTransition transitionIn={Boolean(data)}>
            <Component data={data}>{children}</Component>
          </CSSTransition>
        </React.Fragment>
      )}
    </Async>
  );
};

Asynchronizer.defaultProps = {
  awaitDelay: 1000,
  iconOnly: false
};

export default Asynchronizer;
