import data from '$resources/data.json';
import IResources from '$resources/spec';
import {Redirect, Route} from '@Component/Router';
import React from 'react';
import * as IPageNotFound from './spec';

const {view: {home: {path}}}: IResources.Data = data;

const PageNotFound = ({history}: IPageNotFound.Props) => {
  // To prevents react-router redirect twice with the warning as follow:
  // Warning: You tried to redirect to the same route you're currently on:
  return history.location.pathname !== path
    ? <Redirect to={path} />
    : null;
};

export default <Route render={PageNotFound} />;
