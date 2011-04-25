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
    p("#console").html(function(old){return old + "<p>" + str + "</p>"});
  }
}

app.tests = function(){
  p("div").html("<h2>parts_js: running</h2>");
  p("#console").append("<p><br>ID selection working. p('#console')</p>");
  p("#console p").append("<br>Descendant selection working. p('#console p')");
  p(".sidebar").append("<p id='needle' class='needle'>Class selection working. p('.sidebar')</p>");
  p(".sidebar #needle").append("<br>Child selection working.");
  p("#needle").html( function(old){
    return old + "<br> p('#needle').html( function(oldhtml){ return html }) is working."
  });
  app.console("<br>Contents of .needle: <br>" + p("#needle").html());
  app.console("<br>Each div:");  
  p("div").each(function(value, index){
    app.console( index + ": value:" + value + " id:" + value.id);
  });
  
  var hybridArray = ["hello parts!", 12, 0.5, {id : "an_object"}, 77];
  app.console("<br>Each element in a hybrid array");
  p(hybridArray).each(function(value, index, arr){
    app.console(index + " : " + typeof value + " : " + arr);
  });
  
  app.console( 
    "reduce(){ val > 10 } === "  +
    p(hybridArray).reduce(function(val){return val > 10}).value 
  );
  p("div").html(function(old){return old + "<br>Adding content to all divs."});
  
  var x = document.querySelectorAll("div");
  p("p", x).each(function(value){ console.log(value.innerHTML) });

}

app.style = function(){
  var stylesheet = document.createElement("style");
  stylesheet.type = "text/css";
  stylesheet.innerHTML = "body {background-color: #D0D5DA; font-family:'Helvetica', sans-serif;} " +
    "div {background-color: #DAE1E5; margin: 1%; padding: 2%; overflow-y: auto;} " +
    "p {margin: 12px 10px;} " +
    "#tests { width: 30%; height: 80%; float: left; } " +
    "#console{float:right; width: 50%; height: 80%; color: #555; font-family: monospace;}";
  p("head").value[0].appendChild(stylesheet);
}