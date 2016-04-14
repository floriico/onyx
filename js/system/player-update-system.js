define([
  'game-input-handler'
], function (GameInputHandler) {
  'use strict';

  function PlayerUpdateSystem(inputHandler) {
    this.inputHandler = inputHandler;
    Object.freeze(this);
  }

  PlayerUpdateSystem.prototype.update = function update(entity, elapsedTime) {
    if (this.inputHandler.isPressed(GameInputHandler.RIGHT)) {
      entity.velocity.x = 60;
    } else if (this.inputHandler.isPressed(GameInputHandler.LEFT)) {
      entity.velocity.x = -60;
    } else {
      entity.velocity.x = 0;
    }
    if (this.inputHandler.isPressed(GameInputHandler.DOWN)) {
      entity.velocity.y = 60;
    } else if (this.inputHandler.isPressed(GameInputHandler.UP)) {
      entity.velocity.y = -60;
    } else {
      entity.velocity.y = 0;
    }
  };

  return PlayerUpdateSystem;
});
