define([], function () {
  'use strict';

  function Weapon(name, minDamage, maxDamage) {
    this.name = name;
    this.minDamage = minDamage;
    this.maxDamage = maxDamage;
    Object.freeze(this);
  }

  return Weapon;
});
