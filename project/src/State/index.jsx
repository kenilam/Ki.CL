import React from 'react';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import multi from 'redux-multi';

const reducers = combineReducers({});

const mapStateToProps = () =>
    // state
    ({});

const mapDispatchToProps = () =>
    // dispatch
    ({});

const Connector = connect(
    mapStateToProps,
    mapDispatchToProps
);

const enhancer = compose(applyMiddleware(multi));

const store = createStore(reducers, enhancer);

const State = ({ children }) => <Provider {...{ store }}>{children}</Provider>;

export { Connector };
export default State;
