import resources from '$/resources';
import {Redirect, Route} from '@/Component/Router';
import React from 'react';
import * as IPageNotFound from './spec';

const {view: {home: {path}}} = resources;

const PageNotFound = ({history}: IPageNotFound.Props) => {
  // To prevents react-router redirect twice with the warning as follow:
  // Warning: You tried to redirect to the same route you're currently on:
  return history.location.pathname === path ? null : <Redirect to={path} />;
};

export default <Route component={PageNotFound} />;
