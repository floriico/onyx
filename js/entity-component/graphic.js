define([
  'entity-component/direction'
], function (Direction) {
  'use strict';

  var Graphic = function (aColor) {
    this.color = aColor || "#dc322f";
    Object.seal(this);
  };

  Graphic.prototype.paint = function paint(gc, direction) {
    gc.fillStyle = this.color;
    gc.translate(-5, -5);
    gc.fillRect(0, 0, 10, 10);
    gc.fillStyle = "#073642";
    if (direction) {
      if (direction.direction === Direction.NORTH.direction) {
        gc.fillRect(5, 0, 1, 5);
      } else if (direction.direction === Direction.SOUTH.direction) {
        gc.fillRect(5, 5, 1, 5);
      } else if (direction.direction === Direction.WEST.direction) {
        gc.fillRect(0, 5, 5, 1);
      } else {
        gc.fillRect(5, 5, 5, 1);
      }
    }
  };

  return Graphic;
});
