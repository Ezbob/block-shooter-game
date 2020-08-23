'use strict';
import Variables from './sharedVariables.js';
import Constants from './sharedConstants.js';
import SplashScreen from './states/splashScreen.js';
import FirstStage from './states/firstStage.js';
import WinScreen from './states/winScreen.js';


(function main() {
  window.onkeydown = function(event) {
    Variables.keyMap[event.keyCode] = (event.type == 'keydown');
  };

  window.onkeyup = function(event) {
    Variables.keyMap[event.keyCode] = (event.type == 'keydown');
  };

  window.onblur = function() {
    let currentState = Variables.stateStack.getCurrentGameState();

    if (!Variables.isPaused &&
        Constants.STATE_TYPES.get('action') === currentState.type) {
      Variables.isPaused = true;
      Variables.stateStack.push(Variables.pauseScreen);
    }
  };

  Variables.pauseScreen.load();

  Variables.stateStack.push(new WinScreen());
  Variables.stateStack.push(new FirstStage());
  Variables.stateStack.push(new SplashScreen());

  var requestAniFrame = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / Constants.FPS_LIMIT);
      };

  Variables.stateStack.getCurrentGameState().load();

  function tick() {
    Variables.frameClock.update();
    Variables.scheduler.update();
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
