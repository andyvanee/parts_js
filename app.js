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
  p(".sidebar").value[0].innerHTML += "<p class='needle'>Class selection successful.</p>";
  p("div .needle").value[0].innerHTML += "<br>'div .needle' selection successful.";
  p("body").each(function(value){
    p("#console p").value[0].innerHTML += "<br>p('body').each found: " + value;  
  });
}

app.style = function(){
  var stylesheet = document.createElement("style");
  stylesheet.type = "text/css";
  stylesheet.innerHTML = "body {background-color: #D0D5DA; font-family:'Helvetica', sans-serif;}";
  stylesheet.innerHTML += "div {background-color: #DAE1E5; margin: 2%; padding: 2%; overflow-y: auto;}"
  stylesheet.innerHTML += "p {margin: 2px 10px;}";
  stylesheet.innerHTML += "#tests { width: 30%; height: 60%; float: left; } ";
  stylesheet.innerHTML += "#console{float:right; width: 50%; height: 60%; color: #555;}";
  p("head").value[0].appendChild(stylesheet);
}