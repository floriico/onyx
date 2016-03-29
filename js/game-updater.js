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
    if (inputHandler.isPressed(GameInputHandler.RIGHT)) {
      player.velocity.x = 100;
    } else if (inputHandler.isPressed(GameInputHandler.LEFT)) {
      player.velocity.x = -100;
    } else {
      player.velocity.x = 0;
    }
    if (inputHandler.isPressed(GameInputHandler.DOWN)) {
      player.velocity.y = 100;
    } else if (inputHandler.isPressed(GameInputHandler.UP)) {
      player.velocity.y = -100;
    } else {
      player.velocity.y = 0;
    }
    if (inputHandler.isPressed(GameInputHandler.ACTION_A)) {
      player.componentGraphic.color = '#6c71c4';
    } else {
      player.componentGraphic.color = '#2aa198';
    }
  }

  GameUpdater.prototype.update = function update(elapsedTime) {
    const len = this.entities.length;

    updatePlayer(this.inputHandler, this.player);
    for (let i = 0; i < len; i++) {
      let entity = this.entities[i];
      entity.position.x += entity.velocity.x * elapsedTime / 1000;
      entity.position.y += entity.velocity.y * elapsedTime / 1000;
      if (entity.position.x < 0) { entity.position.x = 0; }
      if (entity.position.x > 305) { entity.position.x = 305; }
      if (entity.position.y < 0) { entity.position.y = 0; }
      if (entity.position.y > 185) { entity.position.y = 185; }
    }
  };

  return GameUpdater;
});
