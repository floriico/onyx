define([
  'entity-component/experience'
], function (Experience) {
  'use strict';

  function LevelSystem() {
    this.levelExperienceTable = {
      1: 0,
      2: 100,
      3: 300,
      4: 600,
      5: 1000
    }
    this.maxLevel = 5;
    Object.freeze(this);
  }

  LevelSystem.prototype.getLevel = function getLevel(experience) {
    if (!(experience instanceof Experience)) {
      throw new TypeError('Not an Experience component');
    }
    const xp = experience.xp;
    if (experience.level === this.maxLevel) {
      return this.maxLevel;
    }
    let lvl = this.maxLevel;
    while (lvl > 0) {
      if (xp >= this.levelExperienceTable[lvl]) {
        break;
      }
      lvl -= 1;
    }
    return lvl;
  }

  LevelSystem.prototype.update = function update(experience) {
    if (experience instanceof Experience) {
      const level = this.getLevel(experience);
      while (level > experience.level) {
        experience.levelUp();
      }
    }
  }

  return LevelSystem;
})
