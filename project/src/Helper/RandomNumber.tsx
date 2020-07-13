import { RandomNumber } from '@/Helper/spec';

const DEFAULT_VALUES = { start: 0, end: 100 };

const RandomNumber: RandomNumber = ({ start, end } = DEFAULT_VALUES) => {
  return Math.floor(Math.random() * end) + start;
}

export default RandomNumber;
