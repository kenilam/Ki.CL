import { useEffect, useReducer } from 'react';
import { Actions, State, Type } from '@/Hook/useWindowSizes/spec';

const actions = {
  windowSizes: 'UPDATE_WINDOW_SIZES' as Type,
};

function useWindowSizes() {
  const { innerHeight: height, innerWidth: width } = window;
  
  const initialState = { windowSizes: { height, width } };
  
  const reducers = {
    windowSizes(
      state: State,
      { type, windowSizes }: Actions
    ) {
      if (type === actions.windowSizes) {
        return { windowSizes: windowSizes || state.windowSizes };
      }
  
      throw new Error();
    }
  };

  const [{ windowSizes }, dispatch] = useReducer(reducers.windowSizes, initialState);

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

export default useWindowSizes;
