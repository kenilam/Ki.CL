import {Redirect, Route} from "@Component/Router";
import * as React from "react";
import resources from 'resources/data.json';
import {IProps} from './spec';

const {view: {home: {path}}} = resources;

const PageNotFound = ({history}: IProps) => {
  // To prevents react-router as follow:
  // Warning: You tried to redirect to the same route you're currently on:
  return history.location.pathname !== path
    ? <Redirect to={path} />
    : null;
};

export default <Route render={PageNotFound} />;
