/*!
 *  Demo for parts_js
 *  Copyright 2011, Andy Vanee
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://andyvanee.com/
 */
 
window.onload = function(){
  var stylesheet = document.createElement("style");
  stylesheet.type = "text/css";
  stylesheet.innerHTML = "body {background-color: #D0D5DA;} ";
  stylesheet.innerHTML += "#tests {font-family:'Helvetica', sans-serif; padding:22px; margin: 6px;} ";
  stylesheet.innerHTML += "p.fadein{opacity: 0; font-size: 22px;} p.fadein:hover{color: #229} ";
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
  fadein: function(){
    (app.opacity < 0.95) ? app.opacity += 0.004 : clearInterval(app.interval);
    p(".fadein").cssText({"opacity": app.opacity});
  },
  counter: 0
}

app.tests = function(){
  (p("body").value[0].toString() == "[object HTMLBodyElement]") ? 0 : console.log("Body selection failed");
  (p('body').value[0] == document.getElementsByTagName("body")[0]) ? 0 : console.log("Body identity test failed");
  (p('#tests').value[0] == document.getElementById("tests")) ? 0 : console.log("#tests identity test failed");
  
  app.counter=0;
  console.log("p('.fadein').each found this: ");
  p(".fadein").each(function(){app.counter += 1}).log();
  (app.counter === 1) ? 0 : console.log("Error in each() function.");
  
}