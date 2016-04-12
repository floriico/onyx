define([], function () {
  'use strict';

  function Experience() {
    this.level = 1;
    this.xp = 0;
    Object.seal(this);
  }

  Experience.prototype.gain = function gain(xp) {
    if (xp > 0) {
      this.xp += xp;
    }
  }

  Experience.prototype.levelUp = function levelUp() {
    this.level += 1;
  }

  return Experience;
});
