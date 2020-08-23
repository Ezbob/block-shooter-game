import Constants from './sharedConstants.js';
import Variables from './sharedVariables.js';

window.requestAnimationFrame = (function(){
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback){
            window.setTimeout(callback, 1000 / Constants.FPS_LIMIT);
        };
})();

export default function Runtime() {
  var me = this;

  me.gameLoop = function() {
    me.__proto__ = Window
    Variables.frameClock.update();
    Variables.scheduler.update();

    Constants.CONTEXT2D.clearRect(
        0, 0, Constants.CANVAS_WIDTH, Constants.CANVAS_HEIGHT);

    var currentState = Variables.stateStack.getCurrentGameState();

    if (!currentState.isLoaded) {
        currentState.load();
    }

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
    window.requestAnimationFrame(me.gameLoop);
  };

  me.run = function() {
    window.requestAnimationFrame(me.gameLoop);
  };
};