import React from 'react';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import multi from 'redux-multi';

import Resources from './Resources';
import Styles from './Styles';

const reducer = combineReducers({
  ...Resources.reducer,
  ...Styles.reducer
});

const mapStateToProps = state => ({
  ...Resources.mapStateToProps(state),
  ...Styles.mapStateToProps(state)
});

const mapDispatchToProps = dispatch => ({
  ...Styles.mapDispatchToProps(dispatch)
});

const Connector = connect(mapStateToProps, mapDispatchToProps);

const enhancer = compose(applyMiddleware(multi));

const store = createStore(reducer, enhancer);

const State = ({ children }) => <Provider {...{ store }}>{children}</Provider>;

export { Connector, Resources };
export default State;
