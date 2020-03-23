// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  var objType = typeof obj;
  var stringified = '';
  if (objType === 'string') {
    stringified += '"' + obj + '"';
  } else if (objType === 'undefined' || objType === 'function') {
    return;
  } else if (objType === 'number' || obj === true || !obj) {
    stringified += obj;
  } else if (objType === 'object') {
    if (Array.isArray(obj)) {
      var strings = [];
      for (var i = 0; i < obj.length; i++) {
        strings.push(stringifyJSON(obj[i]));
      }
      stringified += '[' + strings.join() + ']';
    } else {
      var strings = [];
      var keys = Object.keys(obj);
      keys.forEach(function(key) {
        var value = stringifyJSON(obj[key]);
        if (value !== undefined) {
          strings.push(stringifyJSON(key) + ':' + value);
        }
      });
      stringified += '{' + strings.join() + '}';
    }
  }
  return stringified;
};
