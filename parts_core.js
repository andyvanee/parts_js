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