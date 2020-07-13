import useWindowSizes from './useWindowSizes';

const State = () => {
  return {
    ...useWindowSizes(),
  };
};

export { useWindowSizes };
export default State;
