define([
  'game-input-handler',
  'entity-component/position'
], function (GameInputHandler, Position) {
  'use strict';

  var GameUpdater = function (inputHandler, entityStore, player) {
    this.inputHandler = inputHandler;
    this.entityStore = entityStore;
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

  function willCollide(entity, nextPosition, collidables) {
    const len = collidables.length;
    for (let i = 0; i < len; i++) {
      const collidable = collidables[i];
      if (entity !== collidable) {
        if (nextPosition.x < collidable.position.x + collidable.boundingBox.width &&
            nextPosition.x + entity.boundingBox.width > collidable.position.x &&
            nextPosition.y < collidable.position.y + collidable.boundingBox.height &&
            nextPosition.y + entity.boundingBox.height > collidable.position.y) {
          return true;
        }
      }
    }
    return false;
  }

  GameUpdater.prototype.update = function update(elapsedTime) {
    updatePlayer(this.inputHandler, this.player);
    const entities = this.entityStore.filterMovable();
    const len = entities.length;
    for (let i = 0; i < len; i++) {
      let entity = entities[i];
      const nextPosition = new Position(
        entity.position.x + entity.velocity.x * elapsedTime / 1000,
        entity.position.y + entity.velocity.y * elapsedTime / 1000
      );
      if (!willCollide(entity, nextPosition, this.entityStore.getCollidables())) {
        entity.setPosition(nextPosition);
      }
      if (entity.position.x < 0) { entity.position.x = 0; }
      if (entity.position.x > 305) { entity.position.x = 305; }
      if (entity.position.y < 0) { entity.position.y = 0; }
      if (entity.position.y > 185) { entity.position.y = 185; }
    }
  };

  return GameUpdater;
});
