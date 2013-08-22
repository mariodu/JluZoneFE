Acool.register("util.uniqueKey", function($, acool){
  var _i = 0, _loadTime = (new Date()).getTime().toString();
  return function(key){
    return key + "-" + _loadTime + (_i++);
  };
});