import React from 'react';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import multi from 'redux-multi';

import WindowSize from './WindowSize';

const reducer = combineReducers({
    ...WindowSize.reducer
});

const mapStateToProps = state => ({
    ...WindowSize.mapStateToProps(state)
});

const mapDispatchToProps = {
    ...WindowSize.mapDispatchToProps
};

const Connector = connect(
    mapStateToProps,
    mapDispatchToProps
);

const enhancer = compose(applyMiddleware(multi));

const store = createStore(reducer, enhancer);

const State = ({ children }) => <Provider {...{ store }}>{children}</Provider>;

export { Connector, WindowSize };
export default State;
