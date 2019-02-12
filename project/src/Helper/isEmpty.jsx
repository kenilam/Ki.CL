const { hasOwnProperty } = Object.prototype;

function isEmpty(obj) {
  if (
    // null and undefined are "empty"
    obj === null ||
    obj === undefined ||

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    obj.length === 0 ||

    // If it isn't an objectect at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    typeof obj !== "object" ||

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    Object.keys(obj).some(key => !hasOwnProperty.call(obj, key))
  ) {
    return true;
  }

  return false;
}

export default isEmpty;