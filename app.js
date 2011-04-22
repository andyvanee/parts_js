window.onload = function(){
  var stylesheet = document.createElement("style");
  stylesheet.type = "text/css";
  stylesheet.innerHTML = "body {background-color: #D0D5DA;} ";
  stylesheet.innerHTML += "#tests {font-family:'Helvetica', sans-serif; padding:22px; margin: 6px;} ";
  stylesheet.innerHTML += "p.fadein{opacity: 0; font-size: 22px;} ";
  p("head").obj[0].appendChild(stylesheet);

  p("#tests").obj[0].innerHTML = "<h1>parts_js:</h1>";
  setTimeout(function(){p("h1").obj[0].innerHTML += " running"}, 400);
  
  p("#tests").obj[0].innerHTML += "<p class='fadein'>Enjoy the ride!</p>";
  app.interval = setInterval(app.fadein, 20);
  
  app.tests();
}

app = {
  opacity: 0,
  interval: undefined,
  fadein: function(){
    (app.opacity < 0.95) ? app.opacity += 0.004 : clearInterval(app.interval);
    p(".fadein").cssText({"opacity": app.opacity});
  }
}

app.tests = function(){
  (p("body").obj[0].toString() == "[object HTMLBodyElement]") ? 0 : console.log("Body selection failed");
}