/*!
 *  Demo for parts_js
 *  Copyright 2011, Andy Vanee
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://andyvanee.com/
 */
 
window.onload = function(){
  var stylesheet = document.createElement("style");
  stylesheet.type = "text/css";
  stylesheet.innerHTML = "body {background-color: #D0D5DA; font-family:'Helvetica', sans-serif;} ";
  stylesheet.innerHTML += "#tests { padding:3%; width: 60%; float: left;} ";
  stylesheet.innerHTML += "p.fadein{opacity: 0; font-size: 22px;} p.fadein:hover{color: #229} ";
  stylesheet.innerHTML += "#console{float:right; height: 60%; width: 28%; border:1px solid #AAA; color: #555; margin: 3%; overflow-y: auto;}"
  p("head").value[0].appendChild(stylesheet);

  p("#tests").value[0].innerHTML = "<h1>parts_js:</h1>";
  setTimeout(function(){p("h1").value[0].innerHTML += " running"}, 400);
  
  p("#tests").value[0].innerHTML += "<p class='fadein'>Enjoy the ride!</p>";
  app.interval = setInterval(app.fadein, 20);
  
  app.tests();
}

app = {
  opacity: 0,
  interval: undefined,
  counter: 0,
  fadein: function(){
    (app.opacity < 0.95) ? app.opacity += 0.004 : clearInterval(app.interval);
    p(".fadein").cssText({"opacity": app.opacity});
  },
  console: function(arg){ p("#console").value[0].innerHTML += arg +"<br>" }
}

parts.mixin("log", function(obj) { app.console(obj.value) });

app.tests = function(){
  (p("body").value[0].toString() == "[object HTMLBodyElement]") ? 0 : app.console("Body selection failed");
  (p('body').value[0] == document.getElementsByTagName("body")[0]) ? 0 : app.console("Body identity test failed");
  (p('#tests').value[0] == document.getElementById("tests")) ? 0 : app.console("#tests identity test failed");
  
  app.counter=0;
  app.console("p('.fadein').each found this: ");
  p(".fadein").each(function(){app.counter += 1}).log();
  (app.counter === 1) ? 0 : app.console("Error in each() function.");
  
}

sel("body");