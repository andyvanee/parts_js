pt.mixin(
  "select",
  function(){ var select = function(obj, arg) {
      var f = function(){};
      f.prototype = obj;
      var newObj = new f();
      newObj.value = [];
      
      if (typeof arg == "object"){
        newObj.queryString = "";
        newObj.value[0] = arg;
      }
      if (typeof arg == "string"){
        var val = jQuery(arg), i = 0;
        for (i; i < val.length; i++){
          newObj.value[i] = val[i];
        }
        newObj.length = i;
        newObj.context = val.context;
      }
      return newObj;
    }
  return select;
  }
);

pt.mixin("innerHeight", function(){
  var innerHeight = function(obj){ return jQuery(obj.value[0]).innerHeight() }
  return innerHeight;
});
pt.mixin("attr", function(){
  var attr = function(obj, args){ return pt(jQuery(obj.value[0]).attr(args)) }
  return attr;
});

pt.mixin("each", function(){
  var each = function(obj, args){
    return _.each(obj.value, args, obj.context);
  }
});
