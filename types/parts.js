/*
 *  Parts_js - Core Library
 *  Copyright 2011, Andy Vanee
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://andyvanee.com/
 */

// pTypes = ["string", "function", "array", "object", "jqObject", "us_object", "us_chain"];

(function(){
  var part = function(arg){
    return parts(arg);
  };
  part.types = {
    "string" : function(arg){return (typeof arg == "string")},
    "int" : function(arg) {return ((typeof arg == "number") && (arg % 1 == 0))},
    "float": function(arg){ return (typeof arg == "number")},
    "array": function(arg){ return (arg.constructor == Array)}
  };
  
  var parts = function(arg){
    var constructor = function(arg){
      this.type = typeof arg;
      this.value = arg;
      for (var key in part.types){
        if (part.types[key](arg)){ this.type = key; break;}
      }
      this.name = this.type;
    };
    constructor.prototype = _part;
    var f = new constructor(arg);
    return f;
  }
  var _part = {
    name: null,
    type : null,
    meta : null,
    expects : function(){},
    returns : function(){}
  }
  
  window.parts = parts;
})();