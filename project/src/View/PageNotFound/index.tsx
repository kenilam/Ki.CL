import resources from '$/resources';
import { Redirect, Route, useLocation } from '@/Component/Router';
import React, { FunctionComponent } from 'react';
import IPageNotFound from './spec';

const {
  view: {
    home: { path },
  },
} = resources;

const PageNotFound: FunctionComponent<IPageNotFound.Props> = () => {
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
