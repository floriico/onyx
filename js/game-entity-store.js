define([
  'game-entity',
  'entity-component/position',
  'component-graphic',
  'component-physic'
], function(GameEntity, Position, ComponentGraphic, ComponentPhysic) {
  'use strict';

  function GameEntityStore() {
    this.entities = [];
  }

  GameEntityStore.prototype.getEntities = function () {
    return this.entities;
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
    human.setPosition(new Position(0, 0));
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
    wall.setPosition(new Position(100, 100));
    this.entities.push(wall);
    return wall;
  }


  return GameEntityStore;
});
