define([], function () {
  'use strict';

  var ComponentLife = function (options) {
    options = options || {};
    this.strength = options.strength || 0;
    this.dexterity = options.dexterity || 0;
    this.health = options.health || 1;
    this.hp = this.health;
  };

  return ComponentLife;
});
