define([], function() {
  'use strict';

  function BoundingBox(height, width) {
    this.height = height;
    this.width = width;
    Object.seal(this);
  }

  return BoundingBox;
});
