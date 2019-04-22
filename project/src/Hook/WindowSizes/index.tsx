import {useEffect, useReducer} from 'react';

const actions = {
  windowSizes: 'UPDATE_WINDOW_SIZES' as IWindowSizes.Type
};

const {innerHeight: height, innerWidth: width} = window;

const initialStates = {windowSizes: {height, width}};

const reducers = {
  windowSizes(state: IWindowSizes.State, {type, windowSizes}: IWindowSizes.Actions) {
    switch (type) {
      case actions.windowSizes:
        return {windowSizes: windowSizes || state.windowSizes};
      default:
        throw new Error();
    }
  },
};

export {initialStates, reducers, actions};
export default () => {
  const [{windowSizes}, dispatch] = useReducer(reducers.windowSizes, {windowSizes: initialStates.windowSizes});
  
  const updateWindowSizes = () => {
    const {innerHeight: height, innerWidth: width} = window;
    
    dispatch({type: actions.windowSizes, windowSizes: {height, width}});
  };
  
  useEffect(() => {
    window.addEventListener('resize', updateWindowSizes);
    
    return () => {
      window.removeEventListener('resize', updateWindowSizes);
    }
  });
  
  return {windowSizes, updateWindowSizes};
};
