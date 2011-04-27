/*!
 *  Demo for parts_js
 *  Copyright 2011, Andy Vanee
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://andyvanee.com/
 */
 
window.onload = function(){
  app.setup();
}

app = {
  console: function(str){
    p("#console").html(function(old){return old + "<p>" + str + "</p>"});
  }
}

app.setup = function(){
  p("#tests, #console").html(function(old){return old + "<h2>parts_js: running</h2>"});
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
/*
  p("div").html(function(old){
    return old + "<br>Adding content to all divs.";
  });
*/
  
  var x = document.querySelectorAll("div");
  p("p", x).each(function(value){ console.log(value.innerHTML) });
  p("#tests").widget({
    type: "div",
    content: "New Widget",
    className: "my_widget",
    id: "widget_1",
    selectable: false
  });

  p("#widget_1").event(
    ["show", function(ev){
    var strings = ["New Widget", "Custom 'show' event fired from click handler"],
    elem = p("#widget_1");
    (elem.html() == strings[0]) ? elem.html(strings[1]) : elem.html(strings[0]);
    }]
  );
  p("#widget_1").click(function(ev){ p("#widget_1").trigger("show") });
}