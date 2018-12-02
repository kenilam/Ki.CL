import React from 'react';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import multi from 'redux-multi';

import Resources from './Resources';
import Style from './Style';

let reducers = combineReducers({
  ...Resources.reducers,
  ...Style.reducers
});

const mapStateToProps = state => ({
  ...Resources.mapStateToProps(state),
  ...Style.mapStateToProps(state)
});

const mapDispatchToProps = dispatch => ({
  ...Style.mapDispatchToProps(dispatch)
});

const Connector = connect(mapStateToProps, mapDispatchToProps);

const enhancer = compose(applyMiddleware(multi));

const store = createStore(reducers, enhancer);

const State = ({ children }) => <Provider {...{ store }}>{children}</Provider>;

export { Connector, Resources };
export default State;
