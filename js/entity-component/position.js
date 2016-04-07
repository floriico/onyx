define([], function () {
  'use strict';

  function Position(x, y) {
    this.x = x;
    this.y = y;
    Object.freeze(this);
  }

  Position.prototype.isInRadius = function isInRadius(aPosition, aRadius) {
    if (!(aPosition instanceof Position)) {
      throw new TypeError('not a Position');
    }
    const x = this.x - aPosition.x;
    const y = this.y - aPosition.y;
    return (x*x + y*y) < aRadius * aRadius;
  }

  return Position;
});
