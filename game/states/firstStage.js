import ScenarioBasedState from '../dataStructures/scenarioBasedState.js';
import Weako from '../actors/weako.js';
import Scenario from '../dataStructures/scenario.js';
import SharedData from '../sharedVariables.js';

export default function firstStage() {
  var me = this;
  me.__proto__ = new ScenarioBasedState();

  me.load = function() {
    game.backDrops.loadClouds();
    game.draw.loadShots();

    var secondEncounter = new Scenario();
    secondEncounter.addEnemy(new Weako());
    firstStage.scenarioStack.push(secondEncounter);

    var firstEncounter = new Scenario();
    firstEncounter.addEnemy(new Weako());
    firstStage.scenarioStack.push(firstEncounter);
    firstStage.getCurrentScenario().start();
  };

  me.update = function() {
    game.variables.scheduler.update();
    game.actors.player.update();
    game.actors.health_bar.update();
    game.draw.updateClouds();
    game.draw.updateShots();
    game.draw.updateEnemies();

    var currentScenario = firstStage.getCurrentScenario();
    currentScenario.update();

    if (!currentScenario.isPlaying() && firstStage.scenarioStack.length > 0) {
      firstStage.scenarioStack.pop();
      firstStage.getCurrentScenario().start();
    }

    if (firstStage.scenarioStack.length === 0) {
      firstStage.isPlaying = false;
    }
  };

  me.draw = function() {
    var ctx = game.constants.CONTEXT2D;
    game.actors.player.draw();
    game.actors.health_bar.draw();
    game.draw.drawClouds();
    game.draw.drawShots();
    game.draw.drawEnemies();

    if (!game.actors.player.isEnabled()) {
      var oldFont = ctx.font;
      ctx.font = '42px Helvetica';
      ctx.fillStyle = 'red';
      ctx.textAlign = 'center';
      ctx.fillText(
          'YOU DIED!', game.constants.CANVAS_WIDTH / 2,
          game.constants.CANVAS_HEIGHT / 2);
      ctx.font = oldFont;
    }
  };

  me.control = function() {
    var keyCodes = game.constants.KEYS;
    var player = game.actors.player;
    var consts = game.constants;
    var keyMap = game.variables.keyMap;

    if (keyMap[keyCodes.escape]) {
      var pauseScreen = game.gameStates.pauseScreen;

      if (!game.variables.isPaused) {
        pauseScreen.load();
        game.variables.isPaused = true;
        game.variables.stateStack.push(pauseScreen);
      }
    }

    if (player.isEnabled()) {
      if (keyMap[keyCodes.space]) {
        player.shoot();
      }
      if (keyMap[keyCodes.right]) {
        player.move(consts.DIRECTION, 0);
      }
      if (keyMap[keyCodes.left]) {
        player.move(-consts.DIRECTION, 0);
      }
      if (keyMap[keyCodes.up]) {
        player.move(0, -consts.DIRECTION);
      }
      if (keyMap[keyCodes.down]) {
        player.move(0, consts.DIRECTION);
      }
      if (!(keyMap[keyCodes.right] || keyMap[keyCodes.left])) {
        player.velocity.setX(
            Math.min(consts.BASE_VELOCITY.x, player.velocity.getX()));
      }
      if (!(keyMap[keyCodes.up] || keyMap[keyCodes.down])) {
        player.velocity.setY(
            Math.min(consts.BASE_VELOCITY.y, player.velocity.getY()));
      }
    }
  };
};
