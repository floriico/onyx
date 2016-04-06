define([
  'entity-component/position',
  'entity-component/bounding-box'
], function(Position, BoundingBox) {
  'use strict';

  var GameEntity = function(options) {
    options.velocity = options.velocity || {};
    this.position = null;
    this.velocity = {
      x: options.velocity.x || 0,
      y: options.velocity.y || 0
    };
    this.componentGraphic = options.componentGraphic || null;
    this.componentPhysic = options.componentPhysic || null;
    this.componentLife = options.componentLife || null;
    this.componentBoundingBox = null;
    Object.seal(this);
  };

  GameEntity.prototype.setPosition = function setPosition(component) {
    if (!(component instanceof Position)) {
      throw new TypeError('not a Position component')
    }
    this.position = component;
    return this;
  }

  GameEntity.prototype.setBoundingBox = function setBoundingBox(component) {
    if (!(component instanceof BoundingBox)) {
      throw new TypeError('not a BoundingBox component');
    }
    this.componentBoundingBox = component;
    return this;
  }

  return GameEntity;
});
