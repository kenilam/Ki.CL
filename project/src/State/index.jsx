import React from 'react';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import multi from 'redux-multi';

let reducers = {};

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const enhancer = composeEnhancers(applyMiddleware(multi));

const store = createStore(state => state, enhancer);

const asyncReducers = newReducers => {
  reducers = Object.assign(reducers, newReducers);

  store.replaceReducer(combineReducers({ ...reducers }));
};

const State = ({ children }) => <Provider {...{ store }}>{children}</Provider>;

export { asyncReducers, connect };
export default State;
