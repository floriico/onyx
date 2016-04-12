define([
  'entity-component/position',
  'entity-component/direction'
], function (Position, Direction) {
  'use strict';

  function MoveSystem(entityStore) {
    this.entityStore = entityStore;
  }

  MoveSystem.prototype.update = function update(entity, elapsedTime) {
    if (entity.position === null || entity.velocity === null ) {
      return;
    }
    const position = entity.position;
    const velocity = entity.velocity;
    const nextPosition = new Position(
      position.x + velocity.x * elapsedTime / 1000,
      position.y + velocity.y * elapsedTime / 1000
    );
    if (!(willCollide(entity, nextPosition, this.entityStore.getCollidables()))
        && !(willBeOutsideBorders(nextPosition))) {
      entity.setPosition(nextPosition);
    }
    if (entity.direction) {
      updateDirection(entity);
    }
  }

  /* -- private ------------------------------------------------------------ */
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

  return MoveSystem;
});
