define([], function() {
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
  };

  return GameEntity;
});
