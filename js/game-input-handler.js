define([], function() {
  'use strict';

  var GameInputHandler = function () {
    var that = this;

    this.keys = {};
    document.addEventListener('keydown', function (ev) {
      that.keys[ev.keyCode] = true;
    });
    document.addEventListener('keyup', function (ev) {
      that.keys[ev.keyCode] = false;
    });
  };

  GameInputHandler.prototype.isPressed = function isPressed(key) {
    return this.keys[key];
  };

  GameInputHandler.UP = 87;
  GameInputHandler.DOWN = 83;
  GameInputHandler.LEFT = 65;
  GameInputHandler.RIGHT = 68;
  GameInputHandler.ACTION_A = 0;
  GameInputHandler.ACTION_B = 0;

  return GameInputHandler;

});
