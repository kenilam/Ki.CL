import React from 'react';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import multi from 'redux-multi';

import Show from './Show';

let reducers = combineReducers({
  ...Show.reducers
});

const mapStateToProps = state => ({
  ...Show.mapStateToProps(state)
});

const mapDispatchToProps = dispatch => ({
  ...Show.mapDispatchToProps(dispatch)
});

const Connector = connect(mapStateToProps, mapDispatchToProps);

const enhancer = compose(applyMiddleware(multi));

const store = createStore(reducers, enhancer);

const State = ({ children }) => <Provider {...{ store }}>{children}</Provider>;

export { Connector };
export default State;
