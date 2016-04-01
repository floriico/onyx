define([], function () {
  'use strict';

  var ComponentPhysic = function (options) {
    options = options || {};
    this.velocity = {
      x: (options.velocity && options.velocity.x) || 0,
      y: (options.velocity && options.velocity.y) || 0
    };
    this.boundingBox = {
      width: (options.boundingBox && options.boundingBox.width) || 0,
      height: (options.boundingBox && options.boundingBox.height) || 0
    }
    this.isSolid = options.isSolid || false;
  };

  return ComponentPhysic;
});
