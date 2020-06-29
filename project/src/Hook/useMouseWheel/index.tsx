import { useEffect, useReducer } from 'react';
import { Actions, State, Type } from '@/Hook/useMouseWheel/spec';

const actions = {
  mouseWheel: 'UPDATE_MOUSE_WHEEL' as Type,
};

const INITIAL_STATE = { mouseWheel: { x: 0, y: 0 } };

function useWindowSizes() {
  const reducers = {
    mouseWheel(
      state: State,
      { type, mouseWheel }: Actions
    ) {
      if (type === actions.mouseWheel) {
        return { mouseWheel: mouseWheel || state.mouseWheel };
      }
  
      throw new Error();
    }
  };

  const [{ mouseWheel }, dispatch] = useReducer(reducers.mouseWheel, INITIAL_STATE);

  const updateMouseWheel = (event: MouseWheelEvent) => {
    console.log(event);
    const { deltaX: x, deltaY: y } = event;

    dispatch({ type: actions.mouseWheel, mouseWheel: { x, y } });
  };

  const updateTouchMove = (event: TouchEvent) => {
    const { targetTouches } = event;
    const { pageX: x, pageY: y } = targetTouches[0];

    dispatch({ type: actions.mouseWheel, mouseWheel: { x, y } });
  }

  const onTouchStart = () => {
    window.addEventListener('touchmove', updateTouchMove);
  }

  const onTouchEnd = () => {
    window.removeEventListener('touchmove', updateTouchMove);
  }

  useEffect(() => {
    if (window.Touch) {
      window.addEventListener('touchstart', onTouchStart);
      window.addEventListener('touchend', onTouchEnd);

      return () => {
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchend', onTouchEnd);
      };
    }
    
    window.addEventListener('wheel', updateMouseWheel);

    return () => {
      window.removeEventListener('wheel', updateMouseWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  });

  return { wheel: mouseWheel, updateMouseWheel };
}

export default useWindowSizes;
