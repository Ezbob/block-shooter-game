'use strict';
import Variables from './sharedVariables.js';
import Constants from './sharedConstants.js';
import SplashScreen from './states/splashScreen.js';
import FirstStage from './states/firstStage.js';
import WinScreen from './states/winScreen.js';


(function main() {
  window.onkeydown = function(event) {
    event.preventDefault();
    Variables.keyMap[event.keyCode] = (event.type == 'keydown');
  };

  window.onkeyup = function(event) {
    event.preventDefault();
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
  Variables.canvasManager.setup();

  Variables.stateStack.push(new WinScreen());
  Variables.stateStack.push(new FirstStage());
  Variables.stateStack.push(new SplashScreen());

  Variables.runtime.run();
})();
