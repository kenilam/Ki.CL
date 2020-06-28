import resources from '$/resources';
import { useLocation, Redirect, Route } from '@/Components/Router';
import React, { FunctionComponent } from 'react';
import Spec from './spec';

const {
  view: {
    home: { path },
  },
} = resources;

const PageNotFound: FunctionComponent<Spec.Props> = () => {
  const location = useLocation();

  // To prevents react-router redirect twice with the warning as follow:
  // Warning: You tried to redirect to the same route you're currently on:
  return location.pathname === path ? null : <Redirect to={path} />;
};

export default (
  <Route>
    <PageNotFound />
  </Route>
);
