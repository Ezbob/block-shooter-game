import GameState from './gameState.js';

export default function GameStateStack() {
  var me = this;
  me.__proto__ = new Array();

  me.getCurrentGameState = function() {
    // if stateStack is empty then we get a generic gamestate that has the
    // isPlaying flag set to false so this gamestate automatically stops the
    // stack machinery
    return me.length > 0 ? me[me.length - 1] : new GameState(false);
  };
}