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

  return GameInputHandler;

});
