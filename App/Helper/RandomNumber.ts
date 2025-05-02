import * as Spec from '^/App/Helper/_Spec';

const DEFAULT_VALUES = { start: 0, end: 100 };

const RandomNumber: Spec.RandomNumber = ({
  end = DEFAULT_VALUES.end,
  start = DEFAULT_VALUES.start,
} = DEFAULT_VALUES) => {
  return Math.floor(Math.random() * end) + start;
};

export default RandomNumber;
