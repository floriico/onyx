define([], function (){
  'use strict';

  function Velocity(x, y) {
    this.x = x;
    this.y = y;
    Object.seal(this);
  }

  return Velocity;
});
