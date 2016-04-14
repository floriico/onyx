define([
  'game-input-handler'
], function (GameInputHandler) {
  'use strict';

  function PlayerUpdateSystem(inputHandler, entityStore, damageSystem) {
    this.inputHandler = inputHandler;
    this.entityStore = entityStore;
    this.damageSystem = damageSystem;
    Object.freeze(this);
  }

  PlayerUpdateSystem.prototype.update = function update(entity, elapsedTime) {
    var damageSystem = this.damageSystem;
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
    if (this.inputHandler.isPressed(GameInputHandler.ACTION_A)) {
      this.entityStore.getEntities().filter(function (e) {
        if (e === entity || e.position === null || e.health === null) {
          return false;
        }
        return entity.position.isInRadius(e.position, 20);
      }).forEach(function (e) {
        damageSystem.hit(entity, e);
      });
    }
  };

  return PlayerUpdateSystem;
});
