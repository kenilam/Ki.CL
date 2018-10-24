import React from 'react';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import multi from 'redux-multi';

import Resources from './Resources';

const reducer = combineReducers({
    ...Resources.reducer
});

const mapStateToProps = state => ({
    ...Resources.mapStateToProps(state)
});

// const mapDispatchToProps = dispatch => ({});

const Connector = connect(mapStateToProps);

const enhancer = compose(applyMiddleware(multi));

const store = createStore(reducer, enhancer);

const State = ({ children }) => <Provider {...{ store }}>{children}</Provider>;

export { Connector, Resources };
export default State;
