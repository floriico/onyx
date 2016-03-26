define([], function () {
  'use strict';

  var GameRenderer = function (canvas, entities) {
    this.canvas = canvas;
    this.entities = entities;
    this.gc = this.canvas.getContext('2d');
  };

  GameRenderer.prototype.paint = function paint() {
    var len = this.entities.length;
    var i;
    var entity;

    this.gc.fillStyle = '#002b36';
    this.gc.fillRect(0, 0, this.canvas.width, this.canvas.height);
    for (i = 0; i < len; i++) {
      entity = this.entities[i];
      this.gc.save();
      this.gc.translate(Math.round(entity.position.x), Math.round(entity.position.y));
      entity.componentGraphic.paint(this.gc);
      this.gc.restore();
    }
  };

  return GameRenderer;

});
