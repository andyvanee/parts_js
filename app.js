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

app = {
  console: function(str){
    p("#console").value[0].innerHTML += "<p>" + str + "</p>";
  }
}

app.tests = function(){
  p("#tests").value[0].innerHTML = "<h1>parts_js: running</h1>";
  app.console("ID selection working.");
  p("#console p").value[0].innerHTML += "<br>&nbsp;&nbsp;Descendant selection working.";
  p(".sidebar").value[0].innerHTML += "<p class='needle'>Class selection working.</p>";
  p("div .needle").value[0].innerHTML += "<br>Child selection working.";
  console.log("Contents of .needle: " + p(".needle").html());
  
  p(".needle").html( function(old){
    return old + "<br> p('.needle').html( function(oldhtml){ return html }) working."
  });
  
  p("div").each(function(value, index){
    // console.log(value.id);
    app.console("p('p').each found: ");
    app.console(index + " : " + value + " : " + value.id);
  });

  
}

app.style = function(){
  var stylesheet = document.createElement("style");
  stylesheet.type = "text/css";
  stylesheet.innerHTML = "body {background-color: #D0D5DA; font-family:'Helvetica', sans-serif;} " +
    "div {background-color: #DAE1E5; margin: 2%; padding: 2%; overflow-y: auto;} " +
    "p {margin: 2px 10px;} " +
    "#tests { width: 30%; height: 60%; float: left; } " +
    "#console{float:right; width: 50%; height: 60%; color: #555; font-family: monospace;}";
  p("head").value[0].appendChild(stylesheet);
}