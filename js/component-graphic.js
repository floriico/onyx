define([], function () {
  'use strict';

  var ComponentGraphic = function () {
  };

  ComponentGraphic.prototype.paint = function paint(gc) {
    gc.fillStyle = "#dc322f";
    gc.fillRect(0, 0, 15, 15);
  };

  return ComponentGraphic;
});
