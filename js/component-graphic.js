define([], function () {
  'use strict';

  var ComponentGraphic = function () {
  };

  ComponentGraphic.prototype.paint = function paint(gc) {
    gc.fillStyle = "rgb(200,0,0)";
    gc.fillRect(0, 0, 15, 15);
  };

  return ComponentGraphic;
});
