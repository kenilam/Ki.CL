import * as IUtility from './spec';

const splitArrayEvenly = ( { array, chunk }: IUtility.SplitArrayEvenlyProps ) => {
  let i: number;
  
  const result = [];
  
  for (i = 0; i < array.length; i += chunk) {
    result.push( array.slice( i, i + chunk ) );
  }
  
  return result;
};

export { splitArrayEvenly };
