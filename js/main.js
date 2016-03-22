require([
  'game-loop',
  'game-renderer',
  'game-updater',
  'game-entity',
  'game-input-handler'
], function(GameLoop, GameRenderer, GameUpdater, GameEntity, GameInputHandler) {
  'use strict';

  const player = new GameEntity();
  const entities = [];
  entities.push(player);
  entities.push(new GameEntity());
  entities.push(new GameEntity(50, 50));

  var gameInputHandler = new GameInputHandler();
  var gameRenderer = new GameRenderer(document.getElementById('screen'), entities);
  var gameUpdater = new GameUpdater(gameInputHandler, entities, player);

  var gameLoop = new GameLoop(gameUpdater, gameRenderer);

  gameLoop.start();
});
