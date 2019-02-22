import React from 'react';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import multi from 'redux-multi';

import Data from './Data';
import Error from './Error';
import Show from './Show';

const reducers = combineReducers({
    ...Data.reducers,
    ...Error.reducers,
    ...Show.reducers
});

const mapStateToProps = state => ({
    ...Data.mapStateToProps(state),
    ...Error.mapStateToProps(state),
    ...Show.mapStateToProps(state)
});

const mapDispatchToProps = dispatch => ({
    ...Data.mapDispatchToProps(dispatch),
    ...Error.mapDispatchToProps(dispatch),
    ...Show.mapDispatchToProps(dispatch)
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
