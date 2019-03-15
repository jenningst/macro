/**
 * Indicates whether an input object's properties are different
 * than those of a base object.
 * @param {Object} base The base object; source of truth
 * @param {Object} input An input object to check for equivalency
 * @return {Boolean}
 */
function hasObjectChanged(base, input) {
  let inputProps = Object.getOwnPropertyNames(input);

  for (var i = 0; i < inputProps.length; i++) {
    let propName = inputProps[i];
    // check to see if values of the same prop are equal
    if(input[propName] !== base[propName]) {
      return true;
    }
  }
  return false;
}

module.exports = { hasObjectChanged };
