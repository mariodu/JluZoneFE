/**
* acool.js v1.0.0 by @fat and @mdo
* Copyright 2013 MarioDu
* 
*/
if (!jQuery) { throw new Error("Acool requires jQuery") }

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
Acool.register("img.ready", function($, acool){
  return function(img, readyFunc, loadFunc, errorFunc){
    var $img = $(img);
    var onready, width, height, nowWidth, nowHeight, tick, intervalId = null;
    if(img.complete){
      readyFunc && readyFunc(img);
      loadFunc && loadFunc(img);
      return false;
    }

    width = $img.width();
    height = $img.height();

    onready = function(){
      onready.end = false;
      nowWidth = $img.width();
      nowHeight = $img.height();
      if(nowWidth != width || nowHeight != height){
        readyFunc && readyFunc(img);
        onready.end = true;
      }
    };

    img.onerror = function(){
      errorFunc && errorFunc(img);
      onready.end = true;
      img = img.onload = img.onerror = null;
    };

    onready();

    img.onload = function () {
      !onready.end && onready();
      loadFunc && loadFunc(img);
      img = img.onload = img.onerror = null; //gif onload
    };

    tick = function(){
      if(onready.end){
        clearInterval(intervalId);
        intervalId = null;
      }else{
        onready();
      }
    };

    if(!onready.end){
      if (intervalId === null) {intervalId = setInterval(tick, 40);}
    }
  };
});
Acool.register("img.autoSize", function($, acool){
  var resize, proportion, newWidth, newHeight;
  resize = function(img){
    var width, height, imgProportion;
    var $img = $(img);
    if(img.naturalWidth !== undefined){
      width = img.naturalWidth;
      height = img.naturalHeight;  //html5
    }else{
      width = $img.width();
      height = $img.height();
    }
    imgProportion = width / height;
    if(proportion <= imgProportion){
      imgProportion = height / newHeight;
      $img.width(Math.floor(width / imgProportion));
      $img.height(newHeight);
      $img.css("marginLeft", -Math.floor(($img.width() - newWidth) / 2));
    }else{
      imgProportion = width / newWidth;
      $img.height(Math.floor(height / imgProportion));
      $img.width(newWidth);
      $img.css("marginTop", -Math.floor(($img.height() - newHeight) / 4));
    }
    $img.css("display", "");
  };

  return function(img, width, height){
    if(!img)
      return false;
    if(!height)
      newHeight = width;
    newWidth = width;
    newHeight = height;
    proportion = width / height;
    img.style.display = 'none'; //reduce repaint
    acool.img.ready(img, resize);
  };
});
Acool.register("util.uniqueKey", function($, acool){
  var _i = 0, _loadTime = (new Date()).getTime().toString();
  return function(key){
    return key + "-" + _loadTime + (_i++);
  };
});
Acool.register("util.stringWidth", function($, acool){
  var ruler = document.createElement('span');
  return function(el){
    document.body.appendChild(ruler);
    var $ruler = $(ruler), $el = $(el), h = 0, w = 0;
    $ruler.css({
      position:'absolute',
      left: -1000,
      top: -1000
    });
    $ruler.html($el.html());
    var styles = ['font-size','font-style', 'font-weight', 'font-family','line-height', 'text-transform', 'letter-spacing'];
    $(styles).each(function(){
      var s = this.toString();
      $ruler.css(s, $el.css(s));
    });
    h = $ruler.outerHeight();
    w = $ruler.outerWidth();

    $ruler.remove();

    var ret = {height:h, width:w};

    return ret;
  };
});