require([
  'game-loop',
  'game-renderer',
  'game-updater',
  'game-entity',
  'game-input-handler',
  'component-graphic',
  'component-physic'
], function(GameLoop, GameRenderer, GameUpdater, GameEntity, GameInputHandler,
    ComponentGraphic, ComponentPhysic) {
  'use strict';

  const player = new GameEntity({
    componentGraphic: new ComponentGraphic({ color: '#2aa198'}),
    componentPhysic: new ComponentPhysic({
      boundingBox: {
        height: 15,
        width: 15
      },
      isSolid: true
    })
  });
  const entities = [];
  entities.push(player);
  entities.push(new GameEntity({
    position: { x: 100, y: 100 },
    componentGraphic: new ComponentGraphic(),
    componentPhysic: new ComponentPhysic({
      boundingBox: {
        height: 15,
        width: 15
      },
      isSolid: true
    })
  }));
  entities.push(new GameEntity({
    position: { x: 50, y: 50 },
    componentGraphic: new ComponentGraphic()
  }));

  var gameInputHandler = new GameInputHandler();
  var gameRenderer = new GameRenderer(document.getElementById('screen'), entities);
  var gameUpdater = new GameUpdater(gameInputHandler, entities, player);

  var gameLoop = new GameLoop(gameUpdater, gameRenderer);

  gameLoop.start();
});
