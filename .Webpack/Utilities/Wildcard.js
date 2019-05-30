export default ( element ) => {
  if (typeof element === 'string' || element.length === 0) {
    return element
  }
  
  if (element.length === 1) {
    return element[ 0 ]
  }
  
  return `{${ element.join( ',' ) }}`
};
