'use strict';
import Variables from './sharedVariables.js';
import Constants from './sharedConstants.js';

(function main() {
  window.onkeydown = function(event) {
    Variables.keyMap[event.keyCode] = (event.type == 'keydown');
  };

  window.onkeyup = function(event) {
    Variables.keyMap[event.keyCode] = (event.type == 'keydown');
  };

  window.onblur = function() {
    /*
    var game = BOXED_GAME;
    var pauseScreen = game.gameStates.pauseScreen;
    var currentState = sharedData.variables.getCurrentGameState();

    if (!sharedData.variables.isPaused &&
        sharedData.constants.STATE_TYPES.get('action') === currentState.type) {
      pauseScreen.load();
      sharedData.variables.isPaused = true;
      sharedData.variables.stateStack.push(pauseScreen);
    }
    */
  };

  var requestAniFrame = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / Constants.FPS_LIMIT);
      };

  function updateTimeStep() {
    Variables.now = window.performance.now();
    Variables.dt = (Variables.now - (Variables.lastUpdate || Variables.now));
    Variables.lastUpdate = Variables.now;
  }

  Variables.stateStack.getCurrentGameState().load();

  function tick() {
    updateTimeStep();
    Constants.CONTEXT2D.clearRect(
        0, 0, Constants.CANVAS_WIDTH, Constants.CANVAS_HEIGHT);

    var currentState = Variables.stateStack.getCurrentGameState();

    currentState.control();
    currentState.update();
    currentState.draw();

    if (!currentState.isPlaying) {
      Constants.CONTEXT2D.clearRect(
          0, 0, Constants.CANVAS_WIDTH, Constants.CANVAS_HEIGHT);

      if (Variables.stateStack.length > 0) {
        Variables.stateStack.pop();
        currentState = Variables.stateStack.getCurrentGameState();
        currentState.load();
      } else {
        return;
      }
    }
    requestAniFrame(tick);
  }
  requestAniFrame(tick);
})();
