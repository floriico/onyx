define([], function() {
  'use strict';

  var GameLoop = function(updater, renderer, updateFrequency) {
    this.update = updater.update.bind(updater);
    this.render = renderer.paint.bind(renderer);
    this.updateFrequency = updateFrequency || 32;
    this.lastTick = null;
    this.deltaTime = 0;
    this.run = false;
  };

  GameLoop.prototype.tick = function tick(now) {
    if (!this.lastTick) {
      this.lastTick = now;
    }
    let elapsedTime = now - this.lastTick;
    this.deltaTime += elapsedTime;
    while (this.deltaTime > this.updateFrequency) {
      this.deltaTime -= this.updateFrequency;
      this.update(this.updateFrequency);
    }
    this.render(elapsedTime);
    this.lastTick = now;
    if (this.run) {
      requestAnimationFrame(this.tick.bind(this));
    }
  };

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
