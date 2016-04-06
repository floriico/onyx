define([
  'entity-component/position',
  'entity-component/velocity',
  'entity-component/bounding-box',
  'entity-component/health',
  'entity-component/weapon'
], function(Position, Velocity, BoundingBox, Health, Weapon) {
  'use strict';

  var GameEntity = function(options) {
    this.position = null;
    this.velocity = null;
    this.componentGraphic = options.componentGraphic || null;
    this.componentLife = options.componentLife || null;
    this.boundingBox = null;
    this.health = null;
    this.weapon = null;
    Object.seal(this);
  };

  GameEntity.prototype.setPosition = function setPosition(component) {
    if (!(component instanceof Position)) {
      throw new TypeError('not a Position component')
    }
    this.position = component;
    return this;
  }

  GameEntity.prototype.setVelocity = function setVelocity(component) {
    if (!(component instanceof Velocity)) {
      throw new TypeError('not a Velocity component');
    }
    this.velocity = component;
    return this;
  }

  GameEntity.prototype.setBoundingBox = function setBoundingBox(component) {
    if (!(component instanceof BoundingBox)) {
      throw new TypeError('not a BoundingBox component');
    }
    this.boundingBox = component;
    return this;
  }

  GameEntity.prototype.setHealth = function setHealth(component) {
    if (!(component instanceof Health)) {
      throw new TypeError('not a Health component');
    }
    this.health = component;
    return this;
  }

  GameEntity.prototype.setWeapon = function setWeapon(component) {
    if (!(component instanceof Weapon)) {
      throw new TypeError('not a Weapon component');
    }
    this.weapon = component;
    return this;
  }

  return GameEntity;
});
