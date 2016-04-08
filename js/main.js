require([
  'game-loop',
  'game-renderer',
  'game-updater',
  'game-entity-store',
  'game-input-handler',
  'factory/human-factory',
  'entity-component/position',
  'spwaner'
], function(GameLoop, GameRenderer, GameUpdater, GameEntityStore,
    GameInputHandler, HumanFactory, Position , Spwaner) {
  'use strict';

  const entityStore = new GameEntityStore();
  const humanFactory = entityStore.createFactory(HumanFactory);
  const player = humanFactory.create(new Position(10, 10));
  player.position = { x: 10, y: 10 };
  entityStore.createWall().position = { x: 100, y: 100 };
  entityStore.createWall().position = { x: 50, y: 50 };
  humanFactory.create(new Position(100, 50));
  const humanSpwaner = new Spwaner(humanFactory, new Position(200, 100));
  entityStore.registerSpwaner(humanSpwaner);

  var gameInputHandler = new GameInputHandler();
  var gameRenderer = new GameRenderer(document.getElementById('screen'), entityStore);
  var gameUpdater = new GameUpdater(gameInputHandler, entityStore, player);

  var gameLoop = new GameLoop(gameUpdater, gameRenderer);

  gameLoop.start();
});
