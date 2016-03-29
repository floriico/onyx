define([], function () {
  'use strict';

  var GameRenderer = function (canvas, entities) {
    this.canvas = canvas;
    this.entities = entities;
    this.gc = this.canvas.getContext('2d');
  };

  GameRenderer.prototype.paint = function paint() {
    this.gc.fillStyle = '#002b36';
    this.gc.fillRect(0, 0, this.canvas.width, this.canvas.height);
    const entities = this.entities.sort(function depthSort(entityA, entityB) {
      return entityA.position.y - entityB.position.y;
    })
    const len =  entities.length;
    for (let i = 0; i < len; i++) {
      let entity = entities[i];
      this.gc.save();
      this.gc.translate(Math.round(entity.position.x), Math.round(entity.position.y));
      entity.componentGraphic.paint(this.gc);
      this.gc.restore();
    }
  };

  return GameRenderer;

});
