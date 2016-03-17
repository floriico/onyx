define([], function() {
  'use strict';

  var GameLoop = function(update, render, updateFrequency) {
    this.update = update;
    this.render = render;
    this.updateFrequency = updateFrequency || 32;
    this.lastTick = null;
    this.deltaTime = 0;
    this.run = false;
  }

  GameLoop.prototype.tick = function tick(now) {
    var elapsedTime;

    if (!this.lastTick) {
      this.lastTick = now;
    }
    elapsedTime = now - this.lastTick;
    this.deltaTime += elapsedTime;
    while (this.deltaTime > this.updateFrequency) {
      this.deltaTime -= this.updateFrequency;
      this.update(this.updateFrequency);
    }
    this.render(elapsedTime);
    if (this.run) {
      requestAnimationFrame(this.tick.bind(this));
    }
  }

  GameLoop.prototype.start = function start() {
    this.run = true;
    this.lastTick = null;
    requestAnimationFrame(this.tick.bind(this));
  };

  GameLoop.prototype.stop = function stop() {
    this.run = false;
  };

  return GameLoop;
});
