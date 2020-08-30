import HealthBar from '../actors/healthBar.js';
import Player from '../actors/player.js';
import Weako from '../actors/weako.js';
import Scenario from '../dataStructures/scenario.js';
import ScenarioBasedState from '../dataStructures/scenarioBasedState.js';
import Constants from '../sharedConstants.js';
import Variables from '../sharedVariables.js';

export default class FirstStage extends ScenarioBasedState {
  constructor() {
    super();
    //this.MAX_SHOTS = 300;
    this.NUMBER_OF_CLOUDS = 30;
    //this.shots = new ShotCollection(this.MAX_SHOTS);
    this.player = new Player();
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

    var secondEncounter = new Scenario();
    secondEncounter.addEnemy(new Weako(this.player));
    this.scenarioStack.push(secondEncounter);

    var firstEncounter = new Scenario();
    firstEncounter.addEnemy(new Weako(this.player));
    this.scenarioStack.push(firstEncounter);
    this.getCurrentScenario().start();
    this.isLoaded = true;
  };

  update() {
    this.player.update();
    this.healthBar.update();
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
    //this.shots.draw();
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
        player.velocity.x = (
            Math.min(player.BASE_VELOCITY.x, player.velocity.x));
      }
      if (!(keyboardInput.isKeyPressed('up') ||
            keyboardInput.isKeyPressed('down'))) {
        player.velocity.y = (
            Math.min(player.BASE_VELOCITY.y, player.velocity.y));
      }
    }
  };
};
