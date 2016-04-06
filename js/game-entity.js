define([
  'entity-component/bounding-box'
], function(BoundingBox) {
  'use strict';

  var GameEntity = function(options) {
    options.position = options.position || {};
    options.velocity = options.velocity || {};
    this.position = {
      x: options.position.x || 0,
      y: options.position.y || 0
    };
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

  GameEntity.prototype.setBoundingBox = function setBoundingBox(component) {
    if (!(component instanceof BoundingBox)) {
      throw new Error();
      throw new TypeError('not a BoundingBox component');
    }
    this.componentBoundingBox = component;
    return this;
  }

  GameEntity.prototype.update = function () {

  };

  return GameEntity;
});
