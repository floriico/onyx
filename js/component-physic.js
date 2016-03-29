define([], function () {
  'use strict';

  var ComponentPhysic = function (options) {
    options = options || {};
    this.velocity = {
      x: (options.velocity && options.velocity.x) || 0,
      y: (options.velocity && options.velocity.y) || 0
    };
    this.boundingBox = {
      x: (options.boundingBox && options.boundingBox.x) || 0,
      y: (options.boundingBox && options.boundingBox.y) || 0
    }
  };

  return ComponentPhysic;
});
