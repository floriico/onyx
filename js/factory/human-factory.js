define([
  'game-entity',
  'entity-component/position',
  'entity-component/direction',
  'entity-component/velocity',
  'entity-component/bounding-box',
  'entity-component/health',
  'entity-component/weapon',
  'entity-component/graphic',
  'entity-component/experience'
], function (GameEntity, Position, Direction, Velocity, BoundingBox,
    Health, Weapon, Graphic, Experience) {
  'use strict';

  function HumanFactory(entityStore) {
    this.entityStore = entityStore;
    Object.freeze(this);
  }

  HumanFactory.prototype.create = function create(aPosition) {
    if (!(aPosition instanceof Position)) { throw new TypeError('not a Position'); }
    var human = new GameEntity();
    human.setPosition(aPosition)
      .setDirection(Direction.EAST)
      .setVelocity(new Velocity(0, 0))
      .setBoundingBox(new BoundingBox(10, 10))
      .setGraphic(new Graphic('#2aa198'))
      .setHealth(new Health(100))
      .setWeapon(new Weapon('hand', 1, 2))
      .setExperience(new Experience());
    this.entityStore.addEntity(human);
    return human;
  }

  return HumanFactory;

});
