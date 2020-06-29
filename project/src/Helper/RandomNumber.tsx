import Spec from './spec';

const DEFAULT_VALUES = { start: 0, end: 100 };

const RandomNumber: Spec.RandomNumber = ({ start, end } = DEFAULT_VALUES) => {
  return Math.floor(Math.random() * end) + start;
}

export default RandomNumber;
