define([
  'game-input-handler',
  'system/move-system'
], function (GameInputHandler, MoveSystem) {
  'use strict';

  var GameUpdater = function (inputHandler, entityStore, player) {
    this.inputHandler = inputHandler;
    this.entityStore = entityStore;
    this.player = player;
    this.moveSystem = new MoveSystem(this.entityStore);
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
    const entities = this.entityStore.getEntities();
    const len = entities.length;
    for (let i = 0; i < len; i++) {
      let entity = entities[i];
      this.moveSystem.update(entity, elapsedTime);
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

  function updateSpwaners(spwaners, elapsedTime) {
    const len = spwaners.length;
    for (let i = 0; i < len; i++) {
      spwaners[i].update(elapsedTime);
    }
  }

  return GameUpdater;
});
