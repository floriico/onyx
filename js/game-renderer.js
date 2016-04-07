define([], function () {
  'use strict';

  var GameRenderer = function (canvas, entityStore) {
    this.canvas = canvas;
    this.entityStore = entityStore;
    this.gc = this.canvas.getContext('2d');
  };

  GameRenderer.prototype.paint = function paint() {
    this.gc.fillStyle = '#002b36';
    this.gc.fillRect(0, 0, this.canvas.width, this.canvas.height);
    const entities = this.entityStore.getEntities().sort(function depthSort(entityA, entityB) {
      return entityA.position.y - entityB.position.y;
    })
    const len =  entities.length;
    for (let i = 0; i < len; i++) {
      let entity = entities[i];
      this.gc.save();
      this.gc.translate(Math.round(entity.position.x), Math.round(entity.position.y));
      entity.componentGraphic.paint(this.gc);
      if (entity.health) {
        displayHealthBar(this.gc, (entity.boundingBox && entity.boundingBox.width) || 10, entity.health);
      }
      this.gc.restore();
    }
  };

  function displayHealthBar(gc, size, health) {
    gc.translate(0, -4);
    gc.fillStyle = '#ff0000';
    gc.fillRect(0, 0, size, 1);
    gc.fillStyle = '#00ff00';
    gc.fillRect(0, 0, Math.round((health.hp / health.max) * size), 1);
  }

  return GameRenderer;

});
