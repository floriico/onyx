define([
  'game-entity',
  'entity-component/position',
  'entity-component/bounding-box',
  'component-graphic',
  'component-physic'
], function(GameEntity, Position, BoundingBox, ComponentGraphic,
    ComponentPhysic) {
  'use strict';

  function GameEntityStore() {
    this.entities = [];
  }

  GameEntityStore.prototype.getEntities = function () {
    return this.entities;
  }

  GameEntityStore.prototype.getCollidables = function () {
    return this.entities.filter(function collidableFilter(e) {
      return e.boundingBox !== null;
    })
  }

  GameEntityStore.prototype.createHuman = function () {
    const human = new GameEntity({
      componentGraphic: new ComponentGraphic({ color: '#2aa198'}),
      componentPhysic: new ComponentPhysic({
        boundingBox: {
          height: 15,
          width: 15
        },
        isSolid: true
      })
    });
    human.setPosition(new Position(0, 0))
      .setBoundingBox(new BoundingBox(15, 15));
    this.entities.push(human);
    return human;
  }

  GameEntityStore.prototype.createWall = function () {
    const wall = new GameEntity({
      componentGraphic: new ComponentGraphic(),
      componentPhysic: new ComponentPhysic({
        boundingBox: {
          height: 15,
          width: 15
        },
        isSolid: true
      })
    });
    wall.setPosition(new Position(100, 100))
      .setBoundingBox(new BoundingBox(15, 15));
    this.entities.push(wall);
    return wall;
  }


  return GameEntityStore;
});
