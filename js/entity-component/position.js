define([], function () {
  'use strict';

  function Position(x, y) {
    this.x = x;
    this.y = y;
    Object.freeze(this);
  }

  return Position;
});
