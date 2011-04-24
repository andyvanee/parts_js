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
    var f = fn();
    this[name] = function(args) {var r = f(this, args); if(r) return r; return this;}
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


// p().each( fn(element, index, object) )

parts.mixin( 
  "each",
  function(){
    if (Array.prototype.forEach){
      var each = function(obj, fn) {
        var val = obj.value;
        val.forEach(fn);
      };
    }
    else {
      var each = function(obj, fn) {
        var val = obj.value;
        for (i in val){ fn(val[i], i, obj.value) }
      };
    }
    return each;
  }
);

parts.mixin(
  "html", 
  function(){
    var html = function(obj, arg){
      if (arg == undefined) return obj.value[0].innerHTML;
      if (typeof arg == "function") { obj.value[0].innerHTML = arg(obj.value[0].innerHTML) };
      if (typeof arg == "string") { obj.value[0].innerHTML = arg; }
    }
    return html;
  }
);


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
  var sel = function( selector, context ){
    var args = selector.split(" "),
    arg = args.shift(), value = [], f, result, cond;
    
    var f = function(elem, arg){
      return (arg[0] == "#") ? [elem.getElementById(arg.slice(1))] : 
      (arg[0] == ".") ? elem.getElementsByClassName(arg.slice(1)) :
      elem.getElementsByTagName(arg);
    }
    
    if (context) {
      for (i in context){
        result = f(context[i], arg);
        for (i in result) {if (result[i] && result[i].parentNode) value.push(result[i])};
      }
    }
    else {
      result = f(document, arg);
      for (i in result) {if (result[i] && result[i].parentNode) value.push(result[i])};
    }
    

    if (args.length < 1) return value;
    else return sel(args.join(" "), value);
  };
  window.sel = sel;
})();