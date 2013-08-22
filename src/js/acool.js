if(!Acool){
  var $ = jQuery;
  var Acool = (function(){
    var pkgs = {};
    var main = "v1";
    pkgs[main] = {};
    var that = pkgs[main];

    that.register = function(namespace, func, pkgName){
      if (!pkgName || typeof pkgName != 'string') {
        pkgName = main;
      }
      if (!pkgs[pkgName]) {
        pkgs[pkgName] = {};
      }
      var pkg = pkgs[pkgName];
      var NSList = namespace.split('.');
      var step = pkg;
      var k = null;
      while(k = NSList.shift()){
        if(NSList.length){
          if(step[k] === undefined){
            step[k] = {};
          }
          step = step[k];
        }else{
          if(step[k] === undefined){
            try{
              step[k] = func($, pkg);
              return true;
            }catch(exception){
              console.log(exception);
            }
          }
        }
      }
      return false;
    };

    that.unRegister = function(namespace, pkgName){
      if(!pkgName || typeof pkgName != 'string'){
        pkgName = main;
      }
      var pkg = pkgs[pkgName];
      var NSList = namespace.split('.');
      var step = pkg;
      var k = null;
      while(k = NSList.shift()){
        if(NSList.length){
          if(step[k] === undefined){
            return false;
          }
          step = step[k];
        }else{
          if(step[k] !== undefined){
            delete step[k];
            return true;
          }
        }
      }
      return false;
    };
    return that;
  })();
}