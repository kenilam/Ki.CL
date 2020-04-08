import { useEffect, useReducer } from 'react';
import IWindowSizes from './spec';

const actions = {
  windowSizes: 'UPDATE_WINDOW_SIZES' as IWindowSizes.Type,
};

const { innerHeight: height, innerWidth: width } = window;

const initialStates = { windowSizes: { height, width } };

const reducers = {
  windowSizes(
    state: IWindowSizes.State,
    { type, windowSizes }: IWindowSizes.Actions
  ) {
    if (type === actions.windowSizes) {
      return { windowSizes: windowSizes || state.windowSizes };
    }

    throw new Error();
  },
};

function WindowSizes() {
  const [{ windowSizes }, dispatch] = useReducer(reducers.windowSizes, {
    windowSizes: initialStates.windowSizes,
  });

  const updateWindowSizes = () => {
    const { innerHeight: height, innerWidth: width } = window;

    dispatch({ type: actions.windowSizes, windowSizes: { height, width } });
  };

  useEffect(() => {
    window.addEventListener('resize', updateWindowSizes);

    return () => {
      window.removeEventListener('resize', updateWindowSizes);
    };
  });

  return { sizes: windowSizes, updateWindowSizes };
}

export { initialStates, reducers, actions };
export default WindowSizes;
