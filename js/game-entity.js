define([
  'entity-component/position',
  'entity-component/velocity',
  'entity-component/bounding-box',
  'entity-component/health'
], function(Position, Velocity, BoundingBox, Health) {
  'use strict';

  var GameEntity = function(options) {
    this.position = null;
    this.velocity = null;
    this.componentGraphic = options.componentGraphic || null;
    this.componentLife = options.componentLife || null;
    this.boundingBox = null;
    this.health = null;
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

  return GameEntity;
});
