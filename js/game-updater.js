define([], function () {
  'use strict';

  var GameUpdater = function () {

  }

  GameUpdater.prototype.update = function update(elapsedTime) {
    console.log('update ' + elapsedTime);
  };

  return GameUpdater;
});
