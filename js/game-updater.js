define([
  'game-input-handler',
  'entity-component/position',
  'entity-component/Direction'
], function (GameInputHandler, Position, Direction) {
  'use strict';

  var GameUpdater = function (inputHandler, entityStore, player) {
    this.inputHandler = inputHandler;
    this.entityStore = entityStore;
    this.player = player;
  };

  function updatePlayer(inputHandler, player, entityStore) {
    if (inputHandler.isPressed(GameInputHandler.RIGHT)) {
      player.velocity.x = 60;
    } else if (inputHandler.isPressed(GameInputHandler.LEFT)) {
      player.velocity.x = -60;
    } else {
      player.velocity.x = 0;
    }
    if (inputHandler.isPressed(GameInputHandler.DOWN)) {
      player.velocity.y = 60;
    } else if (inputHandler.isPressed(GameInputHandler.UP)) {
      player.velocity.y = -60;
    } else {
      player.velocity.y = 0;
    }
    if (inputHandler.isPressed(GameInputHandler.ACTION_A)) {
      player.graphic.color = '#6c71c4';
      entityStore.getEntities().filter(function (e) {
        if (e === player || e.position === null || e.health === null) {
          return false;
        }
        return player.position.isInRadius(e.position, 20);
      }).forEach(function (e) {
        e.health.hp -= player.weapon.minDamage + Math.floor(Math.random()
            * (player.weapon.maxDamage - player.weapon.minDamage));
      });
    } else {
      player.graphic.color = '#2aa198';
    }
  }

  GameUpdater.prototype.update = function update(elapsedTime) {
    updatePlayer(this.inputHandler, this.player, this.entityStore);
    const entities = this.entityStore.filterMovable();
    const len = entities.length;
    for (let i = 0; i < len; i++) {
      let entity = entities[i];
      const nextPosition = new Position(
        entity.position.x + entity.velocity.x * elapsedTime / 1000,
        entity.position.y + entity.velocity.y * elapsedTime / 1000
      );
      updateDirection(entity);
      if (!(willCollide(entity, nextPosition, this.entityStore.getCollidables()))
          && !(willBeOutsideBorders(nextPosition))) {
        entity.setPosition(nextPosition);
      }
    }
    const dieable = this.entityStore.filterDieable();
    const dieableLen = dieable.length;
    for (let i = 0; i < dieableLen; i++) {
      if (dieable[i].health.hp <= 0) {
        this.entityStore.cleanup();
        break;
      }
    }
    updateSpwaners(this.entityStore.spwaners, elapsedTime);
  };

  function willCollide(entity, nextPosition, collidables) {
    const len = collidables.length;
    for (let i = 0; i < len; i++) {
      const collidable = collidables[i];
      if (entity !== collidable) {
        const entityHalfWidth = entity.boundingBox.width / 2;
        const entityHalfHeight = entity.boundingBox.height / 2;
        const collidableHalfWidth = collidable.boundingBox.width / 2;
        const collidableHalfHeight = collidable.boundingBox.height / 2;

        if (nextPosition.x - entityHalfWidth < collidable.position.x + collidableHalfWidth &&
            nextPosition.x + entityHalfWidth > collidable.position.x - collidableHalfWidth &&
            nextPosition.y - entityHalfHeight < collidable.position.y + collidableHalfHeight &&
            nextPosition.y + entityHalfHeight > collidable.position.y - collidableHalfHeight) {
          return true;
        }
      }
    }
    return false;
  }

  function willBeOutsideBorders(nextPosition) {
    return nextPosition.x < 5
        || nextPosition.x  > 300
        || nextPosition.y < 5
        || nextPosition.y > 180;
  }

  function updateDirection(entity) {
    if (entity.direction && entity.velocity) {
      if (entity.velocity.y > 0) {
        entity.direction = Direction.SOUTH;
      } else if (entity.velocity.y < 0) {
        entity.direction = Direction.NORTH;
      }
      if (entity.velocity.x > 0) {
        entity.direction = Direction.EAST;
      } else if (entity.velocity.x < 0) {
        entity.direction = Direction.WEST;
      }
    }
  }

  function updateSpwaners(spwaners, elapsedTime) {
    const len = spwaners.length;
    for (let i = 0; i < len; i++) {
      spwaners[i].update(elapsedTime);
    }
  }

  return GameUpdater;
});
