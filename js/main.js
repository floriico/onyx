require([
  'game-loop'
], function(GameLoop) {
  'use strict';


  var gameLoop = new GameLoop(function (elapsedTime) {
    console.log('update ' + elapsedTime);
  }, function (elapsedTime) {
    console.log('render ' + elapsedTime);
  });

  gameLoop.start();
});
