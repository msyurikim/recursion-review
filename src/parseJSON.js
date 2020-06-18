// var parseJSON = JSON.parse;

//json = JSON string of objects (key-value pairs) and arrays
var parseJSON = function(json) {
  var firstChar = json.charAt(0);
  var lastChar = json.charAt(json.length-1);
  if (lastChar !== '}' && lastChar !== ']') {
    //throw new SyntaxError('missing closing bracket/brace');
  }
  //remove outer brackets/braces
  var jsonString = removeFirstLastChar(json);
  var jsonArr, jsonObj;
  if (firstChar === '[') {
    jsonArr = []; //took out var
    if (jsonString.length === 0) {
      return jsonArr;
    } else {
      jsonArr = jsonString.split(',');
      for (var i = 0; i < jsonArr.length; i++) {
        if (jsonString[0] === '{' || jsonString[0] === '[') {
          jsonArr[i] = parseJSON(jsonArr[i]);
        } else {
          jsonArr[i] = convertType(jsonArr[i]);
        }
      }
    }
    return jsonArr;
  } else if (firstChar === '{') {
    jsonObj = {}; //took out var
    if (jsonString.length === 0) {
      return jsonObj;
    } else {
      while (jsonString.length !== 0) {
        var keyBeg = jsonString.indexOf('"');
        var keyEnd = jsonString.indexOf('"', keyBeg+1);
        var valBeg = jsonString.indexOf(':', keyEnd+1);
        var valEnd = jsonString.indexOf(',', valBeg+1);

        //key will always be string
        var key = jsonString.slice(keyBeg+1, keyEnd);
        var value = jsonString.slice(valBeg+1);
        value = value.trim();

        if (value[0] === '{' || value[0] === '[') { //value is an array
          var arrEnd = value.indexOf(']', valBeg+1);
          var objEnd = value.indexOf('}', valBeg+1);
          if (arrEnd >= 1) {
            value = value.slice(0, arrEnd+1);
            valEnd = value.indexOf(',', arrEnd+1);
          } else if (objEnd >= 1) {
            value = value.slice(0, objEnd+1);
            valEnd = value.indexOf(',', objEnd+1);
          }
          value = parseJSON(value);
        } else {
          if (valEnd <= 0) {  //last/only key-value pair
            valEnd = jsonString.length-1;
          } else {
            value = jsonString.slice(valBeg+1, valEnd);
          }
          value = value.trim();
          value = convertType(value);
        }
        //value = value.trim();
        /**
         if (value[0] === '{' || value[0] === '[') {
          value = parseJSON(value);
        } else {
          value = convertType(value);
        }
         */

        jsonObj[key] = value;
        jsonString = jsonString.slice(valEnd+1);
      }
      return jsonObj;
    }
  }
};

//method to remove brackets, enclosing quotations
//use on string that represents array, object, string
var removeFirstLastChar = function(str) {
  return str.slice(1, str.length-1);
};

//convert string to its proper type
var convertType = function(str) {
  if (str === "null") {
    str = null;
  } else if (str === "true") {
    str = true;
  } else if (str === "false") {
    str = false;
  } else if (typeof str === 'string') {
    var trimmed = str.trim(); //this was commented out for object
    //check that value is a number, not a NaN, and not an empty string (will eval to 0)
    if (typeof Number(str) === 'number' && !Number.isNaN(Number(str)) && str.length !== 0){
      str = Number(str);
    } else {
      str = removeFirstLastChar(trimmed);
    }
  }
  return str;
};

//method to check every opening bracket/quotation has a closing bracket/quotation
//unless previous character is / ?
var checkForPairs = function(str) {
  var pair = [];
  for (var i = 0; i < str.length; i++) {
    var char = str.charAt(i);
    if (char === '{' || char === '[') {
      pair.push(char);
    }
  }

  for (var i = pair.length-1; i >= 0; i--) {
    var index;
    if (pair[i] === '{') {
      index = str.indexOf('}', i+1);
    } else if (pair[i] === '[') {
      index = str.indexOf(']', i+1);
    }
    if (index >= 0) {
      pair.pop();
    } else {
      return false;
    }
  }
  return pair.length === 0;
};