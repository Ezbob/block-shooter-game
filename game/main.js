'use strict';
import sharedData from './sharedData.js';

(function main() {
  window.onkeydown = function(event) {
    sharedData.variables.keyMap[event.keyCode] = event.type == 'keydown';
  };

  window.onkeyup = function(event) {
    sharedData.variables.keyMap[event.keyCode] = event.type == 'keydown';
  };

  window.onblur = function() {
    var game = BOXED_GAME;
    var pauseScreen = game.gameStates.pauseScreen;
    var currentState = sharedData.variables.getCurrentGameState();

    if (!sharedData.variables.isPaused &&
        sharedData.constants.STATE_TYPES.get('action') === currentState.type) {
      pauseScreen.load();
      sharedData.variables.isPaused = true;
      sharedData.variables.stateStack.push(pauseScreen);
    }
  };

  var requestAniFrame = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / sharedData.constants.FPS_LIMIT);
      };

  function updateTimeStep() {
    sharedData.variables.now = window.performance.now();
    sharedData.variables.dt =
        game.variables.now - (game.variables.lastUpdate || game.variables.now);
    sharedData.variables.lastUpdate = game.variables.now;
  }

  sharedData.variables.getCurrentGameState().load();

  function tick() {
    updateTimeStep();
    sharedData.constants.CONTEXT2D.clearRect(
        0, 0, sharedData.constants.CANVAS_WIDTH,
        sharedData.constants.CANVAS_HEIGHT);
    var currentState = sharedData.variables.getCurrentGameState();

    currentState.control();
    currentState.update();
    currentState.draw();

    if (!currentState.isPlaying) {
      sharedData.constants.CONTEXT2D.clearRect(
          0, 0, sharedData.constants.CANVAS_WIDTH,
          sharedData.constants.CANVAS_HEIGHT);

      if (sharedData.variables.stateStack.length > 0) {
        sharedData.variables.stateStack.pop();
        currentState = sharedData.variables.getCurrentGameState();
        currentState.load();
      } else {
        return;
      }
    }
    requestAniFrame(tick);
  }
  requestAniFrame(tick);
})();
