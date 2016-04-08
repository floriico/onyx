define([
  'game-entity',
  'entity-component/position',
  'entity-component/direction',
  'entity-component/velocity',
  'entity-component/bounding-box',
  'entity-component/health',
  'entity-component/weapon',
  'component-graphic'
], function(GameEntity, Position, Direction, Velocity, BoundingBox, Health,
    Weapon, ComponentGraphic) {
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

  GameEntityStore.prototype.createHuman = function () {
    const human = new GameEntity({
      componentGraphic: new ComponentGraphic({ color: '#2aa198'})
    });
    human.setPosition(new Position(0, 0))
      .setDirection(Direction.EAST)
      .setVelocity(new Velocity(0, 0))
      .setBoundingBox(new BoundingBox(10, 10))
      .setHealth(new Health(100))
      .setWeapon(new Weapon('hand', 1, 2));
    this.entities.push(human);
    return human;
  }

  GameEntityStore.prototype.createWall = function () {
    const wall = new GameEntity({
      componentGraphic: new ComponentGraphic()
    });
    wall.setPosition(new Position(100, 100))
      .setBoundingBox(new BoundingBox(10, 10));
    this.entities.push(wall);
    return wall;
  }


  return GameEntityStore;
});
