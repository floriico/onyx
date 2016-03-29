define([
  'game-input-handler'
], function (GameInputHandler) {
  'use strict';

  var GameUpdater = function (inputHandler, entities, player) {
    this.inputHandler = inputHandler;
    this.entities = entities;
    this.player = player;
  };

  function updatePlayer(inputHandler, player) {
    let playerVelocity = player.componentPhysic.velocity;
    if (inputHandler.isPressed(GameInputHandler.RIGHT)) {
      playerVelocity.x = 100;
    } else if (inputHandler.isPressed(GameInputHandler.LEFT)) {
      playerVelocity.x = -100;
    } else {
      playerVelocity.x = 0;
    }
    if (inputHandler.isPressed(GameInputHandler.DOWN)) {
      playerVelocity.y = 100;
    } else if (inputHandler.isPressed(GameInputHandler.UP)) {
      playerVelocity.y = -100;
    } else {
      playerVelocity.y = 0;
    }
    if (inputHandler.isPressed(GameInputHandler.ACTION_A)) {
      player.componentGraphic.color = '#6c71c4';
    } else {
      player.componentGraphic.color = '#2aa198';
    }
  }

  GameUpdater.prototype.update = function update(elapsedTime) {
    updatePlayer(this.inputHandler, this.player);
    const entities = this.entities.filter(function filterComponentPhysic(e) {
      return e.componentPhysic !== null;
    });
    const len = entities.length;
    for (let i = 0; i < len; i++) {
      let entity = entities[i];
      let entityPosition = entity.position;
      let entityVelocity = entity.componentPhysic.velocity;
      entityPosition.x += entityVelocity.x * elapsedTime / 1000;
      entityPosition.y += entityVelocity.y * elapsedTime / 1000;
      if (entityPosition.x < 0) { entityPosition.x = 0; }
      if (entityPosition.x > 305) { entityPosition.x = 305; }
      if (entityPosition.y < 0) { entityPosition.y = 0; }
      if (entityPosition.y > 185) { entityPosition.y = 185; }
    }
  };

  return GameUpdater;
});
