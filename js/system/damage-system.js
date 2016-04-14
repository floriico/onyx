define([], function () {
  'use strict';

  function DamageSystem() {
    Object.freeze(this);
  }

  DamageSystem.prototype.hit = function addEvent(attacker, defender) {
    var attackerWeapon = attacker.weapon;
    defender.health.hp -= attackerWeapon.minDamage + Math.floor(Math.random()
        * (attackerWeapon.maxDamage - attackerWeapon.minDamage));
  }

  return DamageSystem;
})
