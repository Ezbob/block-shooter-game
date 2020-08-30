'use strict';
import Variables from './sharedVariables.js';
import Constants from './sharedConstants.js';
import ComponentStage from './states/componentStage.js';


(function main() {
  /*
  window.onblur = function() {
    let currentState = Variables.stateStack.getCurrentGameState();

    if (!Variables.isPaused &&
        Constants.STATE_TYPES.get('action') === currentState.type) {
      Variables.isPaused = true;
      Variables.stateStack.push(Variables.pauseScreen);
    }
  };
  */
  Variables.keyboardInput.setup();
  Variables.canvasManager.setup();

  Variables.stateStack.push(new ComponentStage());
  //Variables.stateStack.push(new WinScreen());
  //Variables.stateStack.push(new FirstStage());
  //Variables.stateStack.push(new SplashScreen());

  Variables.runtime.run();
})();
