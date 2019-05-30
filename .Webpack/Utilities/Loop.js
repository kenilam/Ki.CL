const recursive = ( nodes ) => {
  let result;
  
  if (nodes.length === 1) {
    return nodes[ 0 ]
  }
  
  result = [];
  
  recursive( nodes.splice( 1, nodes.length - 1 ) )
  .forEach(
    node => nodes[ 0 ].forEach(
      firstNode => result.push(
        [].concat( firstNode, node ).sort( ( a, b ) => a.index - b.index ),
      ),
    ),
  );
  
  return result
};

export default ( ...args ) => {
  let callback = args[ args.length - 1 ];
  
  if (typeof callback !== 'function') {
    callback = false
  }
  
  return []
  .concat(
    recursive(
      ( callback ? args.splice( 0, args.length - 1 ) : args )
      .map(
        ( node, index ) => [].concat( ...[ node ] ).map( value => ( {
          value,
          index
        } ) ),
      ),
    ),
  )
  .map( node => ( Array.isArray( node ) ? node.map( props => props.text ) : [ node.text ] ) )
  .map( result =>
    // eslint-disable-next-line
    ( callback ? callback( ...result ) : result ) )
};
