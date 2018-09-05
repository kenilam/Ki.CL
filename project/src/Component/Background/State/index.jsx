import React from 'react';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import multi from 'redux-multi';

import BackgroundSize from './BackgroundSize';

const reducer = combineReducers({
    ...BackgroundSize.reducer
});

const mapStateToProps = state => ({
    ...BackgroundSize.mapStateToProps(state)
});

const mapDispatchToProps = {
    ...BackgroundSize.mapDispatchToProps
};

const Connector = connect(
    mapStateToProps,
    mapDispatchToProps
);

const enhancer = compose(applyMiddleware(multi));

const store = createStore(reducer, enhancer);

const State = ({ children }) => <Provider {...{ store }}>{children}</Provider>;

export { Connector, BackgroundSize };
export default State;
