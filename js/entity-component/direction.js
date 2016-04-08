define([], function() {
  'use strict';

  function Direction(aDirection) {
    this.direction = aDirection;
    Object.freeze(this);
  }

  Direction.NORTH = new Direction('north');
  Direction.SOUTH = new Direction('south');
  Direction.EAST = new Direction('east');
  Direction.WEST = new Direction('west');

  return Direction;
});
