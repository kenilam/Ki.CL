import React from 'react';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import multi from 'redux-multi';

import transitionStyle from './transitionStyle';

const reducers = combineReducers({
    ...transitionStyle.reducers
});

const mapStateToProps = state => ({
    ...transitionStyle.mapStateToProps(state)
});

const mapDispatchToProps = dispatch => ({
    ...transitionStyle.mapDispatchToProps(dispatch)
});

const Connector = connect(
    mapStateToProps,
    mapDispatchToProps
);

const enhancer = compose(applyMiddleware(multi));

const store = createStore(reducers, enhancer);

const State = ({ children }) => <Provider {...{ store }}>{children}</Provider>;

export { Connector };
export default State;
