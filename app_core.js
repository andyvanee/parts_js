/*!
 *  Demo for parts_js
 *  Copyright 2011, Andy Vanee
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://andyvanee.com/
 */
 
window.onload = function(){
  app.style();
  app.tests();
}

app = {}

app.tests = function(){
  p("#tests").value[0].innerHTML = "<h1>parts_js: running</h1>";
  p("#console").value[0].innerHTML = "<p>ID selection successful.</p>";
  p("#console p").value[0].innerHTML += "<br>&nbsp;&nbsp;Descendant selection successful.";
  p(".sidebar").value[0].innerHTML += "<p>Class selection successful.</p>";
}

app.style = function(){
  var stylesheet = document.createElement("style");
  stylesheet.type = "text/css";
  stylesheet.innerHTML = "body {background-color: #D0D5DA; font-family:'Helvetica', sans-serif;}";
  stylesheet.innerHTML += "p {margin: 2px 10px;}";
  stylesheet.innerHTML += "#tests { padding:3%; width: 60%; float: left;} ";
  stylesheet.innerHTML += "#console{float:right; height: 60%; width: 28%; border:1px solid #AAA; color: #555; margin: 3%; overflow-y: auto;}";
  p("head").value[0].appendChild(stylesheet);
  }