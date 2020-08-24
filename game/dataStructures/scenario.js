import Constants from '../sharedConstants.js';

export default class Scenario {

  constructor() {
    this.type = Constants.SCENARIO_TYPES.get('destroyall');
    this.currentEnemies = [];
    this.isStarted = false;
  }

  addEnemy(enemy) {
    this.currentEnemies.push(enemy);
  };

  load() {};

  isPlaying() {
    return this.currentEnemies.length > 0 && this.isStarted;
  };

  update() {
    for (var i = this.currentEnemies.length - 1; i >= 0; --i) {
      if (!this.currentEnemies[i].isEnabled()) {
        this.currentEnemies.splice(i, 1);
      }
    }
  };

  start() {
    this.isStarted = true;
  };

  stop() {
    this.isStarted = false;
  };
};