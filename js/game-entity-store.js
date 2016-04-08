define([
  'game-entity',
  'entity-component/position',
  'entity-component/direction',
  'entity-component/velocity',
  'entity-component/bounding-box',
  'entity-component/health',
  'entity-component/weapon',
  'entity-component/graphic'
], function(GameEntity, Position, Direction, Velocity, BoundingBox, Health,
    Weapon, Graphic) {
  'use strict';

  function GameEntityStore() {
    this.entities = [];
  }

  GameEntityStore.prototype.getEntities = function () {
    return this.entities;
  };

  GameEntityStore.prototype.filterMovable = function filterMovable() {
    return this.entities.filter(function filter(e) {
      return e.velocity !== null;
    });
  };

  GameEntityStore.prototype.getCollidables = function () {
    return this.entities.filter(function collidableFilter(e) {
      return e.boundingBox !== null;
    })
  };

  GameEntityStore.prototype.filterInArea = function filterInArea(neX, neY, swX, swY) {
    return this.entities.filter(function filter(e) {
      return e.position.x >= neX
          && e.position.x <= swX
          && e.position.y >= neY
          && e.position.y <= swY;
    })
  };

  GameEntityStore.prototype.filterDieable = function filterDieable() {
    return this.entities.filter(function filter(e) {
      return e.health !== null;
    })
  };

  GameEntityStore.prototype.cleanup = function cleanup() {
    this.entities = this.entities.filter(function filter(e) {
      return e.health === null || e.health.hp > 0;
    })
  };

  GameEntityStore.prototype.addEntity = function addEntity(entity) {
    this.entities.push(entity);
  };

  GameEntityStore.prototype.createFactory = function createFactory(Factory) {
    return new Factory(this);
  }

  GameEntityStore.prototype.createWall = function () {
    const wall = new GameEntity();
    wall.setPosition(new Position(100, 100))
      .setBoundingBox(new BoundingBox(10, 10))
      .setGraphic(new Graphic());
    this.entities.push(wall);
    return wall;
  }


  return GameEntityStore;
});
