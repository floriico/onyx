define([], function () {
  'use strict';

  var Graphic = function (aColor) {
    this.color = aColor || "#dc322f";
    Object.seal(this);
  };

  Graphic.prototype.paint = function paint(gc) {
    gc.fillStyle = this.color;
    gc.translate(-5, -5);
    gc.fillRect(0, 0, 10, 10);
  };

  return Graphic;
});
