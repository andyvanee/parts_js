/*
 *  Parts_js - Core Library
 *  Copyright 2011, Andy Vanee
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://andyvanee.com/
 */
 
(function() {
  var parts = function(arg) {
    if (typeof arg == "string") { return pt.select(arg) }
    else { return pt.set_value(arg) }
  };
  parts.mixin = function(name, fn, args) {
    var f = fn();
    this[name] = function(args) {var r = f(this, args); if(r) return r; return this;}
  };
  parts.delegate = function(name, fn, arg){
    var f = fn();
    this[name] = function(args) {var r = f(this, args); if(r) return r; return this;}
  };
  parts.select = function(selector) {
    var f = function(){}; f.prototype = this;
    var newObj = new f();
    newObj.queryString = selector;
    newObj.value = document.getElementById(selector);
    return newObj;
  };
  parts.set_value = function(value) {
    this.queryString = "";
    this.value = [];
    if (value.length) { this.value = value }
    else { this.value[0] = value }
    return this;
  };
  parts._signature = function(obj){
    var strContent = "";
    for (var i=0; i < obj.value.length; i++){
      if (obj.value[i].innerHTML != undefined){
        strContent += obj.value[i].innerHTML;
      }
      else strContent += obj[i].toString();
    }
    if (strContent.length < 4) {
      strContent = pt._idHash()
    }
    
    var sum = 0;
    for (var i=0; i < strContent.length; i++){
      sum += strContent.charCodeAt(i);
    }
    return sum;
    
  };
  parts._idHash = function(){
    var hash = "";
    for(var i=0; i < 16; i++){
      var z = Math.floor(Math.random() * 36);
      hash += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ".substring(z,z+1);
    }
    return hash;
  };
  return (window.pt = parts);
})();


// p().each( fn(element, index, object) )

pt.mixin( 
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

pt.mixin(
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

pt.mixin(
  "click",
  function(){
    var click = function(obj, arg){
      var f = arg;
      if (typeof f == "function") {
        obj.each(function(value, index, arr){
          value.addEventListener("click", f, false);
        });
      }
    }
    return click;
  }
);

pt.mixin(
  "event",
  function(){
    var click = function(obj, args){
      var ev = args[0],
      f = args[1];
      if ((typeof f == "function") && (typeof ev == "string")){
        obj.each(function(value, index, arr){
          value.addEventListener(ev, f, false);
        });
      }
    }
    return click;
  }
);

pt.mixin(
  "trigger",
  function(){
    var trigger = function(obj, arg){
      var ev = arg,
      event = document.createEvent("UIEvents");
      event.initEvent(ev, true, true);
      obj.each(function(value, index, arr){
        value.dispatchEvent(event);
      });
    }
    return trigger;
  }
);

pt.mixin(
  "widget",
  function(){
    var widget = function(obj, arg){
      var elem = document.createElement(arg.type);
      elem.id = arg.id;
      elem.className = arg.className;
      elem.innerHTML = arg.content;
      if (arg.selectable === false){
        elem.onselectstart = function(){return false}
      }
      var parent = obj.value[0];
      parent.appendChild(elem);
    }
    return widget;
  }
);

pt.mixin(
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

pt.mixin(
  "toArray",
  function(){
    var toArr = function(obj){
      var newArr = [];
      var i=0;
      for (i; i < obj.value.length; i++){
        newArr[i] = obj.value[i];
      }
      return newArr;
    }
    return toArr;
  }
);

pt.mixin(
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

pt.mixin(
  "select",
  function(){
    var select = function(obj, arg) {
      var f = function(){};
      f.prototype = obj;
      var newObj = new f();
      newObj.value = [];
      
      if (typeof arg == "object"){
        newObj.queryString = "";
        newObj.value[0] = arg;
      }
      if (typeof arg == "string"){
        var val = sel(arg), i = 0;
        for (i; i < val.length; i++){
          newObj.value[i] = val[i];
        }
        newObj.length = i;
        newObj.queryString = arg;
      }
      if (typeof arg == "array"){
        newObj.value = arg;
      }
      newObj.idhash = pt._idHash();
      newObj.sig = pt._signature(newObj);
      //console.log(newObj.sig);
      return newObj;
    }
  return select;
  }
);

/* Sel Selector engine */
(function(){
  if (document.querySelectorAll){
    var sel = function( selector, context ) {
      var value = [], result;
      if (context) {
        for (var i in context){
          result = context[i].querySelectorAll(selector);
          for (var i in result){
            if (result[i] && result[i].parentNode) value.push(result[i])
          }
        }
      }
      else { value = document.querySelectorAll(selector) }
      return value;
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