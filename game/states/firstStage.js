import Cloud from '../actors/cloud.js';
import HealthBar from '../actors/healthBar.js';
import Player from '../actors/player.js';
import Shot from '../actors/shot.js';
import Weako from '../actors/weako.js';
import CircularBuffer from '../dataStructures/circularBuffer.js';
import Scenario from '../dataStructures/scenario.js';
import ScenarioBasedState from '../dataStructures/scenarioBasedState.js';
import Vector from '../dataStructures/vector.js';
import Constants from '../sharedConstants.js';
import Variables from '../sharedVariables.js';
import Utils from '../utils.js';

function CloudCollection(maxClouds) {
  var me = this;
  me.maxClouds = maxClouds;
  me.__proto__ = new CircularBuffer(maxClouds)

  me.load = function() {
    for (var i = 0; i < me.maxClouds; ++i) {
      let newCloudPos = new Vector(
          Utils.randomBetween(1, Constants.CANVAS_WIDTH - 1),
          Utils.randomBetween(-15, Constants.CANVAS_HEIGHT >> 1));

      me.push(new Cloud({width: 20, height: 20}, newCloudPos));
    }
  };

  me.update = function() {
    var size = me.size;
    for (var i = 0; i < size; i++) {
      var current1 = me.next();
      if (current1.isEnabled()) {
        current1.update();
      } else {
        current1.reset();
      }
    }
  };

  me.draw = function() {
    var size = me.size;
    for (var i = 0; i < size; i += 2) {
      var current1 = me.buffer[i];
      if (current1.isEnabled()) {
        current1.draw();
      }
    }
  };
};

function ShotCollection(maxShots) {
  var me = this;
  me.maxShots = maxShots;
  me.__proto__ = new CircularBuffer(maxShots)

  me.load = function() {
    for (var i = 0; i < me.maxShots; ++i) {
      me.push(new Shot());
    }
  };

  me.update = function() {
    var size = me.size;
    for (var i = 0; i < size; i++) {
      var current1 = me.next();
      if (current1.isEnabled()) {
        current1.update();
      } else {
        current1.reset();
      }
    }
  };

  me.draw = function() {
    var size = me.size;
    for (var i = 0; i < size; i += 2) {
      var current1 = me.buffer[i];
      if (current1.isEnabled()) {
        current1.draw();
      }
    }
  };
};

export default function FirstStage() {
  var me = this;
  me.__proto__ = new ScenarioBasedState();
  me.clouds = new CloudCollection(Constants.NUMBER_OF_CLOUDS);
  me.shots = new ShotCollection(Constants.MAX_SHOTS);
  me.player = new Player(me.shots);
  me.healthBar = new HealthBar(me.player);

  me.updateEnemies = function() {
    var scenario = me.getCurrentScenario();
    var enemies = scenario.currentEnemies;

    for (var i = 0; i < enemies.length; ++i) {
      var current = enemies[i];
      if (current.isEnabled()) {
        current.update();
      }
    }
  };

  me.drawEnemies = function() {
    var scenario = me.getCurrentScenario();
    var enemies = scenario.currentEnemies;

    for (var i = 0; i < enemies.length; ++i) {
      var current = enemies[i];
      if (current.isEnabled()) {
        current.draw();
      }
    }
  };

  me.load = function() {
    me.clouds.load();
    me.shots.load();

    var secondEncounter = new Scenario();
    secondEncounter.addEnemy(new Weako(me.player, me.shots));
    me.scenarioStack.push(secondEncounter);

    var firstEncounter = new Scenario();
    firstEncounter.addEnemy(new Weako(me.player, me.shots));
    me.scenarioStack.push(firstEncounter);
    me.getCurrentScenario().start();
    me.isLoaded = true;
  };

  me.update = function() {
    me.player.update();
    me.healthBar.update();
    me.clouds.update();
    me.shots.update();
    me.updateEnemies();

    var currentScenario = me.getCurrentScenario();
    currentScenario.update();

    if (!currentScenario.isPlaying() && me.scenarioStack.length > 0) {
      me.scenarioStack.pop();
      me.getCurrentScenario().start();
    }

    if (me.scenarioStack.length === 0) {
      me.stop();
    }
  };

  me.draw = function() {
    var ctx = Constants.CONTEXT2D;
    me.player.draw();
    me.healthBar.draw();
    me.clouds.draw();
    me.shots.draw();
    me.drawEnemies();

    if (!me.player.isEnabled()) {
      var oldFont = ctx.font;
      ctx.font = '42px Helvetica';
      ctx.fillStyle = 'red';
      ctx.textAlign = 'center';
      ctx.fillText(
          'YOU DIED!', Constants.CANVAS_WIDTH / 2, Constants.CANVAS_HEIGHT / 2);
      ctx.font = oldFont;
    }
  };

  me.control = function() {
    var keyCodes = Constants.KEYS;
    var player = me.player;
    var keyMap = Variables.keyMap;

    if (keyMap[keyCodes.escape]) {
      var pauseScreen = Variables.pauseScreen;

      if (!Variables.isPaused) {
        Variables.isPaused = true;
        Variables.stateStack.push(pauseScreen);
      }
    }

    if (player.isEnabled()) {
      if (keyMap[keyCodes.space]) {
        player.shoot();
      }
      if (keyMap[keyCodes.right]) {
        player.move(Constants.DIRECTION, 0);
      }
      if (keyMap[keyCodes.left]) {
        player.move(-Constants.DIRECTION, 0);
      }
      if (keyMap[keyCodes.up]) {
        player.move(0, -Constants.DIRECTION);
      }
      if (keyMap[keyCodes.down]) {
        player.move(0, Constants.DIRECTION);
      }
      if (!(keyMap[keyCodes.right] || keyMap[keyCodes.left])) {
        player.velocity.setX(
            Math.min(Constants.BASE_VELOCITY.x, player.velocity.getX()));
      }
      if (!(keyMap[keyCodes.up] || keyMap[keyCodes.down])) {
        player.velocity.setY(
            Math.min(Constants.BASE_VELOCITY.y, player.velocity.getY()));
      }
    }
  };
};