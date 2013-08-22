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