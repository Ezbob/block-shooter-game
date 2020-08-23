import sharedData from '../sharedVariables.js';

export default function Scenario() {
  // default Prototype
  var me = this;
  me.type = sharedData.constants.SCENARIO_TYPES.get('destroyall');
  me.currentEnemies = [];
  me.isStarted = false;

  me.addEnemy = function(enemy) {
    me.currentEnemies.push(enemy);
  };

  me.load = function() {};

  me.isPlaying = function() {
    return me.currentEnemies.length > 0 && me.isStarted;
  };

  me.update = function() {
    for (var i = me.currentEnemies.length - 1; i >= 0; --i) {
      if (!me.currentEnemies[i].isEnabled()) {
        me.currentEnemies.splice(i, 1);
      }
    }
  };

  me.start = function() {
    me.isStarted = true;
  };

  me.stop = function() {
    me.isStarted = false;
  };
};