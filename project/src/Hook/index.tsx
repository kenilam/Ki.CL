import history from './History';
import windowSizes from './WindowSizes';

const State = () => {
  return {
    ...windowSizes()
  };
};

export {history, windowSizes};
export default State;
