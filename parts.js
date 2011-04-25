/*!
 *  Parts_js - Core Library
 *  Copyright 2011, Andy Vanee
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://andyvanee.com/
 */
 
(function() {
  var parts = function(arg) {
    if (typeof arg == "string") { return parts.select(arg) }
    else { return parts.set_value(arg) }
  };
  parts.mixin = function(name, fn, args) {
    var f = fn();
    this[name] = function(args) {var r = f(this, args); if(r) return r; return this;}
  };
  parts.select = function(selector) {
    this.queryString = selector;
    this.value = document.getElementById(selector);
    return this;
  };
  
  parts.set_value = function(value) {
    this.queryString = "";
    this.value = value;
    return this;
  }
  return (window.parts = window.p = parts);
})();


// p().each( fn(element, index, object) )

parts.mixin( 
  "each",
  function(){
    var each = function(obj, fn) {
      var val = obj.value, len = obj.value.length;
      for (var i = 0; i < len; i++) { fn(val[i], i , val) }
    };
    return each;
  }
);

// p().html()                 get string content of first matched element
// p().html("string")         set string contents of all matched elements 
// p().html(function(oldHTML){ ... })    set all elements using function

parts.mixin(
  "html", 
  function(){
    var html = function(obj, arg){
      var first = obj.value[0];
      if (arg == undefined) return first.innerHTML;
      else if (typeof arg == "function") { 
        obj.each(function(value, index, arr){
          value.innerHTML = arg(value.innerHTML);
        });
      }
      else if (typeof arg == "string") {
        obj.each(function(value, index, arr){
          value.innerHTML = arg;
        });
      }
    }
    return html;
  }
);

parts.mixin(
  "append", 
  function(){
    var append = function(obj, arg){
      if (arg == undefined) return;
      else if (typeof arg == "function") { 
        obj.each(function(value, index, arr){
          value.innerHTML += arg(value.innerHTML);
        });
      }
      else if (typeof arg == "string") {
        obj.each(function(value, index, arr){
          value.innerHTML += arg;
        });
      }
    }
    return append;
  }
);

parts.mixin(
  "reduce",
  function(){
    var reduce = function(obj, arg){
      var val = obj.value, len = obj.value.length, result = [], fn = arg;
      for (var i = 0; i < len; i++) { 
        if ( fn(val[i]) ) {result.push(val[i])}
      }
      obj.value = result;
      return obj;
    }
    return reduce;
  }
)


// Functions to be included as mixins

parts.mixin(
  "select",
  function(){
    var select = function(obj, selector) {
      obj.queryString = selector;
      obj.value = sel(selector);
    }
  return select;
  }
);

/* Sel Selector engine */
(function(){
  if (document.querySelectorAll){
    var sel = function( selector, context ) {
      if (context) { return context.querySelectorAll(selector)}
      else { return document.querySelectorAll(selector); }
    }
  }
  else {
    var sel = function( selector, context ){
      console.log(selector + " : " + context);
      var args = selector.split(" "),
      arg = args.shift(), value = [], f, result, cond;
      
      var f = function(elem, arg){
        return (arg[0] == "#") ? [document.getElementById(arg.slice(1))] : 
        (arg[0] == ".") ? elem.getElementsByClassName(arg.slice(1)) :
        elem.getElementsByTagName(arg);
      }
      
      if (context) {
        for (var i in context){
          result = f(context[i], arg);
          for (var i in result) {if (result[i] && result[i].parentNode) value.push(result[i])};
        }
      }
      else {
        result = f(document, arg);
        for (var i in result) {if (result[i] && result[i].parentNode) value.push(result[i])};
      }
      
      if (args.length < 1) return value;
      else return sel(args.join(" "), value);
    };
  }
  window.sel = sel;
})();