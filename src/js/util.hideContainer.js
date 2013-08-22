Acool.register("util.hideContainer", function($, acool){
  var hideDiv;
  var initDiv = function() {
    if(hideDiv) return;
    hideDiv = document.createElement("div");
    hideDiv.style.cssText = "position:absolute;top:-9999px;left:-9999px;";
    document.getElementsByTagName("head")[0].appendChild(hideDiv);
  };

  var that = {
    appendChild: function(el) {
      initDiv();
      hideDiv.appendChild(el);
    },
    removeChild: function(el) {
      hideDiv && hideDiv.removeChild(el);
    }
  };
  return that;
});