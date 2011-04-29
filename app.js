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
    pt("#console").html(function(old){return old + "<p>" + str + "</p>"});
  }
}

app.setup = function(){
  var x = pt("#console");

  pt("#console").html(function(old){return old + "<h2>parts_js: running</h2>"});
  pt("#console").append("<p><br>ID selection working. pt('#console')</p>");
  pt("#console p").append("<br>Descendant selection working. pt('#console p')");
  pt(".sidebar").append("<p id='needle' class='needle'>Class selection working. pt('.sidebar')</p>");
  pt(".sidebar #needle").append("<br>Child selection working.");
  pt("#needle").html( function(old){
    return old + "<br> pt('#needle').html( function(oldhtml){ return html }) is working."
  });
  app.console("<br>Contents of .needle: <br>" + pt("#needle").html());
  app.console("<br>Each div:");  
  pt("div").each(function(value, index){
    app.console( index + ": value:" + value + " id:" + value.id);
  });
  
  var hybridArray = ["hello parts!", 12, 0.5, {id : "an_object"}, 77];
  app.console("<br>Each element in a hybrid array");
  pt(hybridArray).each(function(value, index, arr){
    app.console(index + " : " + typeof value + " : " + arr);
  });
  
  app.console( 
    "reduce(){ val > 10 } === "  +
    pt(hybridArray).reduce(function(val){return val > 10}).value 
  );
/*
  pt("div").html(function(old){
    return old + "<br>Adding content to all divs.";
  });
*/
  
  var x = document.querySelectorAll("div");
  pt("p", x).each(function(value){ console.log(value.innerHTML) });
  pt("#tests").widget({
    type: "div",
    content: "New Widget",
    className: "my_widget",
    id: "widget_1",
    selectable: false
  });

  pt("#widget_1").event(
    ["show", function(ev){
    var strings = ["New Widget", "Custom 'show' event fired from click handler"],
    elem = pt("#widget_1");
    (elem.html() == strings[0]) ? elem.html(strings[1]) : elem.html(strings[0]);
    }]
  );
  pt("#widget_1").click(function(ev){ pt("#widget_1").trigger("show") });
}