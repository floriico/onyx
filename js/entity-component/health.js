define([], function () {
  'use strict';

  function Health(hp) {
    this.max = hp;
    this.hp = hp;
    Object.seal(this);
  }

  return Health;
});
