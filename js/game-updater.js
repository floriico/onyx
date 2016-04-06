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

  function willCollide(entity, nextPosition, entities) {
    const len = entities.length;
    for (let i = 0; i < len; i++) {
      const entityToCheck = entities[i];
      if (entity !== entityToCheck) {
        if (nextPosition.x < entityToCheck.position.x + entityToCheck.componentPhysic.boundingBox.width &&
            nextPosition.x + entity.componentPhysic.boundingBox.width > entityToCheck.position.x &&
            nextPosition.y < entityToCheck.position.y + entityToCheck.componentPhysic.boundingBox.height &&
            nextPosition.y + entity.componentPhysic.boundingBox.height > entityToCheck.position.y) {
          return true;
        }
      }
    }
    return false;
  }

  GameUpdater.prototype.update = function update(elapsedTime) {
    updatePlayer(this.inputHandler, this.player);
    const entities = this.entityStore.getEntities().filter(function filterComponentPhysic(e) {
      return e.componentPhysic !== null;
    });
    const len = entities.length;
    for (let i = 0; i < len; i++) {
      let entity = entities[i];
      let entityVelocity = entity.componentPhysic.velocity;
      const nextPosition = new Position(
        entity.position.x + entityVelocity.x * elapsedTime / 1000,
        entity.position.y + entityVelocity.y * elapsedTime / 1000
      );
      if (!willCollide(entity, nextPosition, entities)) {
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
