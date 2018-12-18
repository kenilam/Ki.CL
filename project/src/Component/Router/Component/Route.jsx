// @flow
import React from 'react';
import { Route as RouteOrigin } from 'react-router-dom';

type Node = React.Node;

type Props = {
  exact: Boolean,
  path: String,
  render: Node
};

const Route = ({
  computedMatch, exact, path, render: Component, staticContext, ...rest
}: Props) => (
  <RouteOrigin
    { ...{ path, exact, render: ({ computedMatch, staticContext, ...props }) => (
      <Component { ...{ ...rest, ...props } } />
    ) } }
  />
);

export default Route;
