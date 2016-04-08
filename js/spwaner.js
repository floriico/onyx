define([
  'entity-component/position'
], function(Position) {
  'use strict';

  function Spwaner(entityFactory, position, options) {
    if (!(position instanceof Position)) { throw new TypeError('not a Position'); }
    options = options || {};
    this.entityFactory = entityFactory;
    this.position = position;
    this.areaRadius = options.areaRadius || 50;
    this.capacity = options.capacity || 5;
    this.spwaningTime = options.spwaningTime || 5000;
    this.entities = [];
    this.regen = 0;
    Object.seal(this);
  }

  Spwaner.prototype.update = function update(elapsedTime) {
    if (this.entities.length < this.capacity) {
      this.regen += elapsedTime;
      if (this.regen >= this.spwaningTime) {
        this.regen -= this.spwaningTime;
        const position = new Position(
          this.position.x - this.areaRadius + Math.round(Math.random() * this.areaRadius * 2),
          this.position.y - this.areaRadius + Math.round(Math.random() * this.areaRadius * 2)
        );
        this.entities.push(this.entityFactory.create(position));
      }
    }
  };

  Spwaner.prototype.cleanup = function cleanup() {
    this.entities = this.entities.filter(function filter(e) {
      return (e.health && (e.health.hp <= 0)) || !(e.health);
    });
  }

  return Spwaner;
});
