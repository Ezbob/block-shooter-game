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

class CloudCollection extends CircularBuffer {
  constructor(maxClouds) {
    super(maxClouds);
    this.maxClouds = maxClouds;
  };

  load() {
    for (var i = 0; i < this.maxClouds; ++i) {
      let newCloudPos = new Vector(
          Utils.randomBetween(1, Constants.CANVAS_WIDTH - 1),
          Utils.randomBetween(-15, Constants.CANVAS_HEIGHT >> 1));

      this.push(new Cloud({width: 20, height: 20}, newCloudPos));
    }
  };

  update() {
    var size = this.size;
    for (var i = 0; i < size; i++) {
      var current1 = this.next();
      if (current1.isEnabled()) {
        current1.update();
      } else {
        current1.reset();
      }
    }
  };

  draw() {
    var size = this.size;
    for (var i = 0; i < size; i += 2) {
      var current1 = this[i];
      if (current1.isEnabled()) {
        current1.draw();
      }
    }
  };
};

class ShotCollection extends CircularBuffer {
  constructor(maxShots) {
    super(maxShots);
    this.maxShots = maxShots;
  }

  load() {
    for (var i = 0; i < this.maxShots; ++i) {
      this.push(new Shot());
    }
  };

  update() {
    var size = this.size;
    for (var i = 0; i < size; i++) {
      var current1 = this.next();
      if (current1.isEnabled()) {
        current1.update();
      } else {
        current1.reset();
      }
    }
  };

  draw() {
    var size = this.size;
    for (var i = 0; i < size; i += 2) {
      var current1 = this[i];
      if (current1.isEnabled()) {
        current1.draw();
      }
    }
  };
};

export default class FirstStage extends ScenarioBasedState {
  constructor() {
    super();
    this.MAX_SHOTS = 300;
    this.NUMBER_OF_CLOUDS = 30;
    this.clouds = new CloudCollection(this.NUMBER_OF_CLOUDS);
    this.shots = new ShotCollection(this.MAX_SHOTS);
    this.player = new Player(this.shots);
    this.healthBar = new HealthBar(this.player);
  }

  updateEnemies() {
    var scenario = this.getCurrentScenario();
    var enemies = scenario.currentEnemies;

    for (var i = 0; i < enemies.length; ++i) {
      var current = enemies[i];
      if (current.isEnabled()) {
        current.update();
      }
    }
  };

  drawEnemies() {
    var scenario = this.getCurrentScenario();
    var enemies = scenario.currentEnemies;

    for (var i = 0; i < enemies.length; ++i) {
      var current = enemies[i];
      if (current.isEnabled()) {
        current.draw();
      }
    }
  };

  load() {
    this.clouds.load();
    this.shots.load();

    var secondEncounter = new Scenario();
    secondEncounter.addEnemy(new Weako(this.player, this.shots));
    this.scenarioStack.push(secondEncounter);

    var firstEncounter = new Scenario();
    firstEncounter.addEnemy(new Weako(this.player, this.shots));
    this.scenarioStack.push(firstEncounter);
    this.getCurrentScenario().start();
    this.isLoaded = true;
  };

  update() {
    this.player.update();
    this.healthBar.update();
    this.clouds.update();
    this.shots.update();
    this.updateEnemies();

    var currentScenario = this.getCurrentScenario();
    currentScenario.update();

    if (!currentScenario.isPlaying() && this.scenarioStack.length > 0) {
      this.scenarioStack.pop();
      this.getCurrentScenario().start();
    }

    if (this.scenarioStack.length === 0) {
      this.stop();
    }
  };

  draw() {
    var ctx = Variables.canvasManager.getCanvasContext();
    this.player.draw();
    this.healthBar.draw();
    this.clouds.draw();
    this.shots.draw();
    this.drawEnemies();

    if (!this.player.isEnabled()) {
      var oldFont = ctx.font;
      ctx.font = '42px Helvetica';
      ctx.fillStyle = 'red';
      ctx.textAlign = 'center';
      ctx.fillText(
          'YOU DIED!', Constants.CANVAS_WIDTH / 2, Constants.CANVAS_HEIGHT / 2);
      ctx.font = oldFont;
    }
  };

  control() {
    var player = this.player;
    let keyboardInput = Variables.keyboardInput;

    if (keyboardInput.isKeyPressed('escape')) {
      var pauseScreen = Variables.pauseScreen;

      if (!Variables.isPaused) {
        Variables.isPaused = true;
        Variables.stateStack.push(pauseScreen);
      }
    }

    if (player.isEnabled()) {
      var direction = Constants.REVERSED_INPUT ? -1 : 1;
      if (keyboardInput.isKeyPressed('space')) {
        player.shoot();
      }
      if (keyboardInput.isKeyPressed('right')) {
        player.move(direction, 0);
      }
      if (keyboardInput.isKeyPressed('left')) {
        player.move(-direction, 0);
      }
      if (keyboardInput.isKeyPressed('up')) {
        player.move(0, -direction);
      }
      if (keyboardInput.isKeyPressed('down')) {
        player.move(0, direction);
      }
      if (!(keyboardInput.isKeyPressed('right') ||
            keyboardInput.isKeyPressed('left'))) {
        player.velocity.setX(
            Math.min(player.BASE_VELOCITY.x, player.velocity.getX()));
      }
      if (!(keyboardInput.isKeyPressed('up') ||
            keyboardInput.isKeyPressed('down'))) {
        player.velocity.setY(
            Math.min(player.BASE_VELOCITY.y, player.velocity.getY()));
      }
    }
  };
};
