import { useEffect, useReducer } from 'react';
import { Actions, State, Type } from '@/Hook/useWindowScroll/spec';

const actions = {
  windowScroll: 'UPDATE_WINDOW_SCROLL' as Type,
};

function revertValue(value: number) {
  if (value > 0) {
    return -value;
  }

  if (value < 0) {
    return Math.abs(value);
  }

  return value;
}

function getValue() {
  const { scrollX, scrollY } = window;
  
  return { windowScroll: { x: revertValue(scrollX), y: revertValue(scrollY) } };
}

function useWindowScroll() {
  const initialState = getValue()
  
  const reducers = {
    windowScroll(
      state: State,
      { type, windowScroll }: Actions
    ) {
      if (type === actions.windowScroll) {
        return { windowScroll: windowScroll || state.windowScroll };
      }
  
      throw new Error();
    }
  };

  const [{ windowScroll }, dispatch] = useReducer(reducers.windowScroll, initialState);

  const updateWindowSizes = () => {
    dispatch({ ...getValue(), type: actions.windowScroll });
  };

  useEffect(() => {
    window.addEventListener('scroll', updateWindowSizes);

    return () => {
      window.removeEventListener('scroll', updateWindowSizes);
    };
  });

  return { scroll: windowScroll, updateWindowSizes };
}

export default useWindowScroll;
