// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  //json = JSON string of objects (key-value pairs) and arrays
  var firstChar = json.charAt(0);
  //remove brackets/braces
  var jsonString = json.slice(1,json.length-1);
  //json string --> array
  var jsonArr = jsonString.split(',');
  //declare object
  var jsonObj = {};
  if(firstChar === '[') {
    if (jsonString.length === 0) {
      return [];
    } else {
      return jsonArr;
    }
  } else if (firstChar === '{') {
    for (var i = 0; i < jsonArr.length; i++) {
      var pair = jsonArr[i].split(': ');
      var key = pair[0].slice(1,pair[0].length-1);
      var value = pair[1].slice(1,pair[1].length-1);
      jsonObj[key] = value;
    }
  }
  return jsonObj;
};
