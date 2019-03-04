const { hasOwnProperty } = Object.prototype;

function isEmpty(obj) {
  if (
    // null and undefined are "empty"
    obj === null ||
    obj === undefined ||
    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    obj.length === 0 ||
    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    Object.keys(obj).map(key => hasOwnProperty.call(obj, key)).length === 0
  ) {
    return true;
  }

  return false;
}

export default isEmpty;
