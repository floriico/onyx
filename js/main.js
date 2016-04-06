require([
  'game-loop',
  'game-renderer',
  'game-updater',
  'game-entity-store',
  'game-input-handler'
], function(GameLoop, GameRenderer, GameUpdater, GameEntityStore, GameInputHandler) {
  'use strict';

  const entityStore = new GameEntityStore();
  const player = entityStore.createHuman();
  entityStore.createWall().position = { x: 100, y: 100 };
  entityStore.createWall().position = { x: 50, y: 50 };
  entityStore.createHuman().position = { x: 100, y: 50 };

  var gameInputHandler = new GameInputHandler();
  var gameRenderer = new GameRenderer(document.getElementById('screen'), entityStore);
  var gameUpdater = new GameUpdater(gameInputHandler, entityStore, player);

  var gameLoop = new GameLoop(gameUpdater, gameRenderer);

  gameLoop.start();
});
