define([
  'game-input-handler',
  'system/move-system',
  'system/player-update-system',
  'system/damage-system'
], function (GameInputHandler, MoveSystem, PlayerUpdateSystem, DamageSystem) {
  'use strict';

  var GameUpdater = function (inputHandler, entityStore, player) {
    this.inputHandler = inputHandler;
    this.entityStore = entityStore;
    this.player = player;
    this.moveSystem = new MoveSystem(this.entityStore);
    this.damageSystem = new DamageSystem();
    this.playerUpdateSystem = new PlayerUpdateSystem(this.inputHandler,
        this.entityStore, this.damageSystem);
  };

  function updatePlayer(inputHandler, player) {
    if (inputHandler.isPressed(GameInputHandler.ACTION_A)) {
      player.graphic.color = '#6c71c4';
    } else {
      player.graphic.color = '#2aa198';
    }
  }

  GameUpdater.prototype.update = function update(elapsedTime) {
    this.playerUpdateSystem.update(this.player, elapsedTime);
    updatePlayer(this.inputHandler, this.player);
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
