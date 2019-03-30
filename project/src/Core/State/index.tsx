import { IState, Window } from './typings';

import * as React from 'react';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider, connect } from 'react-redux';

let reducers = {};

const { default: multi } = require('redux-multi');

const composeEnhancers = (window as Window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(multi));

const store = createStore(state => state, enhancer);

const asyncReducers = (newReducers: any) => {
  reducers = Object.assign(reducers, newReducers);

  store.replaceReducer(combineReducers({ ...reducers }));
};

const State = ({ children }: IState) => (
  <Provider {...{ store }}>{children}</Provider>
);

export { asyncReducers, connect };
export default State;
