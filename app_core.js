/*!
 *  Demo for parts_js
 *  Copyright 2011, Andy Vanee
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://andyvanee.com/
 */
 
window.onload = function(){
  app.tests();
}

app = {
}

app.tests = function(){  
  p("#tests").value[0].innerHTML = "<h1>Parts: running</h1><p>ID selection successful.</p>"
  p(".sidebar").value[0].innerHTML = "<p>Class selection successful</p>";
  p("#console p").value[0].innerHTML += "<p>Descendant selection successful.</p>";
}