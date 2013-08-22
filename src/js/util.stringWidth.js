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