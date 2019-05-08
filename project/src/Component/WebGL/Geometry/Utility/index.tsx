import * as IUtility from './spec';

const splitArrayEvenly = ({array, chunk}: IUtility.SplitArrayEvenlyProps) => {
  const result = [];
  
  for (let i = 0; i < array.length; i += chunk) {
    result.push(array.slice(i, i + chunk));
  }
  
  return result;
};

export {splitArrayEvenly};
