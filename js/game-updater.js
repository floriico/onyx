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

  function willCollide(entity, nextPosition, solidEntities) {
    const len = solidEntities.length;
    for (let i = 0; i < len; i++) {
      const entityToCheck = solidEntities[i];
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
    const entities = this.entities.filter(function filterComponentPhysic(e) {
      return e.componentPhysic !== null;
    });
    const solidEntities = entities.filter(function filterSolid(e) {
      return e.componentPhysic.isSolid;
    });
    const len = entities.length;
    for (let i = 0; i < len; i++) {
      let entity = entities[i];
      let entityVelocity = entity.componentPhysic.velocity;
      const nextPosition = {
        x: entity.position.x + entityVelocity.x * elapsedTime / 1000,
        y: entity.position.y + entityVelocity.y * elapsedTime / 1000
      }
      if (!willCollide(entity, nextPosition, solidEntities)) {
        entity.position = nextPosition;
      }
      if (entity.position.x < 0) { entity.position.x = 0; }
      if (entity.position.x > 305) { entity.position.x = 305; }
      if (entity.position.y < 0) { entity.position.y = 0; }
      if (entity.position.y > 185) { entity.position.y = 185; }
    }
  };

  return GameUpdater;
});
