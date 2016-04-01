define([
  'game-entity',
  'component-graphic',
  'component-physic'
], function(GameEntity, ComponentGraphic, ComponentPhysic) {
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
    this.entities.push(human);
    return human;
  }

  GameEntityStore.prototype.createWall = function () {
    const wall = new GameEntity({
      position: { x: 100, y: 100 },
      componentGraphic: new ComponentGraphic(),
      componentPhysic: new ComponentPhysic({
        boundingBox: {
          height: 15,
          width: 15
        },
        isSolid: true
      })
    });
    this.entities.push(wall);
    return wall;
  }


  return GameEntityStore;
});
