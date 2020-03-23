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
      var stringyArr = [];
      for (var i = 0; i < obj.length; i++) {
        stringyArr.push(stringifyJSON(obj[i]));
      }
      stringified += '[' + stringyArr.join() + ']';
    } else {
      var stringyArr = [];
      var keys = Object.keys(obj);
      keys.forEach(function(key) {
        var value = stringifyJSON(obj[key]);
        if (value !== undefined) {
          stringyArr.push(stringifyJSON(key) + ':' + value);
        }
      });
      stringified += '{' + stringyArr.join() + '}';
    }
  }
  return stringified;
};
