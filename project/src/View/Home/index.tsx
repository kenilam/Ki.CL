import { Route, withRouter } from '@Component/Router';
import React, { useEffect, useReducer } from 'react';
import { IComponent, IProps } from './spec';
import './Style';

const actions = {
  height: 'UPDATE_WINDOW_HEIGHT',
  width: 'UPDATE_WINDOW_WIDTH',
};

const { innerHeight: height, innerWidth: width } = window;

const initialState = { height, width };

const reducer = {
  height(state: { height: number }, { type, height }: { type: string; height: number }) {
    switch (type) {
      case actions.height:
        return { height: height || state.height };
      default:
        throw new Error();
    }
  },
  width(state: { width: number }, { type }: { type: string; width: number }) {
    switch (type) {
      case actions.width:
        return { width: width || state.width };
      default:
        throw new Error();
    }
  }
}

const Home: React.FC<IProps> = ({ }) => {
  const updateWindowSizes = () => {
    const { innerHeight: height, innerWidth: width } = window;

    dispatchHeight({ type: actions.height, height });
    dispatchWidth({ type: actions.width, width });
  }

  const [{ height }, dispatchHeight] = useReducer(reducer.height, { height: initialState.height });
  const [{ width }, dispatchWidth] = useReducer(reducer.width, { width: initialState.width });

  useEffect(() => {
    window.addEventListener('resize', updateWindowSizes);

    return () => {
      window.removeEventListener('resize', updateWindowSizes);
    }
  });

  return (
    <main data-routes='home' style={{ height, width }}>
      Home
    </main>
  );
}

const Instance = withRouter(Home);

const Component: React.FC<IComponent> = () => <Instance />;

export default <Route path='/' exact={true} render={Component} />;
