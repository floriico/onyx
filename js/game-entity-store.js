define([
  'game-entity',
  'entity-component/position',
  'entity-component/velocity',
  'entity-component/bounding-box',
  'component-graphic'
], function(GameEntity, Position, Velocity, BoundingBox, ComponentGraphic) {
  'use strict';

  function GameEntityStore() {
    this.entities = [];
  }

  GameEntityStore.prototype.getEntities = function () {
    return this.entities;
  }

  GameEntityStore.prototype.filterMovable = function filterMovable() {
    return this.entities.filter(function filter(e) {
      return e.velocity !== null;
    });
  }

  GameEntityStore.prototype.getCollidables = function () {
    return this.entities.filter(function collidableFilter(e) {
      return e.boundingBox !== null;
    })
  }

  GameEntityStore.prototype.createHuman = function () {
    const human = new GameEntity({
      componentGraphic: new ComponentGraphic({ color: '#2aa198'})
    });
    human.setPosition(new Position(0, 0))
      .setVelocity(new Velocity(0, 0))
      .setBoundingBox(new BoundingBox(15, 15));
    this.entities.push(human);
    return human;
  }

  GameEntityStore.prototype.createWall = function () {
    const wall = new GameEntity({
      componentGraphic: new ComponentGraphic()
    });
    wall.setPosition(new Position(100, 100))
      .setBoundingBox(new BoundingBox(15, 15));
    this.entities.push(wall);
    return wall;
  }


  return GameEntityStore;
});
