window.onload = function(){
  var html = "";
  var s = parts("hello");
  s.name = "Special String";
  var a = parts([1, 2, 3]);
  var h = parts({t: 1, z: 0});
  var i = parts(4);
  var f = parts(3.14);
  
  var logObj = function(obj){
    html += "<tr>";
    for (var i in obj){
      html += "<td>" + i + " : " + obj[i] + "</td>";
    }
    html += "</tr>";  
  }
  
  html += "<table>";
  logObj(s);
  logObj(a);
  logObj(h);
  logObj(i);
  logObj(f);
  html += "</table>";
  document.body.innerHTML += html;

}