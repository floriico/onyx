define([
  'component-graphic'
], function(ComponentGraphic) {
  'use strict';

  var GameEntity = function(x, y) {
    this.position = {
      x: x || 0,
      y: y || 0
    }
    this.velocity = {
      x: 0,
      y: 0
    }
    this.componentGraphic = new ComponentGraphic();
  }

  return GameEntity;
});
