/*!
 *  Parts_js - Core Library
 *  Copyright 2011, Andy Vanee
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://andyvanee.com/
 */
 
(function() {
  var parts = function(arg) {
    if (typeof arg == "string") return parts.select(arg);
    else return parts.value(arg);
  };
  parts.mixin = function(name, fn, args) {
    this[name] = function(args) {fn(this, args); return this;}
  };
  parts.bolton = function(name, fn, args) {
    this[name] = function(args) {return fn(this, args);}
  };
  parts.select = function(selector) {
    this.queryString = selector;
    this.value = document.getElementById(selector);
    return this;
  };
  
  parts.value = function(value) {
    this.value = value;
    return this;
  }
  return (window.parts = window.p = parts);
})();


parts.mixin("select",
  function(obj, selector) {
    obj.queryString = selector;
    obj.value = sel(selector);
  }
);

(function(){
  var sel = function( selector, context ){
    var args = selector.split(" "), arg = args.shift(), value = [], f = undefined;
    
    var f = function(elem, arg){
      return (arg[0] == "#") ? [elem.getElementById(arg.slice(1))] : 
      (arg[0] == ".") ? elem.getElementsByClassName(arg.slice(1)) :
      elem.getElementsByTagName(arg);
    }
    
    var result;
    if (context) {
      for (i in context){
        result = f(context[i], arg);
      }
    }
    else {result = f(document, arg)}
    
    for (i in result) {if (result[i] && result[i].parentNode) value.push(result[i])}
    if (args.length < 1) return value;
    else return sel(args.join(" "), value);
  };
  window.sel = sel;
})();