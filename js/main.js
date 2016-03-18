require([
  'game-loop',
  'game-renderer',
  'game-updater',
  'game-entity'
], function(GameLoop, GameRenderer, GameUpdater, GameEntity) {
  'use strict';

  var entities = [];
  entities.push(new GameEntity());
  entities.push(new GameEntity(50, 50));

  var gameRenderer = new GameRenderer(document.getElementById('screen'), entities);
  var gameUpdater = new GameUpdater();

  var gameLoop = new GameLoop(gameUpdater, gameRenderer);

  gameLoop.start();
});
