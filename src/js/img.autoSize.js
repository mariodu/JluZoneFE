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