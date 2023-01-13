import { useState } from 'react';

const DEFAULT_INDEX = 0;

const DEFAULT: ReturnType<typeof useMenu> = {
  incrementIndex() {
    return false;
  },
  index: DEFAULT_INDEX,
  setIndex(value = DEFAULT_INDEX) {
    return value;
  },
};

const useMenu = () => {
  const [index, setIndex] = useState(DEFAULT_INDEX);

  const incrementIndex = () => {
    setIndex((index) => index + 1);
  };

  return { incrementIndex, index, setIndex };
};

export { DEFAULT };
export default useMenu;
