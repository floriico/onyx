define([], function () {
  'use strict';

  var ComponentGraphic = function (options) {
    options = options || {};
    this.color = options.color || "#dc322f";
  };

  ComponentGraphic.prototype.paint = function paint(gc) {
    gc.fillStyle = this.color;
    gc.fillRect(0, 0, 10, 10);
  };

  return ComponentGraphic;
});
